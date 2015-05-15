// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },
 
  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// Utility component that can be added to entities to make them "stick" in the viewport
Crafty.c("ViewportRelative", {
  _viewportPreviousX: 0,
  _viewportPreviousY: 0,
  _viewportStartX: 0,
  _viewportStartY: 0,
  init: function() {    
    this.bind("EnterFrame", this._frame); 
  },
  _frame: function() {
    if(this._viewportPreviousX != Crafty.viewport._x) {
      this._viewportStartX = Crafty.viewport._x;
        
      this.y += this._viewportPreviousX
      this.y -= Crafty.viewport._x;
        
      this._viewportPreviousX = this._viewportStartX;
    }
        
    if(this._viewportPreviousY != Crafty.viewport._y) {
      this._viewportStartY = Crafty.viewport._y;
        
      this.y += this._viewportPreviousY
      this.y -= Crafty.viewport._y;
        
      this._viewportPreviousY = this._viewportStartY;
    }
  }
});


// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// Player entity
Crafty.c('Player', {
  init: function() {
    this.requires('Actor, Fourway, Color, Collision, Gravity')
      .fourway(4)
      .color('orange')
      .gravity('Solid')
      .gravityConst(.05)
      .stopOnSolids()
      .collectPoints()
      .collectHealth()
      .removeHealth()
      //write remove health function on hit enemy
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },


  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  collectPoints: function() {
    this.checkHits('Point');
    this.bind("HitOn", function(hitData) {
      if (hitData[0].obj.has('Point')) {
        Crafty.trigger("PointHit", 1);
        hitData[0].obj.destroy();
      }
    }); 
    return this; 
  },

  collectHealth: function() {
    this.checkHits('Health');
    this.bind("HitOn", function(hitData) {
      if (hitData[0].obj.has('Health')) {
        Crafty.trigger("HealthHit", 1);
        hitData[0].obj.destroy();
      }
    }); 
    return this; 
  },

  removeHealth: function() {
    this.checkHits('Poison');
    this.bind("HitOn", function(hitData) {
      if (hitData[0].obj.has('Poison')) {
        Crafty.trigger("SubtractHealth", 1);
      }
    }); 

    return this; 
  }

});

Crafty.c('Solid', {
  init: function() {
  },
});

Crafty.c('Poison', {
  init: function() {
    this.requires('2D, Canvas, Grid')
  },
});

// Edge 
Crafty.c('Edge', {
  init: function() {
    this.requires('2D, Canvas, Grid, Solid')
      .visible = false;
  },
});

// Star entity
Crafty.c('Star', {
  init: function() {
    this.requires('Actor, Color')
      .color('grey');
  },
});

// Cloud entity
Crafty.c('Cloud', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('white');
  },
});

// Donut entity
Crafty.c('Donut', {
  init: function() {
    this.requires('Actor, Color, Point')
      .color('pink');
  },
});

//Coffee entity
Crafty.c('Coffee', {
  init: function() {
    this.requires('Actor, Color, Health')
      .color('yellow');
  },
});

//Enemy entity
Crafty.c('Enemy', {
  init: function() {
    this.requires('2D, Canvas, Grid, Color, Solid')
      .color('green');
  },
});

// HUD
Crafty.c('HUD', {
  init: function() {
    this.requires('2D, DOM, Text, ViewportRelative');
  },
});
