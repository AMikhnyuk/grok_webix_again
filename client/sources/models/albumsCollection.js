import config from "../../config";

export default new webix.DataCollection({
	url: `${config.url}/albums`,
	save: `rest->${config.url}/albums`

});
