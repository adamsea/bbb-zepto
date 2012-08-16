define([
	// Libraries.
	"backbone",

	// Application.
	"app"
],

function(Backbone, app) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({

		/**
		 * Object mapping of routes to their associated handlers.
		 */
		routes: {
		  "": app.defaultHome
		},

		// Default app home
		// Includes a view that's inlined for demonstration purposes
		index: function() {
			var layout = app.useLayout('index');

			// You'd want to create a module, and use that as a context
			// for the view - set the view from Module.Views
			layout.setView('#welcome', new Backbone.LayoutView({
				template: 'welcome',
				serialize: function() {
					return { title: 'Backbone Boilerplate' };
				}
			}));
			layout.render();
		}
	});

	return Router;

});
