import {
  Color3,
  DirectionalLight,
  HemisphericLight,
  LightGizmo,
  Scene,
  ShadowGenerator,
  Vector3,
} from "@babylonjs/core";

export const setupMainLight = (scene: Scene) => {
  const light = new DirectionalLight(
    "mainLight",
    new Vector3(-1, -2, -1),
    scene
  );
  // light.falloffType = 1;
  light.position = new Vector3(0, 7, 7);
  light.intensity = 7;

  light.diffuse = new Color3(1, 1, 1);
	light.specular = new Color3(0.4, 0.2, 0.5);


  const lightGizmo: LightGizmo = new LightGizmo();
  lightGizmo.scaleRatio = 1;
  lightGizmo.light = light;

  return light;
};
export const setupBackupLight = (scene: Scene) => {
  const light1 = new DirectionalLight(
    "hemiBackupLight",
    new Vector3(1, 0, 0),
    scene
  );
  light1.intensity = 0.75;
  light1.position = new Vector3(-7, 0, 0);

  const light2 = new DirectionalLight(
    "hemiBackupLight",
    new Vector3(-1, 0, 0),
    scene
  );
  light2.intensity = 0.75;
  light2.position = new Vector3(7, 0, 0);


  const light3 = new DirectionalLight(
    "hemiBackupLight",
    new Vector3(1, 0, 2),
    scene
  );
  light3.intensity = 0.25;
  light3.position = new Vector3(0, 0, -7);
  
  // const lightGizmo1: LightGizmo = new LightGizmo();
  // lightGizmo1.scaleRatio = 1;
  // lightGizmo1.light = light1;

  // const lightGizmo2: LightGizmo = new LightGizmo();
  // lightGizmo2.scaleRatio = 1;
  // lightGizmo2.light = light2;

  // const lightGizmo3: LightGizmo = new LightGizmo();
  // lightGizmo3.scaleRatio = 1;
  // lightGizmo3.light = light3;

  return light1;
};
export const setupShadows = (mainLight: any) => {
  const shadowGenerator = new ShadowGenerator(256, mainLight);
  mainLight.shadowMaxZ = 128;
  mainLight.shadowMinZ = 0;
  shadowGenerator.normalBias = 0.65;
  shadowGenerator.setDarkness(0.05);
  shadowGenerator.bias = 0.005;
  shadowGenerator.useContactHardeningShadow = true;
  shadowGenerator.filteringQuality = ShadowGenerator.QUALITY_LOW;

  /* optionaly blur */
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurScale = 1;
  shadowGenerator.blurBoxOffset = 2;

  return shadowGenerator;
};
