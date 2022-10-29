const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const _user = await User.findOne({ email: email });
    
    if (!_user) {
      res.status(404).send({ message: "Account does not exist!" });
    }

    if (!_user.emailVerified) {
      return res
        .status(403)
        .send({ message: "Please verify your email first!" });
    }

    if (_user.role === "admin") {
      if (_user && bcrypt.compareSync(password, _user.password)) {
        const token = jwt.sign(
          {
            _id: _user._id,
            email: _user.email,
            role: _user.role,
            name: _user.name,
            // @ts-ignore
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
        res.send({
          token,
          _id: _user._id,
          email: _user.email,
          role: _user.role,
          name: _user.name,
        });
      } else {
        res.status(401).send({message: "Invalid email or password"});
      }
    } else {
      res.status(401).send({message: "Not Allowed!"});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router
