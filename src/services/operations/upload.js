import { apiConnector } from "../apiConnector";
import {uploadEndpoints} from "../APIs";
import { toast } from "react-hot-toast"

const {UploadImage} = uploadEndpoints

export function uploadImage(image, navigate) {
    return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true))
      try {
        // const {name, email, password} = formData;
        const response = await apiConnector("POST", UploadImage, {
         userID,
         title,
         thumbnail,
         categoryID,
         content
        });
        console.log("CReatePost API RESPONSE............", response);
  
        console.log(response.data.success);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // toast.success(response.data.message);
        navigate("/createPost")
        // dispatch(setCategory(response.data.category));
      } catch (error) {
        console.log("fetchCategory API ERROR............", error);
        toast.error(error.response.data.message);
      }
      // dispatch(setLoading(false))
      // toast.dismiss(toastId);
    };
  }