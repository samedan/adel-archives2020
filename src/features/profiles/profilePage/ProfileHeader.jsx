import React, { useState, useEffect } from "react";
import {
  followUser,
  getFollowingDoc,
  unfollowUser,
} from "../../../app/firestore/firestoreService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Segment,
  Grid,
  Item,
  Header,
  Statistic,
  Reveal,
  Button,
  Divider,
} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { setFollowUser, setUnfollowUser } from "./../profileActions";
import { CLEAR_FOLLOWINGS } from "./../profileConstants";

export default function ProfileHeader({ profile, isCurrentLoggedUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { followingUser } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isCurrentLoggedUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFollowingDoc().then(() => setLoading(false));
    return () => dispatch({ type: CLEAR_FOLLOWINGS });
  }, [dispatch, profile.id, isCurrentLoggedUser]);

  // Follow user
  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
      dispatch(setFollowUser());
      toast.success(`You are now following ${profile.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Un-Follow User
  async function handleUnfollowUser() {
    setLoading(true);
    try {
      await unfollowUser(profile);
      dispatch(setUnfollowUser());
      toast.info(`You are no longer following ${profile.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/assets/user.png"}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentLoggedUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button
                    fluid
                    color={followingUser ? "teal" : "grey"}
                    content={followingUser ? "Following" : "Not following"}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button
                    onClick={
                      followingUser
                        ? () => handleUnfollowUser()
                        : () => handleFollowUser()
                    }
                    basic
                    fluid
                    color={followingUser ? "red" : "green"}
                    content={followingUser ? "Unfollow" : "Follow"}
                    loading={loading}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
