import { AdvancedDynamicTexture, Control, SelectionPanel } from "@babylonjs/gui";

export const setupGuiSelectionPanel = () => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var selectBox = new SelectionPanel("sp", []);
    selectBox.width = 0.25;
    selectBox.height = "100%";
    selectBox.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    selectBox.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    selectBox.background = "#FFFF9922";
    selectBox.isPointerBlocker = false;
    return advancedTexture.addControl(selectBox);
}