import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../APIs";
import { toast } from "react-hot-toast";
import { setMyPosts, setLoading } from "../../slices/profileSlice";

const { FetchMyPosts } = profileEndpoints;

export function fetchMyPosts({ userID }) {
  return async (dispatch) => {
      // const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
    // console.log("USERID:", userID);

    try {
      // const {name, email, password} = formData;
      const response = await apiConnector("GET", FetchMyPosts + `?userID=${userID}`, {
        userID: userID,
      });
      console.log("Posts API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
      dispatch(setMyPosts(response.data.posts));
    } catch (error) {
      console.log("fetch my posts API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false))
    
  };
}
