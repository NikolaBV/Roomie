const staticUri = {
  root: "/",
  posts: "/posts",
  authenticate: "/auth",
  profile: "/profile",
  myRoomie: "/my-roomie",
};
const posts = {
  posts: staticUri.posts,
  postById: `${staticUri.posts}/:id`,
  createPost: "/create-post",
  createProperty: "/create-property",
};
const authenticate = {
  signIn: `${staticUri.authenticate}/signIn`,
  signUp: `${staticUri.authenticate}/signUp`,
};
const profile = {
  home: staticUri.profile,
  myPosts: `${staticUri.profile}/my-posts`,
  myRequests: `${staticUri.profile}/my-requests`,
};

const myRoomie = {
  home: staticUri.myRoomie,
  property: `${staticUri.myRoomie}/property`,
  roomies: `${staticUri.myRoomie}/roomies`,
};
const routes = {
  staticUri,
  profile,
  posts,
  authenticate,
  myRoomie,
};

export default routes;
