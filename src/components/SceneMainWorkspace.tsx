import { useRef } from "react";
import { stateType,  useThemeStore } from "../ThemeStore";
import HotKeys from "./HotKeys";
import SceneComponent from "./SceneComponent";
import { setupMainCamera } from "./initSceneElements/camera";
import {
  setupMainLight,
  setupBackupLight,
  setupShadows,
} from "./initSceneElements/lights";
// import HavokPhysics from "@babylonjs/havok";
import {
  Camera,
  Light,
  Mesh,
  MeshBuilder,
  Scene,
  ShadowGenerator,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import InitComponent from "./LayoutComponent";

import {
  setupChunk,
  setupVoxelsObservers,
  // setupVoxelsObservers,
} from "./initSceneElements/voxels";
import {
  serupDOF,
  serupFog,
  setupSpsEnvironment,
} from "./initSceneElements/spsEnviroment";
import { setupTargeter } from "./initSceneElements/targeter";
import {
  handleAxisChange,
  runAnimation,
  setupCharacter,
} from "./initSceneElements/character";

function SceneMainWorkspace() {
  // const sceneRef = useRef<Scene | null>(null);
  let shadowGenerator: ShadowGenerator;
  let mainLight: Light;
  let camera: Camera;
  let targeter: Mesh;
  let voxels: any[] = JSON.parse(
    /*
       x, y, z, u, v, r, g, b, alphaOffset
    */
    localStorage.getItem("VOXELS") ||
      `[
      [0, 0, 0, 0, 1, 1, 1, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 0]
    ]`
  );

  let player: Mesh;
  let chunkHelper1: Mesh;
  let character: any;

  const onSceneReady = async (scene: Scene) => {
    // sceneRef.current = scene;
    camera = setupMainCamera(scene);
    mainLight = setupMainLight(scene);
    setupBackupLight(scene);
    shadowGenerator = setupShadows(mainLight);

    /* Selector */
    targeter = setupTargeter(scene);

    const { voxelMesh, chunkHelper }: { voxelMesh: Mesh; chunkHelper: Mesh } =
    setupChunk([0, 0, 0], voxels, shadowGenerator, scene);
    chunkHelper1 = chunkHelper;
    setupVoxelsObservers(scene, voxels, voxelMesh, targeter);

    // setupChunk([1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, 1], voxels, shadowGenerator, scene);

    // setupChunk([1, 0, 1], voxels, shadowGenerator, scene);
    // setupChunk([1, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 1], voxels, shadowGenerator, scene);

    // setupChunk([0, 0, -2], voxels, shadowGenerator, scene);
    // setupChunk([-2, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, 2], voxels, shadowGenerator, scene);
    // setupChunk([2, 0, 0], voxels, shadowGenerator, scene);

    // setupChunk([1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, 1], voxels, shadowGenerator, scene);

    // setupChunk([1, 0, 1], voxels, shadowGenerator, scene);
    // setupChunk([1, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 1], voxels, shadowGenerator, scene);

    // setupChunk([0, 0, -2], voxels, shadowGenerator, scene);
    // setupChunk([-2, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, 2], voxels, shadowGenerator, scene);
    // setupChunk([2, 0, 0], voxels, shadowGenerator, scene);

    // setupChunk([2, 0, 1], voxels, shadowGenerator, scene);
    // setupChunk([-2, 0, 1], voxels, shadowGenerator, scene);
    // setupChunk([-2, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([2, 0, -1], voxels, shadowGenerator, scene);

    // setupChunk([1, 0, 2], voxels, shadowGenerator, scene);
    // setupChunk([1, 0, -2], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 2], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, -2], voxels, shadowGenerator, scene);

    character = setupCharacter(scene,shadowGenerator);
    character.skeleton.bones[0].setPosition(new Vector3(0, 1, 0));
    //runAnimation(character,scene)

    /* ENVIROMENT */
    // serupDOF(scene, camera);
    setupSpsEnvironment(scene);
    // serupFog(scene);

    /* Optimaze */
    // scene.freezeActiveMeshes();
    scene.autoClearDepthAndStencil = false;
    scene.blockMaterialDirtyMechanism = true;
    scene.blockfreeActiveMeshesAndRenderingGroups = true;
  };

  const handleState = (state: stateType) => {
    if (state.type === "bones") {
      handleAxisChange(
        state.data[state.index].default,
        state.data[state.index].id,
        character
      );
    }
  };

  /* init voxels */
  localStorage.setItem("VOXELS", JSON.stringify(voxels));

  const onRender = async (scene: Scene) => {};

  return (
    <>
      <InitComponent handleReact={handleState}>
        {" "}
        <SceneComponent
          antialias
          onRender={onRender}
          onSceneReady={onSceneReady}
          engineOptions={{ preserveDrawingBuffer: true }}
          adaptToDeviceRatio
        />
      </InitComponent>
      <HotKeys handleReact={handleState} />
    </>
  );
}

export default SceneMainWorkspace;
