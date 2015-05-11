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
      .gravity('Cloud')
      .gravityConst(.05)
      .stopOnSolids()
      .collectPoints();
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

  // Collects points on collision with Point components
  collectPoints: function() {
    this.checkHits('Point');
    this.bind("HitOn", function(hitData) {
        //console.log("Collision with Point entity occurred for the first time.");
        //Crafty.trigger("UpdatePoints", {health: this.health, damage: damageValue});
        Crafty.trigger("UpdatePoints", 1);
    });
  }

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
      .color('yellow');
  },
});

// HUD
Crafty.c('HUD', {
  init: function() {
    this.requires('2D, DOM, Text, ViewportRelative');
  },
});
