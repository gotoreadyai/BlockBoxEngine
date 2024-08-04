import {
  Color3,
  DefaultRenderingPipeline,

  MeshBuilder,
  SolidParticle,
  SolidParticleSystem,
  StandardMaterial,
  Texture,
  Vector3,
  Vector4,
} from "@babylonjs/core";

// import {
//   SolidParticleSystem,
//   MeshBuilder,
//   StandardMaterial,
//   Color3,
// } from "babylonjs";

interface MySolidParticle extends SolidParticle {
  originalPosition: Vector3;
  color: any;
}

export const setupSpsEnvironment = (scene: any) => {
  const sps: any = new SolidParticleSystem("sps", scene, {
    enableDepthSort: true,
  });
  const model = MeshBuilder.CreateBox("m", {}, scene);
  // const shadowTexture = new Texture(
  //   "/cloud.png", // Path to your new shadow texture
  //   scene,
  //   true,
  //   false,
  //   Texture.NEAREST_SAMPLINGMODE
  // );

  const particleNb = 500;
  const particleSize = 24.0;
  const areaSize = 200.0;
  sps.addShape(model, particleNb * 0.5);

  const mat = new StandardMaterial("m", scene);
  //mat.ambientTexture=shadowTexture
  mat.alpha = 0.25;
  mat.disableLighting = true;
  mat.emissiveColor = new Color3(1, 1, 1);
  model.dispose();
  sps.buildMesh();
  const particles = sps.mesh;
  particles.material = mat;

  const speed = 0.1;
  

  sps.updateParticle = (particle: MySolidParticle) => {
    if (!particle.originalPosition) {
      particle.position.x = areaSize * (Math.random() - 0.5);
      particle.position.y = areaSize - 176;
      particle.position.z = areaSize * (Math.random() - 0.5);

      particle.scaling.x = particleSize * Math.random() ;
      particle.scaling.y = 1;
      particle.scaling.z = particleSize * Math.random() ;

      particle.color.r = 1;
      particle.color.g = 1;
      particle.color.b = 1;

      particle.originalPosition = particle.position.clone();
    }

    const deltaTime = scene.getEngine().getDeltaTime();
    particle.position.x += (speed * deltaTime) / 1000;

    return particle;
  };

  sps.setParticles();
  sps.depthSortParticles = false;

  scene.registerBeforeRender(() => {
    sps.setParticles();
  });
};

export const serupDOF = (scene: any, camera: any) => {
  var pipeline = new DefaultRenderingPipeline("default", true, scene, [camera]);
  pipeline.depthOfFieldBlurLevel = 1;
  pipeline.depthOfFieldEnabled = true;
  pipeline.depthOfField.focalLength = 30 * 5;
  pipeline.depthOfField.fStop = 2.5;
  pipeline.depthOfField.focusDistance = 2250 * 3;
};

export const serupFog = (scene: any) => {
  // smart fog, without fog effect:
  // https://playground.babylonjs.com/#AM5JBF#2

  //scene.fogMode = Scene.FOGMODE_EXP2;
  // scene.fogDensity = 0.011;
  //scene.fogColor = new Color3(0.45, 0.5, 0.55);
  scene.emissiveColor = new Color3(0.25, 0.5, 0.55);

  var skybox = MeshBuilder.CreateCylinder(
    "skyBox",
    {
      diameterBottom: 0,
      diameterTop: 440,
      height: 100,
      tessellation: 48,
      faceUV: [new Vector4(0, 0, 0, 0),new Vector4(4, 4, 0, 0)],
    },
    scene
  );
  skybox.position.y = 16;

  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.alpha = 1
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.emissiveColor = new Color3(0.2, 0.4, 0.5);
  skyboxMaterial.twoSidedLighting = true;
  skyboxMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
  skyboxMaterial.specularColor = new Color3(0.5, 0.5, 0.5);

  const texture = new Texture(
    //material.ambientTexture = new Texture(
    "/landscape.png",
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );
  skyboxMaterial.ambientTexture = texture;

  /* turnon horizontal lumination */
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;


 
};
