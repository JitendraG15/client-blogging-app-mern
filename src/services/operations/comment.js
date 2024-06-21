import { apiConnector } from "../apiConnector";
import {commentEndpoints} from "../APIs";
import { toast } from "react-hot-toast"
import { setComments, setLoading } from "../../slices/comment";

const {CreateComment,FetchComment, UpdateComment, DeleteComment} = commentEndpoints

// API For doing comment
export function createComment(userID, postID, content, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
      console.log(userID, postID, content);
      try {
        
        const response = await apiConnector("POST", CreateComment + `?userID=${userID}&postID=${postID}`, {
            content
        });
        console.log("create comment API RESPONSE............", response);
  
        console.log(response.data.success);
        dispatch(setComments(response.data.comments))
  
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
      dispatch(setLoading(false))
      toast.dismiss(toastId);
    };
  }

  // API For doing comment
export function fetchComments(post_id) {
  return async (dispatch) => {
  //   const toastId = toast.loading("Loading...");
    dispatch(setLoading(true))
    // console.log(userID, postID, content);
    try {
      
      const response = await apiConnector("GET", FetchComment + `?post_id=${post_id}`);
      console.log("fetchcomment API RESPONSE............", response);

      // console.log("Response:",response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

    dispatch(setComments(response.data.comments))
    console.log(response.data)

      // toast.success(response.data.message);
      // navigate(`/post/${postID}`)
      // dispatch(setCategory(response.data.category));
    } catch (error) {
      console.log("fetch comment API ERROR............", error);
      // toast.error(error.response.data.message);
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

  // API for updating a comment
  export function updateComment(postID,commentID,content, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
      // console.log(userID, postID, content);
      try {
        
        const response = await apiConnector("PUT", UpdateComment + `?commentID=${commentID}`, {
            content
        });
        console.log("create comment API RESPONSE............", response);
  
        console.log(response.data.success);
        dispatch(setComments(response.data.comments))
        
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success(response.data.message);
       
        // dispatch(setCategory(response.data.category));
      } catch (error) {
        console.log("update comment API ERROR............", error);
        toast.error(error.response.data.message);
      }
      navigate(`/post/${postID}`);
      dispatch(setLoading(false))
      toast.dismiss(toastId);
    };
  }

  // API to delete a particular comment
  export function deleteComment(commentID, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
      // console.log(userID, postID, content);
      try {
        
        const response = await apiConnector("DELETE", DeleteComment + `?commentID=${commentID}`);
        console.log("create comment API RESPONSE............", response);
  
        console.log(response.data.success);
        dispatch(setComments(response.data.comments))
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success(response.data.message);
        // navigate(`/post/${postID}`)
        // dispatch(setCategory(response.data.category));
      } catch (error) {
        console.log("create comment API ERROR............", error);
        toast.error(error.response.data.message);
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId);
    };
  }