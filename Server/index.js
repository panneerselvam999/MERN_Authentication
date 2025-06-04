const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptJs = require("bcryptjs");
const UsersModel = require("./Models/Users");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

const veryfyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: "Unauthorized" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(403).json({ status: "Forbidden" });
      } else{
        if(decoded.role === "admin") {
          next(); 
        } else {
          return res.status(403).json({ status: "Forbidden" });
        }
      }
    });
  }
};

  app.get("/dashboard", veryfyUser, (req, res) => {
    res.json({ status: "Success" });
  })


app.post("/register", async (req, res) => {
  const { userName, password, email } = req.body;
  bcryptJs
    .hash(password, 10)
    .then((hashedPassword) => {
      UsersModel.create({
        userName,
        password: hashedPassword,
        email,
      })
        .then((user) => {
          res.json({ status: "Success" });
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UsersModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcryptJs.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1h" }
          );
          res.cookie("token", token);
          return res.json({ status: "Success", role: user.role, userName: user.userName });
          // return res.json({
          //   status: "Success",
          //   role: user.role,
          //   userName: user.userName,
          //   token: token // ✅ send token in response
          // });
          
        } else {
          res.json({ status: "Invalid password" });
        }
      });
    }
    else {
      res.json({ status: "User not found" });
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token"); // ✅ Clear the cookie
  res.json({ message: "Logged out successfully" });
});


// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   UsersModel.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.json({ status: "User not found" });
//       }
//       bcryptJs.compare(password, user.password)
//         .then(isMatch => {
//           if (isMatch) {
//             const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: '1h' });
//             res.cookie("token", token, { httpOnly: true });
//             res.json({ status: "OK", token });
//           } else {
//             res.json({ status: "Invalid password" });
//           }
//         })
//         .catch(err => res.json(err));
//     })
//     .catch(err => res.json(err));
// }
// );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Post route for user registration
// app.post("/register", async (req, res) => {
//   const { userName, password, email } = req.body;
//   try {
//     const existingUser = await UsersModel.findOne({ userName });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcryptJs.hash(password, 10);
//     const newUser = new UsersModel({
//       userName,
//       password: hashedPassword,
//       email,
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
