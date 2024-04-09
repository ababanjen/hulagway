import { forwardRef } from "react";
import { useStore } from "../hooks/store/useStore";

const Preview = () => {
  const { previews } = useStore();
  return (
    <div
      className="flex overflow-hidden gap-2 bg-green-500 justify-between p-2"
      // ref={thumbnailRef}
    >
      <div className="flex flex-col gap-2">
        {previews?.map((_: any, id: any) => (
          <canvas
            className="rounded border w-[15rem] h-[8rem]"
            // ref={(e: any) => (photoRef.current[id] = e)}
            key={id}
          ></canvas>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(Preview);
