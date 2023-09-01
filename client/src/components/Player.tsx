import { useRef, useState } from "react";
import ReactPlayer from "react-player";
export default function Player() {
  const player = useRef<ReactPlayer>(null);
  const [playing, setPlaying] = useState(true);
  const [URL, setURL] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  // const togglePlay = () => {
  //   setPlaying((prevPlaying) => !prevPlaying);
  // };


  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    player.current?.seekTo(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

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
          onPlay={() => {
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
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeekChange}
          className="appearance-none  w-full bg-transparent [&::-webkit-slider-runnable-track]:rounded-sm [&::-webkit-slider-runnable-track]:bg-black/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:bg-white"
        />
        <div className="flex flex-row justify-between items-center">
          <div className="w-1/2 relative">
            <input
              className="w-full bg-black/30 text-gray-300 px-2 py-2 focus:outline-none"
              type="text"
              placeholder="LINK"
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
            <button
              className="absolute right-0 p-2 bg-gray-500 hover:brightness-125 text-white"
              onClick={() => {
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
