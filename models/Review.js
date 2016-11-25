var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Albums Model
 * ==========
 */

var Review = new keystone.List('Review', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Review.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Sidechain', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
    meta: {
	    title: { type: String},
	    description: { type: String}
    },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Review.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Review.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Review.register();
