import {
  Axis,
  Bone,
  Matrix,
  MeshBuilder,
  Quaternion,
  Scene,
  Skeleton,
  Animation,
  PBRMaterial,
  Texture,
} from "@babylonjs/core";
import { mapUVWback, mapUVWfront } from "./voxels";

export const bodyPartsSchema = [
  {
    id: "center",
    label: "center",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "root",
    rotationAxis: Axis.X,
    default: 0,
  },
  {
    id: "belly",
    label: "belly",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "center",
    rotationAxis: Axis.Y,
    default: 0,
  },
  {
    id: "chest",
    label: "chest",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "belly",
    rotationAxis: Axis.Z,
    default: 0,
  },

  /* head */
  {
    id: "neckBottom",
    label: "neckBottom",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "chest",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "neckTop",
    label: "neckTop",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "neckBottom",
    rotationAxis: Axis.X,
    default: 0,
  },
  {
    id: "head",
    label: "head",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "neckTop",
    rotationAxis: Axis.Y,
    default: 0,
  },

  /* rightArm */
  {
    id: "rightShoulder1",
    label: "rightShoulder1",
    min: -0.9,
    max: 0.9,
    step: 0.01,
    parentBone: "rightShoulderPin1",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "rightShoulder2",
    label: "rightShoulder2",
    min: -0.9,
    max: 0.9,
    step: 0.01,
    parentBone: "rightShoulderPin2",
    rotationAxis: Axis.Y,
    default: 0,
  },
  {
    id: "rightShoulder3",
    label: "rightShoulde3",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "rightShoulderPin3",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "rightShoulder4",
    label: "rightShoulde4",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "rightArm",
    rotationAxis: Axis.Z,
    default: 0,
  },

  /* rightLeg */

  {
    id: "rightHipPin",
    label: "rightHipPin",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "rightHipPin",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "rightHip",
    label: "rightHip",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "rightHip",
    rotationAxis: Axis.X,
    default: 0,
  },
  {
    id: "rightLeg",
    label: "rightLeg",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "rightLeg",
    rotationAxis: Axis.X,
    default: 0,
  },

   /* leftArm */
   {
    id: "leftShoulder1",
    label: "leftShoulder1",
    min: -0.9,
    max: 0.9,
    step: 0.01,
    parentBone: "leftShoulderPin1",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "leftShoulder2",
    label: "leftShoulder2",
    min: -0.9,
    max: 0.9,
    step: 0.01,
    parentBone: "leftShoulderPin2",
    rotationAxis: Axis.Y,
    default: 0,
  },
  {
    id: "leftShoulder3",
    label: "leftShoulde3",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "leftShoulderPin3",
    rotationAxis: Axis.Z,
    default: 0,
  },
  {
    id: "leftShoulder4",
    label: "leftShoulde4",
    min: -0.5,
    max: 0.5,
    step: 0.01,
    parentBone: "leftArm",
    rotationAxis: Axis.Z,
    default: 0,
  },

];

