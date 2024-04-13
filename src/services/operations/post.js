import { apiConnector } from "../apiConnector";
import { postEndpoints } from "../APIs";
import { toast } from "react-hot-toast";
import post, { setPost, setCurrentPost, setLoading } from "../../slices/post";

const {
  FetchPost,
  FetchPosts,
  CreatePost,
  DeletePost,
  UpdatePost,
  FetchCategoryPosts,
} = postEndpoints;

export function createPost(
  userID,
  token,
  title,
  thumbnail,
  categoryID,
  content,
  navigate
) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true))
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector(
        "POST",
        CreatePost,
        {
          userID,
          token,
          title,
          thumbnail,
          categoryID,
          content,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("CreatePost API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      navigate("/createPost");
      // dispatch(setCategory(response.data.category));
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

export function updatePost(
  token,
  postID,
  title,
  categoryID,
  content,
  navigate
) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true))
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector(
        "PUT",
        UpdatePost,
        {
          postID,
          title,
          categoryID,
          content,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Update Post API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
      // navigate("/createPost");
      // dispatch(setCategory(response.data.category));
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

export function fetchPost(postID, setCurrentPost) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true))
    console.log(postID);
    console.log(post.title);
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector(
        "GET",
        FetchPost + `?postID=${postID}`
      );
      console.log("CReatePost API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
      // dispatch(setCurrentPost(response.data.post));
      setCurrentPost(response.data.post);
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector("GET", FetchPosts);
      console.log("CReatePost API RESPONSE............", response);

      // console.log(response.data.success);
      if (!response) {
        dispatch(setPost(null));
      } else {
        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        // toast.success(response.data.message);
        dispatch(setPost(response.data.posts));
      }
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      // toast.error(error.response.data.message);
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

export function fetchCategoryPosts({ categoryID, setBlogs }) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
      dispatch(setLoading(true))
    console.log("Category ID:", categoryID);
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector(
        "GET",
        FetchCategoryPosts + `?categoryID=${categoryID}`
      );
      console.log("fetch category posts API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
      // dispatch(setPost(response.data.posts));
      setBlogs(response.data.posts);
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}

export function deletePost(token, postID) {
  return async (dispatch) => {
    //   const toastId = toast.loading("Loading...");
    //   dispatch(setLoading(true))
    console.log("POstID:", postID);
    try {
      // const {name, email, password} = formData;
      const response = await apiConnector(
        "DELETE",
        DeletePost,
        {
          postID: postID,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Delete API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success(response.data.message);
      //  dispatch(setPost(response.data.posts));
    } catch (error) {
      console.log("fetchCategory API ERROR............", error);
      toast.error(error.response.data.message);
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId);
  };
}
