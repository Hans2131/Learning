import { Project } from "./Project";

interface ProjectsListProps {
    projects: Array<Project>;
}

function ProjectsList(props: ProjectsListProps) {
    return (
        <div className="row">    
            {props.projects.map((project: Project) => (
                <div className="cols-sm">
                    <div className="card">
                        <img src={project.imageUrl} alt={project.name} />
                        <section className="section dark">
                            <h5 className="strong">
                                <strong>{project.name}</strong>
                            </h5>
                            <p>{project.description}</p>
                            <p>Budget : {project.budget.toLocaleString("nl-NL")}</p>
                        </section>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectsList;