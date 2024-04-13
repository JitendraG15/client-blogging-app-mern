import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../APIs";

const { SIGNUP_API , LOGIN_API} = endpoints;


// Signup
export function signup(userName, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true))
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector("POST", SIGNUP_API, {
       userName,
       email, password
      });
      console.log("SIGNUP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId);
  };
}


// Login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success(response.data.message)
      dispatch(setToken(response.data.token ))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.userName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user",JSON.stringify(response.data.user));
      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// Logout
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("User Logged Out Successfully")
    navigate("/")
  }
}
