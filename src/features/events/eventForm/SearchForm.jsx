import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";

export default function SearchForm({
  setSearchedTerm,
  events,
  setSearchedArray,
}) {
  const [name, setName] = useState("");
  const [editions, setEditionsCounter] = useState(0);
  // const [returnedList, setReturnedList] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`);
  };

  function handleDeleteTerm(evt) {
    evt.preventDefault();
    setName("");
    setSearchedArray(events);
  }

  let returnedList = [];
  function returnSearchedEvents(searchedTerm) {
    // console.log(searchedTerm);
    events.map((event) => {
      // if (searchTerm === null) {
      //   console.log("condifiton vide");
      // }
      if (
        searchedTerm === "" ||
        event.description.toLowerCase().includes(searchedTerm.toLowerCase())
      ) {
        returnedList.push(event);
      }
    });
    setSearchedArray(returnedList);
    // if (searchTerm === "") {
    //   console.log("vide");
    // }
    // console.log(searchTerm);
    // console.log(returnedList.length);
  }

  function handleChange(name) {
    setName(name);
    setSearchedTerm(name);
    returnSearchedEvents(name);
    setEditionsCounter(returnedList.length);
    // console.log(returnedList);
  }
  return (
    <Segment>
      <form onSubmit={handleSubmit} className="ui form">
        <div className="ui teal sub header">Cherchez un annonceur</div>
        {/* <label>
        Annonceur: */}
        <div className="ui action input">
          <input
            type="text"
            value={name}
            placeholder="Cherchez..."
            onChange={(e) => handleChange(e.target.value)}
            className="mobile-search-input"
            // onChange={(e) => setName(e.target.value)}
          />
          {/* </label> */}
          {/* <input type="submit" value="Submit" /> */}
          <Button
            onClick={handleDeleteTerm}
            className="ui button search-button"
          >
            x
          </Button>
        </div>
        {name !== "" && (
          <p>
            Editions trouvées avec l'annonceur:{" "}
            <strong style={{ color: "green" }}>{editions}</strong>
          </p>
        )}
      </form>
    </Segment>
  );
}
