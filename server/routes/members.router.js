import Member from "../models/members.model.js";
import Router from "express";
import CommonController from "../controllers/commonController.js";

const membersRouter = new Router()

const membersController = new CommonController(Member)
membersRouter.get("/members", (req, res) => {
    if (req.query) membersController.filterAndSort(req, res)
    else membersController.findAll(req, res)
})
membersRouter.put("/members/:memberId", (req, res) => membersController.update(req, res))

export default membersRouter