var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'feature';

	locals.data = {
		featureitems: []
	};

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Feature').paginate({
			page: req.query.page || 1,
			perPage: 12,
			maxPages: 12
		})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	// Render the view
	view.render('feature');
};
