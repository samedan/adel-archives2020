/* global google */
import React, { useState } from "react";
import { Segment, Header, Button, Confirm } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";

import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import { clearSelectedEvent, listenToSelectedEvent } from "./../eventActions";
import {
  cancelEventToggle,
  updateEventInFirestore,
  addEventToFirestore,
} from "./../../../app/firestore/firestoreService";
import { useEffect } from "react";

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();

  // LOcal state
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { selectedEvent } = useSelector((state) => state.eventsState);

  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== "/createevent") return;
    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname]);

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    annonceurs: [],
    // city: {
    //   address: "1- avenue pasteur",
    //   latLng: "null",
    // },
    url: "",
    version: "",
    // venue: {
    //   address: "16oiuoi op",
    //   latLng: " null",
    // },
    date: "",
  };

  // VALIDATION
  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a Title"),
    category: Yup.string().required("You must provide a Category"),
    description: Yup.string().required("You must provide a Description"),
    version: Yup.string().required("You must provide a Version"),
    // version: Yup.object().shape({
    //   version: Yup.string().required("You must provide a Version"),
    // }),
    // venue: Yup.object().shape({
    //   annonceurs: Yup.string().required(fCategory

    //     "You must provide at least one annonceur"
    //   ),
    // }),
    date: Yup.string().required("You must provide a date"),
  });

  // Confirm or not Cancelling the event
  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);

      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  // read event from firestore
  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedEvent?.id &&
      location.pathname !== "/createevent", // if no 'id', then false
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading) {
    return <LoadingComponent content="Loading event..." />;
  }
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/archives");
          } catch (error) {
            console.log(error);
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {/* Data sent from Formik to the submit button to know if dirty or not */}
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event details" />
            <MyTextInput
              autoComplete="off"
              name="title"
              placeholder="Event Title"
            />
            <MyTextInput
              autoComplete="off"
              name="version"
              placeholder="Version"
            />
            <MyTextInput autoComplete="off" name="url" placeholder="URL" />
            <MySelectInput
              options={categoryData}
              name="category"
              placeholder="Category"
            />
            <MyTextArea name="description" placeholder="Description" rows="3" />
            <Header sub color="teal" content="Event Location details" />
            {/* <MyPlaceInput
              autoComplete="off"
              name="city"
              placeholder="Enter your city"
            /> */}
            {/* <MyPlaceInput
              autoComplete="off"
              name="version"
              placeholder="Version"
            /> */}
            {/* <MyPlaceInput
              autoComplete="off"
              name="yourcity"
              placeholder="Enter your city"
            /> */}
            {/* <MyPlaceInput
              disabled={!values.city.latLng}
              name="venue"
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000, // km
                types: ["establishment"],
              }}
              autoComplete="false"
            /> */}
            <MyDateInput
              name="date"
              tilmeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              placeholderText="Event Date"
              type="date"
              autoComplete="off"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              // cursor={(!isValid || !dirty || isSubmitting) && "no-drop"}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            {/* CANCEL BUTTON */}
            {selectedEvent && (
              <Button
                loading={loadingCancel}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "green" : "red"}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

            <Button
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "This will reactivate the event. Are you sure?"
            : "This will cancel the event. Are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
