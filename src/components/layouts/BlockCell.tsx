import { useThemeStore } from "../../ThemeStore";

interface BlockCellProps {
  index: number;
}

function BlockCell({ index }: BlockCellProps) {
  // Create an array of div elements
  const tiles: JSX.Element[] = [];
  const blocks = useThemeStore((state) => state.blocks);
  const selectedBlock = useThemeStore((state) => state.selectedBlock);

  for (let i = 0; i < 6; i++) {
    tiles.push(
      <div
        key={i}
        style={{
          imageRendering: "pixelated",
          backgroundImage: "url('/tiles.png')",
          backgroundSize: "142px",
          backgroundPosition: `-${i * 24}px -${index * 24}px`,
        }}
        className="w-6 h-6 border border-gray-950"
      ></div>
    );
  }

  const vec3ToHex = (vec3: [number, number, number]): string =>
    "#" +
    vec3
      .map((x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const hexToVec3 = (hex: string): [number, number, number] =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)!
      .map((x) => Math.round((parseInt(x, 16) / 255) * 10) / 10) as [
      number,
      number,
      number
    ];

  return (
    <div
      onClick={() => useThemeStore.setState({ selectedBlock: index })}
      className={`${
        selectedBlock === index
          ? "bg-zinc-700"
          : "bg-zinc-800 hover:bg-lime-800 cursor-pointer"
      } py-1.5 p-1.5 flex items-center gap-px `}
    >
      <span className="flex-1">BLOCK {index}</span>
      <input
        onChange={(el: React.ChangeEvent<HTMLInputElement>) => {
          const techBlocks = [...blocks];
          techBlocks[index] = hexToVec3(el.target.value);
          useThemeStore.setState({ blocks: techBlocks });
        }}
        className="bg-gray-700 p-px appearance-none h-6 w-8"
        type="color"
        name="color"
        value={vec3ToHex(blocks[index])}
      />
      {/* Render the array of tiles */}
      {tiles}
    </div>
  );
}

export default BlockCell;
