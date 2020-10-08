import React, { useState } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService";
import { useSelector } from "react-redux";
import UnauthModal from "../../auth/UnauthModal";

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  // JOIN Event
  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
      toast.success("You joined the event");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // LEAVE Event
  async function handleUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
      toast.info("You left the event");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid />

          <Segment basic>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  {/* <p>{event.date.toString()}</p> */}
                  <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                  <p>
                    Hosted by{" "}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          {!isHost && (
            <>
              {isGoing ? (
                <Button onClick={handleUserLeaveEvent} loading={loading}>
                  Cancel My Place
                </Button>
              ) : (
                <Button
                  loading={loading}
                  color="teal"
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true)
                  }
                >
                  JOIN THIS EVENT
                </Button>
              )}
            </>
          )}

          {isHost && (
            <Button
              as={Link}
              to={`/manage/${event.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
