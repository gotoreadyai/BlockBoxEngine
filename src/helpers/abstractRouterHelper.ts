import { MeshBuilder, StandardMaterial } from "@babylonjs/core";

export const abstractRouter = (router:any,sceneRef:any) => {
    if (router === "voxel-editor") {
        // const cunkHelper = MeshBuilder.CreateBox(
        //   "cunkHelper",
        //   { size: 16 },
        //   sceneRef.current
        // );
        // cunkHelper.material = new StandardMaterial("material");
        // cunkHelper.material.alpha = 0;
        // cunkHelper.showBoundingBox = true;
      } else {
        // const rest:any = sceneRef.current?.meshes.find(
        //   (param) => param.name === "cunkHelper"
        // );
        // rest=[];
        //console.log("aa");
        //sceneRef.current?.meshes.splice(0, sceneRef.current?.meshes.length);
      }

      if (router === "voxel-preview") {
      }
}