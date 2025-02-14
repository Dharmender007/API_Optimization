import React, { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCity } from "../store/weatherSlice";
import { Card, CardContent, Typography, TextField, CircularProgress, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const WeatherDisplay = () => {
  const city = useSelector((state: RootState) => state.weather.city);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(city);
  

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.trim().length > 2) {
        dispatch(setCity(inputValue));
      }
    }, 800);

    return () => clearTimeout(handler); 
  }, [inputValue, dispatch]);

  const { data, isLoading, error } = useWeather(city);

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        padding: 2,
      }}
    >
      <Card 
        sx={{
          width: "90%",
          maxWidth: 500,
          padding: 3,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 3,
          background: "white",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
          🌤 Weather App
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <SearchIcon sx={{ mr: 1, color: "#666" }} />
          <TextField
            fullWidth
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter city name"
          />
        </Box>

        {isLoading && <CircularProgress sx={{ color: "#4facfe" }} />}
        {error && <Typography color="error">❌ Error fetching data</Typography>}

        {data && (
          <CardContent>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
              {data.name} - {data.sys.country}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", mt: 1 }}>
              🌡 {data.main.temp}°C
            </Typography>
            <Typography variant="body1" sx={{ color: "#555", mt: 1 }}>
              Humidity: {data.main.humidity}%
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              Condition: {data.weather[0].description.toUpperCase()}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default WeatherDisplay;
