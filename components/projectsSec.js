import CardProjects from "./cardProjects"
import { projects } from "./projects"

export default function ProjectSec({ size }) {
  return (
    <>
      {size == 3 ? (
        <>
          <div className="justify-center flex flex-row space-x-5">
          <CardProjects project={projects[0]} />
          <CardProjects project={projects[1]} />
          <CardProjects project={projects[2]} />
        </div>
        <div className="justify-center flex flex-row space-x-5">
          <CardProjects project={projects[3]} />
          <CardProjects project={projects[4]} />
          <CardProjects project={projects[5]} />
        </div>
        <div className="justify-center flex flex-row space-x-5">
          <CardProjects project={projects[6]} website={false} />
          <CardProjects project={projects[7]} website={false} />
          <CardProjects project={projects[8]} website={false} />
        </div>
        </>
      ) : size == 2 ? (
          <>
            <div className="justify-center flex flex-row space-x-5">
              <CardProjects project={projects[0]} />
              <CardProjects project={projects[1]} />
            </div>
            <div className="justify-center flex flex-row space-x-5">
              <CardProjects project={projects[2]} />
              <CardProjects project={projects[3]} />
            </div>
            <div className="justify-center flex flex-row space-x-5">
              <CardProjects project={projects[4]} />
              <CardProjects project={projects[5]} />
            </div>
          </>
        ) : (
            <>
              <div className="justify-center flex flex-row space-x-5">
                <CardProjects project={projects[0]} />
              </div>
              <div className="justify-center flex flex-row space-x-5">
                <CardProjects project={projects[1]} />
              </div>
              <div className="justify-center flex flex-row space-x-5">
                <CardProjects project={projects[3]} />
              </div>
            </>
      )}
    </>
  )
}