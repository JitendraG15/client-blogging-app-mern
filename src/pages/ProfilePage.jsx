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

      const response = await axios.post(uploadEndpoints.UpdateProfile + `?id=${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-200 text-center p-4">
              <img
                src={user.image}
                alt="Profile"
                className="rounded-full h-32 w-32 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{user.userName}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              <ul className="text-sm">
                <li className="mb-2">
                  <span className="font-semibold mr-2">Joined On :</span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </li>
                <li className="mb-2">
                  <span className="font-semibold mr-2">Role:</span>
                  {user.role.toUpperCase()}
                </li>
              </ul>
            </div>

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl mb-4">Update Profile Image</h1>
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 mb-4"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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
