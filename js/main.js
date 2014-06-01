/*global require*/
'use strict';

require([
	'backbone',
	'asset!js/views/app',
	'asset!js/routers/router',
	'asset!index',
	'css!base'
], function (Backbone, AppView, Workspace, indexHtml) {
	/*jshint nonew:false*/

	$(document).ready(function() {
		// Load our index page
		$(document.body).append($(indexHtml));

		new Workspace();
		Backbone.history.start();

		// Initialize the application view
		new AppView();
	});
});
