import { useEffect, useState } from "react";
import { bodyPartsSchema } from "../initSceneElements/character";

const BoneControll = ({ handleState }: any) => {
  const [controlls, setControl] = useState(bodyPartsSchema);

  return (
    <div className="flex flex-col gap-3 mt-2 px-3 text-xs">
      {bodyPartsSchema.map((part: any, i: number) => (
        <div key={i} className="grid grid-cols-2 gap-1">
          <span className="uppercase">{part.label}</span>
          <input
            className="appearance-none h-4 rounded bg-gray-800"
            min={controlls[i].min}
            max={controlls[i].max}
            step={controlls[i].step}
            defaultValue={controlls[i].default}
            type="range"
            onChange={(event) => {
              const tech: any = controlls;
              tech[i].default = event.target.value;
              handleState({ type: "bones", data: tech, index: i });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BoneControll;
