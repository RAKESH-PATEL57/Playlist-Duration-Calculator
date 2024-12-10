import { useState } from "react";
import PlaylistForm from "./Components/PlaylistForm";
import PlaylistResult from "./Components/PlaylistResult";
import "./style.css";

const App = () => {
  const [playlistData, setPlaylistData] = useState(null);

  return (
    <div className="app-container">
      <h1>YouTube Playlist Duration Calculator</h1>
      <PlaylistForm setPlaylistData={setPlaylistData} />
      {playlistData && <PlaylistResult playlistData={playlistData} />}
    </div>
  );
};

export default App;
