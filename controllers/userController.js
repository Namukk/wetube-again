import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
}); //passport.authenticate는 username과 password찾도록 설정되어있음.

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  _, //accessToken은 함수에서 사용 안하므로 이렇게 바꿔줘도 됨. 지우면, 프로필은 더이상 프로필이 아니라 accessToken으로 인식
  __, //마찬가지로 refreshToken은 사용 안하므로
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email: email }); //사실 email: email이어야 함. 사용자의 이메일이 깃헙의 이메일과 같은가 확인
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (
  accessToken, //accessToken은 함수에서 사용 안하므로 이렇게 바꿔줘도 됨. 지우면, 프로필은 더이상 프로필이 아니라 accessToken으로 인식
  refreshToken, //마찬가지로 refreshToken은 사용 안하므로
  profile,
  cb
) => {
  const {
    _json: { id, profile_image, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email: email }); //사실 email: email이어야 함. 사용자의 이메일이 깃헙의 이메일과 같은가 확인
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl: profile_image,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postKakaoLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user }); //req.user은 현재 로그인된 사용자
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile); //res.render("editProfile", { pageTitle: "Edit Profile" });보다 보기 좋음.
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
