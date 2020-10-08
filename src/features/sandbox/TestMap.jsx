import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({ location }) {
  //   const defaultProps = {
  //     center: {
  //       lat: 59.95,
  //       lng: 30.33,
  //     },
  //     zoom: 11,
  //   };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBS_HC1pbmryLh_LjC_qxcGBenjF2IMW7g" }}
        center={location.center}
        zoom={location.zoom}
      >
        <AnyReactComponent
          lat={location.center.lat}
          lng={location.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

// export default SimpleMap;
