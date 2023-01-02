import express from "express";
import controllers from "../controllers/auth";

const { Login, sellerSignup, userSignup } = controllers;

const Router = express.Router();

Router.post("/login", Login);
Router.post("/signup", userSignup);
Router.post("/sellerSignup", sellerSignup);

export default Router;
