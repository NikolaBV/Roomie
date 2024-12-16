const staticUri = {
  posts: "/posts",
  signIn: "/sign-in",
  profile: "/profile",
};
const posts = {
  posts: staticUri.posts,
  postById: `${staticUri.posts}/:id`,
  createPost: "/create-post",
};
const authenticate = {
  signIn: `${staticUri.signIn}/sign-in`,
};
const profile = {
  home: staticUri.profile,
  myPosts: `${staticUri.profile}/my-posts`,
  myRequests: `${staticUri.profile}my-requests`,
};
const routes = {
  profile,
  posts,
  authenticate,
};

export default routes;
