import { Angle, ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";

export const setupMainCamera = (scene: Scene ) => {
  const camera = new ArcRotateCamera(
    "mainArcRotateCamera",
    Math.PI / 2,
    Math.PI / 5,
    40,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

 

    camera.lowerBetaLimit = Angle.FromDegrees(
      0
    ).radians();
    camera.upperBetaLimit = Angle.FromDegrees(
      90
    ).radians();

    // /* leftright */
    // camera.lowerAlphaLimit = Angle.FromDegrees(
    //   restrictions.horizontal[0]
    // ).radians();
    // camera.upperAlphaLimit = Angle.FromDegrees(
    //   restrictions.horizontal[1]
    // ).radians();

    // camera.upperRadiusLimit = 48;
    // camera.lowerRadiusLimit = 0;
    camera.useBouncingBehavior = true;
 

  return camera;

  /* RANDOM MOVEMENT */
  // var camTarget = new TransformNode('0', scene, true);
  // camera.lockedTarget = camTarget;
  // camTarget.position = new Vector3(0, 1, 0);
  // const noiseStrength = 0.5; // Control Overall Strength of Noise
  // var coordinates = [];
  // for (var i = 0; i < 1000; i++) {
  //   coordinates.push({
  //     x: (Math.random() - 0.5) * noiseStrength ,
  //     y: 1 + (Math.random() - 0.5) * noiseStrength,
  //     z: (Math.random() - 0.5) * noiseStrength,
  //   });
  // }

  // const frameRate = 0.25;
  // const keyFrames = [];

  // const camShake = new Animation(
  //   "camShake",
  //   "position",
  //   frameRate,
  //   Animation.ANIMATIONTYPE_VECTOR3,
  //   Animation.ANIMATIONLOOPMODE_CYCLE
  // );
  // let frameNr = 0;
  // for (var i = 0; i < coordinates.length; i++) {
  //   keyFrames.push({
  //     frame: frameNr,
  //     value: new Vector3(coordinates[i].x, coordinates[i].y, coordinates[i].z),
  //   });
  //   frameNr += Math.random() + 0.1;
  // }

  // camShake.setKeys(keyFrames);
  // camTarget.animations.push(camShake);
  // const easingFunction = new ExponentialEase(0.75);
  // easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  // camShake.setEasingFunction(easingFunction);

  // scene.beginAnimation(camTarget, 1, coordinates.length - 1, true);
};
