import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { uploadEndpoints } from "../services/APIs";
import LoadingSpinner from "../components/comman/Spinner";

function ProfilePage() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        uploadEndpoints.UpdateProfile + `?id=${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (err) {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
           {/* <p className="text-center text-2xl">Welcome to the Admin Panel!</p> */}
          <div className="bg-gray-200 text-center p-4">
            <img
              src={user.image}
              alt="Profile"
              className="rounded-full h-32 w-32 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{user.userName}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Details</h3>
            <ul className="text-sm mb-6">
              <li className="mb-2">
                <span className="font-semibold mr-2">Joined On:</span>
                {new Date(user.createdAt).toLocaleDateString()}
              </li>
              <li className="mb-2">
                <span className="font-semibold mr-2">Role:</span>
                {user.role.toUpperCase()}
              </li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h1 className="text-2xl font-semibold mb-4">Update Profile Image</h1>
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Update
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
