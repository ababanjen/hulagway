"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import Preview from "./Preview";
import { useStore } from "../hooks/store/useStore";

const Camera = () => {
  const videoRef: any = useRef(null);
  const photoRef: any = useRef([]);
  const thumbnailRef: any = useRef(null);

  // const [previews, setPreviews] = useState<any>([...Array(3)]);
  const { previews, setPreviews } = useStore();
  const width = 414;
  const height = width / (16 / 9);

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080 },
      });
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const snap = () => {
    const video = videoRef.current;

    const isFullFrame = previews.every((p: any) => p);
    const isEmptyCanvas = previews.every((p: any) => !p);
    let index: any;
    if (isEmptyCanvas) index = 0;
    else
      previews.forEach((p: any, idx: any) => {
        if (p) index = idx + 1;
      });

    if (isFullFrame) return;

    const photo = photoRef.current[index];

    photo.width = width;
    photo.height = height;
    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    setPreviews(
      previews.map((prev: any, idx: any) => {
        if (idx === index) return photo;
        return prev;
      })
    );
  };

  const retake = () => {
    setPreviews([...Array(3)]);
    previews.forEach((_: any, index: any) => {
      const photo = photoRef.current[index];
      const context = photo.getContext("2d");
      context.clearRect(0, 0, width, height);
    });
  };

  const print = useReactToPrint({
    pageStyle: `
    @page { width:2in;}
    `,
    content: () => thumbnailRef.current,
  });

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div>
        <div className="flex gap-2">
          <button onClick={snap} className="bg-green-500 border px-5 py-2">
            SNAP!
          </button>
          <button onClick={retake} className="bg-red-500 border px-5 py-2">
            RETAKE!
          </button>
          <ReactToPrint
            trigger={() => (
              <button onClick={print} className="bg-blue-500 border px-5 py-2">
                PRINT!
              </button>
            )}
            content={() => thumbnailRef}
          />
        </div>
        <Preview ref={thumbnailRef} />
        {/* <div
          className="flex overflow-hidden gap-2 bg-green-500 justify-between p-2"
          ref={thumbnailRef}
        >
          <div className="flex flex-col gap-2">
            {previews?.map((_: any, id: any) => (
              <canvas
                className="rounded border w-[15rem] h-[8rem]"
                ref={(e: any) => (photoRef.current[id] = e)}
                key={id}
              ></canvas>
            ))}
          </div>
        </div> */}
      </div>
      <div>
        <video ref={videoRef}></video>
      </div>
    </main>
  );
};

export default Camera;
