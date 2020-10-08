import React from "react";
import { useField, useFormikContext } from "formik";
import { FormField, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDateInput({ label, ...props }) {
  // in place of helpers from Formik - see MySelectInput
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    // !!meta.error returns TRUE or FALSE if the error object contains text
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
