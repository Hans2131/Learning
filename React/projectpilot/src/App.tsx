import Greeter from './greeter/Greeter';
import ProjectsPage from './projects/ProjectsPage';

function App() {
  return (
    <div className='container'>
      <ProjectsPage />
      <Greeter first="Hans" last="van Dijk"/>
    </div>
  );
}

export default App;