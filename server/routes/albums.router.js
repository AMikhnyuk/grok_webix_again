import Album from "../models/albums.model.js";
import Router from "express";
import CommonController from "../controllers/commonController.js";

const albumsRouter = new Router()

const albumsController = new CommonController(Album)
albumsRouter.get("/albums", (req, res) => albumsController.findAll(req, res))
albumsRouter.put("/albums/:albumId", (req, res) => albumsController.update(req, res))
albumsRouter.post("/albums", (req, res) => albumsController.create(req, res))
albumsRouter.delete("/albums/:albumId", (req, res) => albumsController.delete(req, res))

export default albumsRouter