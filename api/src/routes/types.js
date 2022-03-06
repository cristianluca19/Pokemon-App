const express = require("express");

const { getTypes } = require("../controllers/types");

//Creating routes and adding the controllers.

const typeRouter = express.Router();

typeRouter.get("/types", getTypes);

module.exports = typeRouter;
