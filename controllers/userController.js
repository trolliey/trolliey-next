const bcrypt = require("bcrypt");
const User = require("../models/User");
const fs = require("fs");
const cloudinary = require("../helpers/cloudinary");

// edit user
// /api/user/edit/{userId}
// put request
exports.editUserInfo = async (req, res, next) => {
  try {
    // get iformation from client
    const { username, old_password, new_password } = req.body;

    // find if user exists in database
    const { id } = req.params;

    // utls to hold the image
    const urls = [];

    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ message: "Could not find the user" });
      return;
    }

    // check if user is allowed to edit the acciut
    if (req.user._id !== id) {
      res.status(403).send({ message: "You can only edit your account" });
      return;
    }

    // check if picture has been changed
    if (req.files.length > 0) {
      // upload images to cloudinary
      const uploader = async (path) => cloudinary.upload(path, "Profiles");
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        try {
          const newPath = await uploader(path);
          urls.push(newPath);
          fs.unlinkSync(path);
        } catch (error) {
          res.status(500).send({ message: `Error uploading images ${error}` });
        }
      }
      console.log("image uploaded");
    }

    // if user wants to edit password
    if (old_password && new_password) {
      // decrypt password value from database
      const password_correct = await bcrypt.compare(
        old_password,
        user.password
      );
      // if password decrypted set the new password
      if (password_correct) {
        user.password = bcrypt.hashSync(new_password, 12);
        user.name = username;
        user.photoURL = urls.length > 0 ? urls[0] : user.photoURL;
        await user.save();
        return res.status(200).send({ message: "Account has been updated" });
      } else {
        res.status(403).send({ message: "Old password is incorrect" });
        return;
      }
    } else {
      return res
        .status(403)
        .send({ message: "You have entered a wrong password" });
      //   user.name = username;
      //   user.photoURL = urls.length > 0 ? urls[0] : profile_picture
      //   await user.save();
      //   return res.status(200).send({ message: "Account has been updated" });
    }

    // the user has been found
  } catch (error) {
    return res.status(500).send({ message: `${error} ` });
  }
};

// delete user
// /api/user/delete/{userId}
// delete request
exports.delteUser = async (req, res) => {
  // find if user exists in database
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }
  // check if user is allowed to delte the account
  if (req.user._id === id || req.user.role === "admin") {
    // delte the user and capture the error
    User.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        return res.send({ message: `${error} ` });
      }
      return res.send({ message: "Account deleted successfully!" });
    });
  } else {
    res.status(403).send({ message: "You are not allowed" });
    return;
  }
};
