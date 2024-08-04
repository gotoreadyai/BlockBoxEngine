import SceneMainWorkspace from "./components/SceneMainWorkspace";

function App() {
  let currentLocation = window.location;

  const url = new URL(currentLocation.href);
  const project = url.searchParams.get("project");

  return project ? <>x</> : <>BLOCKBOX:Project is required</>;
  //return <SceneMainWorkspace />;
}

export default App;
