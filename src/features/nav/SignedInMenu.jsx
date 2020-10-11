import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutFirebase } from "../../app/firestore/firebaseService";
import { toast } from "react-toastify";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { openModal } from "../../app/common/modals/modalReducer";

export default function SignedInMenu() {
  // const { currentUser } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const { authenticated, currentUser } = useSelector(
    (state) => state.auth
  );
  // console.log(currentUserProfile);

  const { loading } = useSelector((state) => state.async);

  // redirect to '/'
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
      toast.info("Session fermée");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const dispatch = useDispatch();
  if (loading || !currentUserProfile)
    return <LoadingComponent content="Loading profile..." />;
  return (
    <>
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={currentUserProfile?.photoURL || "./assets/user.png"}
        />
        <Dropdown pointing="top right" text={currentUserProfile?.displayName}>
          <Dropdown.Menu>
            {/* <Dropdown.Item
              as={Link}
              to="/createevent"
              text="Ajouter un événement"
              icon="plus"
            /> */}
            {/* <Dropdown.Item
              as={Link}
              to={`/profile/${currentUserProfile?.id}`}
              text="Mon profile"
              icon="user"
            /> */}
            <Dropdown.Item
              text="Mon compte"
              icon="settings"
              as={Link}
              to="/account"
            />
            { 
            authenticated && currentUser.uid === "4tVNDDX96HS3T0Hi4Nx0BTjaN7A2" ?
              (
              <Dropdown.Item
              text="Register User"
              icon="signup"
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "RegisterForm",
                  })
                )
              }
            />): null


            }
            
            <Dropdown.Item
              onClick={handleSignOut}
              text="
              Déconnexion"
              icon="power"
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </>
  );
}
