import React, { useState } from "react";
import axios from "axios";
import { uploadEndpoints } from "../../../services/APIs";
import { useDispatch } from "react-redux";
import { setThumbnail } from "../../../slices/post";
const { UploadImage } = uploadEndpoints;

const ImageUploader = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(UploadImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.url);
      dispatch(setThumbnail(response.data.url));
    } catch (err) {
      setError("Upload failed");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-4">Image Uploader</h1>

      <input
        type="file"
        onChange={handleImageChange}
        className="border p-2 mb-4"
        aria-label="Select an image to upload"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        aria-label="Upload selected image"
        tabIndex="0"
      >
        Upload
      </button>

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-xs" />
        </div>
      )}

      {error && <p className="text-red-500 mt-4" role="alert">{error}</p>}
    </div>
  );
};

export default ImageUploader;
