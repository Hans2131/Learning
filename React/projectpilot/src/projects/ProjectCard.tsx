import { Link } from 'react-router';
import { Project } from './Project'

function formatDescription(description: string): string {
    return description.substring(0, 60) + '...';
}

interface ProjectProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function ProjectCard({ project, onEdit }: ProjectProps) {
    function handleClick(project: Project) {
        onEdit(project);
    }

    return (
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={`/projects/${project.id}`}>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget : {project.budget.toLocaleString("nl-NL")}</p>
                </Link>
                <button onClick={() => handleClick(project)} className="bordered">
                    <span className="icon-edit " />
                    Edit
                </button>
            </section>
        </div>
    )
}

export default ProjectCard