import { MdLanguage } from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";

export default function CardProjects({ project }) {
  return (
    <div className="bg-slate-900/70 border border-emerald-500/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all group relative">
      {/* Fixed: Added pointer-events-none to make the gradient not block clicks */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all pointer-events-none"></div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-emerald-400 text-2xl mr-3">{project.title[1]}</div>
          <h3 className="text-xl font-medium text-slate-100 group-hover:text-emerald-400 transition-colors">
            {project.title[0]}
          </h3>
        </div>

        <div className="h-32 overflow-y-auto pr-2 mb-6 text-slate-300 custom-scrollbar">
          <p>{project.body[0]}</p>
          <p className="mt-2 text-slate-400 text-sm">{project.body[1]}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {project.footer[1] && (
              <Link
                href={project.footer[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center text-slate-300 hover:text-emerald-400 transition-colors group/website"
              >
                <MdLanguage className="mr-1 text-emerald-400" />
                <span>Live Demo</span>
              </Link>
            )}
            <Link
              href={project.footer[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <AiOutlineGithub className="mr-1 text-emerald-400" />
              <span>Code</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}