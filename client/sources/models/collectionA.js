import config from "../../config";

export default new webix.DataCollection({
	url: `${config.url}/groups`,
	save: `rest->${config.url}/groups`
});
