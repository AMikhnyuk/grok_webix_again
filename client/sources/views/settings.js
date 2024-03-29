import {JetView} from "webix-jet";

import albumsCollection from "../models/albumsCollection";
import collectionA from "../models/collectionA";
import songsCollection from "../models/songsCollection";


export default class SettingsView extends JetView {
	config() {
		const settingsHeader = {
			cols: [
				{},
				{
					view: "checkbox",
					width: 25,
					on: {
						onChange: (value) => {
							const form2 = this.$$("settings:form2");
							if (value) form2.enable();
							else form2.disable();
						}
					}
				}
			],
			height: 43

		};


		const settingsForm1 = {
			view: "form",
			localId: "settings:form1",
			elements: [
				{
					template: "Add song",
					type: "section"
				},
				{
					view: "richselect",
					label: "Group",
					localId: "form1:group",
					name: "groupId",
					options: {
						body: {
							data: collectionA,
							template: "#name#"
						}
					},
					on: {
						onChange: () => {
							this.groupSelect();
						}
					}
				},
				{
					view: "richselect",
					label: "Album",
					localId: "form1:album",
					name: "albumId",
					options: {
						body: {
							data: albumsCollection,
							template: "#name#"

						},
						on: {
							onShow: () => {
								const groupId = this.$$("form1:group").getValue();

								if (groupId) {
									this.$$("form1:album").getList().filter("#groupId#", groupId);
								}
							}
						}
					},
					on: {
						onChange: (id) => {
							this.albumSelect(id);
						}

					},
					disabled: true
				}
			]
		};
		const settingsForm2 = {
			view: "form",
			localId: "settings:form2",
			disabled: true,
			elements: [
				{
					cols: [

						{
							template: "Custom Settings", type: "section"
						}


					],
					margin: 28
				},
				{
					cols: [
						{
							view: "text",
							label: "Group",
							name: "groupName",
							localId: "form2:group",
							invalidMessage: "Name must not be empty or repetitive"
						},
						{
							view: "button",
							localId: "group2:add",
							css: "webix_primary",
							type: "icon",
							icon: "wxi_icon wxi-plus",
							width: 50,
							click: () => {
								this.addGroup();
							}
						},
						{
							view: "button",
							type: "icon",
							icon: "wxi_icon wxi-close",
							width: 50,
							click: () => {
								this.clearAll();
								this.groupsEnable();
							}
						}
					]
				},
				{
					cols: [
						{
							view: "text",
							localId: "form2:album",
							name: "albumName",
							label: "Album",
							disabled: true,
							invalidMessage: "Name must not be empty or repetitive"
						},
						{
							view: "button",
							localId: "album2:add",
							css: "webix_primary",
							type: "icon",
							icon: "wxi_icon wxi-plus",
							width: 50,
							disabled: true,
							click: () => {
								this.addAlbum();
							}
						},
						{
							view: "button",
							type: "icon",
							localId: "album2:clear",
							icon: "whi_icon wxi-close",
							width: 50,
							disabled: true,
							click: () => {
								this.clearAlbums();
								this.albumsEnable();
							}
						}
					]
				}
			],
			rules: {
				groupName: value => this.fieldsValidation(value, "name", collectionA),
				albumName: value => this.fieldsValidation(value, "name", albumsCollection, "groupId", this.find(collectionA, this.group1).id)
			}
		};
		const settingsTable = {
			view: "datatable",
			localId: "settings:table",
			editable: true,
			columns: [
				{
					id: "number", header: "№", editor: "text"
				},
				{
					id: "name",
					header: "Song",
					editor: "text",
					fillspace: true

				},
				{
					template: "<i class=\"webix_icon wxi-trash remove\"></i>",
					width: 50
				}


			],
			onClick: {
				remove: (e, item) => {
					webix.confirm("Delete?").then(() => {
						songsCollection.remove(item.row);
					});
					return false;
				}
			},
			select: true
		};
		const tableForm = {
			view: "form",
			localId: "table:form",
			elements: [

				{
					cols: [
						{
							view: "text",
							name: "number",
							width: 50,
							invalidMessage: "Must be a number, and not repetitive"
						},
						{
							view: "text",
							name: "name",
							invalidMessage: "Name must not be empty or repetitive"
						},

						{
							view: "button",
							localId: "add:button",
							value: "Add",
							width: 150,
							click: () => {
								this.addSong();
							},
							disabled: true
						},
						{
							view: "uploader",
							width: 150,
							localId: "upload:button",
							value: "Upload .txt",
							upload: "",
							autosend: false,
							disabled: true,
							tooltip: `example:
									<div>1.Songname</div>
									<div>2.Songname</div>
									<div>3.Songname</div>`,
							on: {
								onAfterFileAdd: (upload) => {
									this.uploadFile(upload);
								}
							}
						},
						{
							view: "button",
							css: "webix_button webix_primary",
							value: "Clear All",
							width: 150,
							click: () => {
								this.clearAll();
							}
						}
					]
				}
			],
			rules: {
				name: value => this.fieldsValidation(value, "name", songsCollection, "albumId", this.find(albumsCollection, this.album1).id),
				number: value => this.fieldsValidation(value, "number", songsCollection, "albumId", this.find(albumsCollection, this.album1).id)
			}
		};
		const ui = {

			rows: [
				settingsHeader,
				{
					cols: [
						settingsForm1, settingsForm2
					]
				},
				settingsTable,
				tableForm
			]
		};
		return ui;
	}

