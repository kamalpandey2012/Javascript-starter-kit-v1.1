# Javascript Starter Kit V1.1
## Backend, Database and ES6 Classes

## What we will complete in this module
1. Backend structure
2. Database connection 
3. ES6 Classes and objects

## 1. Backend Structure
In our previous version of code there were no backend code just a 'distServer.js' file. In this section we will build the full-fledged backend application. 

1. Create a folder 'Server' in the root of the directory and create 'Server.js' file inside it. This will be our new 'distServer.js' file. 
2. Copy 'distServer.js' code to 'Server.js' and remove 'distServer.js' file
3. Change 'postbuild' script in 'package.json' with modified path of our 'Server.js' file. Now run the code with changes `npm run build`. 
4. Lets start by creating other folders inside the 'Server' folder, like 'controllers', 'routes', 'utilities', 'services', and 'configs'.
5. Create 'App-Instance.js' file in Server folder with following content. 

	```
		import express from "express";
		let app = express();

		export default app;
	```
Now import it in 'Server.js' and use it as a app instance throughout the app.

6. Create a 'BaseConfig.js' file in 'Config' folder inside 'Server' folder with following content.

	```
		export default (config = {
  			port: 5001
		});

	```
	This file is used only to store Some base application settings at one place. We need to change most frequent settings only at one place after writing all the configurations regarding app. 
	
7. Use it in 'Server.js' file as follows
 	
 	```
 	import config from './Config/BaseConfig';
 	
 	app.set('port', config.port);
 	
 	...
 	// and to retrieve use app.get('port') throught the application.
 	app.listen(app.get('port'), ...)
 	
 	```

6. Create 'MainRoutes.js' file in the 'Routes' folder, 'UserController.js' file in the 'controller' folder and 'AuthServices.js' in 'Services' folder. In 'MainRoutes.js' file you will write the basic routes for now. To understand routing in express go to _express-api-guide_ and read Routing topic. https://github.com/kamalpandey2012/Express-Api-Guide

**MainRoute.js**

```
import express from "express";
import userApi from "../Controllers/UserController";
import authServices from "../Services/AuthServices";
let userRouter = express.Router();

userRouter.use(authServices.isUserAuthenticated);

userRouter
  .get("/", userApi.home)
  .get("/users", userApi.getUsers)
  .put("/users", userApi.upgradeUser)
  .post("/users", userApi.addUser);

export default userRouter;
```

Here we are just using the routing machanism of express

**UserController.js**

```
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
      id: 1,firstName: "Chulbul",lastName: "pandey",email: "xyz@konfinity.com"},
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

```

The code is self explainatory

**AuthServices.js**

```
let authServices = {
  isUserAuthenticated: isUserAuthenticated
};

function isUserAuthenticated(req, res, next) {
  /*eslint-disable no-console*/

  console.log("Yes user is authenticated");
  next();
}

export default authServices;
```
This is just a where we will write our authentication services

Now wire them up in **Server.js** by removing the previous route code and adding the following code

```
import userRouter from "./Routes/MainRoutes";
import express from "express";
...
app.use("/", userRouter);
```
The final 'Server.js' file will look like 

```
import path from "path";
import open from "open";
import compression from "compression";
import app from "./Application-Instance";
import config from "./Config/BaseConfig";
import userRouter from "./Routes/MainRoutes";
import express from "express";

app.set("port", config.port);

app.use(compression());
app.use(express.static("dist"));

app.use("/", userRouter);

app.listen(app.get("port"), function(err) {
  if (err) {
    /* eslint-disable no-console*/
    console.log(err);
  } else {
    open("http://localhost:" + app.get("port"));
  }
});
```

Now change the 'postbuild' script in 'package.json' file 

```
    "postbuild": "babel-node ./Server/Server.js" 
```

Now run `npm run build` your api will be displayed in form of table along with 'home' page rendering


After this inital setup we have lot of API's to create. Lets design our Frontend of application first then we will come back later to backend for future development

