import { useState, useEffect, useRef } from "react";
import { ErrorMessage } from "formik";
import { GalleryIcon } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ImageUploadField({ form, containerStyleClasses, labelStyleClasses, inputStyleClasses, previewSizeClasses, id, name, label }) {
    const [previewSrc, setPreviewSrc] = useState(null);
    const fileInputRef = useRef(null);

    const selectedFile = form.values[id];
    const FILE_SIZE_LIMIT = 3 * 1024 * 1024; // 3 MB;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

    useEffect(() => {
        if (selectedFile && selectedFile.size < FILE_SIZE_LIMIT && SUPPORTED_FORMATS.includes(selectedFile.type)) {
            console.log(form.values[id])
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewSrc(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // Cleanup
        } else {
            setPreviewSrc(null);
        }
    }, [selectedFile]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={containerStyleClasses}>
            <label className={labelStyleClasses} htmlFor={id}>{label}</label>

            <div
                onClick={handleImageClick}
                className={`relative ${previewSizeClasses} border-2 border-dashed border-[#60D6D9] rounded-lg flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#2572CF] `}
            >
                {previewSrc ?
                    (
                        <>
                            <div className="absolute top-2 right-2">
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="text-red-500 bg-[rgba(255,255,255,0.75)] font-semibold text-xl rounded-full py-1 px-1.5"
                                    onClick={(e) => {
                                        setPreviewSrc(null);
                                        e.stopPropagation();
                                    }}
                                />
                            </div>
                            <img src={previewSrc} alt="Preview" className="object-cover h-40 w-full rounded-lg" />
                        </>
                    ) :
                    (
                        <img src={GalleryIcon} className="w-full mix-blend-multiply rounded-lg opacity-25" />
                    )
                }
            </div>

            <input
                ref={fileInputRef}
                id={id}
                name={name}
                type="file"
                accept="image/*"
                className={
                    inputStyleClasses +
                    (form.errors[id] && form.touched[id] ? " border-red-600" : "")
                }
                hidden // hides the default UI for file input
                onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    form.setFieldValue(id, file);
                    form.setTouched({ ...form.touched, [id]: true });
                    setTimeout(() => {
                        form.validateField(id);
                    }, 0);
                }}
            />

            <ErrorMessage name={name}>
                {(msg) => <div className="text-red-600 text-sm">{msg}</div>}
            </ErrorMessage>
        </div>
    );
}

export default ImageUploadField;