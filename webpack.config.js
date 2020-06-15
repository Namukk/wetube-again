const path = require("path");
//import path from "path" 랑 같은데 webpack은 모던 js가 아니라서 import 사용 불가, path는 전체 경로를 나타내는 것.
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
const MODE = process.env.WEBPACK_ENV;
//WEBPACK_ENV는 package.json에 script 부분 build:assets에 쓴 것과 같아야 함.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
//Entry = where do my files come from?
const OUTPUT_DIR = path.join(__dirname, "static");
//Output = where do you want to put it?

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/, //.(scss|sass)하면 scss와 sass 파일들 다 찾아줌.
        use: ExtractCSS.extract([
          {
            loader: "css-loader", // Finally webpack can understand scss.
          },
          {
            loader: "postcss-loader", //take css and 우리가 주는 plugin 가지고 css(호환성)를 변환.
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader", //sass or scss -> normal css
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js", //"mains" = [name].[format]
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
//옛날 방식의 export, !!! webpack은 config 파일에서 아래에서 위로 실행

// package.json의 script에서 dev:assets의 -w : 파일들의 변화를 watch하다가 webpack을 자동으로 껐다 켜줄 것.
