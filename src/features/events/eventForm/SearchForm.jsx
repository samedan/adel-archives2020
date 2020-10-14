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

export default function EventForm({ events }) {
  //   console.log(events);
  const dispatch = useDispatch();

  // LOcal state
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { selectedEvent } = useSelector((state) => state.eventsState);

  const { loading, error } = useSelector((state) => state.async);

  //   useEffect(() => {
  //     if (location.pathname !== "/createevent") return;
  //     dispatch(clearSelectedEvent());
  //   }, [dispatch, location.pathname]);

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
    // title: Yup.string().required("You must provide a Title"),
    // category: Yup.string().required("You must provide a Category"),
    // description: Yup.string().required("You must provide a Description"),
    // version: Yup.string().required("You must provide a Version"),
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

  const searchTerm = "";
  function handleSearchResults(searchTerm) {
    return events.map((event) => {
      console.log(event.description && event.description.includes(searchTerm));
    });
  }

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
            <Header sub color="teal" content="Cherchez un annonceur" />
            <MyTextInput
              autoComplete="off"
              name="annonceur"
              placeholder="Annonceur"
            />

            <Button
              loading={isSubmitting}
              disabled={false}
              // cursor={(!isValid || !dirty || isSubmitting) && "no-drop"}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              floated="right"
              content="Cancel"
              onSubmit={() => handleSearchResults(searchTerm)}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
