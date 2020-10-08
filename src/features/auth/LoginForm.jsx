import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { signInWithEmail } from "./../../app/firestore/firebaseService";
import SocialLogin from "./SocialLogin";

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
            dispatch(closeModal());
          } catch (error) {
            // 'setErrors' from Formik transfers the errors to the Form
            // we give the message a 'key'=auth to use it
            setErrors({ auth: error.message });
            setSubmitting(false);
            // console.log(error);
            dispatch(closeModal());
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
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
            {/* <Divider horizontal>Or</Divider>
            <SocialLogin /> */}
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
