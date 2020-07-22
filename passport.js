import passport from "passport";
import githubStrategy from "passport-github";
import kakaoStrategy from "passport-kakao";

import User from "./models/User";
import {
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new kakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSECRET: "",
      callbackURL: `http://localhost:3000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser()); //Only User id만 쿠키로 보내줘 함축된 문장. (6-2 2분 40초 참고)
passport.deserializeUser(User.deserializeUser()); //어느 사용자인지 어떻게 아는가? serialize로 쿠키에 id를 준 것을 쿠키의 정보를 사용자화함.
