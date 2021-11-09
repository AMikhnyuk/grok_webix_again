import Op from "sequelize";

export default class CommonController {
    constructor(model) {
        this.model = model

    }
    async findAll(req, res) {
        const all = await this.model.findAll();
        res.send(all)
    }
    async update(req, res) {
        const id = Object.values(req.params)[0]
        const result = await this.model.update(req.body, {
            where: {
                id: id
            }
        });
        res.send(result)
    }
    async create(req, res) {
        const result = await this.model.create(req.body)
        res.send(result)
    }
    async delete(req, res) {
        const id = Object.values(req.params)[0]
        const result = await this.model.destroy({
            where: {
                id: id
            }
        });
        res.send(result)
    }
    async filterAndSort(req, res) {
        try {
            const result = await this.model.findAll({
                where: this.filter(req),
                order: this.sort(req)
            })
            res.send(result)
        }
        catch (err) {
            console.log(err)
        }
    }
    filter(req) {
        const filter = req.query.filter
        const criteries = {}
        for (let item in filter) {
            criteries[item] = { [Op.Op.like]: `%${filter[item]}%` }
        }
        return criteries
    }
    sort(req) {
        const sort = req.query.sort
        const criteries = []
        for (let item in sort) {
            criteries.push([item, sort[item]])
        }
        return criteries
    }
}