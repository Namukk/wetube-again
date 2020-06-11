const path = require("path");
//import path from "path" 랑 같은데 webpack은 모던 js가 아니라서 import 사용 불가
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.exports = config;
