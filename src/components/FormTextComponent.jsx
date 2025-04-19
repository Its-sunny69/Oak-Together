import { useField } from "formik";

function FormTextComponent({ label, inpRef, isTextArea, containerStyleClasses, labelStyleClasses, inputStyleClasses, ...props }) {
  const [field, meta] = useField(props);
  const hasError = meta.error && meta.touched;

  return (
    <div className={containerStyleClasses}>
      <label className={labelStyleClasses} htmlFor={props.id || props.name}>{label}</label>

      {isTextArea ? (
        <textarea
          className={inputStyleClasses + " min-h-16 h-16 max-h-[20vh]" + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
          ref={inpRef}
          maxLength={200}
        />
      ) : (
        <input
          className={inputStyleClasses + (hasError ? " border-red-600" : "")}
          {...field}
          {...props}
          ref={inpRef}
        />
      )}

      {hasError ? (
        <div className="text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default FormTextComponent;
