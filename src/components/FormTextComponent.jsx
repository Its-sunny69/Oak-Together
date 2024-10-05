import { useState, useEffect } from "react";
import { useField } from "formik";

function FormTextComponent({ label, styleClasses, ...props }) {
    
    const [field, meta] = useField(props);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(meta.touched && meta.error);
    }, [meta.touched, meta.error]);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>

            <input className={styleClasses + (hasError ? " border-red-600" : "")} {...field} {...props} />

            {hasError ? (
                <div className="text-red-600 text-sm">{meta.error}</div>
            ) : null}
        </>
    );
}

export default FormTextComponent;