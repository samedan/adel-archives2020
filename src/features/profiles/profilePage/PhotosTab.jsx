import React, { useState } from "react";
import { Grid, Header, Button, Tab, Card, Image } from "semantic-ui-react";
import PhotoUploadWidget from "./../../../app/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";
import {
  getUserPhotos,
  setMainPhoto,
  deletePhotoFromCollection,
} from "../../../app/firestore/firestoreService";
import { useDispatch } from "react-redux";
import { listenToUserPhotos } from "../profileActions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteFromFirebaseStorage } from "./../../../app/firestore/firebaseService";

export default function PhotosTab({ profile, isCurrentLoggedUser }) {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  // UPdating the Main photo
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });

  // Deleting photos
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  // Set MAIN Photo
  async function handleSetMainPhoto(photo, target) {
    // fix 'loading' indicator on several buttons
    setUpdating({ isUpdating: true, target: target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  //  delete Photo
  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {isCurrentLoggedUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? "Cancel" : "Add photo"}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      //  Target loading with individual 'name'
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      basic
                      color="green"
                      disabled={photo.url === profile.photoURL}
                      content="Main"
                    />
                    <Button
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      name={photo.id}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      basic
                      color="red"
                      icon="trash"
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
