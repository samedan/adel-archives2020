import React from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import Iframe from "react-iframe";
import LoadingComponent from "../../app/layout/LoadingComponent";

import {
  Button,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import { setInnactiveLink } from "../events/eventActions";

export function TestItemRight({
  eventId,
}) {
  //   console.log(match.params.id);
  const urlId = eventId;
  const { events } = useSelector(
    (state) => state.eventsState
  );
  const { loading } = useSelector(
    (state) => state.async
  );

  const dispatch = useDispatch();

  function handleResetEventSearch() {
    dispatch(setInnactiveLink());
  }

  function loadEvent(urlId) {
    const el = events.find(
      (event) => event.id === urlId
    );
    return (
      <>
        <Grid
          width={16}
          style={{
            marginBottom: "10px",
          }}
        >
          <Grid.Column width={7}>
            <h2>
              <span className="annonce-title">
                Edition:
              </span>{" "}
              {el?.title}
            </h2>
            <span className="annonce-title">
              Annonceurs:
            </span>{" "}
            {el?.description}
          </Grid.Column>
          <Grid.Column
            width={3}
            align="right"
          >
            <Button
              color="blue"
              onClick={() =>
                handleResetEventSearch()
              }
            >
              <Icon name="arrow circle left" />
              <br />
              Retour aux résultats
            </Button>
            {/* <Image  height="30" src={`./assets/categoryImages/${el?.category}.jpg`}  />           */}
          </Grid.Column>
          <Grid.Column width={6}>
            <div
              className="ui left labeled button"
              role="button"
              tabIndex="0"
            >
              <a
                className="ui red right pointing basic label"
                href={el?.url}
                target="_blank"
              >
                Ouvrir dans un nouvel
                onglet
              </a>
              <button className="ui red button">
                <i
                  aria-hidden="true"
                  className="linkify icon"
                ></i>
              </button>
            </div>

            {/* <Button as='div' labelPosition='right'>
          <Button color='blue'>
            <Icon name='plus' />
            uvrir dans un nouvel onglet
          </Button>
          <Label as='a' target="_blank" to={el?.url} basic color='red' pointing='left'>
            2,048
          </Label>
        </Button> */}
            {/* {
            <a href={el?.url} target="_blank" style={{textDecoration:'underline'}}>
              Ouvrir dans un nouvel onglet
            </a>
          } */}
          </Grid.Column>
        </Grid>

        <Iframe
          url={
            el?.url ||
            "https://google.com"
          }
          width="100%"
          height="900"
          id="myId"
          className="myClassname"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "600px",
          }}
          display="initial"
          position="relative"
          // onLoad={this.hideSpinner}
          loading={loading}
        />
      </>
    );
  }

  if (!loading) {
    // return returnEvent(activeItem);
    // setActiveItem(urlId);
    return (
      <>
        <div>{loadEvent(urlId)}</div>
        {/* <p>{urlId}</p> */}
      </>
    );
  } else {
    return <LoadingComponent />;
  }
}
