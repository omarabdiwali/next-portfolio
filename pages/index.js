import { useCallback, useEffect, useState } from "react"
import { projects } from "@/components/projects";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import ProjectSec from "@/components/projectsSec";

export default function Home() {
  const [intro, setIntro] = useState("");
  const [para, setPara] = useState("");
  const [email, setEmail] = useState("");

  const [about, setAbout] = useState("");
  const [proj, setProj] = useState("");
  const [soc, setSoc] = useState("");

  const [size, setSize] = useState(3);
  const [move, setMove] = useState(false);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const moveTo = (id) => {
    location.href = id;
  }

  const animateText = async (value, func) => {
    for (let i = 1; i <= value.length; i++) {
      func(value.substring(0, i));
      await sleep(50);
    }
  }

  const changeLayout = useCallback(
    e => {
      let width = window.innerWidth;
      if (width <= 375) {
        setSize(1);
      } else if (width <= 650) {
        setSize(2);
      } else {
        setSize(3);
      }
    }
  )

  const getLocation = useCallback(
    e => {
      const window = e.currentTarget;
      let projectsTop = document.getElementById("projects").offsetTop;
      let socialsTop = document.getElementById("socials").offsetTop;

      if (window.scrollY + innerHeight > socialsTop) {
        setMove(2)
      } else if (window.scrollY + innerHeight > projectsTop) {
        setMove(1);
      } else {
        setMove(0);
      }
    }
  )

  useEffect(() => {
    window.addEventListener("scroll", getLocation);
    return () => {
      window.addEventListener("scroll", getLocation);
    }
  }, [getLocation]);

  useEffect(() => {
    window.addEventListener("resize", changeLayout);
    return () => {
      window.addEventListener("resize", changeLayout);
    }
  }, [changeLayout])

  useEffect(() => {
    const spell = async () => {
      let value = "Hi, My name is Omar Abdiwali and I am a 20 year-old developer.";
      await animateText(value, setIntro);

      value = "I have used Python, C++, and Javascript with frameworks like React and Next.js to create my projects and do classwork. Currently, I am a junior in university studying Computer Science.";
      await animateText(value, setPara);

      await animateText("Trying to reach me: Email!", setEmail);
      await animateText("/about", setAbout);
      await animateText("/projects", setProj);
      await animateText("/socials", setSoc);
    }

    const updateSize = () => {
      let width = window.screen.width;
      if (width <= 375) {
        setSize(1);
      } else if (width <= 650) {
        setSize(2);
      } else {
        setSize(3);
      }
    }

    updateSize();
    spell().catch(err => console.log(err));

  }, [])

  return (
    <>
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
          <div className="mt-7 leading-tight text-slate-600 md:text-3xl sm:text-xl">{para}</div>
          <div className="mt-7 text-slate-500 md:text-3xl sm:text-xl">
            {email.substring(0, 20)}
            <Link className="text-emerald-400 font-bold underline underline-offset-4" href="mailto:omarabdiwali17@gmail.com">{email.substring(20)}</Link>
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
      <div id="projects">
        <div className="text-emerald-400 text-5xl my-5 mx-4">/projects</div>
        <div className={`flex flex-col my-10 space-y-10 transition-all duration-300 delay-150 ease-in-out ${move >= 1 ? "opacity-100" : "opacity-0"}`}>
          <ProjectSec projects={projects} size={size} />
        </div>
      </div>
      <div id="socials" className={`transition-all duration-300 delay-150 ease-in-out ${move == 2 ? "opacity-100" : "opacity-0"}`}>
        <div className="text-emerald-400 text-5xl mt-3 ml-4">/socials</div>
        <div className="flex flex-row my-10 justify-center space-x-5 text-5xl">
          <Link replace href="https://github.com/omarabdiwali"><AiOutlineGithub className="text-emerald-400" /></Link>
          <div className="text-cyan-400">•</div>
          <Link replace href="https://linkedin.com/in/omar-abdiwali"><AiFillLinkedin className="text-emerald-400" /></Link>
          <div className="text-cyan-400">•</div>
          <Link href="mailto:omarabdiwali17@gmail.com"><MdEmail className="text-emerald-400" /></Link>
        </div>
      </div>
    </>
  )
}
