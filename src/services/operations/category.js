import { apiConnector } from "../apiConnector";
import {categoryEndpoints} from "../APIs";
import { toast } from "react-hot-toast"
import {setCategory} from "../../slices/category"

const {FetchCategory} = categoryEndpoints;


export function fetchCategory() {
    return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      // dispatch(setLoading(true))
      try {
        // const {name, email, password} = formData;
        const response = await apiConnector("GET", FetchCategory);
        console.log("fetchCategory API RESPONSE............", response);
  
        console.log(response.data.success);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        // toast.success(response.data.message);
        dispatch(setCategory(response.data.category));
      } catch (error) {
        console.log("fetchCategory API ERROR............", error);
        toast.error(error.response.data.message);
      }
      // dispatch(setLoading(false))
      // toast.dismiss(toastId);
    };
  }