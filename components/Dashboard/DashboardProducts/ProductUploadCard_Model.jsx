"use client";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const ProductUploadCard_Model = ({ handleFile, fieldsData = null }) => {  
  useEffect(() => {
    // This is where we will initialize Model Viewer.
    // We'll do this asynchronously because it's a heavy operation.
    import("@google/model-viewer")
      .then(({ ModelViewerElement }) => {
        // Here, ModelViewerElement is now available and can be used.
        customElements.get("model-viewer") ||
          customElements.define("model-viewer", ModelViewerElement);
      })
      .catch((error) => {
        console.error("Error loading Model Viewer", error);
      });
  }, []); // We pass an empty dependency array so this runs once on mount.

  const [glbFile, setGLBFile] = useState(null);
  const [usdzFile, setUSDZFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

    useEffect(() => {
      if(fieldsData != null) {
        setGLBFile(fieldsData.glb);
        setUSDZFile(fieldsData.usdz);
        setPosterFile(fieldsData.poster);
      }
    }, [fieldsData])

  const fileSelected = (file, fileType) => {
    console.log("FILE SELECTED" + file);
    console.log("FILE TYPE - " + fileType);

    switch (fileType[0]) {
      case "glb":
        setGLBFile(file);
        break;
      case "usdz":
        setUSDZFile(file);
        break;
      case "png":
        setPosterFile(file);
        break;
      default:
        console.log(
          "File type not found - 'fileSelected(file, fileType)' [switch statement]"
        );
        break;
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
      <div className="grid grid-cols-3 xl:grid-cols-4 h-auto gap-4 w-full">
        <ModelShowcaseCard
          glbLink={glbFile}
          usdzLink={usdzFile}
          posterLink={posterFile}
        />
        <FileUploadCard
          displayName={"GLB"}
          fileTypes={["glb", "gltf"]}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
        />
        <FileUploadCard
          displayName={"USDZ"}
          fileTypes={["usdz"]}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
        />
        <FileUploadCard
          displayName={"Poster"}
          fileTypes={["png", "webp"]}
          fileSelectedCallback={fileSelected}
          handleFile={handleFile}
        />
      </div>
    </section>
  );
};

export default ProductUploadCard_Model;

export function ModelShowcaseCard({ glbLink, usdzLink, posterLink }) {
  if (glbLink && usdzLink && posterLink) {
    return (
      <section className="flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full xl:col-span-1 h-60 xl:h-auto">
        <model-viewer
          src={glbLink}
          ios-src={usdzLink}
          poster={posterLink}
          alt="3D model of the product"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
          auto-rotate
          ar
          ar-scale="fixed"
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="bg-blue-500 shadow-lg p-2 text-white text-xs rounded-lg w-full bottom-0 absolute"
          >
            View product in AR
          </button>
        </model-viewer>
      </section>
    );
  } else {
    return (
      <section className="flex items-center justify-center rounded-2xl bg-white shadow-md col-span-full xl:col-span-1 h-60 xl:h-auto">
        <div className="flex flex-col gap-4 font-semibold text-center text-sm">
          <div
            className={`flex items-center gap-2 ${
              glbLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {glbLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>GLB uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>GLB not uploaded</h1>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              usdzLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {usdzLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>USDZ uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>USDZ not uploaded</h1>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-2 ${
              posterLink ? "text-green-500" : "text-red-500"
            }`}
          >
            {posterLink ? (
              <>
                <CheckCircleIcon width={24} />
                <h1>Poster uploaded</h1>
              </>
            ) : (
              <>
                <XCircleIcon width={24} />
                <h1>Poster not uploaded</h1>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export function FileUploadCard({
  displayName,
  fileTypes,
  fileSelectedCallback,
  handleFile,
}) {
  const [file, setFile] = useState(null);
  const [isTypeError, setTypeError] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [isInDropZone, setIsInDropZone] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  const handleChange = (file) => {
    setFile(file);
    setTypeError(false);
    console.log("file dropped " + fileTypes[0]);
    if (fileTypes[0] == "glb" || fileTypes[0] == "usdz")
      handleUpload("tryitproductmodels", file, fileTypes, setUploadPercent);
    else if (fileTypes[0] == "webp" || fileTypes[0] == "png")
      handleUpload("tryitproductimages", file, fileTypes, setUploadPercent);
  };
  const handleTypeError = (err) => {
    setTypeError(true);
  };
  const handleDragStateChange = (dragging) => {
    setIsInDropZone(dragging);
  };

  const handleUpload = async (
    bucketName,
    file,
    fileType,
    precentageCallback
  ) => {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let precentage = Math.floor((loaded * 100) / total);

        precentageCallback(precentage);

        console.log("options");
        console.log(precentage);
        if (precentage < 100) {
          console.log(precentage);
        }
      },
    };
    // Get signed URL from your backend
    const response = await axios.get(
      "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/get_signed_url",
      {
        params: { bucket_name: bucketName, file_type: fileType[0] },
      }
    );
    const { upload_url } = response.data;
    const { file_key } = response.data;

    console.log("signed url response ");
    console.log(response.data);
    console.log("the file going to be uploaded ");

    console.log(file);
    // Upload file to S3 using signed URL
    const responseUpload = await axios.put(upload_url, file, options); //Check for error - Modal + Make field blank
    console.log("response " + JSON.stringify(responseUpload));
    console.log("response text " + responseUpload.statusText);

    if (responseUpload.statusText === "OK") {
      if (fileTypes[0] == "glb" || fileTypes[0] == "usdz") {
        handleFile(
          fileType[0],
          `https://${bucketName}.s3.amazonaws.com/${file_key}`
        );
      } else {
        handleFile(
          "poster",
          `https://${bucketName}.s3.amazonaws.com/${file_key}`
        );
      }

      fileSelectedCallback(
        `https://${bucketName}.s3.amazonaws.com/${file_key}`,
        fileTypes
      );

      setUploadError(false);
    } else {
      setUploadError(true);
    }
  };

  return (
    <FileUploader
      types={fileTypes}
      multiple={false}
      handleChange={handleChange}
      onTypeError={handleTypeError}
      onDraggingStateChange={handleDragStateChange}
      hoverTitle={"Drop " + displayName + " Here"}
      dropMessageStyle={{
        backgroundColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        fontWeight: 900,
        fontSize: 1.25 + "rem",
        textTransform: "capitalize",
        color: "rgb(50 50 50 / 1.0)",
      }}
    >
      <div className={"w-full h-full"}>
        <button
          className={`hidden lg:flex flex-col p-4 gap-6 w-full h-full items-center justify-center rounded-2xl border-2 border-tif-lavender border-dashed hover:bg-tif-blue/20 hover:shadow-md transition-all ${
            isInDropZone ? "bg-tif-blue/20 shadow-md" : ""
          } ${isTypeError || isUploadError ? "bg-red-100" : ""} ${
            file && !isUploadError ? "bg-green-100" : ""
          }`}
        >
          <div
            className={`flex items-center justify-center px-4 py-2 gap-4 text-white bg-gradient-to-br from-tif-blue to-tif-pink rounded-xl shadow-md ${
              isInDropZone ? "blur" : "blur-none bgt"
            }`}
          >
            <CloudArrowUpIcon width={32} />
            <h1 className="font-black text-xl uppercase">{displayName}</h1>
          </div>
          <h1
            className={`font-semibold  text-sm text-center text-tif-lavender leading-snug ${
              isInDropZone ? "blur" : "blur-none"
            } ${isTypeError || isUploadError ? "hidden" : ""} ${
              file ? "hidden" : ""
            }`}
          >
            Drag & Drop
            <br />
            - or -
            <br />
            Click To Upload File
          </h1>
          <ProgressBar
            progressPercent={uploadPercent}
            doShow={uploadPercent > 0 && uploadPercent < 100}
          />
          <h1
            className={`px-2 w-full font-semibold text-tif-lavender truncate ${
              file && !isUploadError ? "" : "hidden"
            }`}
          >
            {file ? file.name : ""}
            <br />
            {file ? (file.size / 1024 / 1024).toFixed(2) + " MB" : ""}
          </h1>

          <h1
            className={`font-medium text-red-500 ${
              isTypeError ? "flex" : "hidden"
            }`}
          >
            Unsupported File Type
            <br />
            Please drop a{" "}
            {fileTypes.map(
              (type, index) =>
                type +
                (fileTypes.length > 1 && index != fileTypes.length - 1
                  ? " or "
                  : "")
            )}{" "}
            file
          </h1>

          <h1
            className={`font-medium text-red-500 ${
              isUploadError ? "flex" : "hidden"
            }`}
          >
            Upload Failed! Please try again!
          </h1>
        </button>

        <button className="lg:hidden flex w-full h-full items-center justify-center px-4 py-2 gap-4 rounded-xl text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md transition-all">
          <CloudArrowUpIcon
            width={24}
            className={`${isInDropZone ? "blur" : "blur-none"}`}
          />
          <h1
            className={`font-black text-md uppercase ${
              isInDropZone ? "blur" : "blur-none"
            }`}
          >
            {displayName}
          </h1>
        </button>
      </div>
    </FileUploader>
  );
}

export function ProgressBar({ progressPercent = 0, doShow }) {
  return (
    <div
      className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${
        doShow ? "" : "hidden"
      }`}
    >
      <div
        className={`bg-tif-lavender text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
        style={{ width: `${progressPercent}%` }}
      >
        <h1 className="w-full truncate">{progressPercent + "%"}</h1>
      </div>
    </div>
  );
}
