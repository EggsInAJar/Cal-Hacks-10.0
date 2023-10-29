
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./RestaurantMap.css";

const RestaurantMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2Lp98v2BVcvGfVTKA3SUYqIrED86_F6E", // figure out how to secure this
  });

  console.log("Spinning up restaurant map", isLoaded)
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="RestaurantMap">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker
  position={{ lat: 18.52, lng: 73.85 }}
  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
 />
        </GoogleMap>
      )}
    </div>
  );
};

export default RestaurantMap;