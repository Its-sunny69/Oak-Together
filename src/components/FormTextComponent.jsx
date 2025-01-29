import { useState, useEffect } from "react";
import { useField } from "formik";

function FormTextComponent({ label, isTextArea, containerStyleClasses, labelStyleClasses, inputStyleClasses, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <div className={containerStyleClasses}>
      <label className={labelStyleClasses} htmlFor={props.id || props.name}>{label}</label>

      {isTextArea ? (
        <textarea
          className={inputStyleClasses + " min-h-16" + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
          maxLength={200}
        />
      ) : (
        <input
          className={inputStyleClasses + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
        />
      )}

      {hasError ? (
        <div className="text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormTextComponent;
