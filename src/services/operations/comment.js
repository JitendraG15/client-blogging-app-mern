import { apiConnector } from "../apiConnector";
import {commentEndpoints} from "../APIs";
import { toast } from "react-hot-toast"
// import {setCategory} from "../../slices/category"

const {CreateComment} = commentEndpoints


export function createComment(userID, postID, content, navigate) {
    return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      // dispatch(setLoading(true))
      console.log(userID, postID, content);
      try {
        
        const response = await apiConnector("POST", CreateComment + `?userID=${userID}&postID=${postID}`, {
            content
        });
        console.log("create comment API RESPONSE............", response);
  
        console.log(response.data.success);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // toast.success(response.data.message);
        navigate(`/post/${postID}`)
        // dispatch(setCategory(response.data.category));
      } catch (error) {
        console.log("create comment API ERROR............", error);
        toast.error(error.response.data.message);
      }
      // dispatch(setLoading(false))
      // toast.dismiss(toastId);
    };
  }