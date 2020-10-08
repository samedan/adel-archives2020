import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "./testReducer";
import { openModal } from "../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import TestMap from "./TestMap";
import { useState } from "react";

export default function Sandbox() {
  const dispatch = useDispatch();

  // Local state fro Laoding
  const [target, setTarget] = useState(null);

  // Hook that gets the data from store
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  // pass the location chosen in the Form to the Map
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <>
      <h1>testing 123</h1>
      <h3>Data is: {data}</h3>
      <Button
        name="increment"
        onClick={(e) => {
          // e.target.name = 'increment'
          setTarget(e.target.name);
          dispatch(increment(20));
        }}
        content="Increment"
        color="green"
        loading={loading && target === "increment"}
      />
      <Button
        name="decrement"
        onClick={(e) => {
          // e.target.name = 'decrement'
          setTarget(e.target.name);
          dispatch(decrement(10));
        }}
        content="Decrement"
        color="red"
        loading={loading && target === "decrement"}
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
      <div className="" style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
