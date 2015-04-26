Game = {

  // Set global params
  background: 'rgb(22, 23, 87)',
  map_grid: {
    width:  22,
    height: 34,
    tile: {
      width:  16,
      height: 16
    }
  },

  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background(Game.background);

    // Add the Player
    Crafty.e('Player').at(11, 16);

    // Draw the grid
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {

        // Draw a star at random grid squares
        if (Math.random() < 0.06) {
          // Place a star entity at the current tile
          Crafty.e('Star').at(x, y);
        }

      }
    }

  }
}