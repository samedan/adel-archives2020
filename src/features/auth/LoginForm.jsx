import React from "react";
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
import { openModal } from "./../../app/common/modals/modalReducer";

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Se connecter">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Merci de renseigner une adresse e-mail valide")
            .email("Merci de renseigner une adresse e-mail valide"),
          password: Yup.string().required("Merci de renseigner votre MDP"),
        })}
        onSubmit={async (
          values,
          // use 'setSubmitting' from Formik to change the icon
          { setSubmitting, setErrors }
        ) => {
          try {
            // firebaseService
            await signInWithEmail(values);
            setSubmitting(false);
            toast.success("Connexion réussie");
            dispatch(closeModal());
          } catch (error) {
            // console.log(error);
            // 'setErrors' from Formik transfers the errors to the Form
            // we give the message a 'key'=auth to use it
            setErrors({ auth: error.message });
            toast.info(
              "Merci de renseigner une adresse e-mail et un MDP valides"
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
                placeholder="Adresse e-mail"
              />
              <MyTextInput
                name="password"
                placeholder="MDP"
                type="password"
                autoComplete="off"
              />
              {/* // Formik errors */}
              {errors.auth && (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: 10 }}
                  // content={errors.auth}
                  content={
                    "Le nom d'utilisateur ou le mot de passe est incorrect."
                  }
                />
              )}

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                fluid
                size="large"
                color="teal"
                content="Je me connecte"
              />
            </Form>
            <Divider horizontal>Ou</Divider>
            <Grid centered style={{ margin: "15px" }}>
              {/* <Button as={Link}>Réinitialisez votre mot de passe</Button> */}
              <Button
                fluid
                color="blue"
                content="Réinitialisez votre mot de passe"
                // onClick={() => handleOpenLoginModal("LoginForm")}
                onClick={() =>
                  dispatch(
                    openModal({
                      modalType: "ResetPasswordForm",
                    })
                  )
                }
              />
            </Grid>
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
}
