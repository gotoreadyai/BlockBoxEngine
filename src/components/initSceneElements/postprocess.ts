import { Camera, LensRenderingPipeline, Scene } from "@babylonjs/core";

export const lensRendering = (scene: Scene, camera: Camera) => {
  new LensRenderingPipeline(
    "lens",
    {
      edge_blur: 0.5,
      chromatic_aberration: 1.0,
      distortion: 0.25, // rybieoko
      dof_focus_distance: 8,
      dof_aperture: 0.05, // main param
      grain_amount: 1.0,
      dof_pentagon: false,
      dof_gain: 1.0,
      dof_threshold: 1.0,
      dof_darken: 0.25,
    },
    scene,
    1.0,
    [camera]
  );
};
