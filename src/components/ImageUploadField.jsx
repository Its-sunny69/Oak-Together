import { useState, useEffect, useRef } from "react";
import { ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ImageUploadField({ form, containerStyleClasses, labelStyleClasses, inputStyleClasses, previewStyleClasses, id, name, label, placeholder, placeholderImg, placeholderImgStyleClasses, placeholderTextStyleClasses }) {

    const fileInputRef = useRef(null);

    const [previewSrcs, setPreviewSrcs] = useState([]); // List of preview sources for selected images
    const selectedFiles = form.values[id];

    const FILE_SIZE_LIMIT = 3 * 1024 * 1024; // 3 MB;
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

    const isValidImage = (imageFile) => {
        return imageFile.size <= FILE_SIZE_LIMIT && SUPPORTED_FORMATS.includes(imageFile.type);
    }

    useEffect(() => {
        if (Array.isArray(selectedFiles) && selectedFiles.length > 0) {
            // Clear existing previews to avoid memory leaks
            const nextPreviewSrcs =
                selectedFiles
                    .map(file =>
                    ({
                        imageName: file.name,
                        imageUrl: URL.createObjectURL(file),
                        isValid: isValidImage(file)
                    }));

            setPreviewSrcs(nextPreviewSrcs);

            return () => {
                nextPreviewSrcs.forEach(obj => URL.revokeObjectURL(obj.imageUrl));
            };
        } else {
            setPreviewSrcs([]);
        }
    }, [selectedFiles]);


    const handlePreviewClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageRemoval = (e, imageName) => {
        const nextPreviewSrcs = previewSrcs.filter((oldPreviewSrc) => imageName != oldPreviewSrc.imageName);
        const nextFieldValue = form.values[id].filter((fileObj) => fileObj.name !== imageName);

        setPreviewSrcs(nextPreviewSrcs);
        form.setFieldValue(id, nextFieldValue);

        setTimeout(() => {
            form.validateField(id);
        }, 0);

        e.stopPropagation();
    }

    const getUniqueImageFiles = (oldImageFiles, newImageFiles) => {
        const addedImageNames = new Set();
        const uniqueImageFiles = [];

        oldImageFiles.forEach(file => {
            addedImageNames.add(file.name);
            uniqueImageFiles.push(file);
        })
        newImageFiles.forEach(file => {
            if (addedImageNames.has(file.name)) return;
            addedImageNames.add(file.name);
            uniqueImageFiles.push(file);
        })

        return uniqueImageFiles;
    }

    const updateFieldValue = (e) => {
        const newImageFiles = [...e.currentTarget.files];
        const oldImageFiles = form.values[id];

        const allUniqueImageFiles = getUniqueImageFiles(oldImageFiles, newImageFiles);

        form.setFieldValue(id, allUniqueImageFiles);
        form.setTouched({ ...form.touched, [id]: true });
        setTimeout(() => {
            form.validateField(id);
        }, 0);
    }

    return (
        <div className={containerStyleClasses}>
            <label className={labelStyleClasses} htmlFor={id}>{label}</label>

            <div
                onClick={handlePreviewClick}
                className={previewStyleClasses}
            >
                {previewSrcs.length > 0 ?
                    <div className="flex gap-3 justify-center">
                        {
                            previewSrcs
                                .map(({ imageName, imageUrl, isValid }, index) =>
                                    <div className={`relative rounded-lg ${isValid ? "" : "border-2 border-[#D20000] shadow-[rgba(208,0,0,0.6)_2px_0px_10px_3px]"}`} key={index}>

                                        <div className="absolute top-5 right-5">

                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                className="text-red-500 bg-[rgba(255,255,255,0.75)] font-semibold text-xl rounded-full py-1 px-1.5"
                                                onClick={(e) => handleImageRemoval(e, imageName)}
                                            />
                                        </div>

                                        <img src={imageUrl} alt="Preview" className="object-cover h-40 w-full rounded-lg" />
                                    </div>
                                )
                        }
                    </div>
                    :
                    <div className={`flex flex-col items-center`}>
                        <img src={placeholderImg} className={placeholderImgStyleClasses} />
                        <div className={placeholderTextStyleClasses}>{placeholder || "Upload Photo"}</div>
                    </div>
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
                onChange={updateFieldValue}
                multiple
            />

            <ErrorMessage name={name}>
                {
                    (msg) =>
                        <div className="flex flex-col gap-1 text-red-600 text-sm">
                            {msg}
                        </div>
                }
            </ErrorMessage>
        </div>
    );
}

export default ImageUploadField;