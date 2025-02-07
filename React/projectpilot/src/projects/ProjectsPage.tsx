import { useEffect, useState } from "react";
import { Project } from "./Project"
import ProjectsList from "./ProjectList"
import { projectAPI } from "./projectAPI";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then(() => {
        setProjects(projects.map(p => p.id === project.id ? project : p));
      }).catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  }

  const handleMoreClick = () => {
    setCurrentPage((currentValue) => currentValue + 1);
  }

  useEffect(() => {
    setLoading(true);
    projectAPI
      .get(currentPage, 5)
      .then((data) => {
        setError(null);
        setLoading(false);
        setProjects(() => [...projects, ...data]);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  }, [currentPage]);

  return (
    <>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse " />
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectsList projects={projects} onSave={saveProject} />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button onClick={handleMoreClick} className="button default">
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary" />
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

export default ProjectsPage