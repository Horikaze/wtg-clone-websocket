import { useEffect, useRef, useState } from "react";
import video from "../public/sample.mp4";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
function App() {
  const [toSkip, setToSkip] = useState(0);
  const player = useRef<HTMLVideoElement>(null);

  const skipToSeconds = () => {
    player.current!.currentTime = toSkip;
    socket.emit("send_message", {
      toSkip,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      player.current!.currentTime = Number(data.toSkip);
    });
  }, []);
  return (
    <>
      <div className="text-blue-700">
        <video src={video} ref={player}></video>
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
        <input
          type="number"
          onChange={(e) => setToSkip(Number(e.target.value))}
        />
        <button
          className="bg-gray-500 py-1 px-4 rounded-sm hover:brightness-110 "
          onClick={() => {
            skipToSeconds();
          }}
        >
          Pause
        </button>
        <p>{player.current?.currentTime}</p>
      </div>
    </>
  );
}

export default App;
