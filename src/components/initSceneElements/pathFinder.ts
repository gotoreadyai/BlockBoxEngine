import { Vector3 } from "@babylonjs/core";

// Funkcja do znajdowania sąsiadów dla danego voxela
const getNeighbors = (voxel: number[], voxels: any[]): number[][] => {
  const neighbors = [];
  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  for (const dir of directions) {
    const neighbor = [voxel[0] + dir[0], voxel[1] + dir[1], voxel[2] + dir[2]];
    if (voxels.some(v => v.position[0] === neighbor[0] && v.position[1] === neighbor[1] && v.position[2] === neighbor[2])) {
      neighbors.push(neighbor);
    }
  }

  return neighbors;
};

// Funkcja obliczająca heurystykę dla A*
const heuristic = (a: number[], b: number[]): number => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
};

// Funkcja do znajdowania najkrótszej ścieżki w przestrzeni voxeli
export const findPath = (
  start: number[],
  goal: number[],
  voxels: any[]
): number[][] | null => {
  const openSet = new Set([start.toString()]);
  const cameFrom = new Map<string, number[]>();

  const gScore = new Map<string, number>();
  gScore.set(start.toString(), 0);

  const fScore = new Map<string, number>();
  fScore.set(start.toString(), heuristic(start, goal));

  while (openSet.size > 0) {
    let current: number[] | null = null;
    let currentFScore = Infinity;

    for (const voxel of openSet) {
      const voxelArray = JSON.parse(voxel);
      const voxelFScore = fScore.get(voxel) ?? Infinity;
      if (voxelFScore < currentFScore) {
        currentFScore = voxelFScore;
        current = voxelArray;
      }
    }

    if (current === null) break;
    if (current[0] === goal[0] && current[1] === goal[1] && current[2] === goal[2]) {
      const path = [];
      while (current) {
        path.push(current);
        current = cameFrom.get(current.toString());
      }
      return path.reverse();
    }

    openSet.delete(current.toString());
    const neighbors = getNeighbors(current, voxels);

    for (const neighbor of neighbors) {
      const tentativeGScore = (gScore.get(current.toString()) ?? Infinity) + 1;
      const neighborKey = neighbor.toString();

      if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);
        fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, goal));

        if (!openSet.has(neighborKey)) {
          openSet.add(neighborKey);
        }
      }
    }
  }

  return null;
};
