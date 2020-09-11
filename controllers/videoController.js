import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

// Home
export const home = async (req, res) => {
  // async는 javascript가 다음 작업을 먼저 진행하지 않고 이전 작업이 끝날 때 까지 기다리게 하는것 그리고 밑에 await 사용.
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
//첫번째는 템플릿, 두번째는 템플릿에 추가할 정보가 담긴 객채
/*res.send("Home")에서 res.render("home")으로 바꾸면 
views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 찾아서 보여줄 것;;*/

// Search
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  // const searchingBy = req.query.term; ECMA Script 즉 ES6 이전
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    // 만약 title: searchingBy면 입력한 제목과 정확히 일치하는 항목만 찾음.
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
  //res.render("search", {pageTitle: "Search", searchinBy: searchingBy, videos: videos}) ECMA Script 즉 ES6 이전
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  // req.user.videos
  req.user.videos.push(newVideo.id);
  // req.user.videos = [newVideo.id];
  console.log(title, description);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  // console.log(req.params.id); same with 43-45 req.params 하면 아이디 뜸.
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); //populate() = 객체를 데려오는 함수, object ID에만 사용 가능
    res.render("videoDetail", { pageTitle: video.title, video });
    // video:video = video
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    // title: title = title 이걸 이렇게 깔끔하게 쓰려고 같은이름으로 정함 title은 model의 일부
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
