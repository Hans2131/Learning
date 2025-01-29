import { MOCK_PROJECTS } from "./MockProjects"
import ProjectsList from "./ProjectList"

function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <ProjectsList projects={MOCK_PROJECTS} />
    </>
  )
}

export default ProjectsPage