import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import io from "socket.io-client";
const socket = io(`${import.meta.env.VITE_WEBSOCKET}`);

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function Player() {
  const player = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(false);
  const [URL, setURL] = useState("");
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [playingInput, setPlayingInput] = useState(false);
  const [URLinput, setURLinput] = useState("");

  const [duration, setDuration] = useState<number | null>(null);

  const handlePauseChange = () => {
    socket.emit("change", {
      playing: !playingInput,
      URL: URLinput,
      currentTime: currentTime,
      id: socket.id,
    });
  };
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    player.current?.seekTo(newTime);
    setPlaying(true);
    socket.emit("change", {
      playing: true,
      URL: URLinput,
      currentTime: newTime,
      id: socket.id,
    });
  };
  useEffect(() => {
    socket.on("recive", (data) => {
      player.current?.seekTo(data.time);
      setCurrentTime(data.time);
      setURL(data.URL);
      setURLinput(data.URL);
      setPlaying(data.isPlaying);
      setPlayingInput(data.isPlaying);
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
          onPause={() => {}}
          onPlay={() => {}}
          onBufferEnd={() => {
            setPlaying(true);
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
          <button
            onClick={() => {
              handlePauseChange();
            }}
            className="text-white"
          >
            {!playingInput ? "Play" : "Pause"}
          </button>
          <div className="text-gray-300">
            <p>
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="my-2 mx-2">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekChange}
          className="appearance-none  w-full bg-transparent [&::-webkit-slider-runnable-track]:rounded-sm [&::-webkit-slider-runnable-track]:bg-black/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </div>
  );
}
