import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  START_DATE,
  CLEAR_SELECTED_EVENT,
  SET_ACTIVE_LINK,
  SET_CURRENT_MONTH,
  SET_SEARCHED_TERM,
  SET_INACTIVE_LINK,
  SET_SEARCHED_ARRAY,
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "./../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  deleteEventInFirestore,
  fetchEventsFromFirestore,
} from "./../../app/firestore/firestoreService";

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
}

export function setCurrentLink(
  eventId
) {
  return {
    type: SET_ACTIVE_LINK,
    payload: eventId,
  };
}
export function setInnactiveLink(
  eventId
) {
  return {
    type: SET_INACTIVE_LINK,
  };
}
export function setCurrentMonth(month) {
  return {
    type: SET_CURRENT_MONTH,
    payload: month,
  };
}

export function deleteEvent(eventId) {
  // return {
  //   type: DELETE_EVENT,
  //   payload: eventId,
  // };

  return async function (dispatch) {
    dispatch({
      type: DELETE_EVENT,
      payload: eventId,
    });
    dispatch(asyncActionStart());
    try {
      await deleteEventInFirestore(
        eventId
      );

      dispatch({
        type: DELETE_EVENT,
        payload: eventId,
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError(error));
    }
  };
}

export function fetchEvents(
  filter,
  startDate,
  limit,
  lastDocSnapshot
) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(
        filter,
        startDate,
        limit,
        lastDocSnapshot
      ).get();
      // get the last retrievded event
      const lastVisible =
        snapshot.docs[
          snapshot.docs.length - 1
        ];
      // try to find if there ar emore vents
      const moreEvents =
        snapshot.docs.length >= limit;
      const events = snapshot.docs.map(
        (doc) => dataFromSnapshot(doc)
      );
      dispatch({
        type: FETCH_EVENTS,
        payload: {
          events,
          moreEvents,
          lastVisible,
        },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({
      type: SET_FILTER,
      payload: value,
    });
  };
}
export function setSearchedItem(value) {
  return function (dispatch) {
    // dispatch(clearEvents());

    dispatch({
      type: SET_SEARCHED_TERM,
      payload: value,
    });
  };
}
export function setSearchedArrayInRedux(
  value
) {
  return function (dispatch) {
    // dispatch(clearEvents());
    dispatch({
      type: SET_SEARCHED_ARRAY,
      payload: value,
    });
  };
}
export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearEvents());
    dispatch({
      type: START_DATE,
      payload: date,
    });
  };
}

export function listenToSelectedEvent(
  event
) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
}

export function listenToEventChat(
  comment
) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comment,
  };
}

export function clearSelectedEvent() {
  return {
    type: CLEAR_SELECTED_EVENT,
  };
}

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  };
}
