let userApi = {
  home: home,
  getUsers: getUsers,
  addUser: addUser,
  upgradeUser: upgradeUser
};

function home(req, res) {
  return res.sendFile(path.join(__dirname, "../dist/index.html"));
}

function getUsers(req, res) {
  return res.json([
    {
      id: 1,
      firstName: "Chulbul",
      lastName: "pandey",
      email: "xyz@konfinity.com"
    },
    { id: 2, firstName: "agent", lastName: "smith", email: "new@matrix.com" },
    { id: 3, firstName: "good", lastName: "god", email: "heaven@god.com" }
  ]);
}

function addUser(req, res) {
  return res.send("User added to database");
}

function upgradeUser(req, res) {
  return res.send("user upgraded");
}

export default userApi;
