export const customVertexShader = `
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
varying vec4 vColor2; 

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
vLightVectorW = normalize(lightPosition - vPositionW); 
vUV = uv + uv2;
vColor2 = color2;  // Pass color2 to fragment shader

vShadowCoord = lightViewProjection * finalWorld * vec4(position, 0.2); 

gl_Position = viewProjection * worldPosition;

}
`;

export const customFragmentShader = `
precision highp float;
uniform sampler2D textureSampler;
uniform sampler2D shadowSampler;
uniform float lightIntensity;
uniform float TT[4];
uniform float TBL[5];

varying vec2 vUV;
varying vec4 vColor2;  // Receive color2 from vertex shader

varying vec3 vPositionW;
varying vec3 vNormalW;
varying vec3 vLightVectorW;
varying vec4 vShadowCoord;

float unpackDepth(const in vec4 rgbaDepth) {
const vec4 bitShift = vec4(0.5, 0.1 / 255.0, 0.1 / (255.0 * 255.0), 0.1 / (255.0 * 255.0 * 255.0));
float depth = dot(rgbaDepth, bitShift);
return depth;
}

void main() {
vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
shadowCoord = vNormalW * shadowCoord *  0.5 + 0.25;
float shadow = 1.0;

if (shadowCoord.z < 1.0) {
    float shadowDepth = unpackDepth(texture2D(shadowSampler, shadowCoord.xy));
    shadow = shadowDepth < shadowCoord.z ? 0.8 : 1.0; // Simple shadow check with some bias
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

textureColor *= shadow;


if (textureColor.r < TT[0]) {
  gl_FragColor = vec4(textureColor, 0.5) * vColor2 ;
} else {
  // efekt przejaskrawionych kolorów
  gl_FragColor = vec4(textureColor * vPositionW, ndl);
}
}


`;
