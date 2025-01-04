import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HomePage from "./pages/home/Home";
import PageLayout from "./components/PageLayout";
import Posts from "./pages/posts/Home";
import Post from "./pages/post/Home";
import SignIn from "./pages/sign-in/Home";
import Profile from "./pages/profile/Home";
import CreatePost from "./pages/posts/components/create-post/Home";
import routes from "./utils/PageRoutes";
import MyPosts from "./pages/profile/components/profile-tabs/tabs/my-posts/MyPosts";
import MyRoomie from "./pages/my-roomie/Home";
import MyRequests from "./pages/profile/components/profile-tabs/tabs/my-requests/MyRequests";
import PropertyInfo from "./pages/my-roomie/components/tabs/PropertyInfo";

const queryClient = new QueryClient();

const AppProvider = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={routes.posts.posts} element={<Posts />} />
              <Route path={routes.posts.postById} element={<Post />} />
              <Route path={routes.authenticate.signIn} element={<SignIn />} />
              <Route path={routes.profile.home} element={<Profile />} />
              <Route
                path={routes.profile.myRequests}
                element={<MyRequests />}
              />
              <Route path={routes.profile.myPosts} element={<MyPosts />} />
              <Route path={routes.posts.createPost} element={<CreatePost />} />
              <Route path={routes.myRoomie.home} element={<MyRoomie />} />
              <Route
                path={routes.myRoomie.property}
                element={<PropertyInfo />}
              />
            </Routes>
          </PageLayout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<AppProvider />);
