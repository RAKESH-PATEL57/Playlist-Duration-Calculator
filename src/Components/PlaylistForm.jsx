/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const PlaylistForm = ({ setPlaylistData }) => {
  const [playlistUrl, setPlaylistUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!playlistUrl) return alert("Please enter a playlist URL");

    try {
      const response = await axios.get("/api/fetchPlaylist", {
        params: { url: playlistUrl },
      });
      setPlaylistData(response.data.videos);
    } catch (error) {
      console.error("Error fetching playlist data:", error);
      alert("Failed to fetch playlist data.");
    }
  };

  return (
    <form className="playlist-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter YouTube Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
      />
      <button type="submit">Fetch Playlist</button>
    </form>
  );
};

export default PlaylistForm;
