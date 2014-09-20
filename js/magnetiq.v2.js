(function() {
  var Corps, Galaxy, MagnetiqEngine, Point, Scene, Star, Universe,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Point = (function() {
    function Point(options) {
      if (options == null) {
        options = {};
      }
      this.x = options.x, this.y = options.y;
      this.x || (this.x = 0);
      this.y || (this.y = 0);
    }

    Point.prototype.drawIntoCanvas = function(ctx) {
      ctx.fillStyle = "#f00";
      return ctx.arc(this.x, this.y, this.radius || 5, 0, Math.PI * 2, false);
    };

    return Point;

  })();

  Corps = (function(_super) {
    __extends(Corps, _super);

    function Corps(options) {
      if (options == null) {
        options = {};
      }
      Corps.__super__.constructor.call(this, options);
      this.radius = options.radius;
      this.radius || (this.radius = 5);
    }

    return Corps;

  })(Point);

  Galaxy = (function(_super) {
    __extends(Galaxy, _super);

    function Galaxy(options) {
      if (options == null) {
        options = {};
      }
      Galaxy.__super__.constructor.call(this, options);
      this.corpses = options.corpses, this.star = options.star;
      if (!this.corpses) {
        this.corpses = [];
      }
      if (!this.star) {
        this.star = null;
      }
    }

    Galaxy.prototype.toPointArray = function() {
      var array, corps, _i, _len, _ref;
      array = [this];
      _ref = this.corpses;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        corps = _ref[_i];
        array.push(corps);
      }
      array.push(this.star);
      return array;
    };

    return Galaxy;

  })(Point);

  MagnetiqEngine = (function() {
    var drawSceneIntoCanvas, drawSceneIntoCanvasFn, requestAnimFrame;

    requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000);
      };
    })();

    drawSceneIntoCanvas = function(scene, canvas, ctx) {
      drawSceneIntoCanvasFn(scene, canvas, ctx);
      return requestAnimFrame(function() {
        return drawSceneIntoCanvas(scene, canvas, ctx);
      });
    };

    drawSceneIntoCanvasFn = function(scene, canvas, ctx) {
      var object, objects, _i, _len, _results;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      objects = scene.toPointArray();
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        ctx.beginPath();
        object.drawIntoCanvas(ctx);
        _results.push(ctx.fill());
      }
      return _results;
    };

    function MagnetiqEngine(options) {
      if (options == null) {
        options = {};
      }
      this.canvas = options.canvas, this.scene = options.scene;
      this.ctx = this.canvas.getContext("2d");
    }

    MagnetiqEngine.prototype.startEngine = function() {
      return drawSceneIntoCanvas(this.scene, this.canvas, this.ctx);
    };

    return MagnetiqEngine;

  })();

  Scene = (function() {
    function Scene(options) {
      if (options == null) {
        options = {};
      }
      this.universes = options.universes;
    }

    Scene.prototype.toPointArray = function() {
      var array, universe, _i, _len, _ref;
      array = [];
      _ref = this.universes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        universe = _ref[_i];
        array = array.concat(universe.toPointArray());
      }
      return array;
    };

    return Scene;

  })();

  Star = (function(_super) {
    __extends(Star, _super);

    function Star(options) {
      if (options == null) {
        options = {};
      }
      Star.__super__.constructor.call(this, options);
      this.radius = 10;
    }

    Star.prototype.drawIntoCanvas = function(ctx) {
      ctx.fillStyle = "#00f";
      return ctx.arc(this.x, this.y, this.radius || 5, 0, Math.PI * 2, false);
    };

    return Star;

  })(Corps);

  Universe = (function(_super) {
    __extends(Universe, _super);

    function Universe(options) {
      if (options == null) {
        options = {};
      }
      Universe.__super__.constructor.call(this, options);
      this.galaxies = options.galaxies;
      this.galaxies || (this.galaxies = []);
    }

    Universe.prototype.addGalaxy = function(galaxy) {
      return this.galaxies.push(galaxy);
    };

    Universe.prototype.toPointArray = function() {
      var array, galaxy, _i, _len, _ref;
      array = [this];
      _ref = this.galaxies;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        galaxy = _ref[_i];
        array = array.concat(galaxy.toPointArray());
      }
      return array;
    };

    return Universe;

  })(Point);

  window.onload = function() {
    var corps, engine, galaxy, scene, star, universe;
    corps = new Corps({
      x: 10,
      y: 10
    });
    star = new Star();
    galaxy = new Galaxy({
      star: star,
      corpses: [corps]
    });
    universe = new Universe({
      galaxies: [galaxy]
    });
    scene = new Scene({
      universes: [universe]
    });
    window.corps = corps;
    engine = new MagnetiqEngine({
      canvas: document.getElementById("magnetiq"),
      scene: scene
    });
    window.engine = engine;
    return engine.startEngine();
  };

}).call(this);
