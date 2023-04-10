require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", require("./users/users.controller"));
app.use("/projects", require("./projects/projects.controller"));
app.use("/folders", require("./folders/folders.controller"));

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 7100;
app.listen(port, () => console.log("Server listening on port " + port));
