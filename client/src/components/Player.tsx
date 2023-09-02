import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import io from "socket.io-client";
const socket = io("http://localhost:3001/", { transports: ["websocket"] });

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function Player() {
  const player = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [URL, setURL] = useState("");
  const [URLinput, setURLinput] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const handleChange = (playing: boolean) => {
    console.log(playing, URL, currentTime);
    setPlaying(playing);
    socket.emit("change", {
      playing: playing,
      URL,
      currentTime,
      id: socket.id,
    });
  };

  useEffect(() => {
    socket.on("recive", (data) => {
      player.current?.seekTo(data.time);
      setURL(data.URL);
      setPlaying(data.isPlaying);
    });
  }, []);
  return (
    <div className="w-full">
      <div className="aspect-video">
        <ReactPlayer
          width="100%"
          height="100%"
          ref={player}
          controls
          url={URL}
          playing={playing}
          onError={(e) => {
            console.log(e);
          }}
          onPause={() => {
            handleChange(false);
          }}
          onPlay={() => {
            handleChange(true);
          }}
          onDuration={(duration) => {
            setDuration(duration);
          }}
          onProgress={(progress) => {
            setCurrentTime(progress.playedSeconds);
          }}
        />
      </div>
      <div className="my-2 mx-2">
        <div className="flex flex-row justify-between items-center">
          <div className="w-1/2 relative">
            <input
              className="w-full bg-black/30 text-gray-300 px-2 py-2 focus:outline-none"
              type="text"
              placeholder="LINK"
              onChange={(e) => {
                setURLinput(e.target.value);
              }}
            />
            <button
              className="absolute right-0 p-2 bg-gray-500 hover:brightness-125 text-white"
              onClick={() => {
                setURL(URLinput);
              }}
            >
              Meow
            </button>
          </div>
          <div className="text-gray-300">
            <p>
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
