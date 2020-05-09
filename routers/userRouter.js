import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

/* const handleProfile = (req, res) => res.send("Edit Profile");
   userRouter.get(routes.editProfile, handleProfile);

   => 두줄로 쓰지말고
   userRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
*/


export default userRouter;
