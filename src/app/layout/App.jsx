import React from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container, Grid, GridColumn } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "./../../features/sandbox/Sandbox";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "./../common/errors/ErrorComponent";
import AccountPage from "./../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "./../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import AdelPrivateRoute from "./AdelPrivateRoute";
import PasswordReset from "./../../features/auth/PasswordReset";
import AdelEventDashboard from "./../../features/events/eventDashboard/AdelEventDashboard";
import EventsFeed from "../../features/events/eventDashboard/EventsFeed";
import TestMenuLeft from "./../../features/sandbox/TestMenuLeft";
import { TestItemRight } from "../../features/sandbox/TestItemRight";

function App() {
  const { key } = useLocation();

  const { initialized } = useSelector((state) => state.async);

  // waits to see if it can read a 'user' from firebase
  if (!initialized)
    return <LoadingComponent content="Chargement des données..." />;

  return (
    <>
      <ModalManager />

      <ToastContainer position="bottom-right" hideProgressBar />
      {/* <Route exact path="/" component={HomePage} /> */}
      <AdelPrivateRoute exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar style={{ width: "100%" }} />

            <Container className="main" style={{ width: "100%" }}>
              <Grid>
                {/* <Grid.Column width="4">
                  <TestMenuLeft />
                </Grid.Column> */}
                <Grid.Column width="16">
                  {/* <EventsFeed /> */}
                  {/* <AdelPrivateRoute exact path="/events" component={EventDashboard} /> */}
                  {/* <Route exact path="/annonces/:id" component={TestItemRight} /> */}
                  {/* <PasswordReset path="passwordReset" exact /> */}
                  <AdelPrivateRoute
                    exact
                    path="/archives/:id"
                    component={EventDetailedPage}
                  />
                  <AdelPrivateRoute
                    exact
                    path="/archives"
                    component={AdelEventDashboard}
                  />
                  {/* <AdelPrivateRoute
                    path="/events/:id"
                    component={EventDetailedPage}
                  /> */}
                  <AdelPrivateRoute exact path="/sandbox" component={Sandbox} />
                  <PrivateRoute
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                    key={key}
                  />
                  <Route path="/error" component={ErrorComponent} />

                  <AdelPrivateRoute
                    path="/profile/:id"
                    component={ProfilePage}
                  />
                  <AdelPrivateRoute path="/account" component={AccountPage} />
                </Grid.Column>
              </Grid>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
