import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;       //local 추가함으로써 템플릿, 컨트롤러 어디서든 사용 가능해짐.
    next();
};