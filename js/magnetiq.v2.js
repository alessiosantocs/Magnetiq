(function() {
  var Animation, Collision, CollisionsHandler, Corps, Galaxy, Interaction, MagnetiqEngine, OrbitalAnimation, Point, Pointer, Scene, Star, Track, Universe,
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
      this.fillColor = "#f00";
    }

    Point.prototype.set = function(property, value) {
      this.preDigest();
      if (value instanceof Function) {
        value = value(this);
      }
      this[property] = value;
      this.postDigest();
      return this[property];
    };

    Point.prototype.drawIntoCanvas = function(ctx) {
      ctx.fillStyle = this.fillColor;
      ctx.arc(this.x, this.y, this.radius || 5, 0, Math.PI * 2, false);
      return ctx.fill();
    };

    Point.prototype.preDigest = function() {};

    Point.prototype.postDigest = function() {};

    return Point;

  })();

  Animation = (function() {
    function Animation() {}

    Animation.prototype.renderAnimation = function() {};

    Animation.prototype.startAnimation = function() {
      var instance;
      this.renderAnimation();
      instance = this;
      return setInterval(function() {
        return instance.renderAnimation();
      }, 10);
    };

    return Animation;

  })();

  OrbitalAnimation = (function(_super) {
    var distanceFromCenter;

    __extends(OrbitalAnimation, _super);

    distanceFromCenter = function(center, distance) {
      return center.marginRadius + distance;
    };

    function OrbitalAnimation(options) {
      this.centerPoint = options.centerPoint, this.distance = options.distance, this.points = options.points;
    }

    OrbitalAnimation.prototype.corpsPositionFromTimestamp = function(timestamp, point) {
      var distance, force, newPointPosition, positionInTime, velocity;
      newPointPosition = new Point();
      force = this.centerPoint.gravitationalForce * this.centerPoint.radius * point.radius / point.distanceFromParentPoint;
      velocity = force * 2;
      positionInTime = timestamp * 0.0002 * velocity;
      distance = distanceFromCenter(this.centerPoint, point.distanceFromParentPoint);
      newPointPosition.x = distance * Math.cos(positionInTime) + this.centerPoint.x;
      newPointPosition.y = distance * Math.sin(positionInTime) + this.centerPoint.y;
      return newPointPosition;
    };

    OrbitalAnimation.prototype.renderAnimation = function() {
      var newpoint, point, _i, _len, _ref, _results;
      _ref = this.points;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        newpoint = this.corpsPositionFromTimestamp(Date.now(), point);
        point.x = newpoint.x;
        _results.push(point.y = newpoint.y);
      }
      return _results;
    };

    return OrbitalAnimation;

  })(Animation);

  Collision = (function() {
    function Collision(options) {
      this.basePoint = options.basePoint, this.controlPoint = options.controlPoint;
    }

    return Collision;

  })();

  CollisionsHandler = (function() {
    function CollisionsHandler() {}

    CollisionsHandler.prototype.detectCollisionsAmongst = function(pointsGroup1, pointsGroup2) {
      var collisionCoefficentRadius, collisionsArray, controlPoint, distanceFromObject, dx, dy, point, _i, _j, _len, _len1;
      collisionsArray = [];
      for (_i = 0, _len = pointsGroup2.length; _i < _len; _i++) {
        controlPoint = pointsGroup2[_i];
        for (_j = 0, _len1 = pointsGroup1.length; _j < _len1; _j++) {
          point = pointsGroup1[_j];
          if (!(point !== controlPoint)) {
            continue;
          }
          dx = controlPoint.x - point.x;
          dy = controlPoint.y - point.y;
          distanceFromObject = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          collisionCoefficentRadius = (point.radius || 3) + (controlPoint.radius || 3);
          if (distanceFromObject <= collisionCoefficentRadius) {
            collisionsArray.push(new Collision({
              basePoint: point,
              controlPoint: controlPoint
            }));
          }
        }
      }
      return collisionsArray;
    };

    CollisionsHandler.prototype.onCollisionAmongst = function(pointsGroup1, pointsGroup2, handler) {
      var instance;
      instance = this;
      setInterval(function() {
        var collisions;
        collisions = instance.detectCollisionsAmongst(pointsGroup1, pointsGroup2);
        if (collisions.length > 0) {
          return handler(collisions);
        }
      }, 100);
      return this;
    };

    return CollisionsHandler;

  })();

  Corps = (function(_super) {
    __extends(Corps, _super);

    Corps.initWithParentPoint = function(options) {
      var corps;
      corps = new Corps(options);
      corps.distanceFromParentPoint = options.distance;
      corps.x = corps.parentPoint.x + corps.distanceFromParentPoint;
      corps.y = corps.parentPoint.y + corps.distanceFromParentPoint;
      return corps;
    };

    function Corps(options) {
      if (options == null) {
        options = {};
      }
      Corps.__super__.constructor.call(this, options);
      this.radius = options.radius, this.parentPoint = options.parentPoint, this.gravitationalForce = options.gravitationalForce;
      this.gravitationalForce || (this.gravitationalForce = 5);
      this.radius || (this.radius = 5);
    }

    Corps.prototype.drawIntoCanvas = function(ctx) {
      return Corps.__super__.drawIntoCanvas.call(this, ctx);
    };

    return Corps;

  })(Point);

  Galaxy = (function(_super) {
    __extends(Galaxy, _super);

    function Galaxy(options) {
      if (options == null) {
        options = {};
      }
      Galaxy.__super__.constructor.call(this, options);
      this.corpses = options.corpses, this.star = options.star, this.radius = options.radius;
      if (!this.corpses) {
        this.corpses = [];
      }
      if (!this.star) {
        this.star = new Star({
          marginRadius: 50
        });
      }
    }

    Galaxy.prototype.generateCorpses = function(options) {
      var corps, corpses, spaceOffset, _i, _len;
      corpses = new Array(options.quantity);
      spaceOffset = (options.radius || options.quantity) / options.quantity * 5;
      this.corpses = [];
      for (_i = 0, _len = corpses.length; _i < _len; _i++) {
        corps = corpses[_i];
        this.corpses.push(new Corps.initWithParentPoint({
          parentPoint: this.star,
          distance: _i * spaceOffset + (this.star.marginRadius || 0)
        }));
      }
      return this.corpses;
    };

    Galaxy.prototype.toPointArray = function() {
      var array, corps, _i, _len, _ref;
      array = [];
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

  Interaction = (function() {
    function Interaction(options) {
      var interaction;
      if (options == null) {
        options = {};
      }
      this.canvas = options.canvas;
      this.pointers = [
        new Pointer({
          defaultPoint: new Point({
            x: window.innerWidth,
            y: window.innerHeight
          })
        })
      ];
      interaction = this;
      this.canvas.addEventListener("mousemove", function(event) {
        event.preventDefault();
        return interaction.pointers[0].recordMovement(event.pageX, event.pageY);
      });
    }

    Interaction.prototype.toPointArray = function() {
      return this.pointers;
    };

    return Interaction;

  })();

  MagnetiqEngine = (function() {
    var drawIntoFinalCanvas, drawSceneIntoCanvas, drawSceneIntoCanvasFn, requestAnimFrame;

    requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000);
      };
    })();

    drawSceneIntoCanvas = function(scene, canvas, ctx, final_ctx) {
      drawSceneIntoCanvasFn(scene, canvas, ctx, final_ctx);
      return requestAnimFrame(function() {
        return drawSceneIntoCanvas(scene, canvas, ctx, final_ctx);
      });
    };

    drawSceneIntoCanvasFn = function(scene, canvas, ctx, final_ctx) {
      var object, objects, _i, _len;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      objects = scene.toPointArray();
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        ctx.beginPath();
        object.drawIntoCanvas(ctx);
      }
      if (final_ctx) {
        return drawIntoFinalCanvas(canvas, final_ctx);
      }
    };

    drawIntoFinalCanvas = function(canvas, final_ctx) {
      final_ctx.clearRect(0, 0, canvas.width, canvas.height);
      return final_ctx.drawImage(canvas, 0, 0);
    };

    function MagnetiqEngine(options) {
      if (options == null) {
        options = {};
      }
      this.canvas = options.canvas, this.scene = options.scene;
      this.ctx = this.canvas.getContext("2d");
    }

    MagnetiqEngine.prototype.startEngine = function() {
      this.pre_canvas = document.createElement("canvas");
      this.pre_ctx = this.pre_canvas.getContext("2d");
      this.canvas.width = this.pre_canvas.width = window.innerWidth;
      this.canvas.height = this.pre_canvas.height = window.innerHeight;
      return drawSceneIntoCanvas(this.scene, this.pre_canvas, this.pre_ctx, this.ctx);
    };

    return MagnetiqEngine;

  })();

  Pointer = (function(_super) {
    var trackLengthLimit;

    __extends(Pointer, _super);

    trackLengthLimit = 50;

    function Pointer(options) {
      if (options == null) {
        options = {};
      }
      Pointer.__super__.constructor.call(this, options);
      this.pickupRadius = options.pickupRadius;
      this.pickupRadius || (this.pickupRadius = 300);
      this.fillColor = "#aeff00";
      this.radius = 5;
      options.defaultPoint || (options.defaultPoint = new Point({
        x: 0,
        y: 0
      }));
      this.x = options.defaultPoint.x;
      this.y = options.defaultPoint.y;
      this.track = new Track(50, options.defaultPoint);
    }

    Pointer.prototype.recordMovement = function(x, y) {
      var distance, dx, dy;
      dx = x - this.x;
      dy = y - this.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.pickupRadius) {
        this.x = x;
        return this.y = y;
      }
    };

    Pointer.prototype.update = function() {
      var coeffX, coeffY, dX, dY, next_point, point, smooth_coefficent, track_head, x, y, _i, _len, _ref, _results;
      smooth_coefficent = 10;
      track_head = this.track.head();
      dX = Math.abs(this.x - track_head.x);
      dY = Math.abs(this.y - track_head.y);
      x = 0;
      y = 0;
      coeffX = dX / smooth_coefficent;
      coeffY = dY / smooth_coefficent;
      if (this.x > track_head.x) {
        x = coeffX;
      } else {
        x = -coeffX;
      }
      if (this.y > track_head.y) {
        y = coeffY;
      } else {
        y = -coeffY;
      }
      track_head.x += x;
      track_head.y += y;
      _ref = this.track;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (!this.track[_i + 1]) {
          continue;
        }
        next_point = this.track[_i + 1];
        point.x = next_point.x;
        _results.push(point.y = next_point.y);
      }
      return _results;
    };

    Pointer.prototype.drawIntoCanvas = function(ctx) {
      var point, pointer_color, previous_point, _i, _len, _ref;
      this.update();
      pointer_color = this.fillColor;
      ctx.fillStyle = pointer_color;
      ctx.strokeStyle = pointer_color;
      ctx.lineWidth = pointer_color;
      ctx.beginPath();
      _ref = this.track;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        if (_i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          previous_point = this.track[_i - 1];
          ctx.quadraticCurveTo(previous_point.x, previous_point.y, previous_point.x + (point.x - previous_point.x) / 2, previous_point.y + (point.y - previous_point.y) / 2);
        }
      }
      ctx.stroke();
      ctx.closePath();
      if (this.track.head()) {
        ctx.beginPath();
        ctx.fillStyle = pointer_color;
        ctx.arc(this.track.head().x, this.track.head().y, this.radius || 5, 0, Math.PI * 2, false);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(this.track.head().x, this.track.head().y, (this.radius || 5) * 5, 0, Math.PI * 2, false);
      return ctx.stroke();
    };

    return Pointer;

  })(Point);

  Scene = (function() {
    function Scene(options) {
      if (options == null) {
        options = {};
      }
      this.universes = options.universes, this.interaction = options.interaction;
    }

    Scene.prototype.toPointArray = function() {
      var array, universe, _i, _len, _ref;
      array = [];
      if (this.interaction) {
        array = array.concat(this.interaction.toPointArray());
      }
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
      this.gravitationalForce = 10;
      this.marginRadius = options.marginRadius;
      this.fillColor = "#57d0f3";
    }

    return Star;

  })(Corps);

  Track = (function(_super) {
    __extends(Track, _super);

    function Track(numberOfElements, defaultPoint) {
      var time, _i, _len, _ref;
      Track.__super__.constructor.call(this, numberOfElements);
      defaultPoint || (defaultPoint = new Point({
        x: 0,
        y: 0
      }));
      _ref = new Array(numberOfElements);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        time = _ref[_i];
        this.push(new Point(defaultPoint));
      }
    }

    Track.prototype.head = function() {
      return this[this.length - 1];
    };

    return Track;

  })(Array);

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
    var collisionsHandler, engine, galaxy, galaxy2, interaction, orbitalAnimation, orbitalAnimation2, scene, star, star2, universe;
    star = new Star({
      marginRadius: 50
    });
    galaxy = new Galaxy({
      star: star,
      corpses: []
    });
    star2 = new Star({
      marginRadius: 50,
      x: 800,
      y: 500
    });
    star2.gravitationalForce = 2;
    galaxy2 = new Galaxy({
      star: star2,
      corpses: []
    });
    universe = new Universe({
      galaxies: [galaxy, galaxy2]
    });
    interaction = new Interaction({
      canvas: document.getElementById("magnetiq")
    });
    scene = new Scene({
      universes: [universe],
      interaction: interaction
    });
    galaxy.generateCorpses({
      quantity: 190,
      radius: 200
    });
    galaxy2.generateCorpses({
      quantity: 30,
      radius: 50,
      corpsesRadius: function() {
        return Math.floor(Math.random() * 5 + 1);
      }
    });
    orbitalAnimation = new OrbitalAnimation({
      centerPoint: galaxy.star,
      points: galaxy.corpses
    });
    orbitalAnimation.startAnimation();
    orbitalAnimation2 = new OrbitalAnimation({
      centerPoint: galaxy2.star,
      points: galaxy2.corpses
    });
    orbitalAnimation2.startAnimation();
    engine = new MagnetiqEngine({
      canvas: document.getElementById("magnetiq"),
      scene: scene
    });
    engine.startEngine();
    collisionsHandler = new CollisionsHandler();
    return collisionsHandler.onCollisionAmongst(galaxy.corpses, [interaction.pointers[0].track.head()], function(collisions) {
      return console.log("The pointer has collided", collisions);
    });
  };

}).call(this);
