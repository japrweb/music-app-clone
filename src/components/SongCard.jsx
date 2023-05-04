import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i}));
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/10 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}          
          />
        </div>
        <img src={song.images?.coverart} alt="song_img" className="w-[100%] h-[100%] rounded-sm" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <a to={`/song/${song?.key}`}> {song.title} </a>
        </p>

        <p className="text-sm truncate text-gray-300 mt-1">
          <a to={song.subtitle ? `/artists/${song?.subtitle[0]?.adamid}` : "/top-artists"}>
            {song.subtitle}
          </a>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
