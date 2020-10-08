import React from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import { getUserProfile } from "./../../../app/firestore/firestoreService";
import { listenToSelectedUserProfile } from "./../profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();

  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);
  // check to see if is the current user logged in
  // so not to goto Firebase again for the profile
  let profile;

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  });

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }
  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentLoggedUser={currentUser.uid === profile.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentLoggedUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
