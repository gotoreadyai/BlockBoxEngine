// jakies ok cienowanie dla shaders
// https://forum.babylonjs.com/t/shadermaterial-and-300es-imports-in-mrt/23381/24

import {
  Effect,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
  DirectionalLight,
  ShadowGenerator,
  Mesh,

} from "@babylonjs/core";


export const setupMaterial = (scene: Scene) => {
  Effect.ShadersStore["customVertexShader"] = `
    precision highp float;
    #extension GL_EXT_draw_buffers : require

    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    attribute vec2 uv2;
   attribute vec4 color2;

    uniform mat4 viewProjection;
    uniform mat4 worldViewProjection;
    uniform mat4 lightViewProjection;
    uniform vec3 lightPosition; 
    
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    varying vec2 vUV;
    varying vec3 vLightVectorW; 
    varying vec4 bufferColor; 

    varying vec4 vShadowCoord; 

    #include<instancesDeclaration>
    #include<helperFunctions>
    #include<__decl__lightFragment>[0..1]
    #include<shadowsFragmentFunctions>
    
    void main(void) {
    #include<instancesVertex>
    #include<shadowsVertex>[0]

    vec4 worldPosition = finalWorld * vec4(position, 1.0);
    vPositionW = vec3(worldPosition);
    vLightVectorW = normalize(lightPosition - vPositionW);
    vNormalW = normalize(mat3(finalWorld) * normal);
    vShadowCoord = lightViewProjection * finalWorld * vec4(vPositionW, 0.01); 
    
    vUV = uv + uv2;
    bufferColor = color2;  // Pass color2 to fragment shader

   

    
    gl_Position = viewProjection * worldPosition;

    }
  `;

  Effect.ShadersStore["customFragmentShader"] = `
  precision highp float;
  uniform sampler2D textureSampler;
  uniform sampler2D shadowSampler;
  uniform float lightIntensity;
  uniform float TT[4];
  uniform float TBL[5];

  varying vec2 vUV;
  varying vec4 bufferColor;  // Receive color2 from vertex shader

  varying vec3 vPositionW;
  varying vec3 vNormalW;
  varying vec3 vLightVectorW;
  varying vec4 vShadowCoord;

float unpackDepth(const in vec4 rgbaDepth) {
    const vec4 bitShift = vec4(0.75, 0.1 / 255.0, 0.1 / (255.0 * 255.0), 0.1 / (255.0 * 255.0 * 255.0));
    float depth = dot(rgbaDepth, bitShift);
    return depth;
}

void main() {
  
    vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
    shadowCoord = vNormalW * vPositionW * shadowCoord *  0.5 + 0.25;
   
    float shadow = 0.75;
    
    if (shadowCoord.z < 1.0) {
        float shadowDepth = unpackDepth(texture2D(shadowSampler, shadowCoord.xy));
        shadow = shadowDepth < shadowCoord.z ? 0.7 : 1.0;
    }

    // Light
    float ndl = max(0.0, dot(vNormalW, vLightVectorW));
    vec3 textureColor = texture2D(textureSampler, vUV).rgb;
    
    
    // Cartoon effect
    if (ndl > TT[0]) { textureColor *= TBL[0]; }
    else if (ndl > TT[1]) { textureColor *= TBL[1]; }
    else if (ndl > TT[2]) { textureColor *= TBL[2]; }
    else if (ndl > TT[3]) { textureColor *= TBL[3]; }
    else { textureColor *= TBL[4]; }


    vec3 burn = vec3(1,1,1);

    if (textureColor.r < 0.6) {
      burn *= vec3(bufferColor.g * 1.25, bufferColor.g * 1.25, bufferColor.b * 1.25);
    } else{
      burn = vec3(0.8,0.8,0.8);
      shadow *= 1.25;
    }
    
    // textureColor *= lightIntensity * shadow * vPositionW;
    textureColor *= shadow *  0.9;  

    float blurRadius = 0.01;
    float texOffset = 0.5;
    for (float x = -blurRadius; x <= blurRadius; x++) {
        textureColor += texture2D(textureSampler, vUV + vec2(x, 0) * texOffset).rgb * vec3(0.25,0.25,0.25);
    }

   
    
    gl_FragColor = vec4( textureColor * burn , 1) * bufferColor; 


}

  
  `;

  const material = new ShaderMaterial(
    "custom",
    scene,
    {
      vertex: "custom",
      fragment: "custom",
    },
    {
      attributes: ["position", "normal", "uv", "uv2", "color2"],
      uniforms: [
        "world",
        "worldView",
        "worldViewProjection",
        "view",
        "projection",
        "viewProjection",
        "lightIntensity",
        "lightPosition",
        "lightViewProjection",
        "TT",
        "TBL",
      ],
      samplers: ["textureSampler", "shadowSampler"],
    }
  );

  const texture = new Texture(
    "/tiles.png",
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );
  //  material.alpha = 0.999;
  material.setTexture("textureSampler", texture);
  material.setFloat("lightIntensity", 0.5);

  const shadowTexture = new Texture(
    "/minishadow.png", // Path to your new shadow texture
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );
  material.setTexture("shadowSampler", shadowTexture);

  const light: any = new DirectionalLight(
    "dirLight",
    new Vector3(-1, -1, -1),
    scene
  );
  light.position = new Vector3(20, 40, 20);

  const shadowGenerator = new ShadowGenerator(0, light);

  const addMeshToShadowGenerator = (mesh: Mesh) => {
    if (mesh instanceof Mesh) {
      mesh.receiveShadows = true;
      shadowGenerator.addShadowCaster(mesh);
    }
  };

  scene.meshes.forEach((mesh: any) => {
    addMeshToShadowGenerator(mesh);
  });

  material.setVector3("lightPosition", light.position);
  material.setMatrix(
    "lightViewProjection",
    light.getShadowGenerator().getTransformMatrix()
  );

  const updateMaterialProperties = () => {
    const camera = scene.activeCamera;
    if (!camera) return;

    const distanceToCamera = (position: Vector3) => {
      return Vector3.Distance(position, camera.position);
    };

    const ambientLightIntensity = 0.6;

    scene.meshes.forEach((mesh) => {
      const dist = distanceToCamera(mesh.position);
      const factor = 1 - Math.min(dist / 150, 1);

      const ttValues = [0.95, 0.5, 0.2, 0.1, 0.03].map(
        (value) => value * factor
      );
      const tblValues = [1.5, 1.2, 1.0, 0.7, 0.5].map(
        (value) => value * ambientLightIntensity
      );

      material.setFloats("TT", ttValues);
      material.setFloats("TBL", tblValues);
    });
  };

  scene.onBeforeRenderObservable.add(updateMaterialProperties);

  return material;
};
