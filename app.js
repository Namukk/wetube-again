// const express = require("express") same with line2: using babel
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares"; //m은 r보다 먼저 알파벳 순으로
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
//router.js에서 export default하지 않았기 때문에 7번처럼 import.
const app = express();

app.use(helmet()); //for the safety of application
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging
app.use(localsMiddleware); //27, 28, 29 보다 위에 있어야 다 적용됨.(순서 중요)

// app.use((req, res, next) => {})
// app.use(function(req, res, next) {})
// const localsMiddleware = (req, res, next) => {}  세개 다 같은 것

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
