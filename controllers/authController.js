const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Store = require("../models/Store");

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// register user controller
exports.registerUser = async (req, res) => {
  //get filds from request
  const { email, password, agreed, role, username } = req.body;

  //validate forms
  if (!agreed) {
    return res
      .status(401)
      .send({ message: "Your have to agree to our terms and conditions" });
  } else if (!emailRegexp.test(email)) {
    return res.status(401).send({ message: "Please enter a valid email" });
  } else if (password.length < 6) {
    return res.status(401).send({ message: "Invalid password" });
  } else if (!username) {
    return res.status(401).send({ message: "Please enter a valid username" });
  }

  // Check if this user already exisits
  else {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(500).send({ message: "Email already registered" });
    } else {
      //create new user object
      const newUser = new User({
        role: role,
        email: email,
        password: bcrypt.hashSync(password, 12),
        terms_agreed: agreed,
        name: username,
      });

      //save in database
      await newUser.save();
      return res.status(200).send("Account Created");
    }
  }
};

// login user
exports.loginUser = async (req, res) => {
  try {
    // fields from request
    const { email, password } = req.body;

    const _user = await User.findOne({ email: email });

    // user not found
    if (!_user) {
      return res.status(404).send({ message: "Account does not exist!" });
    } else {
      if (!_user.emailVerified) {
        return res.status(403).send({ message: "Please verify your email" });
      }

      if (_user.role === "seller") {
        // decrypt password value from database
        const store = await Store.findOne({ user: _user._id });

        if(!store){
          return res.status(404).send({message: 'We cant seem to find your store'})
        }

        const password_correct = await bcrypt.compare(password, _user.password);
        if (password_correct) {
          const token = await jwt.sign(
            {
              name: _user.name,
              email: _user.email,
              _id: _user._id,
              role: _user.role,
              emailVerified: _user.emailVerified,
              photoURL: _user.photoURL,
              store_id: store._id,
            },
            process.env.JWT_SECRET
          );
          if (token) {
            const user = {
              name: _user.name,
              email: _user.email,
              _id: _user._id,
              role: _user.role,
              emailVerified: _user.emailVerified,
              photoURL: _user.photoURL,
              token: token,
              store_id: store._id,
            };

            return res.send({ ...user, message: "logged in sucessfully" });
          } else {
            return res
              .status(422)
              .send({ message: "Failed to login, Wrong details!" });
          }
        } else {
          return res.status(400).send({ message: "Wrong login details" });
        }
      }

      // decrypt password value from database
      const password_correct = await bcrypt.compare(password, _user.password);
      if (password_correct) {
        const token = await jwt.sign(
          {
            name: _user.name,
            email: _user.email,
            _id: _user._id,
            role: _user.role,
            emailVerified: _user.emailVerified,
            photoURL: _user.photoURL,
          },
          process.env.JWT_SECRET
        );
        if (token) {
          const user = {
            name: _user.name,
            email: _user.email,
            _id: _user._id,
            role: _user.role,
            emailVerified: _user.emailVerified,
            photoURL: _user.photoURL,
            token: token,
          };

          return res.send({ ...user, message: "logged in sucessfully" });
        } else {
          return res
            .status(422)
            .send({ message: "Failed to login, Wrong details!" });
        }
      } else {
        return res.status(400).send({ message: "Wrong login details" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
};
