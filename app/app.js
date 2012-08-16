define([
  // Libraries.
  "zepto",
  "lodash",
  "backbone",
  "handlebars",

  // Plugins.
  "plugins/backbone.layoutmanager"
],

function($, _, Backbone, Handlebars) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/",

    // The api url to use for translating responses
    // Into a format for Backbone models & collections
    apiUrl: "",

    // The default home page for the app
    defaultHome: "index"
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  var loadTemplate = function(template) {
    var deferred = new Deferred();

    var xhr = $.ajax({
      url: template,
      async: false,
      success: function(contents) {
        deferred.resolve(contents);
      }
    });

    return deferred.promise();
  };

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    manage: true,

    paths: {
      layout: "app/templates/layouts/",
      template: "app/templates/"
    },

    fetch: function(path) {
      path = path + ".html";

      if (!JST[path]) {
        Deferred.when(loadTemplate(path)).then(function(contents) {
          JST[path] = Handlebars.compile(contents);
        });
      }

      return JST[path];
    },

    deferred: function() {
      return new Deferred();
    },

    when: function(promises) {
      return Deferred.when.apply(null, promises);
    }
  });

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name) {
      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout.
      var layout = new Backbone.Layout({
        template: name,
        className: "layout " + name,
        id: "layout"
      });

      // Insert into the DOM.
      $("#main").empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  }, Backbone.Events);

});
