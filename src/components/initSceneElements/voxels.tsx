import {
  AbstractMesh,
  Matrix,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Scene,
  StandardMaterial,
  Texture,
  Vector4,
} from "@babylonjs/core";

import { useThemeStore } from "../../ThemeStore";
import { setupMaterial } from "./shaderMaterial";

export const VOXEL_SIZE = 1;
export const GRID_W = 6;
export const GRID_H = 7;


  // Funkcja do mapowania UV dla przedniej ściany sześcianu
  export const mapUVWfront = (x: number, y: number) =>
    new Vector4(x / GRID_W, y / GRID_H, (x + 1) / GRID_W, (y + 1) / GRID_H);

  // Funkcja do mapowania UV dla tylnej ściany sześcianu
  export const mapUVWback = (x: number, y: number) =>
    new Vector4((x + 1) / GRID_W, (y + 1) / GRID_H, x / GRID_W, y / GRID_H);

export const setupChunk = (
  position: number[],
  voxels: number[][],
  shadowGenerator: any,
  scene: any
) => {
  const chunkHelper = MeshBuilder.CreateBox("chunkHelper", { size: 15 }, scene);
  chunkHelper.material = new StandardMaterial("material");
  chunkHelper.material.alpha = 0;
  chunkHelper.showBoundingBox = true;
  chunkHelper.receiveShadows = false;
  chunkHelper.isPickable = false;
  chunkHelper.position.x = position[0] * 15;
  chunkHelper.position.y = position[1] * 15;
  chunkHelper.position.z = position[2] * 15;


      /* BB */
      const plane = MeshBuilder.CreatePlane("plane", { size: 1 }, scene);
      plane.position.y = 1;
      plane.billboardMode = 2;
  
      const material = new StandardMaterial("material", scene);
      const texture = new Texture(
        "/bilboard.png",
        scene,
        true,
        false,
        Texture.NEAREST_SAMPLINGMODE
      );
      material.ambientTexture = texture;
      material.opacityTexture = texture;
      texture.hasAlpha = true;
      plane.material = material;


  // Tworzenie sześcianu z mapowaniem UV
  const voxelMesh = MeshBuilder.CreateBox(
    `mesh`,
    {
      size: VOXEL_SIZE,
      faceUV: [
        mapUVWback(0, 0), // front
        mapUVWback(1, 0), // back
        mapUVWback(2, 0), // left
        mapUVWback(3, 0), // right
        mapUVWfront(4, 0), // top
        mapUVWfront(5, 0), // bottom
      ],
      wrap: true,
    },
    scene
  );

  /* 
    MATERIAL 
  */
  voxelMesh.previousWorldMatrixInstancedBuffer;
  voxelMesh.material = setupMaterial(scene);

  voxelMesh.receiveShadows = true;
  voxelMesh.thinInstanceEnablePicking = true;
  voxelMesh.parent = chunkHelper;



  setThinInstanceVortexBuffer(voxels, voxelMesh);
  shadowGenerator.addShadowCaster(voxelMesh);

  /* Optimaze */
  // voxelMesh.freezeWorldMatrix();
  // voxelMesh.doNotSyncBoundingInfo = true;

  return { voxelMesh, chunkHelper };
};

export const setThinInstanceVortexBuffer = (
  voxels: number[][],
  voxelMesh: Mesh
): Mesh => {
  const bufferMatrices = new Float32Array(16 * voxels.length);
  const bufferUVs = new Float32Array(2 * voxels.length);
  const bufferColors = new Float32Array(4 * voxels.length);

  voxels.forEach((voxelData, index) => {
    const matrix = Matrix.Translation(
      voxelData[0] * VOXEL_SIZE,
      voxelData[1] * VOXEL_SIZE,
      voxelData[2] * VOXEL_SIZE
    );
    matrix.copyToArray(bufferMatrices, index * 16);
    bufferUVs.set([0, voxelData[3] / GRID_H], index * 2);
    bufferColors.set([voxelData[4], voxelData[5], voxelData[6], 1], index * 4);
  });
  voxelMesh.thinInstanceSetBuffer("matrix", bufferMatrices);
  voxelMesh.thinInstanceSetBuffer("uv2", bufferUVs, 2);
  voxelMesh.thinInstanceSetBuffer("color2", bufferColors, 4);

  return voxelMesh;
};

