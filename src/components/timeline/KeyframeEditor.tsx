import React, { useState, useRef, useEffect } from "react";

interface Keyframe {
  frame: number;
  value: { x: number; y: number; z: number };
}

interface TimelineProps {
  keyframes: Keyframe[];
  currentFrame: number;
  setCurrentFrame: (frame: number) => void;
  addKeyframe: () => void;
}

const FRAME_WIDTH = 10; // Define a constant for frame width
const FRAME_MARGIN = 1; // Define a constant for frame margin

const Timeline: React.FC<TimelineProps> = ({
  keyframes,
  currentFrame,
  setCurrentFrame,
  addKeyframe,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const timelineRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - timelineRect.left;
    const newFrame = Math.floor(clickX / (FRAME_WIDTH + FRAME_MARGIN));
    setCurrentFrame(newFrame);
  };

  useEffect(() => {
    if (timelineRef.current) {
      const scrollPosition =
        currentFrame * (FRAME_WIDTH + FRAME_MARGIN) -
        timelineRef.current.clientWidth / 2;
      timelineRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentFrame]);

  const totalFrames = 100; // Adjust this value as needed for the total number of frames

  const getBackgroundColor = (index: number) => {
    if (index === currentFrame) {
      return "bg-blue-500";
    }
    const isKeyframe = keyframes.some((kf) => kf.frame === index);
    if (isKeyframe) {
      return "bg-red-500";
    }
    return index % 2 === 0 ? "bg-gray-300" : "bg-gray-400";
  };

  return (
    <div className="flex-1">
      <button
        className="bg-blue-700 text-white text-xs px-3 py-1.5 rounded"
        onClick={addKeyframe}
      >
        Add Keyframe
      </button>
      <div
        className="relative w-full h-8 bg-gray-800 overflow-x-hidden"
        onClick={handleTimelineClick}
        ref={timelineRef}
      >
        <div className=" w-full h-full flex">
          {Array.from({ length: totalFrames }, (_, i) => (
            <div
              key={i}
              className={`${getBackgroundColor(i)}`}
              style={{
                width: `${FRAME_WIDTH}px`,
                marginRight: `${FRAME_MARGIN}px`,
              }}
              onClick={() => setCurrentFrame(i)}
            >
              {i % 10 === 0 && (
                <span className="text-xs absolute bottom-0">{i}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        Current Frame:
        <input
          type="number"
          className="border ml-2 p-1"
          value={currentFrame}
          onChange={(e) => setCurrentFrame(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

interface KeyframeEditorProps {
  initialKeyframes: Keyframe[];
}

const KeyframeEditor: React.FC<KeyframeEditorProps> = ({
  initialKeyframes,
}) => {
  const [keyframes, setKeyframes] = useState<Keyframe[]>(initialKeyframes);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  const addKeyframe = () => {
    const newKeyframes = [
      ...keyframes,
      { frame: currentFrame, value: { x: 0, y: 0, z: 0 } },
    ];
    setKeyframes(newKeyframes);
  };

  const updateKeyframeValue = (
    frame: number,
    value: { x: number; y: number; z: number }
  ) => {
    const updatedKeyframes = keyframes.map((kf) =>
      kf.frame === frame ? { ...kf, value } : kf
    );
    setKeyframes(updatedKeyframes);
  };

  const getCurrentKeyframe = () => {
    return (
      keyframes.find((kf) => kf.frame === currentFrame) || {
        frame: currentFrame,
        value: { x: 0, y: 0, z: 0 },
      }
    );
  };

  const currentKeyframe = getCurrentKeyframe();

  return (
    <div className="flex-1 flex">
      <Timeline
        keyframes={keyframes}
        currentFrame={currentFrame}
        setCurrentFrame={setCurrentFrame}
        addKeyframe={addKeyframe}
      />

      {/* <div>
        <label className="flex flex-col">
          X:
          <input
            type="number"
            className="border p-1"
            value={currentKeyframe.value.x}
            onChange={(e) =>
              updateKeyframeValue(currentFrame, {
                ...currentKeyframe.value,
                x: Number(e.target.value),
              })
            }
          />
        </label>
        <label className="flex flex-col">
          Y:
          <input
            type="number"
            className="border p-1"
            value={currentKeyframe.value.y}
            onChange={(e) =>
              updateKeyframeValue(currentFrame, {
                ...currentKeyframe.value,
                y: Number(e.target.value),
              })
            }
          />
        </label>
        <label className="flex flex-col">
          Z:
          <input
            type="number"
            className="border p-1"
            value={currentKeyframe.value.z}
            onChange={(e) =>
              updateKeyframeValue(currentFrame, {
                ...currentKeyframe.value,
                z: Number(e.target.value),
              })
            }
          />
        </label>
      </div> */}
    </div>
  );
};

export default KeyframeEditor;
