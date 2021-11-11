import {JetView} from "webix-jet";

import albumsCollection from "../../models/albumsCollection";

export default class AlbumsUploader extends JetView {
	config() {
		const uploader = {
			view: "uploader",
			localId: "uploader",
			apiOnly: true,
			url: "",
			on: {
				onBeforeFileAdd: (upload) => {
					const file = upload.file;
					const reader = new FileReader();
					reader.onload = (event) => {
						albumsCollection.updateItem(this.albumId, {image: event.target.result});
						this.app.callEvent("parseImage", [this.albumId, event.target.result]);
					};
					reader.readAsDataURL(file);

					return false;
				}
			}
		};
		return uploader;
	}

	upload(albumId) {
		this.getRoot().fileDialog();
		this.albumId = albumId;
	}
}
