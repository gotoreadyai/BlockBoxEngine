  import React, { useEffect, useRef } from "react";
  import { Engine, Scene, EngineOptions, SceneOptions } from "@babylonjs/core";
import { useThemeStore } from "../ThemeStore";

  interface BabylonSceneProps {
    antialias?: boolean;
    engineOptions?: EngineOptions;
    adaptToDeviceRatio?: boolean;
    sceneOptions?: SceneOptions;
    onRender?: (scene: Scene) => void;
    onSceneReady: (scene: Scene) => void;
    [key: string]: any;
  }

  const BabylonScene: React.FC<BabylonSceneProps> = ({
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  }) => {
    const reactCanvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const { current: canvas } = reactCanvas;

      if (!canvas) return;

      try {
        const engine = new Engine(
          canvas,
          (antialias = true),
          engineOptions,
          (adaptToDeviceRatio = true)
        );

        const scene = new Scene(engine, sceneOptions);

        engine.onContextLostObservable;
        scene.blockMaterialDirtyMechanism = true;
        scene.blockfreeActiveMeshesAndRenderingGroups = true;
        scene.getAnimationRatio();

        if (scene.isReady()) {
          onSceneReady(scene);
        } else {
          scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
          if (typeof onRender === "function") onRender(scene);
         

          useThemeStore.setState(() => ({
            fps:engine.getFps().toFixed() + " fps"
          }));


          scene.render();
        });

        const resize = () => {
          scene.getEngine().resize();
        };

        window.addEventListener("resize", resize);

        return () => {
          scene.getEngine().dispose();
          window.removeEventListener("resize", resize);
        };
      } catch (error) {
        console.error("Error initializing Babylon.js scene:", error);
      }
    }, [
      antialias,
      engineOptions,
      adaptToDeviceRatio,
      sceneOptions,
      onRender,
      onSceneReady,
    ]);

    return (
      <canvas className="block w-full h-full outline-none" ref={reactCanvas} {...rest} />
    );
  };

  export default BabylonScene;
