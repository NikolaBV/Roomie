const staticUri = {
  root: "/",
  posts: "/posts",
  signIn: "/sign-in",
  profile: "/profile",
  myRoomie: "/my-roomie",
};
const posts = {
  posts: staticUri.posts,
  postById: `${staticUri.posts}/:id`,
  createPost: "/create-post",
};
const authenticate = {
  signIn: `${staticUri.signIn}`,
};
const profile = {
  home: staticUri.profile,
  myPosts: `${staticUri.profile}/my-posts`,
  myRequests: `${staticUri.profile}/my-requests`,
};

const myRoomie = {
  home: staticUri.myRoomie,
};
const routes = {
  staticUri,
  profile,
  posts,
  authenticate,
  myRoomie,
};

export default routes;
