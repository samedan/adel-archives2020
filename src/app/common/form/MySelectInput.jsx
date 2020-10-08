import React from "react";
import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

export default function MySelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    // !!meta.error returns TRUE or FALSE if the error object contains text
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        // d= what's inside the dropdown props
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
