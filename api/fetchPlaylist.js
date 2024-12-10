const puppeteer = require("puppeteer");

module.exports = async (req, res) => {
  const playlistUrl = req.query.url;

  if (!playlistUrl) {
    return res.status(400).json({ error: "Playlist URL is required." });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    console.log("Navigating to playlist URL...");
    await page.goto(playlistUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const videos = await page.evaluate(() => {
      const videoElements = document.querySelectorAll("ytd-playlist-video-renderer");
      const videoData = [];

      videoElements.forEach((video) => {
        const title = video.querySelector("#video-title")?.textContent?.trim();
        const duration = video.querySelector(".badge-shape-wiz_text")?.textContent?.trim();
        if (title && duration) {
          videoData.push({ title, duration });
        }
      });

      return videoData;
    });

    console.log("Extracted videos:", videos);

    await browser.close();
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Failed to fetch playlist data." });
  }
};
