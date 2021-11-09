import Router from "express";
import CommonController from "../controllers/commonController.js";
import Band from "../models/bands.model.js";

const bandsRouter = new Router()

const bandsController = new CommonController(Band)
bandsRouter.get("/bands", (req, res) => bandsController.findAll(req, res))
bandsRouter.put("/bands/:bandId", (req, res) => bandsController.update(req, res))
bandsRouter.post(("/bands"), (req, res) => bandsController.create(req, res))
bandsRouter.delete("/bands/:bandId", (req, res) => bandsController.delete(req, res))
export default bandsRouter