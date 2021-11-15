import config from "../../config";

export default new webix.DataCollection({
	url: `${config.url}/members`,
	save: `rest->${config.url}/members`
});
