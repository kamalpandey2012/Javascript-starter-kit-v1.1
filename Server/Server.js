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