// Body parts configuration
export const bodyParts = [
  {
    name: "center",
    size: [0.2, 0.2, 0.2],
    position: [0, 0, 0],
    parentBone: "root",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "belly",
    size: [0.3, 0.5, 0.5],
    position: [0, 0.15, 0],
    parentBone: "center",
    offsetMatrix: Matrix.Translation(0, 0.4, 0),
    uv: 2,
  },
  {
    name: "chest",
    size: [0.4, 0.6, 0.6],
    position: [0, 0, 0],
    parentBone: "belly",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "neckBottom",
    size: [0.2, 0.2, 0.2],
    position: [0, 0, 0],
    parentBone: "chest",
    offsetMatrix: Matrix.Translation(0, 0.2, 0),
    uv: 2,
  },
  {
    name: "neckTop",
    size: [0.2, 0.2, 0.2],
    position: [0, 0, 0],
    parentBone: "neckBottom",
    offsetMatrix: Matrix.Translation(0, 0.2, 0),
    uv: 2,
  },
  {
    name: "head",
    size: [0.8, 0.8, 0.8],
    position: [0, 0.2, 0],
    parentBone: "neckTop",
    offsetMatrix: Matrix.Translation(0, 0, 0.38),
    uv: 0,
  },

  {
    name: "mouth",
    size: [0.2, 0.3, 0.1],
    position: [0, 0, 0],
    parentBone: "head",
    offsetMatrix: Matrix.Translation(0, 0.1, 0),
    uv: 0,
  },
  /* rightArm */
  {
    name: "rightShoulderPin1",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "belly",
    offsetMatrix: Matrix.Translation(0.35, 0.1, 0),
    uv: 2,
  },
  {
    name: "rightShoulderPin2",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "rightShoulderPin1",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "rightShoulderPin3",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "rightShoulderPin2",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "rightShoulder",
    size: [0.35, 0.35, 0.45],
    position: [0.1, 0.1, 0],
    parentBone: "rightShoulderPin3",
    offsetMatrix: Matrix.Translation(0.3, 0.1, 0),
    uv: 2,
  },
  {
    name: "rightArm",
    size: [0.25, 0.4, 0.25],
    position: [0, 0, 0],
    parentBone: "rightShoulder",
    offsetMatrix: Matrix.Translation(0.15, 0, 0),
    uv: 2,
  },
  {
    name: "rightForeArm",
    size: [0.25, 0.35, 0.25],
    position: [0.15, 0, 0],
    parentBone: "rightArm",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },

  /* leftArm */
  {
    name: "leftShoulderPin1",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "belly",
    offsetMatrix: Matrix.Translation(-0.35, 0.1, 0),
    uv: 2,
  },
  {
    name: "leftShoulderPin2",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "leftShoulderPin1",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "leftShoulderPin3",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "leftShoulderPin2",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "leftShoulder",
    size: [0.35, 0.35, 0.45],
    position: [-0.1, 0.1, 0],
    parentBone: "leftShoulderPin3",
    offsetMatrix: Matrix.Translation(-0.3, 0.1, 0),
    uv: 2,
  },
  {
    name: "leftArm",
    size: [0.25, 0.4, 0.25],
    position: [0, 0, 0],
    parentBone: "leftShoulder",
    offsetMatrix: Matrix.Translation(-0.15, 0, 0),
    uv: 2,
  },
  {
    name: "leftForeArm",
    size: [0.25, 0.35, 0.25],
    position: [-0.15, 0, 0],
    parentBone: "leftArm",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },


  /* rightLeg */

  {
    name: "rightHipPin",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "center",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "rightHip",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "rightHipPin",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "rightLeg",
    size: [0.4, 0.2, 0.2],
    position: [0.15, -0.1, 0],
    parentBone: "rightHip",
    offsetMatrix: Matrix.Translation(0, -0.2, 0),
    uv: 2,
  },
  {
    name: "rightTibia",
    size: [0.4, 0.2, 0.2],
    position: [0.15, -0.1, 0],
    parentBone: "rightLeg",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },

   /* leftLeg */

   {
    name: "leftHipPin",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "center",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "leftHip",
    size: [0.1, 0.1, 0.1],
    position: [0, 0, 0],
    parentBone: "leftHipPin",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
  {
    name: "leftLeg",
    size: [0.4, 0.2, 0.2],
    position: [-0.15, -0.1, 0],
    parentBone: "leftHip",
    offsetMatrix: Matrix.Translation(0, -0.2, 0),
    uv: 2,
  },
  {
    name: "leftTibia",
    size: [0.4, 0.2, 0.2],
    position: [-0.15, -0.1, 0],
    parentBone: "leftLeg",
    offsetMatrix: Matrix.Translation(0, 0, 0),
    uv: 2,
  },
];

export const setupCharacter = (scene: Scene, shadowGenerator: any) => {
  const character: any = {
    skeleton: null,
    bones: {},
    meshes: {},
  };
  character.skeleton = new Skeleton("skeleton", "skeletonId", scene);

  character.bones.root = new Bone(
    "root",
    character.skeleton,
    null,
    Matrix.Identity()
  );

  const material = new PBRMaterial("boxMaterial", scene);
  material.metallic = 0;
  material.roughness = 0.67;
  const texture = new Texture(
    "/player.png",
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );

  texture.anisotropicFilteringLevel = 1;
  material.albedoTexture = texture;

  // Iterating through bodyParts to create bones and meshes
  bodyParts.forEach((part) => {
    const parentBone = character.bones[part.parentBone];
    const bone = new Bone(
      part.name,
      character.skeleton,
      parentBone,
      part.offsetMatrix
    );
    character.bones[part.name] = bone;

    character.meshes[part.name] = MeshBuilder.CreateBox(
      part.name,
      {
        height: part.size[0],
        width: part.size[1],
        depth: part.size[2],

        faceUV: [
          mapUVWback(0, part.uv), // front
          mapUVWback(1, part.uv), // back
          mapUVWback(2, part.uv), // left
          mapUVWback(3, part.uv), // right
          mapUVWfront(4, part.uv), // top
          mapUVWfront(5, part.uv), // bottom
        ],
        wrap: true,
      },

      scene
    );
    character.meshes[part.name].material = material;
    character.meshes[part.name].receiveShadows = true;
    shadowGenerator.addShadowCaster(character.meshes[part.name]);

    if (part.position) {
      character.meshes[part.name].position.x = part.position[0];
      character.meshes[part.name].position.y = part.position[1];
      character.meshes[part.name].position.z = part.position[2];
    }
    character.meshes[part.name].parent = parentBone;
    character.meshes[part.name].skeleton = character.skeleton;
  });

  return character;
};

export const handleAxisChange = (
  value: number,
  partName: string,
  character: any
) => {
  const part = bodyPartsSchema.find((part) => part.id === partName);

  if (!part) {
    console.error(`Body part with name ${partName} not found.`);
    return;
  }

  character.bones[part.parentBone].setAxisAngle(
    part.rotationAxis,
    Math.sin(value) * Math.PI
  );
};

export const handleQuaternionChange = (
  value: number,
  partName: string,
  character: any
) => {
  const part = bodyPartsSchema.find((part) => part.id === partName);

  if (!part) {
    console.error(`Body part with name ${partName} not found.`);
    return;
  }
  const current = character.bones[part.parentBone].getRotation();
  const angle = value;

  const calculate = Quaternion.Zero();
  calculate.set(
    part.rotationAxis === Axis.X ? angle : current.x,
    part.rotationAxis === Axis.Y ? angle : current.y,
    part.rotationAxis === Axis.Z ? angle : current.z,
    current.w
  );
  character.bones[part.parentBone].setRotation(
    calculate,
    //@ts-ignore
    Animation.ANIMATIONLOOPMODE_CONSTANT
  );
};

export const runAnimation = (character: any, scene: Scene): void => {
  // Utworzenie animacji dla backBone
  const backBoneAnimation = new Animation(
    "backBoneAnimation",
    "rotationQuaternion",

    30,

    Animation.ANIMATIONTYPE_QUATERNION,

    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const keys = [];
  keys.push({
    frame: 0,
    value: character.skeleton.bones[2].rotationQuaternion.clone(),
  });
  keys.push({
    frame: 30,
    value: Quaternion.RotationAxis(Axis.Y, Math.PI / 9),
  });
  keys.push({
    frame: 31,
    value: Quaternion.RotationAxis(Axis.Z, Math.PI / 9),
  });
  keys.push({
    frame: 60,
    value: character.skeleton.bones[2].rotationQuaternion.clone(),
  });

  backBoneAnimation.setKeys(keys);
  character.skeleton.bones[2].animations.push(backBoneAnimation);

  //Rozpoczęcie animacji
  scene.beginAnimation(character.skeleton.bones[2], 0, 60, true);
};
