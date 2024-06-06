const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

// Post

export const postEndpoints = {
  CreatePost: BASE_URL + "/post/create",
  FetchPost: BASE_URL + "/post/fetch",
  FetchPosts: BASE_URL + "/post/fetch-all",
  FetchCategoryPosts: BASE_URL + "/post/fetch-category-posts",
  UpdatePost : BASE_URL + "/post/update",
  DeletePost : BASE_URL + "/post/delete"
};

// Category

export const categoryEndpoints = {
  FetchCategory: BASE_URL + "/category/fetch",
};

// Comments

export const commentEndpoints = {
  CreateComment: BASE_URL + "/comment/create",
  FetchComment: BASE_URL + "/comment/get",
  UpdateComment:BASE_URL + "/comment/update",
  DeleteComment: BASE_URL + "/comment/delete"
};

// Uploads
export const uploadEndpoints = {
  UploadImage: BASE_URL + "/upload/image",
  UpdateProfile : BASE_URL + "/upload/update-profile-image"
};

// Profile APIs

export const profileEndpoints = {
  FetchMyPosts: BASE_URL + "/profile/my-posts",
};
