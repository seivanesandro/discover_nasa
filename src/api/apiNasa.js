import axios from "axios";

const apiKey = process.env.REACT_APP_NASA_API_KEY;
const apiUrlApod = process.env.REACT_APP_NASA_URL_APOD;
const apiUrlLibrary = process.env.REACT_APP_NASA_URL_LIBRARY;
const apiUrlEpic = process.env.REACT_APP_NASA_URL_EPIC;

const apiUrlMars = process.env.REACT_APP_NASA_URL_MARS;
const apiUrlMarsManifest = process.env.REACT_APP_NASA_URL_MARS_MANIFEST;
//FIXME: const apiUrlMarsCuriosity = process.env.REACT_API_NASA_URL_MARS_CURIOSITY;
//FIXME:const apiUrlMarsOpportunity = process.env.REACT_API_NASA_URL_MARS_OPPORTUNITY;
//FIXME:const apiUrlMarsSpirit = process.env.REACT_API_NASA_URL_MARS_SPIRIT;
//FIXME:const apiUrlMarsPerseverance = process.env.REACT_API_NASA_URL_MARS_PERSEVERANCE;

// 1. APOD (Astronomy Picture of the Day)
export async function fetchApod(count = 5) {
  try {
    const response = await axios.get(
      `${apiUrlApod}?api_key=${apiKey}&count=${count}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 2. Mars Rover Photos (rover: curiosity, opportunity, spirit, perseverance)
export async function fetchMarsPhotos({ rover = "curiosity", sol = 1000 }) {
  try {
    // Validação simples do nome do rover
    const validRovers = ["curiosity", "perseverance"];
    const roverName = validRovers.includes(rover.toLowerCase())
      ? rover.toLowerCase()
      : "curiosity";
    const url = `${apiUrlMars}/${roverName}/photos?sol=${sol}&api_key=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 2.1 Latest Sol for a given rover
export async function fetchLatestSol(rover) {
  try {
    const url = `${apiUrlMarsManifest}/${rover}?api_key=${apiKey}`;
    const response = await axios.get(url);
    return response.data.photo_manifest.max_sol;
  } catch (error) {
    throw error;
  }
}

// 3. EPIC (Earth Polychromatic Imaging Camera)
export async function fetchEpicImages() {
  try {
    const response = await axios.get(`${apiUrlEpic}?api_key=${apiKey}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 4. library api , images and videos
export async function searchNasaMedia(
  query,
  mediaType = "",
  yearStart = "",
  yearEnd = "",
) {
  try {
    let url = `${apiUrlLibrary}/search?q=${encodeURIComponent(query)}`;
    if (mediaType) url += `&media_type=${mediaType}`;
    if (yearStart) url += `&year_start=${yearStart}`;
    if (yearEnd) url += `&year_end=${yearEnd}`;
    const response = await axios.get(url);
    return response.data.collection.items;
  } catch (error) {
    throw error;
  }
}

// 5. epic image by date
export async function fetchEpicImagesByDate(date) {
  try {
    const response = await axios.get(
      `${apiUrlEpic}/date/${date}?api_key=${apiKey}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 6. Buscar imagens de vários temas do universo
export async function fetchUniverseThemes() {
  const themes = [
    "universe",
    "cosmos",
    "galaxy",
    "stars",
    "jupiter",
    "saturn",
  ];
  const results = {};
  for (const theme of themes) {
    try {
      // Busca apenas imagens, 12 primeiros resultados de cada tema
      const items = await searchNasaMedia(theme, "image");
      results[theme] = items.slice(0, 12);
    } catch (error) {
      results[theme] = [];
    }
  }
  return results;
}
