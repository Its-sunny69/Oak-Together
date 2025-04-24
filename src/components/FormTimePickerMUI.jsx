import { useField, useFormikContext } from "formik";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

function FormTimePickerMUI({
    label,
    id,
    name,
    containerStyleClasses = "",
    labelStyleClasses = "",
    pickerStyleObject = {},
    ...props
}) {
    const [field, meta] = useField(name);
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();
    const hasError = meta.touched && meta.error;
    const errorColor = "#d20000";

    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <div className={containerStyleClasses}>
            <label htmlFor={id} className={labelStyleClasses}>{label}</label>

            <FormControl fullWidth>
                <TimePicker
                    {...props}
                    open={pickerOpen}
                    slotProps={{
                        textField: {
                            size: "small",
                            readOnly: true,
                            onClick: () => {
                                setPickerOpen(true);
                            },
                            sx: {
                                backgroundColor: pickerStyleObject.backgroundColor || "white",

                                fieldset: {
                                    border: hasError
                                        ? `1px solid ${errorColor}`
                                        : pickerStyleObject.border || "1px solid #60D6D9",
                                    borderRadius: pickerStyleObject.borderRadius || "8px",
                                    padding: pickerStyleObject.padding || "2px 8px",
                                },

                                "& .MuiSvgIcon-root": {
                                    color: hasError? errorColor: (pickerStyleObject.iconColor || "#60D6D9"),
                                },
                            },
                        },
                    }}
                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                    onChange={(value) => {
                        const formatted = value ? value.format("HH:mm") : "";
                        setFieldValue(id, formatted);
                    }}
                    onOpen={() => {
                        setPickerOpen(true);
                    }}
                    onClose={() => {
                        setPickerOpen(false);
                        if (meta.touched) return;
                        setFieldTouched(id, true)
                        setTimeout(() => {validateField(id)}, 150);
                    }}
                />
            </FormControl>

            {hasError && (
                <p className="text-sm" style={{ color: errorColor }}>
                    {meta.error}
                </p>
            )}
        </div>
    );
}

export default FormTimePickerMUI;
