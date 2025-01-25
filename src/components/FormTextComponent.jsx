import { useState, useEffect } from "react";
import { useField } from "formik";

function FormTextComponent({ label, isTextArea, styleClasses, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      {isTextArea ? (
        <textarea
          className={styleClasses + " min-h-16" + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
          maxLength={200}
        />
      ) : (
        <input
          className={styleClasses + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
        />
      )}

      {hasError ? (
        <div className="text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
}

export default FormTextComponent;
