/* eslint-disable react/prop-types */
const PlaylistResult = ({ playlistData }) => {
  const calculateTotalDuration = (videos) => {
    let totalSeconds = 0;

    videos.forEach((video) => {
      const [minutes, seconds] = video.duration.split(":").map(Number);
      totalSeconds += minutes * 60 + seconds;
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const totalDuration = calculateTotalDuration(playlistData);

  return (
    <div className="playlist-result">
      <h2>Total Playlist Duration</h2>
      <p>{totalDuration}</p>
      <h3>Video Details</h3>
      <ul>
        {playlistData.map((video, index) => (
          <li key={index}>
            {video.title} - {video.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistResult;
