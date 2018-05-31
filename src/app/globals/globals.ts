import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
	base_href: string = "";
	api_baseUrl: string = "http://localhost:3000";
	site_baseUrl: string = "http://localhost:4546";
	//base_href: string = "/bh_version/";
	// api_baseUrl: string = "http://54.36.98.91:3000";
	//site_baseUrl: string = "http://54.36.98.91/bh_version";
	urlArrayLeng: 6;
	public conf0_editor = { removePlugins: "toolbar,elementspath", resize_enabled:false };
	public conf_editor = {
		removePlugins: "elementspath",
		toolbar: [
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
				items: ["HorizontalRule", "Smiley", "SpecialChar"]
			},
			{ name: "styles", items: ["Styles", "Format"] },
			{ name: "colors", items: ["TextColor", "BGColor"] }
		]
	};
}
