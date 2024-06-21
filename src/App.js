import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/Home";
import Navbar from "./components/comman/NavBar";
import Signup from "./pages/Signup";
import LoginPage from "./pages/Login";
import CreatePostPage from "./pages/CreatePost";
import PostDetail from "./pages/Post";
// import Dashboard from "./pages/Dashboard";
import MyPosts from "./pages/MyPosts";
import AI from "./pages/CategoryBlogs/AI";
import CN from "./pages/CategoryBlogs/CN";
import CS from "./pages/CategoryBlogs/CS";
import AdminPage from "./pages/Admin";
import Analytics from "./pages/AnalyticsPage";
import CMS from "./pages/CMS";

// import { fetchMyPosts } from "./services/operations/profile";
import EditPost from "./pages/EditPost";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/comman/Footer";

function App() {
  // const getBtnClick = () => {
  //   window.addEventListener("keydown", (event) => {
  //     const keyPressed = event.key;
  //     console.log("User Pressed ", keyPressed, " Key");
  //   });
  // };

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Track key presses and send data to server
      const eventData = {
        eventType: "KeyPress",
        key: event.key,
        timestamp: Date.now(),
        elementClicked: event.target.id,
      };
      console.log(eventData);
    };

    const handleFocusChange = (event) => {
      // Track focus changes and send data to server
      const eventData = {
        eventType: "FocusChange",
        elementId: event.target.id,
        timestamp: Date.now(),
      };
      console.log(eventData);
      // sendDataToServer(eventData);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("focusin", handleFocusChange);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("focusin", handleFocusChange);
    };
  }, []);
  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <Navbar className="absolute top-0 left-0 w-full z-50" />

      {/* Content */}
      <div className="mt-16 w-full min-h-screen">
        {" "}
        {/* Add margin to push content below Navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createPost" element={<CreatePostPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/dashboard" element={<ProfilePage />} />
          <Route path="/dashboard/myposts" element={<MyPosts />} />
          <Route path="/dashboard/editPost" element={<EditPost />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/cn" element={<CN />} />
          <Route path="/cs" element={<CS />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/cms" element={<CMS />} />
        </Routes>
      </div>

      {/* <Footer className="" /> */}
    </div>
  );
}

export default App;
