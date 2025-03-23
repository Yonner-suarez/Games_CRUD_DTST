import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// import trashIcon from '../../assets/delete_icon.svg';

const acceptedFileExtensions = [
    '.png'
];

const maxFileSize = 200 * 1024 * 1024;

const DropZone = ({ onFilesUpload, removeFile, label, uploadedFile, required }) => {
    const [uploadError, setUploadError] = useState(false);

    useEffect(() => {
        if (uploadedFile) {
            setUploadError(false);
        }
    }, [uploadedFile]);

    const onDrop = useCallback((acceptedFiles) => {
        onFilesUpload(acceptedFiles);
    }, [onFilesUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { acceptedFileExtensions },
        maxSize: maxFileSize,
        onDropRejected: () => {
            setUploadError(true);
        }
    });

    return (
        <section >
            <div>
                <label style={{
                    color: uploadError ? "#BA1A1A" : "#001B3D",
                    fontFamily: "Assistant",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "130%",
                    letterSpacing: "0.024px",
                }}>{label}</label>
                {required ? <span style={{
                    color: "#BA1A1A", fontFamily: "Assistant", fontSize: "12px", fontStyle: "normal", fontWeight: "600", lineHeight: "100%", letterSpacing: "0.018px,", margin: "0", padding: "0",
                }}>*</span> : null}
            </div>
            <div {...getRootProps()} style={{
                border: uploadError ? "medium dashed #BA1A1A" : "medium dashed rgb(151, 144, 128)",
                width: "100%",
                height: "56px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
            }}>
                <input {...getInputProps()} />
                {uploadedFile ?
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: '0px 15px',
                        width: '100%',
                    }}>
                        <span>{uploadedFile.name}</span>
                        <button  onClick={removeFile} type="button" className="btn btn-warning">
                            eliminar
                        </button>
                    </div> :
                    isDragActive ?
                        <p style={{ color: uploadError ? "#BA1A1A" : '' }}>Suelta el archivo aquí ...</p> :
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }} >
                            {
                                uploadError ? "UploadIconRead" : ""
                            }
                            {/* <img src={uploadError ? uploadErrorIcon : uploadIcon} alt='upload icon' /> */}
                            <div style={{ width: "auto" }}>
                                <span style={{
                                    color: uploadError ? "#BA1A1A" : "#001B3D",
                                    fontFamily: "Roboto",
                                    fontSize: "14px",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    lineHeight: "20px",
                                }}>Arrastra la imagen o </span>
                                <span style={{
                                    color: uploadError ? "#BA1A1A" : '#725C00'
                                }}>adjúntala desde tu dispositivo</span>
                            </div>
                        </div>
                }
            </div>
            {uploadError && <p style={{ color: '#BA1A1A' }}>Adjunta un documento PDF</p>}
        </section >
    );
};

export default DropZone;