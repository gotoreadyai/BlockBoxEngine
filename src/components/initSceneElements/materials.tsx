import {
  Color3,
  MaterialPluginBase,
  PBRMaterial,
  Scene,
  Texture,
  RawTexture,
  Engine,
  RawTexture2DArray,
} from "@babylonjs/core";

class BlackAndWhitePluginMaterial extends MaterialPluginBase {
  constructor(material) {
    // last parameter is a priority, which lets you define the order multiple plugins are run.
    super(material, "BlackAndWhite", 200, { BLACKANDWHITE: false });

    // let's enable it by default
    this._enable(true);
  }

  // Also, you should always associate a define with your plugin because the list of defines (and their values)
  // is what triggers a recompilation of the shader: a shader is recompiled only if a value of a define changes.
  prepareDefines(defines, scene, mesh) {
    defines["BLACKANDWHITE"] = true;
  }

  getClassName() {
    return "BlackAndWhitePluginMaterial";
  }
  getSamplers(samplers) {
    samplers.push("texture");
  }
  hasTexture() {
    return true;
  }

  getCustomCode(shaderType) {
    if (shaderType === "fragment")
      return {
        CUSTOM_FRAGMENT_DEFINITIONS: `
          uniform sampler2D texture;
      `,

        CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: `
            color.rgb = texture(texture, vDiffuseUV + uvOffset).rgb;
      `,
      };
    return null;
  }
}

export const setupMaterial = (scene: Scene) => {
  const material = new PBRMaterial("material", scene);
  material.albedoTexture = null;
  material.ambientColor = new Color3(0, 0, 0);
  material.roughness = 0.9;

  const texture = new Texture(
    "/tiles.png",
    scene,
    true,
    false,
    Texture.NEAREST_SAMPLINGMODE
  );
  material.forceIrradianceInFragment = true;
  material.albedoTexture = texture;

  material.metadata = {
    blackAndWhite: new BlackAndWhitePluginMaterial(material),
  };

  // Enable the plugin
  material.metadata.blackAndWhite.isEnabled = true;

  return material;
};
