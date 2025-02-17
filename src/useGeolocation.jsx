import { useState } from "react";

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  const findMyCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  return { coordinates, error, findMyCoordinates };
};

export default useGeolocation;
