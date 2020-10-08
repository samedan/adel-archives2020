import React from "react";
import { Segment, Header, Button, Label } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUserPassword } from "../../app/firestore/firebaseService";
import { toast } from "react-toastify";

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Segment>
      <Header dividing size="large" content="Mon compte" />
      {currentUser.providerId === "password" && (
        <>
          <Header color="teal" sub content="Changer le MDP" />
          <p>Utilisez ce formulaire pour changer le mot de passe</p>
          <Formik
            initialValues={{ newPassword1: "", newPassword2: "" }}
            validationSchema={Yup.object({
              newPassword1: Yup.string().required("MDP est obligatoire"),
              newPassword2: Yup.string().oneOf(
                [Yup.ref("newPassword1"), null],
                "Les mots de passe ne correspondent pas"
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
                toast.success("Mot de passe modifié avec succès");
              } catch (error) {
                setErrors({ auth: error.message });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, isSubmitting, isValid, dirty }) => (
              <Form className="ui form">
                <MyTextInput
                  name="newPassword1"
                  type="password"
                  placeholder="Nouveau Mot de passe"
                />
                <MyTextInput
                  name="newPassword2"
                  type="password"
                  placeholder="Confirmer le nouveau MDP"
                />
                {errors.auth && (
                  <Label
                    basic
                    color="red"
                    style={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}
                <Button
                  style={{ display: "block" }}
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                  size="large"
                  positive
                  content="Update password"
                />
              </Form>
            )}
          </Formik>
        </>
      )}
      {currentUser.providerId === "facebook.com" && (
        <>
          <Header color="teal" sub content="Facebook account" />
          <p>Please visit Facebook to update your account</p>
          <Button
            icon="facebook"
            color="facebook"
            as={Link}
            to="https://facebook.com"
            content="Go to Facebook"
          />
        </>
      )}
      {currentUser.providerId === "google.com" && (
        <>
          <Header color="teal" sub content="Google account" />
          <p>Please visit Google to update your account</p>
          <Button
            icon="google"
            color="google plus"
            as={Link}
            to="https://facebook.com"
            content="Go to Google"
          />
        </>
      )}
    </Segment>
  );
}
