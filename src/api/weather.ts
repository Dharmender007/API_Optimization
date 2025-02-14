import axios from "axios";

const API_KEY = "e53151e5af9eec57186bd4783539444c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";


export interface WeatherResponse {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
    }[];
    sys: {
      country: string;  
    };
  }


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Token expired.");
      alert("Weather data could not be fetched. Please check your API key or try again later.");
    }
    return Promise.reject(error);
  }
);


export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await api.get<WeatherResponse>(`?q=${city}&appid=${API_KEY}`);
  return response.data;
};
