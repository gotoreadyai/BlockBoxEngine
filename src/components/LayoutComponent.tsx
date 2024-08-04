import { FiBox, FiChevronRight } from "react-icons/fi";
import { useThemeStore } from "../ThemeStore";
import BlockCell from "./layouts/BlockCell";
import BoneControll from "./layouts/BoneControl";
import KeyframeEditor from "./timeline/KeyframeEditor";

function LayoutComponent({ children, handleReact }: any) {
  const route = useThemeStore((state) => state.route);
  const fps = useThemeStore((state) => state.fps);
  const blocks = useThemeStore((state) => state.blocks);

  const initialKeyframes = [
    { frame: 0, value: { x: 0, y: 1, z: 0 } },
    { frame: 20, value: { x: 1, y: 1, z: 0 } },
    { frame: 40, value: { x: 0, y: 1, z: 1 } },
  ];

  return (
    <>
      <div
       
        className="flex flex-col w-screen h-screen fixed select-none bg-zinc-700 font-pixel"
      >
        <div className="flex gap-px p-px text-gray-200 text-base bg-zinc-800">
          <div className="py-1.5 px-3 w-80  font-black ">BLOCK BOX V0.0.1</div>
          <div className="flex items-center">
            MENU <FiChevronRight /> SCENE <FiChevronRight /> PREVIEW
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="flex flex-1 text-base mt-px">
          {route === "start" && (
            <div className="select-none fixed top-0 w-screen h-[calc(100vh-3rem)] flex flex-col items-center justify-center text-gray-200 gap-px text-xl">
              <div className="bg-zinc-800 p-4 w-72">WORLD</div>
              <div className="bg-zinc-800 p-4 w-72">CHARACTER</div>
            </div>
          )}
          <div className="w-80 flex flex-col text-gray-200 gap-px text-sm">
            {route === "voxel-preview" && (
              <>
                <div className="bg-zinc-800 py-1.5 px-3">CHUNK 0_0_-1</div>
                <div className="bg-zinc-800 py-1.5 px-3">CHUNK 0_0_1</div>
                <div className="bg-zinc-800 py-1.5 px-3">CHUNK 0_0_2</div>
                <div className="flex-1 bg-zinc-800"></div>
              </>
            )}
            {route === "voxel-editor" && <></>}
          </div>

          <div className="flex-1  bg-zinc-400 ">{children}</div>

          <div className="w-80 flex flex-col text-gray-200 gap-px ">
            {route === "voxel-preview" && (
              <>
                <div className="bg-slate-700 hover:bg-lime-600 hover:text-gray-950 px-4 gap-2 py-1 border-b-2 border-slate-600 flex items-center cursor-pointer">
                  <FiBox /> <span>OPEN EDITOR [TAB]</span>
                </div>
                <BoneControll handleState={handleReact} />
              </>
            )}

            {route === "voxel-editor" && (
              <>
                {blocks.map((_el, i) => (
                  <BlockCell key={i} index={i} />
                ))}
                <div className="bg-zinc-800 flex-1"></div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-px p-px text-gray-200 text-base bg-zinc-800 mt-px">
          <div className=" py-1.5 px-3 w-80">{fps}</div>
          <KeyframeEditor initialKeyframes={initialKeyframes} />
        </div>
      </div>
    </>
  );
}

export default LayoutComponent;
