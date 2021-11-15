import {JetView} from "webix-jet";

import albumsCollection from "../models/albumsCollection";
import collectionA from "../models/collectionA";
import songsCollection from "../models/songsCollection";

export default class GroupsView extends JetView {
	config() {
		const groupsToolbar = {
			view: "toolbar",
			elements: [
				{},
				{
					view: "button", value: "Export to Exel", width: 150
				},
				{
					view: "button", value: "Refresh", width: 100
				}
			]
		};
		const groupsTable = {
			view: "datatable",
			localId: "groups:table",
			editable: true,
			columns: [
				{
					id: "name",
					header: [
						{
							text: "Group Name"
						},
						{
							content: "textFilter"
						}
					],
					editor: "text",
					sort: "text",
					fillspace: 3
				},
				{
					id: "composition",
					header: [
						{
							text: "Composition"
						},
						{
							content: "textFilter"
						}
					],
					editor: "text",
					sort: "text",
					fillspace: 3
				},
				{
					id: "style",
					header: [
						{
							text: "Music Style"
						},
						{
							content: "textFilter"
						}
					],
					editor: "text",
					sort: "text",
					fillspace: 2
				},
				{
					id: "date",
					header: [
						{
							text: "Creation Date"
						},
						{
							content: "dateRangeFilter"
						}
					],
					editor: "text",
					sort: "date",
					fillspace: 2
				},
				{
					id: "country",
					header: [
						{
							text: "Country"
						},
						{
							content: "textFilter"
						}
					],
					editor: "text",
					sort: "text",
					fillspace: 2
				},
				{
					template: "<i class=\"webix_icon wxi-trash remove\"></i>",
					width: 50
				}
			],
			onClick: {
				remove: (e, item) => {
					webix.confirm("Delete?").then(() => {
						const albums = albumsCollection.find(obj => obj.groupId === item.row);
						albums.forEach((album) => {
							const songs = songsCollection.find(obj => obj.albumId === album.id);
							songs.forEach((song) => {
								songsCollection.remove(song.id);
							});
							albumsCollection.remove(album.id);
						});
						collectionA.remove(item.row);
					});
					return false;
				}
			}

		};
		const ui = {
			rows: [
				groupsToolbar, groupsTable
			]
		};
		return ui;
	}

	init() {
		const table = this.$$("groups:table");
		table.sync(collectionA);
	}
}
