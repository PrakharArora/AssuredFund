import express from 'express';
import passport from "passport";

const GoogleAuth = express.Router();

GoogleAuth.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));

GoogleAuth.get("/auth/google/callback", passport.authenticate("google", {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: "http://localhost:5000/Error",
}), async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("User", req.user);
    res.redirect("http://localhost:5000/LoginSuccess");
  } else {
    res.redirect("http://localhost:5000/SignIn");
  }
});

GoogleAuth.get("/LoginSuccess", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated user:", req.user);
    // Additional logic if needed
    res.redirect("http://localhost:5173");
  } else {
    res.redirect("http://localhost:5000/SignIn");
  }
});

export default GoogleAuth;
