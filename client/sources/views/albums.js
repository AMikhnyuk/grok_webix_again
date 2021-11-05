import {JetView} from "webix-jet";

import albumsCollection from "../models/albumsCollection";
import collectionA from "../models/collectionA";
import songsCollection from "../models/songsCollection";

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
			columns: [
				{
					id: "name", header: "Album", fillspace: 5
				},
				{
					id: "date", header: "Release", fillspace: 2
				},
				{
					id: "songsnum", header: "Songs", fillspace: 2
				},
				{
					id: "copiesnum",
					header: "Copies",
					template({copiesnum}) {
						return `> 
						${copiesnum > 999999 ? `${/\d/.exec(copiesnum)}M` : copiesnum} `;
					},
					fillspace: 2
				},
				{
					id: "remove", header: ""
				}

			],
			on: {
				onAfterSelect: (item) => {
					this.parseTemplate(item);
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
							<i class="webix_icon wxi-close remove"></i>
						</div>
					</div>
					<div class="info_group">
						<div>${group}</div>
					</div>
					<div class="info_image">
						<img src=${image}>
					</div>
					</div>
				`,
			onClick: {
				remove: () => {
					this.$$("albums:template").hide();
					this.$$("albums:table").unselectAll();
				}
			},
			gravity: 1

		};
		const templateTable = {
			view: "datatable",
			localId: "template:table",
			columns: [
				{
					id: "id", header: "№", adjust: "content"
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
	}

	parseTemplate(item) {
		const data = albumsCollection.getItem(item.id);
		const template = this.$$("albums:template");
		const info = this.$$("template:info");
		const templateTable = this.$$("template:table");
		template.show();
		info.parse({...data, group: collectionA.getItem(data.groupId).name});
		templateTable.filter("#albumId#", item.id);
	}
}
