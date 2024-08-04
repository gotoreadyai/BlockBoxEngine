import {
  Color3,
  PBRMaterial,
  Scene,
  Texture,
  Vector4,
} from "@babylonjs/core";

export const calculateUV = (gridX: number, gridY: number, offset: number) => {
  const row = Math.floor(offset / gridX);
  const col = offset % gridX;

  const startU = col / gridX;
  const startV = (gridY - row - 1) / gridY; // Invert V axis if needed
  const endU = (col + 1) / gridX;
  const endV = (gridY - row) / gridY; // Invert V axis if needed

  return new Vector4(startU, startV, endU, endV);
};

export const setupMaterial = (scene: Scene) => {
  const material = new PBRMaterial("material", scene);
  const texture = new Texture(
    "/tiles.png",
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );
  material.forceIrradianceInFragment = true;
  material.albedoTexture = texture;

  material.ambientColor = new Color3(0, 0, 0);
  material.metallic = 0.05;
  material.roughness = 0.9;
  //material.Fragment_Custom_Diffuse('result = texture2D(test1,vec2(time*0.01,0.)+vDiffuseUV).rgb;');

  return material;
};
