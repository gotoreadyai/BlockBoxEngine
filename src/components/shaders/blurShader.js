// blurShader.js
export const blurVertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;

void main() {
  gl_Position = vec4(position, 1.0);
  vUV = uv;
}
`;

export const blurFragmentShader = `
precision highp float;
uniform sampler2D textureSampler;
uniform vec2 resolution;
uniform float blurRadius;
varying vec2 vUV;

void main() {
  vec2 texOffset = 1.0 / resolution; // Texture coordinate offset for sampling

  vec4 color = vec4(0.0);
  float blurAmount = blurRadius * 2.0;

  for (float x = -blurRadius; x <= blurRadius; x++) {
    for (float y = -blurRadius; y <= blurRadius; y++) {
      float weight = (1.0 - abs(x / blurRadius)) * (1.0 - abs(y / blurRadius));
      color += texture2D(textureSampler, vUV + vec2(x, y) * texOffset) * weight;
    }
  }

  gl_FragColor = color / (blurAmount * blurAmount);
}
`;
