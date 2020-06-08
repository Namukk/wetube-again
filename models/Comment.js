import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   video: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Video",
  //   },
  //   // 비디오 ID가 코멘트에 저장이 됨. Video.js의 25번 설명과 비슷 둘중에 하나만 쓰면 됨.
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
