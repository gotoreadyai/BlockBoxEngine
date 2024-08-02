import { useCallback, useEffect } from "react";
import { useThemeStore } from "../ThemeStore";

function HotKeys({ handleReact }: any) {
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === "Tab") {
      useThemeStore.setState(() => ({
        route:
          useThemeStore.getState().route === "voxel-preview"
            ? "voxel-editor"
            : "voxel-preview",
      }));
    }
    event.preventDefault();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);
  return <input type="hidden" />;
}

export default HotKeys;
