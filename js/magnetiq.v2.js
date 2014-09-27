(function() {
  var Animation, Collision, CollisionsHandler, Corps, ExplosionAnimation, Galaxy, Interaction, Interface, Level, Levels, MagnetiqEngine, Orbit, OrbitalAnimation, Point, Pointer, PulseOrbitAnimation, Scene, Star, Track, Universe, levels,
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

  window.Point = Point;

  Animation = (function() {
    function Animation() {}

    Animation.prototype.renderAnimation = function() {};

    Animation.prototype.resetTimer = function() {
      return this.internalTimer = 0;
    };

    Animation.prototype.startAnimation = function() {
      var instance;
      this.internalTimer = 0;
      this.renderAnimation();
      instance = this;
      return setInterval(function() {
        instance.internalTimer += 1;
        return instance.renderAnimation();
      }, 10);
    };

    return Animation;

  })();

  ExplosionAnimation = (function(_super) {
    __extends(ExplosionAnimation, _super);

    function ExplosionAnimation(options) {
      if (options == null) {
        options = {};
      }
      this.point = options.point, this.pointArray = options.pointArray;
      this.resetPoints();
      this;
    }

    ExplosionAnimation.prototype.resetPoints = function() {
      console.log(this.point);
      this.explosionPoint = new Point();
      this.pointArray.push(this.explosionPoint);
      this.explosionPoint.set("x", 0);
      this.explosionPoint.set("y", 0);
      console.log(this.explosionPoint);
      return true;
    };

    ExplosionAnimation.prototype.moveExplosionPoint = function(time) {
      this.explosionPoint.x += time;
      return console.log(this.explosionPoint.x);
    };

    ExplosionAnimation.prototype.renderAnimation = function() {
      return this.moveExplosionPoint(this.internalTimer);
    };

    return ExplosionAnimation;

  })(Animation);

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

  PulseOrbitAnimation = (function(_super) {
    var distanceFromCenter;

    __extends(PulseOrbitAnimation, _super);

    distanceFromCenter = function(center, distance) {
      return center.marginRadius + distance;
    };

    function PulseOrbitAnimation(options) {
      this.ring = options.ring, this.minRadius = options.minRadius, this.maxRadius = options.maxRadius;
      this.timestamp = 0;
    }

    PulseOrbitAnimation.prototype.radiusValueFromTimestamp = function(timestamp) {
      var radius;
      radius = Math.abs(Math.sin(timestamp / 15) * this.maxRadius) + this.minRadius;
      return radius;
    };

    PulseOrbitAnimation.prototype.renderAnimation = function() {
      var radius;
      this.timestamp += 1;
      console.log(this.timestamp);
      radius = this.radiusValueFromTimestamp(this.timestamp);
      return this.ring.radius = radius;
    };

    return PulseOrbitAnimation;

  })(Animation);

  Levels = (function(_super) {
    __extends(Levels, _super);

    function Levels() {}

    Levels.prototype.getLevel = function(id) {
      var level, _i, _len;
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        level = this[_i];
        if (level.id === id) {
          return level;
        }
      }
      return console.error("Level " + id + " was not found!");
    };

    Levels.prototype.push = function(level) {
      return Levels.__super__.push.call(this, level);
    };

    return Levels;

  })(Array);

  Level = (function() {
    function Level(options) {
      if (options == null) {
        options = {};
      }
      this.id = options.id, this.name = options.name, this.fn = options.fn, this.nextLevelId = options.nextLevelId, this.tip = options.tip;
    }

    Level.prototype.createGalaxyIntoUniverse = function(universe, options) {
      var galaxy, orbitalAnimation, star;
      if (options == null) {
        options = {};
      }
      star = new Star(options.star);
      galaxy = new Galaxy({
        star: star
      });
      galaxy.generateCorpses({
        quantity: options.corpses.quantity,
        radius: options.radius
      });
      orbitalAnimation = new OrbitalAnimation({
        centerPoint: galaxy.star,
        points: galaxy.corpses
      });
      orbitalAnimation.startAnimation();
      universe.galaxies.push(galaxy);
      return galaxy;
    };

    Level.prototype.call = function(scene, options) {
      if (options == null) {
        options = {};
      }
      this.onLevelEnding = options.onLevelEnding;
      this.scene = scene;
      return this.fn(scene, this);
    };

    Level.prototype.end = function(levelResult) {
      if (levelResult) {
        if (this.scene && this.nextLevelId) {
          this.scene.setLevel(levels.getLevel(this.nextLevelId));
        }
      } else {
        this.scene.setLevel(this);
      }
      return this.onLevelEnding(levelResult);
    };

    return Level;

  })();

  levels = new Levels();

  levels.push(new Level({
    id: "level1",
    nextLevelId: "level2",
    name: "one",
    tip: "eat",
    fn: function(scene, level) {
      var ccc, collisionsHandler, interaction, universe;
      universe = new Universe();
      level.createGalaxyIntoUniverse(universe, {
        star: {
          x: 200,
          y: 150,
          marginRadius: 20
        },
        corpses: {
          quantity: 10
        },
        radius: 5
      });
      interaction = new Interaction({
        canvas: document.getElementById("magnetiq"),
        defaultPoint: new Point({
          x: 500,
          y: 150
        })
      });
      scene.universes = [universe];
      scene.interaction = interaction;
      collisionsHandler = new CollisionsHandler();
      return ccc = collisionsHandler.onCollisionAmongst(scene.toPointArray({
        skipInteraction: true
      }), [scene.interaction.pointers[0].track.head()], function(collisions) {
        var collision, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = collisions.length; _i < _len; _i++) {
          collision = collisions[_i];
          if (collision.basePoint instanceof Star) {
            clearInterval(ccc);
            _results.push(level.end(true));
          } else if (collision.basePoint instanceof Corps) {
            clearInterval(ccc);
            level.tip = "dots hurt";
            _results.push(level.end(false));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  }));

  levels.push(new Level({
    id: "level2",
    nextLevelId: "level3",
    name: "two",
    tip: "you got the point",
    fn: function(scene, level) {
      var ccc, collisionsHandler, interaction, universe;
      universe = new Universe();
      level.createGalaxyIntoUniverse(universe, {
        star: {
          x: 200,
          y: 150,
          marginRadius: 20
        },
        corpses: {
          quantity: 30
        },
        radius: 20
      });
      interaction = new Interaction({
        canvas: document.getElementById("magnetiq"),
        defaultPoint: new Point({
          x: 500,
          y: 150
        })
      });
      scene.universes = [universe];
      scene.interaction = interaction;
      collisionsHandler = new CollisionsHandler();
      return ccc = collisionsHandler.onCollisionAmongst(scene.toPointArray({
        skipInteraction: true
      }), [scene.interaction.pointers[0].track.head()], function(collisions) {
        var collision, _i, _len, _results;
        console.log(collisions);
        _results = [];
        for (_i = 0, _len = collisions.length; _i < _len; _i++) {
          collision = collisions[_i];
          if (collision.basePoint instanceof Star) {
            clearInterval(ccc);
            _results.push(level.end(true));
          } else if (collision.basePoint instanceof Corps) {
            clearInterval(ccc);
            level.tip = "it hurts";
            _results.push(level.end(false));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  }));

  levels.push(new Level({
    id: "level3",
    nextLevelId: "level4",
    name: "three",
    tip: "faster",
    fn: function(scene, level) {
      var ccc, collisionsHandler, interaction, universe;
      universe = new Universe();
      level.createGalaxyIntoUniverse(universe, {
        star: {
          x: 200,
          y: 150,
          marginRadius: 20,
          gravitationalForce: 10
        },
        corpses: {
          quantity: 40
        },
        radius: 20
      });
      interaction = new Interaction({
        canvas: document.getElementById("magnetiq"),
        defaultPoint: new Point({
          x: 500,
          y: 150
        })
      });
      scene.universes = [universe];
      scene.interaction = interaction;
      collisionsHandler = new CollisionsHandler();
      return ccc = collisionsHandler.onCollisionAmongst(scene.toPointArray({
        skipInteraction: true
      }), [scene.interaction.pointers[0].track.head()], function(collisions) {
        var collision, _i, _len, _results;
        console.log(collisions);
        _results = [];
        for (_i = 0, _len = collisions.length; _i < _len; _i++) {
          collision = collisions[_i];
          if (collision.basePoint instanceof Star) {
            clearInterval(ccc);
            _results.push(level.end(true));
          } else if (collision.basePoint instanceof Corps) {
            clearInterval(ccc);
            level.tip = "ouch";
            _results.push(level.end(false));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  }));

  levels.push(new Level({
    id: "level4",
    nextLevelId: "level5",
    name: "four",
    tip: "tilt the universe",
    fn: function(scene, level) {
      var ccc, collisionsHandler, interaction, universe;
      universe = new Universe();
      level.createGalaxyIntoUniverse(universe, {
        star: {
          x: -50,
          y: 150,
          marginRadius: 20,
          gravitationalForce: 10
        },
        corpses: {
          quantity: 40
        },
        radius: 20
      });
      interaction = new Interaction({
        canvas: document.getElementById("magnetiq"),
        defaultPoint: new Point({
          x: 500,
          y: 150
        }),
        onDeviceMotion: function(a, b, g, event) {
          var array, star, _i, _len, _results;
          array = scene.toPointArray({
            only: Star
          });
          _results = [];
          for (_i = 0, _len = array.length; _i < _len; _i++) {
            star = array[_i];
            _results.push(star.x += b / 3);
          }
          return _results;
        }
      });
      scene.universes = [universe];
      scene.interaction = interaction;
      collisionsHandler = new CollisionsHandler();
      return ccc = collisionsHandler.onCollisionAmongst(scene.toPointArray({
        skipInteraction: true
      }), [scene.interaction.pointers[0].track.head()], function(collisions) {
        var collision, _i, _len, _results;
        console.log(collisions);
        _results = [];
        for (_i = 0, _len = collisions.length; _i < _len; _i++) {
          collision = collisions[_i];
          if (collision.basePoint instanceof Star) {
            clearInterval(ccc);
            _results.push(level.end(true));
          } else if (collision.basePoint instanceof Corps) {
            clearInterval(ccc);
            level.tip = "!#/:O";
            _results.push(level.end(false));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  }));

  levels.push(new Level({
    id: "level5",
    nextLevelId: "level5",
    name: "five",
    tip: "boss",
    fn: function(scene, level) {
      var ccc, collisionsHandler, interaction, universe;
      universe = new Universe();
      level.createGalaxyIntoUniverse(universe, {
        star: {
          x: -150,
          y: 150,
          marginRadius: 20,
          gravitationalForce: 8
        },
        corpses: {
          quantity: 150
        },
        radius: 100
      });
      interaction = new Interaction({
        canvas: document.getElementById("magnetiq"),
        defaultPoint: new Point({
          x: 500,
          y: 150
        }),
        onDeviceMotion: function(a, b, g, event) {
          var array, star, _i, _len, _results;
          array = scene.toPointArray({
            only: Star
          });
          _results = [];
          for (_i = 0, _len = array.length; _i < _len; _i++) {
            star = array[_i];
            _results.push(star.x += b / 3);
          }
          return _results;
        }
      });
      scene.universes = [universe];
      scene.interaction = interaction;
      collisionsHandler = new CollisionsHandler();
      return ccc = collisionsHandler.onCollisionAmongst(scene.toPointArray({
        skipInteraction: true
      }), [scene.interaction.pointers[0].track.head()], function(collisions) {
        var collision, _i, _len, _results;
        console.log(collisions);
        _results = [];
        for (_i = 0, _len = collisions.length; _i < _len; _i++) {
          collision = collisions[_i];
          if (collision.basePoint instanceof Star) {
            clearInterval(ccc);
            _results.push(level.end(true));
          } else if (collision.basePoint instanceof Corps) {
            clearInterval(ccc);
            level.tip = "!#/:O";
            _results.push(level.end(false));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  }));

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
      var instance, interval;
      instance = this;
      interval = setInterval(function() {
        var collisions;
        collisions = instance.detectCollisionsAmongst(pointsGroup1, pointsGroup2);
        if (collisions.length > 0) {
          return handler(collisions);
        }
      }, 10);
      return interval;
    };

    return CollisionsHandler;

  })();

  Corps = (function(_super) {
    __extends(Corps, _super);

    Corps.initWithParentPoint = function(options) {
      var corps;
      options.distanceFromParentPoint = options.distance;
      corps = new Corps(options);
      corps.x = corps.parentPoint.x + corps.distanceFromParentPoint;
      corps.y = corps.parentPoint.y + corps.distanceFromParentPoint;
      return corps;
    };

    function Corps(options) {
      if (options == null) {
        options = {};
      }
      Corps.__super__.constructor.call(this, options);
      this.radius = options.radius, this.parentPoint = options.parentPoint, this.gravitationalForce = options.gravitationalForce, this.distanceFromParentPoint = options.distanceFromParentPoint;
      this.gravitationalForce || (this.gravitationalForce = 5);
      this.radius || (this.radius = 3);
      if (this.radius instanceof Function) {
        this.radius = this.radius(this);
      }
    }

    Corps.prototype.drawIntoCanvas = function(ctx) {
      return Corps.__super__.drawIntoCanvas.call(this, ctx);
    };

    return Corps;

  })(Point);

  window.Corps = Corps;

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
          distance: _i * spaceOffset + (this.star.marginRadius || 0),
          radius: options.corpsRadius
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
      this.canvas = options.canvas, this.onDeviceMotion = options.onDeviceMotion;
      this.onDeviceMotion || (this.onDeviceMotion = function(alpha, beta, gamma, event) {});
      options.defaultPoint || (options.defaultPoint = new Point({
        x: window.innerWidth,
        y: window.innerHeight
      }));
      this.pointers = [
        new Pointer({
          defaultPoint: options.defaultPoint
        })
      ];
      interaction = this;
      this.canvas.addEventListener("mousemove", function(event) {
        event.preventDefault();
        return interaction.pointers[0].recordMovement(event.pageX, event.pageY);
      });
      this.canvas.addEventListener("touchmove", function(event) {
        var touch;
        event.preventDefault();
        touch = event.touches[0];
        return interaction.pointers[0].recordMovement(touch.pageX - 40, touch.pageY - 40);
      });
      this.canvas.addEventListener("touchstart", function(event) {
        return event.preventDefault();
      });
      this.canvas.addEventListener("touchend", function(event) {
        return event.preventDefault();
      });
      window.ondevicemotion = function(event) {
        var accelerationX, accelerationY, accelerationZ;
        accelerationX = event.accelerationIncludingGravity.x;
        accelerationY = event.accelerationIncludingGravity.y;
        accelerationZ = event.accelerationIncludingGravity.z;
        if (Math.abs(accelerationY) < 0.3) {
          accelerationY = 0;
        }
        if (Math.abs(accelerationX) < 0.3) {
          accelerationX = 0;
        }
        interaction.onDeviceMotion(accelerationX, accelerationY, accelerationZ, event);
        return true;
      };
    }

    Interaction.prototype.toPointArray = function() {
      return this.pointers;
    };

    return Interaction;

  })();

  Interface = (function() {
    function Interface(options) {
      if (options == null) {
        options = {};
      }
      this.container = options.container;
      this.domStandardMessage = this.container.getElementsByClassName("standard-message")[0];
      this.domOverlay = this.container.getElementsByClassName("overlay")[0];
    }

    Interface.prototype.showInterface = function() {
      var instance;
      instance = this;
      this.container.style.display = "block";
      setTimeout(function() {
        return instance.container.className = "display";
      }, 100);
      return true;
    };

    Interface.prototype.hideInterface = function() {
      var instance;
      instance = this;
      this.container.className = "";
      this.domOverlay.className = "overlay";
      setTimeout(function() {
        return instance.container.style.display = "none";
      }, 1000);
      return true;
    };

    Interface.prototype.displayMessage = function(message, options) {
      var instance, mainMessage, secondaryMessage;
      if (options == null) {
        options = {};
      }
      mainMessage = this.domStandardMessage.getElementsByClassName("message-main")[0];
      mainMessage.innerText = message;
      secondaryMessage = this.domStandardMessage.getElementsByClassName("message-secondary")[0];
      if (options.secondaryMessage) {
        secondaryMessage.innerText = options.secondaryMessage;
      } else {
        secondaryMessage.innerText = "";
      }
      instance = this;
      this.domStandardMessage.style.opacity = 1;
      this.showInterface();
      if (options.showOverlay) {
        this.domOverlay.className = "overlay display";
      }
      if (options.autoDismissAfter) {
        setTimeout(function() {
          return instance.hideInterface();
        }, options.autoDismissAfter);
      }
      return true;
    };

    return Interface;

  })();

  window.Interface = Interface;

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

  Orbit = (function(_super) {
    __extends(Orbit, _super);

    function Orbit(options) {
      if (options == null) {
        options = {};
      }
      Orbit.__super__.constructor.call(this, options);
      this.borderColor = options.borderColor;
      this.fillColor = null;
      this.borderColor || (this.borderColor = "#aeff00");
    }

    Orbit.prototype.drawIntoCanvas = function(ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.borderColor;
      ctx.arc(this.x, this.y, this.radius || 5, 0, Math.PI * 2, false);
      return ctx.stroke();
    };

    return Orbit;

  })(Corps);

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
      this.pickupRadius || (this.pickupRadius = 150);
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
        return ctx.fill();
      }
    };

    return Pointer;

  })(Point);

  Scene = (function() {
    function Scene(options) {
      var scene;
      if (options == null) {
        options = {};
      }
      scene = this;
      this.universes = options.universes, this.interaction = options.interaction;
      this["interface"] = new Interface({
        container: document.getElementById("interface")
      });
    }

    Scene.prototype.toPointArray = function(options) {
      var array, originalArray, point, temparray, universe, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref;
      if (options == null) {
        options = {};
      }
      array = [];
      options.skipInteraction || (options.skipInteraction = false);
      if (!options.skipInteraction) {
        if (this.interaction) {
          array = array.concat(this.interaction.toPointArray());
        }
      }
      _ref = this.universes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        universe = _ref[_i];
        array = array.concat(universe.toPointArray());
      }
      originalArray = [];
      if (options.include) {
        for (_j = 0, _len1 = array.length; _j < _len1; _j++) {
          point = array[_j];
          originalArray.push(point);
        }
      }
      if (options.only) {
        temparray = [];
        for (_k = 0, _len2 = array.length; _k < _len2; _k++) {
          point = array[_k];
          if (point instanceof options.only) {
            temparray.push(point);
          }
        }
        array = temparray;
      }
      if (options.except) {
        temparray = [];
        for (_l = 0, _len3 = array.length; _l < _len3; _l++) {
          point = array[_l];
          if (!(point instanceof options.except)) {
            temparray.push(point);
          }
        }
        array = temparray;
      }
      if (options.include) {
        for (_m = 0, _len4 = originalArray.length; _m < _len4; _m++) {
          point = originalArray[_m];
          if (point instanceof options.include) {
            array.push(point);
          }
        }
      }
      return array;
    };

    Scene.prototype.clearScene = function() {
      this.universes = [];
      return this.interaction = null;
    };

    Scene.prototype.setLevel = function(level, onLevelEnding) {
      if (onLevelEnding == null) {
        onLevelEnding = function() {};
      }
      console.log(onLevelEnding);
      this["interface"].displayMessage(level.name, {
        autoDismissAfter: 3000,
        secondaryMessage: level.tip
      });
      this.clearScene();
      return level.call(this, {
        onLevelEnding: onLevelEnding
      });
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
    var engine, scene;
    scene = new Scene();
    scene.setLevel(levels.getLevel("level1"));
    window.scene = scene;
    engine = new MagnetiqEngine({
      canvas: document.getElementById("magnetiq"),
      scene: scene
    });
    return engine.startEngine();
  };

}).call(this);
