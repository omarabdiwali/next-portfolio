import CardProjects from "./cardProjects"
import { projects } from "./projects"

export default function ProjectSec() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {projects.slice(0, 6).map((project, index) => (
        <div key={index} className="transform transition-all hover:scale-[1.02]">
          <CardProjects project={project} />
        </div>
      ))}
    </div>
  )
}