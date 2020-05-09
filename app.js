// const express = require("express") same with line2: using babel
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const handleHome = (req, res) => res.send("Hi from Home");

const handleProfile = (req, res) => res.send("You are on my profile")

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

export default app;