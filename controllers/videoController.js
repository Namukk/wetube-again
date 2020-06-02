import { videos } from "../db";
export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
//첫번째는 템플릿, 두번째는 템플릿에 추가할 정보가 담긴 객채
/*res.send("Home")에서 res.render("home")으로 바꾸면 
views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 찾아서 보여줄 것;;*/
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  // const searchingBy = req.query.term; ECMA Script 즉 ES6 이전
  res.render("search", { pageTitle: "Search", searchingBy });
  //res.render("search", {pageTitle: "Search", searchinBy: searchingBy}) ECMA Script 즉 ES6 이전
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
