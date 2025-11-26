import { useCallback, useEffect, useRef, useState } from "react"
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { MdEmail, MdKeyboardArrowDown } from "react-icons/md";
import ProjectSec from "@/components/projectsSec";
import { mobileCheck } from "@/components/mobileCheck";
import Link from "next/link";
import ExperienceCard from "@/components/ExperienceCard";

const experienceData = {
  title: ["Software Development Engineer Intern", "Amazon"],
  location: "Toronto, ON",
  duration: "06/2024 - 08/2024",
  logo: "/images/amzn.png",
  points: [
    "Created an internal service that helps developers verify that their changes exist before using it in runtime, with a React frontend and a Lambda Java backend",
    "Added necessary guardrails to an existing and integral Alexa service that handles millions of requests, limiting the causes of errors available",
    "Solely designed, developed, and documented both projects from beginning to end, using various AWS components such as AppConfig, Lambda, and IAM Roles"
  ]
};
const cellSize = 10;
let previousPosition = {};

export default function Home() {
  const movement = [[0, cellSize], [cellSize, 0], [0, -cellSize], [-cellSize, 0], [cellSize, cellSize],
  [cellSize, -cellSize], [-cellSize, cellSize], [-cellSize, -cellSize]];

  const [intro, setIntro] = useState("");
  const [para, setPara] = useState("");
  const [hint, setHint] = useState("");
  const [width, setWidth] = useState(1400);
  const [height, setHeight] = useState(800);

  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const runningRef = useRef(false);
  const projectRef = useRef(null);
  const experienceRef = useRef(null);
  const socialsRef = useRef(null);
  const canvasRef = useRef(null);
  const headerRef = useRef(null);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const scrollToSection = (sectionIndex, smooth = true) => {
    const sections = [headerRef.current, experienceRef.current, projectRef.current, socialsRef.current];
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({
        behavior: smooth ? 'smooth' : 'instant',
        block: 'start'
      });
      setCurrentSection(sectionIndex);
    }
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

  const animateText = async (value, func, speed = 30) => {
    for (let i = 1; i <= value.length; i++) {
      func(value.substring(0, i));
      await sleep(speed);
    }
  }

  const generateStart = () => {
    const density = 0.005;
    const numCells = Math.floor((width * height) / (cellSize * cellSize) * density);

    const getFilledNeighbours = (x, y) => {
      let filled = [];
      for (let i = 0; i < movement.length; i++) {
        const [movX, movY] = movement[i];
        let nextX = mod(movX + x, width), nextY = mod(movY + y, height);
        if (Math.random() < 0.65) continue;
        filled.push([nextX, nextY]);
      }

      return filled;
    }

    for (let i = 0; i < numCells; i++) {
      let x = getRandom(width), y = getRandom(height);
      const key = `${x},${y}`;
      if (key in previousPosition) {
        i--;
        continue;
      }

      let filled = getFilledNeighbours(x, y);

      for (let j = 0; j < filled.length; j++) {
        let [nx, ny] = filled[j];
        let nKey = `${nx},${ny}`;
        if (nKey in previousPosition) continue;
        previousPosition[nKey] = [nx, ny];
      }

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
      runningRef.current = false;
      setPaused(true);
    } else {
      runningRef.current = true;
      setPaused(false);
      gameOfLife();
    }
  }

  const changeLayout = useCallback(() => {
    let newWidth = window.screen.width;
    let newHeight = window.screen.height;

    let roundedW = round(newWidth, cellSize, true);
    let roundedH = round(newHeight, cellSize, true);
    setWidth(roundedW);
    setHeight(roundedH);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    const sections = [
      headerRef.current?.offsetTop || 0,
      experienceRef.current?.offsetTop || 0,
      projectRef.current?.offsetTop || 0,
      socialsRef.current?.offsetTop || 0
    ];

    const sectionThresholds = sections.map((pos, i) =>
      pos - windowHeight * 0.3
    );

    let current = 0;
    for (let i = sectionThresholds.length - 1; i >= 0; i--) {
      if (scrollPosition >= sectionThresholds[i]) {
        current = i;
        break;
      }
    }

    setCurrentSection(current);
  }, []);

  const gameOfLife = useCallback(() => {
    if (!runningRef.current || reduced) return;

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
      ctx.fillStyle = `#1A1D23`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }

    previousPosition = newPosition;
    setTimeout(gameOfLife, 100);
  }, [reduced]);

  useEffect(() => {
    const value = mobileCheck();
    setIsMobile(value);
  }, [])

  useEffect(() => {
    if (!loaded) return;
    runningRef.current = true;
    gameOfLife();
  }, [loaded])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener("resize", changeLayout);
    return () => window.removeEventListener("resize", changeLayout);
  }, [changeLayout])

  useEffect(() => {
    const spell = async () => {
      const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
      let value = `Hello, I'm Omar!`;
      let paraValue = "I design and build applications where technology meets creativity. With experience from Amazon and my passion for elegant solutions, I craft digital experiences that matter.";
      setReduced(!!isReduced);

      if (!!isReduced) {
        setIntro(value);
        setPara(paraValue);
      } else {
        await animateText(value, setIntro, 40);
        await sleep(300);
        await animateText(paraValue, setPara, 25);
        if (!mobileCheck()) {
          await sleep(200);
          await animateText("*psst: pause, drag mouse on screen, then play", setHint)
        }
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
    }

    updateSize();
    setTimeout(() => {
      spell().catch(console.error);
    }, 100);
  }, [])

  useEffect(() => {
    if (runningRef.current || !paused || !loaded || isMobile) return;
    const endMove = () => {
      window.removeEventListener("mousemove", drawToCanvas);
      window.removeEventListener("mouseup", endMove);
    }
    const downMove = (e) => {
      e.preventDefault();
      window.addEventListener('mousemove', drawToCanvas);
      window.addEventListener('mouseup', endMove);
    }

    const drawToCanvas = (e) => {
      e.preventDefault();
      let clampedX = round(e.clientX, cellSize, false);
      let clampedY = round(e.clientY, cellSize, false);
      const key = `${clampedX},${clampedY}`;
      if (key in previousPosition) return;

      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = `#1A1D23`;
      ctx.fillRect(clampedX, clampedY, cellSize, cellSize);
      previousPosition[key] = [clampedX, clampedY];
    }

    window.addEventListener("mousedown", downMove);
    return () => {
      window.removeEventListener("mousedown", downMove);
      window.removeEventListener("mouseup", endMove);
      window.removeEventListener("mousemove", drawToCanvas);
    };
  }, [paused, loaded, isMobile])

  const scrollToProjects = (e) => {
    e.preventDefault();
    scrollToSection(1);
  }

  const renderScrollIndicator = () => {
    return (
      <div className="scroll-indicator" onClick={scrollToProjects}>
        <MdKeyboardArrowDown className="text-emerald-400 animate-bounce text-4xl" />
      </div>
    );
  }

  return (
    <>
      {loaded ? <canvas className="fixed" style={{ zIndex: "-1" }} ref={canvasRef} width={width} height={height} /> : <></>}

      {!reduced && <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={startDrawing}
          className="p-3 backdrop-blur-sm text-emerald-400 hover:text-emerald-600 transition-all"
          aria-label={paused ? "Resume animation" : "Pause animation"}
        >
          {paused ? <TbPlayerPlayFilled size={24} /> : <TbPlayerPauseFilled size={24} />}
        </button>
      </div>}

      <header ref={headerRef} className="min-h-screen flex flex-col justify-between">
        <nav className="p-6 flex justify-between items-center relative z-10">
          <div className="text-3xl font-mono text-emerald-400">/omar</div>
          <div className="hidden md:flex space-x-10">
            <button
              onClick={() => scrollToSection(0)}
              className={`text-lg transition-colors ${currentSection === 0 ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection(1)}
              className={`text-lg transition-colors ${currentSection === 2 ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection(2)}
              className={`text-lg transition-colors ${currentSection === 1 ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(3)}
              className={`text-lg transition-colors ${currentSection === 2 ? 'text-emerald-400' : 'text-slate-400 hover:text-emerald-300'}`}
            >
              Contact
            </button>
          </div>
        </nav>

        <main className="container mx-auto px-6 flex-1 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light text-slate-100 mb-6">
              {intro && <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{intro}</span>}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl">
              {para}
            </p>
            {hint && <div className="text-emerald-400 font-thin lg:text-lg text-emerald-400 md:text-md">{hint}</div>}
          </div>
        </main>

        {renderScrollIndicator()}
      </header>

      <section ref={experienceRef} className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-emerald-400 text-4xl mb-16 font-light">Experience</div>
          <ExperienceCard experience={experienceData} />
        </div>
      </section>

      <section ref={projectRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-emerald-400 text-4xl mb-16 font-light">Featured Projects</div>
          <ProjectSec />
        </div>
      </section>

      <section ref={socialsRef} className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-emerald-400 text-4xl mb-12">Contact</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-900/50 p-8 rounded-xl border border-emerald-500/10 backdrop-blur-sm max-w-2xl">
              <h2 className="text-2xl text-slate-100 mb-6">Let&#39;s build something together</h2>
              <p className="text-slate-300 mb-8 max-w-xl">
                I&#39;m actively pursuing full-time opportunities where I can make a meaningful impact.
                If you have a role that aligns with my skills or want to explore potential collaborations, feel free to reach out.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <MdEmail className="text-emerald-400 text-2xl mr-4" />
                  <div>
                    <p className="text-slate-400">Email</p>
                    <Link
                      href="mailto:omarabdiwali17@gmail.com"
                      className="text-lg text-slate-100 hover:text-emerald-400 transition-colors"
                    >
                      omarabdiwali17@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-xl text-slate-100">Other Links</div>
              <div className="grid grid-cols-2 gap-6 max-w-md">
                <Link
                  href="https://github.com/omarabdiwali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 rounded-xl bg-slate-900/50 border border-emerald-500/10 backdrop-blur-sm hover:border-emerald-500/30 transition-all"
                >
                  <AiOutlineGithub className="text-4xl text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-200 group-hover:text-emerald-400 transition-colors">GitHub</span>
                </Link>

                <Link
                  href="https://linkedin.com/in/omar-abdiwali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 rounded-xl bg-slate-900/50 border border-emerald-500/10 backdrop-blur-sm hover:border-emerald-500/30 transition-all"
                >
                  <AiFillLinkedin className="text-4xl text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-200 group-hover:text-emerald-400 transition-colors">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}