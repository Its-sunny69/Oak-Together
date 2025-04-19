import { useField } from "formik";
import {
    FormControl,
    MenuItem,
    Select
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function FormSelectMUI({
    label,
    id,
    name,
    options,
    containerStyleClasses = "",
    labelStyleClasses = "",
    selectStyleObject = {},
    ...props
}) {
    const [field, meta, helpers] = useField(name);
    const hasError = meta.touched && meta.error;
    const errorColor = "#d20000";

    return (
        <div className={containerStyleClasses}>
            <label
                id={`${id}-label`}
                className={labelStyleClasses}
            >
                {label}
            </label>


            <FormControl
                error={hasError}
                size="small"
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiInputBase-root": {
                        borderRadius: selectStyleObject.borderRadius || "6px",
                        backgroundColor: selectStyleObject.backgroundColor || "white",
                        padding: selectStyleObject.padding || "2px 8px",
                        border: (hasError) ? `1px solid ${errorColor}` : selectStyleObject.border || "1px solid #60D6D9",
                        width: selectStyleObject.width || "100%",
                        transition: "all 0.2s ease"
                    },
                    "& .MuiInputBase-root.Mui-focused": {
                        outline: selectStyleObject.focusOutline || "2px solid #60D6D9",
                    },
                }}
            >
                <Select
                    {...field}
                    {...props}
                    id={id}
                    displayEmpty
                    value={field.value || ""}
                    onChange={(e) => helpers.setValue(e.target.value)}
                    IconComponent={() => (
                        <ArrowDropDownIcon
                            style={{
                                color: (hasError) ? errorColor : selectStyleObject.arrowColor || "#60D6D9",
                                marginRight: "8px"
                            }}
                        />
                    )}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                "& .MuiMenuItem-root:hover": {
                                    backgroundColor: selectStyleObject.hoverBgColor || "#60D6D9",
                                    color: selectStyleObject.hoverTextColor || "white",
                                },
                            },
                        },
                    }}
                    sx={{
                        "& fieldset": {
                            border: "none",
                        },
                    }}
                    labelId={`${id}-label`}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {hasError && (
                <div className="text-sm" style={{ color: errorColor }}>
                    {meta.error}
                </div>
            )}
        </div>
    );
}

export default FormSelectMUI;
