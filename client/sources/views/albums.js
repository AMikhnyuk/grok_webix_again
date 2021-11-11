import {JetView} from "webix-jet";

import albumsCollection from "../models/albumsCollection";
import collectionA from "../models/collectionA";
import songsCollection from "../models/songsCollection";
import AlbumsUploader from "./albums.views/uploader";

export default class AlbumsView extends JetView {
	config() {
		const albumsList = {
			view: "list",
			id: "albums:list",
			template: "#name#",
			select: true,
			on: {
				onAfterSelect: (id) => {
					this.$$("albums:table").filter("#groupId#", id);
				}
			},
			scroll: "auto"
		};
		const albumsTable = {
			view: "datatable",
			id: "albums:table",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{
					id: "name", header: "Album", fillspace: 5, editor: "text"
				},
				{
					id: "date", header: "Release", fillspace: 2, editor: "text"
				},
				{
					id: "songsnum", header: "Songs", fillspace: 2, editor: "text"
				},
				{
					id: "copiesnum",
					header: "Copies",
					template({copiesnum}) {
						const M = 1000000;
						const K = 1000;
						if (copiesnum > 0) {
							return `
							>${copiesnum >= M ? `${Math.floor(copiesnum / M)}M` : `${Math.floor(copiesnum / K)}K`} `;
						}
						return "";
					},
					fillspace: 2,
					editor: "text"
				},
				{
					template: "<i class=\"webix_icon wxi-trash remove\"></i>",
					width: 50
				}

			],
			onClick: {
				remove: (e, item) => {
					webix.confirm("Delete?").then(() => {
						const songs = songsCollection.find(obj => obj.albumId === item.row);
						songs.forEach((song) => {
							songsCollection.remove(song.id);
						});
						albumsCollection.remove(item.row);
					});
					return false;
				}
			},
			on: {
				onAfterSelect: (item) => {
					this.parseTemplate(item.id);
				}
			},
			scroll: "auto",
			gravity: 2
		};
		const templateInfo = {
			localId: "template:info",
			template: ({name, group, image}) => `	
				<div class="album_info">
					<div class="info_top">
						<div class="top_title">
							<div>${name}</div>
						</div>
						<div class="top_cancel">
							<i class="webix_icon wxi-close close"></i>
						</div>
					</div>
					<div class="info_group">
						<div>${group}</div>
					</div>
					<div class="info_image">
						${image ? `<img src=${image}><button class="upload">Change Photo</button>` : "<button class=\"upload\">Upload Photo</button>"}
					</div>
					</div>
				`,
			onClick: {
				close: () => {
					this.$$("albums:template").hide();
					this.$$("albums:table").unselectAll();
				},
				upload: () => {
					const albumId = this.$$("template:info").getValues().id;
					this.uploader.upload(albumId);
				}
			},
			gravity: 1

		};

		const templateTable = {
			view: "datatable",
			localId: "template:table",
			columns: [
				{
					id: "number", header: "№", adjust: "content"
				},
				{
					id: "name", header: "Song", fillspace: true
				}

			],
			gravity: 1
		};
		const ui = {
			cols: [
				albumsList, albumsTable, {
					rows: [
						templateInfo,
						templateTable
					],
					localId: "albums:template",
					hidden: true
				}
			],
			margin: 10

		};
		return ui;
	}

	init() {
		const list = this.$$("albums:list");
		const table = this.$$("albums:table");
		const templateTable = this.$$("template:table");
		webix.promise.all([
			collectionA.waitdata,
			albumsCollection.waitdata,
			songsCollection.waitdata
		]).then(() => {
			list.sync(collectionA);
			table.sync(albumsCollection);
			templateTable.sync(songsCollection);
		});
		this.uploader = this.ui(AlbumsUploader);
		this.on(this.app, "parseImage", (albumId, result) => {
			this.parseTemplate(albumId, result);
		});
	}

	parseTemplate(albumId, image) {
		albumsCollection.waitData.then(() => {
			const data = albumsCollection.getItem(albumId);
			const template = this.$$("albums:template");
			const info = this.$$("template:info");
			const templateTable = this.$$("template:table");
			template.show();
			info.parse({...data,
				group: collectionA.getItem(data.groupId).name,
				image: image || data.image});
			templateTable.filter("#albumId#", albumId);
		});
	}
}
