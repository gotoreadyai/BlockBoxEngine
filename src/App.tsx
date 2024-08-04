import { useEffect, useState } from "react";
import SceneMainWorkspace from "./components/SceneMainWorkspace";
import { compress, decompress } from "compress-json";
import { useThemeStore } from "./ThemeStore";

// const dataCompress = () => {
//   console.log(window.btoa(JSON.stringify(compress([]))));
// };

const dataDeCompress = (data: string) => {
  return decompress(JSON.parse(window.atob(data)));
};

async function getProject(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error(error.message);
  }
}

async function getChunk(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.text();
    return json;
  } catch (error: any) {
    console.error(error.message);
  }
}

function App() {
  const [_projectData, setProjectData] = useState(null);
  const [chunksData, setChunksData] = useState([]);
  let currentLocation = window.location;
  const url = new URL(currentLocation.href);
  const project = url.searchParams.get("project");
  useThemeStore.setState({ project: project || 'editor' })

  useEffect(() => {
    const fetchProjectData = async () => {
      if (project) {
        const data = await getProject(`/projects/${project}.json`);
        useThemeStore.setState({ scenario: data })
        setProjectData(data);

        /* prepare chunks */
        if (data && data.chunks) {
          await Promise.all(
            data.chunks.map(async (chunk: string) => {
              const chunkRaw: any = await getChunk(
                `/scenarios/${project}/chunks/${chunk}.txt`
              );
              const unpackChunk = dataDeCompress(chunkRaw);
              window.localStorage.setItem(chunk, JSON.stringify(unpackChunk));
              setChunksData(chunkRaw);
            })
          );
        }
      }
    };

    fetchProjectData();
  }, [project]);

  return project && chunksData ? (
    <SceneMainWorkspace />
  ) : (
    <>BLOCKBOX: Project is required</>
  );
}

export default App;
