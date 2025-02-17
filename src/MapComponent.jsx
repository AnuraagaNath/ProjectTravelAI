import React, { useEffect, useState } from "react";
import "./App.css";
import useGeolocation from "./useGeolocation";

const api_key = "NrvGGBedjiJrHYseyPqsozRSNbt1pTG9";
const tt = window.tt;

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const { coordinates, error, findMyCoordinates } = useGeolocation();
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");


  // useEffect(() => {
  //   const mapInstance = tt.map({
  //     key: api_key,
  //     container: "map",
  //     center: coordinates ? [coordinates.longitude, coordinates.latitude] : [78.9, 20.5], // Center on user's location if available
  //     zoom: 3,
  //     language: "en-GB",
  //   });
  //   setMap(mapInstance);
  // }, []);
  useEffect(() => {
    const waitForTomTom = async () => {
      while (!window.tt) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const mapInstance = tt.map({
        key: api_key,
        container: "map",
        center: coordinates ? [coordinates.longitude, coordinates.latitude] : [78.9, 20.5], // Center on user's location
        zoom: 4,
        language: "en-GB",
      });

      setMap(mapInstance);
    };

    waitForTomTom();
  }, [coordinates]); // Re-run when location changes



  const geocodeAddress = async (address) => {
    try {
      const response = await tt.services.fuzzySearch({
        key: api_key,
        query: address,
      });
      return response.results[0].position;
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Could not geocode address.");
    }
  };

  const calculateRoute = async () => {
    if (!originInput || !destinationInput) {
      alert("Please enter both origin and destination.");
      return;
    }
    
    try {
      const origin = await geocodeAddress(originInput);
      const destination = await geocodeAddress(destinationInput);
      
      if (originMarker) originMarker.remove();
      if (destinationMarker) destinationMarker.remove();
      
      const newOriginMarker = new tt.Marker().setLngLat([origin.lng, origin.lat]).addTo(map);
      const newDestinationMarker = new tt.Marker().setLngLat([destination.lng, destination.lat]).addTo(map);
      
      setOriginMarker(newOriginMarker);
      setDestinationMarker(newDestinationMarker);
      
      const result = await tt.services.calculateRoute({
        key: api_key,
        locations: [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat],
        ],
        routeType: "fastest",
      });
      
      const geojson = result.toGeoJson();
      
      if (map.getLayer("route")) {
        map.removeLayer("route");
        map.removeSource("route");
      }
      
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        paint: {
          "line-color": "blue",
          "line-width": 5,
        },
      });
      
      map.fitBounds(
        [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat],
        ],
        { padding: 50 }
      );
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  return (
    <div>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter origin"
          value={originInput}
          onChange={(e) => setOriginInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
        />
        <button onClick={calculateRoute}>Get Route</button>
      </div>
    </div>
  );
};

export default MapComponent;



