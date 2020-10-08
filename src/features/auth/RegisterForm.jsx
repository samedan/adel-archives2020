import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { registerInFirebase } from "./../../app/firestore/firebaseService";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

export default function RegisterForm() {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size="mini" header="Register to ReVents">
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          displayName: Yup.string().required("You must provide a User Name"),
          email: Yup.string()
            .required("You must provide a valid email adress")
            .email(),
          password: Yup.string().required(),
        })}
        onSubmit={async (
          values,
          // use 'setSubmitting' from Formik to change the icon
          { setSubmitting, setErrors }
        ) => {
          try {
            // firebaseService
            await registerInFirebase(values);
            setSubmitting(false);
            dispatch(closeModal());
            toast.info(
              "Thank you for registering. You have been signed in with your new credentials."
            );
          } catch (error) {
            // Transfer errors to Formik form
            setErrors({ auth: error.message });
            setSubmitting(false);
            console.log(error);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <MyTextInput name="displayName" placeholder="Display name" />
            <MyTextInput name="email" placeholder="Email Adress" />
            <MyTextInput
              name="password"
              placeholder="Password "
              type="password"
            />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: "10px" }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Register"
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
