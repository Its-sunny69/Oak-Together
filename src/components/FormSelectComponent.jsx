import {useState, useEffect} from "react";
import { useField } from "formik";

function FormSelectComponent({ label, styleClasses, setSelected, ...props }) {
    
    const [field, meta] = useField(props);
    const hasError = meta.error && meta.touched;

    useEffect(() => {
        if (setSelected) setSelected(meta.value);
    }, [meta.value])

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>

            <select className={styleClasses + (hasError ? " border-red-600" : "")} {...field} {...props} />

            {hasError ? (
                <div className="text-red-600 text-sm">{meta.error}</div>
            ) : null}
        </>
    );
}

export default FormSelectComponent;