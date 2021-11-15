import config from "../../config";

export default new webix.DataCollection({
	url: `${config.url}/songs`,
	save: `rest->${config.url}/songs`
});
