import React, { useState } from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label, Divider, Grid } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "./../../app/firestore/firebaseService";
import { toast } from "react-toastify";
// import SocialLogin from "./SocialLogin";
import { Link } from "react-router-dom";
import { auth } from "./../../app/config/firebase";

export default function ResetPasswordForm() {
  const dispatch = useDispatch();

  // const [email, setEmail] = useState("");

  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  const [error, setError] = useState(null);
  // const onChangeHandler = (event) => {
  //   const { name, value } = event.currentTarget;

  //   if (name === "userEmail") {
  //     setEmail(value);
  //   }
  // };

  // const sendResetEmail = (event) => {
  //   event.preventDefault();
  //   auth
  //     .sendPasswordResetEmail(values)
  //     .then(() => {
  //       setEmailHasBeenSent(true);
  //       setTimeout(() => {
  //         setEmailHasBeenSent(false);
  //       }, 3000);
  //     })
  //     .catch(() => {
  //       setError("Error resetting password");
  //     });
  // };

  return (
    <ModalWrapper
      size="mini"
      header="Réinitialisez votre mot de passe"
      color="blue"
      icon="archive"
      className="reset-header"
    >
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Merci de renseigner une adresse e-mail valide")
            .email("Merci de renseigner une adresse e-mail valide"),
        })}
        onSubmit={async (
          values,
          // use 'setSubmitting' from Formik to change the icon
          { setSubmitting, setErrors }
        ) => {
          try {
            // firebaseService
            await auth.sendPasswordResetEmail(values.email);
            setEmailHasBeenSent(true);
            setTimeout(() => {
              setEmailHasBeenSent(false);
            }, 3000);
            toast.success(
              "Demande envoyée. Veuillez vérifier votre compte de messagerie dans les prochaines minutes, y compris votre dossier spam."
            );
            setSubmitting(false);

            dispatch(closeModal());
          } catch (error) {
            console.log(error);
            // 'setErrors' from Formik transfers the errors to the Form
            // we give the message a 'key'=auth to use it
            setErrors({ auth: error.message });

            toast.info(
              "Veuillez fournir l'adresse e-mail avec laquelle vous vous êtes inscrit"
            );
            setSubmitting(false);
            // console.log(error);
            // dispatch(closeModal());
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <>
            <Form className="ui form">
              <MyTextInput
                autoComplete="off"
                name="email"
                id="userEmail"
                // value={email}
                // onChange={onChangeHandler}
                placeholder="Adresse e-mail"
              />
              {/* {emailHasBeenSent && (
                <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                  An email has been sent to you!
                </div>
              )}
              {error !== null && (
                <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
                  {error}
                </div>
              )} */}

              {/* // Formik errors */}
              {errors.auth && (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: 10 }}
                  // content={errors.auth}
                  content={
                    "Veuillez fournir l'adresse e-mail avec laquelle vous vous êtes inscrit"
                  }
                />
              )}

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                fluid
                size="large"
                color="blue"
                content="Réinitializer MDP"
                // onClick={(event) => {
                //   sendResetEmail(event);
                // }}
              />
            </Form>
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
}
