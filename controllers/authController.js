const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Store = require("../models/Store");
const sgMail = require("@sendgrid/mail");
const formatedHTMl = require("../utils/approve-email-template");
const { randomUUID } = require("crypto");
const { default: data } = require("../utils/data");

const SENDGRID_API_KEY = process.env.SEND_GRID_API;

//@ts-ignore
sgMail.setApiKey(SENDGRID_API_KEY);

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let token = "";
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)];
}

// register user controller
exports.registerUser = async (req, res, next) => {
  try {
    //get filds from request
    let {
      email,
      password,
      agreed,
      role,
      username,
      googleAuthId,
      photoURL,
      method,
    } = req.body;
    let emailVerified = false;

    // create password for google users
    if (method === "google") {
      password = randomUUID();
      emailVerified = true;
    }

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
      let _user = await User.findOne({ email: req.body.email });

      if (_user) {
        return res.status(500).send({ message: "Email already registered" });
      } else {
        //create new user object
        const newUser = new User({
          role: role,
          email: email,
          password: bcrypt.hashSync(password, 12),
          terms_agreed: agreed,
          name: username,
          confirmationCode: token,
          authMethod: method,
          photoURL: photoURL,
          emailVerified: emailVerified,
          googleAuthId: googleAuthId
        });

        if (method === "google") {
          const new_user = await newUser.save();
          token = await jwt.sign(
            {
              name: new_user.name,
              email: new_user.email,
              _id: new_user._id,
              role: new_user.role,
              emailVerified: new_user.emailApproved,
              username: new_user.username,
              photoURL: new_user.photoURL,
            },
            process.env.JWT_SECRET
          );
          if (token) {
            const user = {
              name: new_user.name,
              email: new_user.email,
              _id: new_user._id,
              role: new_user.role,
              emailVerified: new_user.emailApproved,
              username: new_user.username,
              photoURL: new_user.photoURL,
              token: token,
              googleAuthId: new_user.googleAuthId,
            };

            return res
              .status(200)
              .send({ ...user, message: "Account Created" });
          } else {
            return res
              .status(422)
              .send({ message: "Failed to login, Try again!" });
          }
        } else {
          //save in database

          const msg = {
            to: email, // Change to your recipient
            from: data.sender_email, // Change to your verified sender
            subject: "Email Verification",
            text: "verify your email",
            html: formatedHTMl(
              `https://www.trolliey.com/success/verify-email/${token}`
            ),
          };
          await sgMail.send(msg);
          await newUser.save();

          return res.status(200).send({ message: "Account Created" });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// login user
exports.loginUser = async (req, res, next) => {
  try {
    // fields from request
    const { email, password, googleAuthId, method } = req.body;

    const _user = await User.findOne({ email: email });

    // user not found
    if (!_user) {
      return res.status(404).send({ message: "Account does not exist!" });
    } else {
      if (!_user.emailVerified) {
        return res.status(403).send({ message: "Please verify your email" });
      }
      if (_user.authMethod === "google" && googleAuthId === "") {
        return res.status(400).send({ message: "Login Using Google" });
      }

      if (_user.role === "seller") {
        // decrypt password value from database
        const store = await Store.findOne({ _id: _user.store });

        if (!store) {
          return res
            .status(404)
            .send({ message: "We cant seem to find your store" });
        }

        if (_user.authMethod === "google") {
          // decrypt password value from database
          if (_user.googleAuthId === googleAuthId) {
            const token = await jwt.sign(
              {
                name: _user.name,
                email: _user.email,
                _id: _user._id,
                role: _user.role,
                emailVerified: _user.emailApproved,
                username: _user.username,
                photoURL: _user.photoURL,
                //@ts-ignore
              },
              process.env.JWT_SECRET
            );
            if (token) {
              const user = {
                name: _user.name,
                email: _user.email,
                _id: _user._id,
                role: _user.role,
                emailVerified: _user.emailApproved,
                username: _user.username,
                photoURL: _user.photoURL,
                token: token,
              };

              return res.send({ ...user, message: "logged in sucessfully" });
            } else {
              return res
                .status(422)
                .send({ message: "Failed to login, Try Again" });
            }
          } else {
            return res.status(403).send({ message: "Cant seem to login try again" });
          }
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

      if (_user.authMethod === "google") {
        // decrypt password value from database
        if (_user.googleAuthId === googleAuthId) {
          const token = await jwt.sign(
            {
              name: _user.name,
              email: _user.email,
              _id: _user._id,
              role: _user.role,
              emailVerified: _user.emailApproved,
              username: _user.username,
              photoURL: _user.photoURL,
              //@ts-ignore
            },
            process.env.JWT_SECRET
          );
          if (token) {
            const user = {
              name: _user.name,
              email: _user.email,
              _id: _user._id,
              role: _user.role,
              emailVerified: _user.emailApproved,
              username: _user.username,
              photoURL: _user.photoURL,
              token: token,
            };

            return res.send({ ...user, message: "logged in sucessfully" });
          } else {
            return res
              .status(422)
              .send({ message: "Failed to login, Try Again" });
          }
        } else {
          return res.status(403).send({ message: "Login using Google" });
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
    next(error);
  }
};

// verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { code } = req.query;
    const _user = await User.findOne({ confirmationCode: code });

    // check if user has registered
    if (!_user) {
      return res.status(404).send({ message: "Account does not exist!" });
    }

    //check if user has already verified their email
    if (_user.confirmationCode === "") {
      return res
        .status(500)
        .send({ message: "Email already verfied, Try loggin in" });
    }

    // update user doc and remove the code
    await User.findOneAndUpdate(
      { confirmationCode: code },
      {
        emailVerified: true,
        confirmationCode: "",
      }
    );

    // assign token and senf back to client
    const token = jwt.sign(
      {
        name: _user.name,
        email: _user.email,
        _id: _user._id,
        role: _user.role,
        emailVerified: _user.emailVerified,
        photoURL: _user.photoURL,
      },
      // @ts-ignore
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return res.send({
      token,
      name: _user.name,
      email: _user.email,
      _id: _user._id,
      role: _user.role,
      emailVerified: _user.emailVerified,
      photoURL: _user.photoURL,
    });
  } catch (error) {
    next(error);
  }
};
