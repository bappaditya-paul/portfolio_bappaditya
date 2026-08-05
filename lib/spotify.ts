const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) {
    return null;
  }

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    return response.json();
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }
};

export const getNowPlaying = async () => {
  const tokenData = await getAccessToken();

  if (!tokenData || !tokenData.access_token) {
    return null;
  }

  try {
    return fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      next: { revalidate: 30 },
    });
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return null;
  }
};
