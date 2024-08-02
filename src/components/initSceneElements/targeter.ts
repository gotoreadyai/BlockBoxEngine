import { MeshBuilder, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export const setupTargeter = (scene:Scene) => {
  const targeter = MeshBuilder.CreateBox("targeter", { size: 1.1 }, scene);
    const targeterMaterial = new StandardMaterial("material", scene);
    const targeteTexture = new Texture(
      "/selector.png",
      scene,
      true,
      false,
      Texture.NEAREST_SAMPLINGMODE
    );
    targeterMaterial.ambientTexture = targeteTexture;
    targeterMaterial.opacityTexture = targeteTexture;
    targeter.material = targeterMaterial;
    targeter.position.x = 0;
    targeter.position.y = 0;
    return targeter;
}