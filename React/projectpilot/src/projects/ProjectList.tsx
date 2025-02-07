import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectsListProps {
    projects: Array<Project>;
    onSave: (project: Project) => void;
}

function ProjectsList({ projects, onSave }: ProjectsListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEdit = (project: Project) => {
        setProjectBeingEdited(project);
    }

    const handleCancel = () => {
        setProjectBeingEdited({});
    }

    return (
        <div className="row">
            {projects.map((project: Project) => (
                <div key={project.id} className="cols-sm">
                    {projectBeingEdited === project ?
                        <ProjectForm project={project} onCancel={handleCancel} onSave={onSave} /> :
                        <ProjectCard project={project} onEdit={handleEdit}></ProjectCard>
                    }
                </div>
            ))}
        </div>
    )
}

export default ProjectsList;