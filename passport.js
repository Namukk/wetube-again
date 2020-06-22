import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); //Only User id만 쿠키로 보내줘 함축된 문장. (6-2 2분 40초 참고)
passport.deserializeUser(User.deserializeUser());
