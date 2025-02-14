import { useQuery } from "@tanstack/react-query";
import { fetchWeather, WeatherResponse } from "../api/weather";

export const useWeather = (city: string) => {
  return useQuery<WeatherResponse>({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false, 
  });
};
