import Song from "../models/songs.model.js";
import Router from "express";
import CommonController from "../controllers/commonController.js";

const songsRouter = new Router()

const songsController = new CommonController(Song)

songsRouter.get("/songs", (req, res) => songsController.findAll(req, res))
songsRouter.put("/songs/:songId", (req, res) => songsController.update(req, res))
songsRouter.post("/songs", (req, res) => songsController.create(req, res))
songsRouter.delete("/songs/:songsId", (req, res) => songsController.delete(req, res))

export default songsRouter