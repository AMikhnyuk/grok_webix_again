import {JetView} from "webix-jet";

export default class MembersView extends JetView {
	config() {
		const membersTable = {
			view: "datatable",
			localId: "members:table",
			editable: true,
			columns: [
				{
					id: "name",
					header: [
						{
							text: "Member Name"
						},
						{
							content: "serverFilter"
						}
					],
					editor: "text",
					sort: "server",
					fillspace: true
				},
				{
					id: "role",
					header: [
						{
							text: "Role"
						},
						{
							content: "serverSelectFilter"
						}
					],
					editor: "text",
					sort: "server",
					adjust: true
				},
				{
					id: "date",
					header: [
						{
							text: "Date of Birth"
						},
						{
							content: "serverFilter"
						}
					],
					editor: "text",
					sort: "server",
					adjust: true
				},
				{
					id: "country",
					header: [
						{
							text: "Country"
						},
						{
							content: "serverSelectFilter"
						}
					],
					editor: "text",
					sort: "server",
					adjust: true
				},
				{
					id: "awards",
					header: [
						{
							text: "Awards"
						},
						{
							content: "serverFilter"
						}
					],
					editor: "text",
					sort: "server",
					adjust: true
				}
			]
		};
		return membersTable;
	}

	init() {
		const table = this.$$("members:table");
		// table.sync(collectionB);
		table.load("http://localhost:3000/members");
	}
}
