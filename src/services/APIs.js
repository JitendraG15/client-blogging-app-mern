const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

// Post

export const postEndpoints = {
  CreatePost: BASE_URL + "/post/createPost",
  FetchPost: BASE_URL + "/post/fetchPost",
  FetchPosts: BASE_URL + "/post/fetchPosts",
  FetchCategoryPosts: BASE_URL + "/post/fetchCategoryPosts",
  UpdatePost : BASE_URL + "/post/updatePost",
  DeletePost : BASE_URL + "/post/deletePost"
};

// Category

export const categoryEndpoints = {
  FetchCategory: BASE_URL + "/category/fetchCategory",
};

// Comments

export const commentEndpoints = {
  CreateComment: BASE_URL + "/comment/createComment",
};

// Uploads
export const uploadEndpoints = {
  UploadImage: BASE_URL + "/upload/uploadImage",
  UpdateProfile : BASE_URL + "/upload/updateProfileImage"
};

// Profile APIs

export const profileEndpoints = {
  FetchMyPosts: BASE_URL + "/myprofile/fetchmyposts",
};
