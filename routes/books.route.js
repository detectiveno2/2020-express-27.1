const express = require("express");
const multer = require("multer");

const controller = require("../controllers/books.controller");

const router = express.Router();
var upload = multer({ dest: "./public/uploads/" });

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single("cover"), controller.postCreate);

router.get("/edit/:id", controller.edit);

router.post("/edit", upload.single("cover"), controller.postEdit);

router.get("/delete/:id", controller.delete);

router.get("/add/:id", controller.add);

module.exports = router;
