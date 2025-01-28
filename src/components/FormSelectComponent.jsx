import {useState, useEffect} from "react";
import { useField } from "formik";

function FormSelectComponent({ label, setSelected, containerStyleClasses, labelStyleClasses, inputStyleClasses, ...props }) {
    
    const [field, meta] = useField(props);
    const hasError = meta.error && meta.touched;

    useEffect(() => {
        if (setSelected) setSelected(meta.value);
    }, [meta.value])

    return (
        <div className={containerStyleClasses}>
            <label className={labelStyleClasses} htmlFor={props.id || props.name}>{label}</label>

            <select className={inputStyleClasses + (hasError ? " border-red-600" : "")} {...field} {...props} />

            {hasError ? (
                <div className="text-red-600 text-sm">{meta.error}</div>
            ) : null}
        </div>
    );
}

export default FormSelectComponent;