import { useRef } from "react";
import { useFormikContext } from "formik";
import PlaceAutocomplete from "./PlaceAutocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function FormikPlaceAutocomplete({
    id,
    name,
    type,
    label,
    placeholder,
    containerClassname,
    inputClassname,
    labelClassname,
    handlePlaceSelect,
    placeSelected,
    setPlaceSelected,
    selectionCompulsory,
    usesMap,
    disabled
}) {
    const { touched, errors, values, setFieldValue, setFieldTouched } = useFormikContext();
    const formInputRef = useRef();

    const hasError = touched[id] && (errors[id] || (selectionCompulsory && !placeSelected));
    const showClearIcon = values[id]?.length > 0 && !disabled;

    const handleInputChange = (e) => {
        setFieldValue(id, e.target.value);
        setPlaceSelected(false);
    }

    const handleInputClear = () => {
        setFieldValue(id, "");
        setPlaceSelected(false);
    }

    return (
        <PlaceAutocomplete
            usesMap={usesMap}
            onPlaceSelect={handlePlaceSelect}
            customInputRef={formInputRef}
            setInputValue={(value) => setFieldValue(id, value)}
        >
            <div className={containerClassname}>
                <label className={labelClassname} htmlFor={name}>{label}</label>
                <div className="relative flex items-center">
                    <input
                        className={
                            inputClassname +
                            (hasError ? " border-red-600" : "")
                        }
                        id={id}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        ref={formInputRef}
                        value={values[id]}
                        onBlur={() => setFieldTouched(id, true)}
                        onChange={handleInputChange}
                        disabled={disabled}
                    />
                    {showClearIcon &&
                        <div
                            className="h-3/4 absolute right-1 flex items-center px-2 rounded-r-lg text-[14px] cursor-pointer bg-white"
                            onClick={handleInputClear}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    }
                </div>
                {hasError ?
                    <div className="text-red-600 text-sm">
                        {errors[id] ? errors[id] : "Select a location from suggestion list"}
                    </div>
                    : null
                }
            </div>
        </PlaceAutocomplete>
    )
}

export default FormikPlaceAutocomplete