import { useRef } from "react";
import video from "../public/sample.mp4"
function App() {
  const player = useRef<HTMLVideoElement>(null);
  return (
    <>
      <div className="text-blue-700">
        <video
          src={video}
          ref={player}
        ></video>
      </div>
      <div className="flex flex-row justify-center gap-20">
        <button
          className="bg-gray-500 py-1 px-4 rounded-sm hover:brightness-110 "
          onClick={() => {
            player.current!.play();
          }}
        >
          Play
        </button>
        <button
          className="bg-gray-500 py-1 px-4 rounded-sm hover:brightness-110 "
          onClick={() => {
            player.current!.pause();
          }}
        >
          Pause
        </button>
      </div>
    </>
  );
}

export default App;
