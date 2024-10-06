import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import ProjectSec from "@/components/projectsSec";
import { mobileCheck } from "@/components/mobileCheck";

const cellSize = 10;
let previousPosition = {};

export default function Home() {
  const movement = [[0, cellSize], [cellSize, 0], [0, -cellSize], [-cellSize, 0], [cellSize, cellSize], 
                    [cellSize, -cellSize], [-cellSize, cellSize], [-cellSize, -cellSize]];

  const [intro, setIntro] = useState("");
  const [para, setPara] = useState("");
  const [email, setEmail] = useState("");

  const [about, setAbout] = useState("");
  const [proj, setProj] = useState("");
  const [soc, setSoc] = useState("");
  const [hint, setHint] = useState("");

  const [size, setSize] = useState(3);
  const [width, setWidth] = useState(1400);
  const [height, setHeight] = useState(800);

  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [move, setMove] = useState(false);

  const runningRef = useRef(false);
  const projectRef = useRef(null);
  const socialsRef = useRef(null);
  const canvasRef = useRef(null);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const moveTo = (id) => {
    location.href = id;
  }

  const round = (val, cl, ceil) => {
    return ceil ? Math.ceil(val / cl) * cl : Math.floor(val / cl) * cl;
  }

  const mod = (n, m) => {
    return ((n % m) + m) % m;
  }

  const getRandom = (value) => {
    let random = Math.floor(Math.random() * value);
    return round(random, cellSize, false);
  }

  const getAge = () => {
    const yearToMilli = 31536000000;
    let birth = new Date(2003, 1, 1);
    let diff = new Date() - birth;
    return Math.floor(diff / yearToMilli);
  }

  const animateText = async (value, func) => {
    for (let i = 1; i <= value.length; i++) {
      func(value.substring(0, i));
      await sleep(50);
    }
  }

  const generateStart = () => {
    const getFilledNeighbours = (x, y) => {
      let filled = [];
      for (let i = 0; i < movement.length; i++) {
        const [movX, movY] = movement[i];
        let nextX = mod(movX + x, width), nextY = mod(movY + y, height);
        if (Math.random() < 0.5) continue;
        filled.push([nextX, nextY]);
      }

      return filled;
    }

    for (let i = 0; i < 24; i++) {
      let x = getRandom(width), y = getRandom(height);
      let filled = getFilledNeighbours(x, y);
      const key = `${x},${y}`;

      for (let j = 0; j < filled.length; j++) {
        let [nx, ny] = filled[j];
        let nKey = `${nx},${ny}`;
        if (nKey in previousPosition) continue;
        previousPosition[nKey] = [nx, ny];
      } 

      if (key in previousPosition) continue;
      previousPosition[key] = [x, y];
    }
  }

  const getNeighbours = (x, y) => {
    let vals = [];
    let count = 0;
    
    for (let i = 0; i < movement.length; i++) {
      const [movX, movY] = movement[i];
      let nextX = mod(movX + x, width), nextY = mod(movY + y, height);
      let key = `${nextX},${nextY}`;
      let has = key in previousPosition ? 1 : 0;
      let el = [nextX, nextY, has];
      count += has;
      vals.push(el);
    }

    return [vals, count];
  }

  const startDrawing = () => {
    if (runningRef.current == true) {
      setPaused(true);
      runningRef.current = false;
    } else {
      setPaused(false);
      runningRef.current = true;
      gameOfLife();
    }
  }

  const changeLayout = useCallback(
    e => {
      let newWidth = window.screen.width;
      let newHeight = window.screen.height;

      let roundedW = round(newWidth, cellSize, true);
      let roundedH = round(newHeight, cellSize, true);
      setWidth(roundedW);
      setHeight(roundedH);
      
      if (newWidth <= 375) {
        setSize(1);
      } else if (newWidth <= 650) {
        setSize(2);
      } else {
        setSize(3);
      }
    }
  )

  const getLocation = useCallback(
    e => {
      const window = e.currentTarget;
      let projectsTop = projectRef.current.offsetTop;
      let socialsTop = socialsRef.current.offsetTop;

      if (window.scrollY + innerHeight > socialsTop) {
        setMove(2)
      } else if (window.scrollY + innerHeight > projectsTop) {
        setMove(1);
      } else {
        setMove(0);
      }
    }
  )

  const gameOfLife = useCallback(() => {
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (!runningRef.current || !!isReduced || paused) return;

    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    let newPosition = {};
    let neighBours = {};
    let skip = {};
    let neighVals = [];

    let prevPositionVals = Object.values(previousPosition);
    
    for (let i = 0; i < prevPositionVals.length; i++) {
      let [x, y] = prevPositionVals[i];
      let [n, count] = getNeighbours(x, y);
      const outerKey = `${x},${y}`;
      for (let j = 0; j < n.length; j++) {
        let [nx, ny, isPos] = n[j];
        let key = `${nx},${ny}`;
        if (isPos || key in neighBours) continue;
        neighBours[key] = true;
        neighVals.push([nx, ny]);
      }

      if (count == 2 || count == 3) {
        newPosition[outerKey] = [x, y];
        skip[outerKey] = true;
      } else {
        ctx.clearRect(x, y, cellSize, cellSize);
      }
    }

    for (let i = 0; i < neighVals.length; i++) {
      let [x, y] = neighVals[i];
      let [_, count] = getNeighbours(x, y);
      if (count == 3) {
        newPosition[`${x},${y}`] = [x, y];
      }
    }

    let newPosValues = Object.values(newPosition);

    for (let i = 0; i < newPosValues.length; i++) {
      let [x, y] = newPosValues[i];
      if (`${x},${y}` in skip) continue;
      ctx.fillStyle = 'darkblue';
      ctx.fillRect(x, y, cellSize, cellSize);
    }

    previousPosition = newPosition;
    setTimeout(gameOfLife, 100);
  }, [])
  
  useEffect(() => {
    if (!loaded) return;
    runningRef.current = true;
    gameOfLife();
  }, [loaded])

  useEffect(() => {
    window.addEventListener("scroll", getLocation);
    return () => {
      window.removeEventListener("scroll", getLocation);
    }
  }, [getLocation]);

  useEffect(() => {
    window.addEventListener("resize", changeLayout);
    return () => {
      window.removeEventListener("resize", changeLayout);
    }
  }, [changeLayout])

  useEffect(() => {
    const spell = async () => {
      const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
      const age = getAge();
      let value = `Hi, My name is Omar Abdiwali and I am a ${age}-year-old developer.`;
      let paraValue = "I have used Python, Java, and Typescript with frameworks like React and Next.js throughout my projects and internship at Amazon." 
      + " Currently, I am a senior in university studying Computer Science.";
      if (!!isReduced) {
        setIntro(value);
        setPara(paraValue);
        setEmail("Trying to reach me: Email!");
        setAbout("/about");
        setProj("/projects");
        setSoc("/socials");
      } else {
        await animateText(value, setIntro);
        await animateText(paraValue, setPara);
        await animateText("Trying to reach me: Email!", setEmail);
        if (!mobileCheck()) {
          await animateText("*psst: pause, drag mouse on screen, then play", setHint);
        }
        await animateText("/about", setAbout);
        await animateText("/projects", setProj);
        await animateText("/socials", setSoc);
      }
    }

    const updateSize = () => {
      let newWidth = window.screen.width;
      let newHeight = window.screen.height;
      
      let roundedW = round(newWidth, cellSize, true);
      let roundedH = round(newHeight, cellSize, true);
      setWidth(roundedW);
      setHeight(roundedH);

      generateStart();

      setLoaded(true);
      if (newWidth <= 375) {
        setSize(1);
      } else if (newWidth <= 650) {
        setSize(2);
      } else {
        setSize(3);
      }
    }

    updateSize();
    spell().catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if (runningRef.current || !paused || !loaded) return;
    const endMove = () => {
      window.removeEventListener("mousemove", drawToCanvas);
      window.removeEventListener("mouseup", endMove);
    }
    const downMove = () => {
      window.addEventListener('mousemove', drawToCanvas);
      window.addEventListener('mouseup', endMove);
    }

    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');

    const drawToCanvas = (e) => {
      let clampedX = round(e.clientX, cellSize, false);
      let clampedY = round(e.clientY, cellSize, false);
      const key = `${clampedX},${clampedY}`;
      if (key in previousPosition) return;
      ctx.fillStyle = "darkblue";
      ctx.fillRect(clampedX, clampedY, 10, 10);
      previousPosition[key] = [clampedX, clampedY];
    }

    window.addEventListener("mousedown", downMove);
    return () => {
      window.removeEventListener("mousedown", downMove);
    }
  }, [paused, loaded])

  return (
    <>
      {loaded ? <canvas className="fixed" style={{zIndex: "-1"}} ref={canvasRef} width={width} height={height} /> : <></>}
      <div className="fixed motion-reduce:hidden -right-0 z-50 text-emerald-400">
          <div className="text-4xl m-2">
            <button onClick={startDrawing}>{paused ? <TbPlayerPlayFilled /> : <TbPlayerPauseFilled />}</button>
          </div>
      </div>
      <div className={paused ? "select-none" : ""}>
        <div className={move ? "z-50 transition-all duration-100 fixed m-4 bottom-0 -right-0" : "transition-all duration-100 fixed bottom-0 -right-36"}>
          <ul className="list-none text-xl sm:text-lg leading-loose text-cyan-400">
            <li><button onClick={() => moveTo("#intro")} className={move == 0 ? "text-teal-800" : "hover:text-teal-400"}>/about</button></li>
            <li><button onClick={() => moveTo("#projects")} className={move == 1 ? "text-teal-800" : "hover:text-teal-400"}>/projects</button></li>
            <li><button onClick={() => moveTo("#socials")} className={move == 2 ? "text-teal-800" : "hover:text-teal-400"}>/socials</button></li>
          </ul>
        </div>
        <div id="intro" className="text-emerald-400 text-5xl my-2 ml-4 ">/about</div>
        <div className={`min-h-screen flex transition-all duration-300 delay-150 ease-in-out ${move == 0 ? "opacity-100" : "opacity-0"}`}>
          <div className="flex-1 border-none m-auto ml-5">
            <div className="text-slate-700 md:text-5xl sm:text-2xl">
            {intro.substring(0, 3)}
            </div>
            <div className="mt-2 leading-tight text-slate-700 md:text-5xl sm:text-2xl">
              {intro.substring(3, 15)}
              <span className="text-emerald-400 font-thin">{intro.substring(15, 28)}</span>
              {intro.substring(28)}
            </div>
            <div className="mt-7 leading-tight text-slate-600 md:text-3xl sm:text-xl">
              {para.substring(0, 121)}
              <span className="text-[#FF9900]">{para.substring(121, 128)}</span>
              {para.substring(128)}
            </div>
            <div className="mt-7 text-slate-500 md:text-3xl sm:text-xl">
              {email.substring(0, 20)}
              <Link className="text-emerald-400 font-bold underline underline-offset-4" href="mailto:omarabdiwali17@gmail.com">{email.substring(20)}</Link>
            </div>
            <div className="mt-7">
              <div className="text-emerald-400 font-thin lg:text-2xl text-emerald-400 md:text-xl sm:text-md">{hint}</div>
            </div>
          </div>
          <div className="center flex-1 border-none m-auto">
            <center>
              <ul className="list-none text-4xl leading-loose text-emerald-400">
                <li><button onClick={() => moveTo("#intro")} className="hover:text-teal-400">{about}</button></li>
                <li><button onClick={() => moveTo("#projects")} className="hover:text-teal-400">{proj}</button></li>
                <li><button onClick={() => moveTo("#socials")} className="hover:text-teal-400">{soc}</button></li>
              </ul>
            </center>
          </div>
        </div>
        <div id="projects" ref={projectRef}>
          <div className="text-emerald-400 text-5xl my-5 mx-4">/projects</div>
          <div className={`flex flex-col my-10 space-y-10 transition-all duration-300 delay-150 ease-in-out ${move >= 1 ? "opacity-100" : "opacity-0"}`}>
            <ProjectSec size={size} />
          </div>
        </div>
        <div id="socials" ref={socialsRef} className={`transition-all duration-300 delay-150 ease-in-out ${move == 2 ? "opacity-100" : "opacity-0"}`}>
          <div className="text-emerald-400 text-5xl mt-3 ml-4">/socials</div>
          <div className="flex flex-row my-10 justify-center space-x-5 text-5xl">
            <a rel="noopener norefferrer" target="_blank" href="https://github.com/omarabdiwali"><AiOutlineGithub className="text-emerald-400" /></a>
            <div className="text-cyan-400">•</div>
            <a rel="noopener norefferrer" target="_blank" href="https://linkedin.com/in/omar-abdiwali"><AiFillLinkedin className="text-emerald-400" /></a>
            <div className="text-cyan-400">•</div>
            <a rel="noopener norefferrer" target="_blank" href="mailto:omarabdiwali17@gmail.com"><MdEmail className="text-emerald-400" /></a>
          </div>
        </div>
      </div>
    </>
  )
}
