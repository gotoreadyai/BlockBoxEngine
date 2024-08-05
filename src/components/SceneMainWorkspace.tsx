
import { stateType} from "../ThemeStore";
import HotKeys from "./HotKeys";
import SceneComponent from "./SceneComponent";
import { setupMainCamera } from "./initSceneElements/camera";
import {
  setupMainLight,
  setupBackupLight,
  setupShadows,
} from "./initSceneElements/lights";
// import HavokPhysics from "@babylonjs/havok";
import { ArcRotateCamera,Light, Mesh, Scene, ShadowGenerator } from "@babylonjs/core";
import InitComponent from "./LayoutComponent";

import {
  setupChunk,
  setupVoxelsObservers,
  // setupVoxelsObservers,
} from "./initSceneElements/voxels";
import {

  setupSpsEnvironment,
} from "./initSceneElements/spsEnviroment";
import { setupTargeter } from "./initSceneElements/targeter";
import {
  handleAxisChange,

} from "./initSceneElements/character";



function SceneMainWorkspace() {


  // const sceneRef = useRef<Scene | null>(null);
  let shadowGenerator: ShadowGenerator;
  let mainLight: Light;
  let camera: ArcRotateCamera;
  let targeter: Mesh;
  let voxels: any[] = JSON.parse(
    /*
       x, y, z, u, v, r, g, b, alphaOffset
    */
    localStorage.getItem("0_chunk_0_0_0") ||
      `[
      [0, 0, 0, 0, 1, 1, 1, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 0]
    ]`
  );

  // let player: Mesh;
  let chunkHelper1: Mesh;
  let character: any;

  const onSceneReady = async (scene: Scene) => {
    // sceneRef.current = scene;
    camera = setupMainCamera(scene);
    console.log(camera);
    
    mainLight = setupMainLight(scene);
    setupBackupLight(scene);
    shadowGenerator = setupShadows(mainLight);

    /* Selector */
    targeter = setupTargeter(scene);

    const { voxelMesh, chunkHelper }: { voxelMesh: Mesh; chunkHelper: Mesh } =
      setupChunk([0, 0, 0], voxels, shadowGenerator, scene);
    chunkHelper1 = chunkHelper;
    console.log(chunkHelper1);
    
    setupVoxelsObservers(scene, voxels, voxelMesh, targeter);

    // setupChunk([1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([-1, 0, 0], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, -1], voxels, shadowGenerator, scene);
    // setupChunk([0, 0, 1], voxels, shadowGenerator, scene);

    // character = setupCharacter(scene, shadowGenerator);
    // character.skeleton.bones[0].setPosition(new Vector3(0, 1, 0));
    // runAnimation(character, scene);

    /* ENVIROMENT */
    // serupDOF(scene, camera);
    setupSpsEnvironment(scene);
    // serupFog(scene);

    // Add the highlight layer.
    // var hl1 = new HighlightLayer("hl1", scene);
    // hl1.addMesh(voxelMesh, Color3.Red());
    // hl1.blurHorizontalSize=.2;
    // hl1.blurVerticalSize=.2;

    // const glow = new GlowLayer("glow", scene, {
    //   blurKernelSize: 8,
    // });
    // glow.intensity = 1.4;
    // glow.referenceMeshToUseItsOwnMaterial(voxelMesh);
    // glow.disableBoundingBoxesFromEffectLayer = false;
    // glow.renderingGroupId = 'chunkHelper'

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


  // const onRender = async (scene: Scene) => {
  //   // character.meshes.mouth.material.albedoTexture.uOffset = 0.1;
  //   console.log(scene);
    
  // };

  return (
    <>
      <InitComponent handleReact={handleState}>
        {" "}
        <SceneComponent
          antialias
          //onRender={onRender}
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
