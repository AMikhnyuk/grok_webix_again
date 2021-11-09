import config from "../../config";

export default new webix.DataCollection({
	url: `${config.url}/bands`,
	save: `rest->${config.url}/bands`
});