	init() {
		this.album1 = this.$$("form1:album");
		this.album2 = this.$$("form2:album");
		this.group1 = this.$$("form1:group");
		this.group2 = this.$$("form2:group");
		this.groupAdd = this.$$("group2:add");
		this.albumAdd = this.$$("album2:add");
		this.albumClear = this.$$("album2:clear");
		this.form2 = this.$$("settings:form2");
		this.table = this.$$("settings:table");
		this.table.sync(songsCollection);
	}

	addSong() {
		const form = this.$$("table:form");
		if (form.validate()) {
			const album = this.find(albumsCollection, this.album1);
			const value = form.getValues();
			value.albumId = album.id;
			songsCollection.add(value);
			form.clear();
			form.clearValidation();
			this.table.filter("albumId", album.id);
		}
	}

	addGroup() {
		if (this.form2.validate()) {
			const value = this.group2.getValue();
			collectionA.add({name: value});
			this.group1.setValue(collectionA.getLastId());
			this.albumsEnable();
		}
	}

	addAlbum() {
		if (this.form2.validate()) {
			const value = this.album2.getValue();
			const group = this.find(collectionA, this.group1);
			albumsCollection.add({name: value, groupId: group.id});
			this.album1.setValue(albumsCollection.getLastId());
		}
	}

	groupSelect() {
		const group1Value = this.group1.data.text;
		this.group2.setValue(group1Value);
		this.album1.setValue();
		this.albumsEnable();
		this.form2.clearValidation();
	}

	albumSelect(id) {
		const album1Value = this.album1.data.text;
		this.album2.setValue(album1Value);
		this.album2.disable();
		this.albumAdd.disable();
		this.table.filter("#albumId#", id);
		this.$$("add:button").enable();
		this.$$("upload:button").enable();
		this.form2.clearValidation();
	}

	albumsEnable() {
		this.group2.disable();
		this.groupAdd.disable();
		this.album1.enable();
		this.album2.enable();
		this.albumAdd.enable();
		this.albumClear.enable();
	}

	groupsEnable() {
		this.group2.enable();
		this.groupAdd.enable();
		this.album1.disable();
		this.album2.disable();
		this.albumAdd.disable();
		this.albumClear.disable();
	}

	clearAlbums() {
		this.album1.setValue();
		this.album2.setValue();
		this.form2.clearValidation();
		this.$$("add:button").disable();
		this.$$("upload:button").disable();
		this.table.filter();
	}

	clearGroups() {
		this.group1.setValue();
		this.group2.setValue();
		this.form2.clearValidation();
	}

	clearAll() {
		this.clearAlbums();
		this.clearGroups();
	}

	fieldsValidation(value, name, collection, param, id) {
		const dublicate = collection.find((obj) => {
			if (`${obj[name]}` === value) {
				return param ? obj[param] === id : true;
			}
			return false;
		}, true);
		return value && !dublicate;
	}

	find(collection, target) {
		return collection.find((item) => {
			if (item.name === target.getText()) return item.id;
			return false;
		}, true);
	}

	uploadFile(upload) {
		const reader = new FileReader();
		reader.readAsText(upload.file);
		const album = this.find(albumsCollection, this.album1);
		reader.onload = (event) => {
			const result = event.target.result.split("\r\n").map(item => item.trim().split("."));
			result.forEach((item) => {
				songsCollection.add({number: item[0], name: item[1], albumId: album.id});
			});
			this.table.filter("#albumId#", album.id);
		};
	}
}
