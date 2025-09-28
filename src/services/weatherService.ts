export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  city: string;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function ensureApiKey(): string {
  if (!API_KEY) {
    throw new Error('Missing VITE_OPENWEATHER_API_KEY in environment.');
  }
  return API_KEY;
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const key = ensureApiKey();
  const url = `${BASE_URL}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(key)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API error (${res.status})`);
  }
  const json = await res.json();
  return mapResponse(json);
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const key = ensureApiKey();
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(key)}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather API error (${res.status})`);
  }
  const json = await res.json();
  return mapResponse(json);
}

function mapResponse(json: any): WeatherData {
  const temp = json?.main?.temp ?? 0;
  const humidity = json?.main?.humidity ?? 0;
  const windSpeed = json?.wind?.speed ?? 0;
  const description = (json?.weather?.[0]?.description ?? '').toString();
  const city = (json?.name ?? '').toString();
  return { temp, humidity, windSpeed, description, city };
}
