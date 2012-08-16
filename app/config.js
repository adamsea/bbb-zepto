// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../assets/js/vendor",

    // Libraries.
    zepto: "../assets/js/libs/zepto",
    lodash: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    handlebars: "../assets/js/libs/handlebars-1.0.0.beta.6",

    // Plugins.
    deferred: "../assets/js/plugins/deferred",
    moment: "../assets/js/plugins/moment.min"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "zepto"],
      exports: "Backbone"
    },

    lodash: {
      exports: "_"
    },

    handlebars: {
      exports: "Handlebars"
    },

    // Backbone.LayoutManager depends on Backbone, deferred, and Handlebars
    "plugins/backbone.layoutmanager": ["handlebars", "deferred", "backbone"]
  }

});
