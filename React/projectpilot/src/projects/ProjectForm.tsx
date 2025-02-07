import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}

function ProjectForm({ project: initialProject, onCancel, onSave }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [hasChanged, setHasChanged] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: '',
    });

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        if (!isValid(errors)) {
            return;
        }

        onSave(project);
    }

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === 'checkbox' ? checked : value

        if (type === 'number') {
            updatedValue = Number(value);
        }

        const changed = (new Project({ ...project, ...{ [name]: updatedValue } }));

        setErrors(validate(changed));
        setProject(changed);
        setHasChanged(true);
    }

    function validate(projectToCheck: Project) {
        const newErrors: any = {};
        if (!projectToCheck.name) {
            newErrors.name = 'Name is required';
        }

        if (projectToCheck.name?.length < 3) {
            newErrors.name = 'Name should be at least 3 characters long';
        }

        if (!projectToCheck.description) {
            newErrors.description = 'Description is required';
        }

        if (projectToCheck.budget <= 0) {
            newErrors.budget = 'Budget should be greater than 0';
        }

        return newErrors;
    }

    function isValid(errors: any) {
        return Object.keys(errors).length === 0;
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
            {errors.name && <div className="card error">
                <p>{errors.name}</p>
            </div>}
            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
            {errors.description && <div className="card error">
                <p>{errors.description}</p>
            </div>}
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.budget && <div className="card error">
                <p>{errors.budget}</p>
            </div>}
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
            <div className="input-group">
                <button className="primary bordered medium" disabled={!hasChanged}>Save</button>
                <span />
                <button onClick={onCancel} type="button" className="bordered medium">Cancel</button>
            </div>



        </form>

    )
}

export default ProjectForm