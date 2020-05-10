export const home = (req, res) =>
 res.render("home", { pageTitle: "Home" }); 
//첫번째는 템플릿, 두번째는 템플릿에 추가할 정보가 담긴 객채
/*res.send("Home")에서 res.render("home")으로 바꾸면 
views 폴더에서 파일명이 home이고 확장자가 pug인 템플릿 찾아서 보여줄 것;;*/
export const search = (req,res) => {
 res.render("search", { pageTitle: "Search" });
}
export const videos = (req, res) =>
 res.render("videos");
export const upload = (req, res) =>
 res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
 res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
 res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
 res.render("deleteVideo", { pageTitle: "Delete Video" });