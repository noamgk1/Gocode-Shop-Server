const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
// // get one user
// app.post("/api/signIn", (req, res) => {
//   const { email, password } = req.body;

//   User.findOne({ email: email, password: password }, (err, user) => {
//     if (user) {
//       //Generate an access token
//       const accessToken = generateAccessToken(user);
//       const refreshToken = generateRefreshToken(user);
//       refreshTokens.push(refreshToken);
//       res.json({
//         email: user.email,
//         admin: user.admin,
//         accessToken,
//         refreshToken,
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ status: 400, message: "Email or Password is wrong" });
//     }
//   });
// });
adminTokens = [];
refreshTokens = [];
module.exports = {
  signup: (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    User.find({ email }).then((users) => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: "Email exists",
        });
      }

      bcrypt.hash(password, 600, (error, hash) => {
        if (error) {
          return res.status(500).json({
            error,
          });
        }

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hash,
          firstName,
          lastName,
        });

        user
          .save()
          .then((result) => {
            res.status(200).json({
              message: "User created",
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    User.find({ email }).then((users) => {
      if (users.length === 0) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      const [user] = users;

      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              admin: user.admin,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "100m",
            }
          );
          if (user.admin) {
            adminTokens.push(token);
          }

          return res.status(200).json({
            token,
            user: user.firstName + " " + user.lastName,
            admin: user.admin,
            id: user._id,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    });
  },

  admin: (req, res) => {
    const { token } = req.body;
    const a = adminTokens.filter((token1) => token1 === token);
    if (a[0] === token) {
      return res.status(200).json({ admin: true });
    }
  },

  logout: (req, res) => {
    const refreshToken = req.body.token;
    adminTokens = adminTokens.filter((token) => token !== refreshToken);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  },
};
