import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
	base_href: string = "";
	// api_baseUrl: string = "http://54.36.98.91:3000";
	api_baseUrl: string = "http://localhost:3000";
	site_baseUrl: string = "http://localhost:4546";
	urlArrayLeng: 6
	public conf_editor = {
		removePlugins : 'elementspath' ,
		toolbar: [
			{
				name: "clipboard",
				groups: ["clipboard", "undo"],
				items: [
					"Cut",
					"Copy",
					"Paste",
					"PasteText",
					"PasteFromWord",
					"-",
					"Undo",
					"Redo"
				]
			},
			{
				name: "basicstyles",
				groups: ["basicstyles", "cleanup"],
				items: [
					"Bold",
					"Italic",
					"Underline",
					"Strike",
					"Subscript",
					"Superscript",
					"-",
					"CopyFormatting",
					"RemoveFormat"
				]
			},
			{
				name: "paragraph",
				groups: ["list", "indent", "blocks", "align", "bidi"],
				items: [
					"NumberedList",
					"BulletedList",
					"-",
					"Outdent",
					"Indent",
					"-",
					"Blockquote"
				]
			},
			{ name: "links", items: ["Link", "Unlink"] },
			{
				name: "insert",
				items: [
					"HorizontalRule",
					"Smiley",
					"SpecialChar"
				]
			},
			{ name: "styles", items: ["Styles", "Format", "FontSize"] },
			{ name: "colors", items: ["TextColor", "BGColor"] },
		]
	};
}
