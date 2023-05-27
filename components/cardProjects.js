import { MdLanguage } from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";

export default function CardProjects({ project, website=true }) {
  return (
    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 relative rounded-2xl xs:w-cardsmall sm:w-cardsmall md:w-cardfull xs:min-w-cardsmall sm:min-w-cardsmall h-quarter bg-slate-900">
      <div className="flex flex-row justify-center space-x-4 my-5 max-h-12">
        <div>{project.title[1]}</div>
        <div className="font-semibold text-2xl sm:text-lg text-emerald-200">{project.title[0]}</div>
      </div>
      <div className="mx-3 max-h-body text-blue-300 overflow-y-auto">
        {project.body[0]}
        <div className="mt-20">
        {project.body[1]}
      </div>
      </div>
      <div className="flex flex-row justify-center space-x-10">
        {website ? <Link replace href={project.footer[1]}><MdLanguage className="absolute bottom-0 left-1/4 text-emerald-400 text-4xl mb-2" /></Link> : ""}
        <Link replace href={project.footer[0]}><AiOutlineGithub className={`absolute ${website ? "bottom-0" : "bottom-0 end-2.5"} text-emerald-400 text-4xl mb-2`} /></Link>
      </div>
    </div>
  )
}