export const createVoxel = (
  position: number[],
  uv: number,
  color: number[],
  voxels: any,
  voxelMesh: Mesh
) => {
  voxels.push([...position, uv, ...color]);
  setThinInstanceVortexBuffer(voxels, voxelMesh);
  localStorage.setItem("VOXELS", JSON.stringify(voxels));
};

export const removeVoxel = (index: number, voxels: any, voxelMesh: Mesh) => {
  voxels.splice(index, 1);
  setThinInstanceVortexBuffer(voxels, voxelMesh);
  localStorage.setItem("VOXELS", JSON.stringify(voxels));
};

export const setupVoxelsObservers = (
  scene: Scene,
  voxels: [number, number, number, number][],
  voxelMesh: any,
  targeter:Mesh
): void => {
  const MIN_BOUND = -7;
  const MAX_BOUND = 7;

  const isWithinBounds = (position: [number, number, number]): boolean => {
    return (
      position[0] >= MIN_BOUND &&
      position[0] <= MAX_BOUND &&
      position[1] >= MIN_BOUND &&
      position[1] <= MAX_BOUND &&
      position[2] >= MIN_BOUND &&
      position[2] <= MAX_BOUND
    );
  };

  const logAdjacentVoxels = (position: [number, number, number]) => {
    const directions = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ];

    const adjacentPositions = directions.map(([dx, dy, dz]) => [
      position[0] + dx,
      position[1] + dy,
      position[2] + dz,
    ]);

    console.log("Adjacent voxel positions:", adjacentPositions);
  };

  scene.onPointerObservable.add((eventData) => {
    if (eventData.type === PointerEventTypes.POINTERDOWN) {
      var pickResult = scene.pick(
        scene.pointerX,
        scene.pointerY,
        (mesh: AbstractMesh) => mesh === voxelMesh
      );
      if (pickResult?.hit && pickResult.thinInstanceIndex !== undefined) {
        const instanceIndex = pickResult.thinInstanceIndex;
        const clickedPosition: [number, number, number] = [
          voxels[instanceIndex][0],
          voxels[instanceIndex][1],
          voxels[instanceIndex][2],
        ];
        const normal = pickResult.getNormal(true);

        /* VOXEL EDITOR */
        if (normal && useThemeStore.getState().route === "voxel-editor") {
          const blocks = useThemeStore.getState().blocks;
          const selectedBlock = useThemeStore.getState().selectedBlock;


          if (eventData.event.button === 0) {
            const newPosition = [
              clickedPosition[0] + Math.round(normal.x),
              clickedPosition[1] + Math.round(normal.y),
              clickedPosition[2] + Math.round(normal.z),
            ] as [number, number, number];

            if (isWithinBounds(newPosition)) {
              const uv = selectedBlock;
              let alphaOffset = 1;

              createVoxel(
                newPosition,
                uv,
                [...blocks[selectedBlock], alphaOffset],
                voxels,
                voxelMesh
              );

              /* wyloguj pozycje voxli sąsiadujących ze scianami utworzonego voxla */
              logAdjacentVoxels(newPosition);
            }
          } else if (eventData.event.button === 2) {
            if (isWithinBounds(clickedPosition)) {
              removeVoxel(instanceIndex, voxels, voxelMesh);
            }
          }
        }
        /* !VOXEL EDITOR */
        if (normal && useThemeStore.getState().route === "voxel-preview") {
          targeter.position.x = clickedPosition[0];
          targeter.position.y = clickedPosition[1];
          targeter.position.z = clickedPosition[2];
        }
        
      }
    }
  });
};
