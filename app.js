const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const studentsRouter = require("./routes/students");
const logging = require("./middlewares/logging");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static("public"));
app.use(helmet());
app.use(logging);

app.set("template engine", "ejs");

const port = process.env.PORT || 3000;

app.use("/api/Students", studentsRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.get("/welcome.html", (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname, "welcome.html"));
});

app.post("/welcome.html", (req, res) => {
  console.log(req.body);
  res.cookie(
    "usernm",
    Buffer.from(`${req.body.fnm}${req.body.lnm}`).toString("base64")
  );
  res.cookie("userage", 22, { httpOnly: true });
  res.send(`Welcome ${req.body.fnm}, we hope to make you happy :)`);
});

app.get("/abc", (req, res) => {
  console.log(`cookies = ${req.cookies.usernm}`);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
