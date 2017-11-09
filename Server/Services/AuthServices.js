let authServices = {
  isUserAuthenticated: isUserAuthenticated
};

function isUserAuthenticated(req, res, next) {
  /*eslint-disable no-console*/

  console.log("Yes user is authenticated");
  next();
}

export default authServices;
