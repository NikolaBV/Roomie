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

const queryClient = new QueryClient();

const AppProvider = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<AppProvider />);
