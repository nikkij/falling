Game = {

  // Set global params
  background: 'rgb(22, 23, 87)',
  map_grid: {
    width:  22,
    height: 100,
    tile: {
      width:  16,
      height: 16
    }
  },
  points: 0,
  health: 0,

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
    Crafty.viewport.init(Game.width(),500);
    Crafty.background(Game.background);

    // Add the Player
    var player = Crafty.e('Player').at(11, 16);

    // Add HUD for displaying meta data
    Crafty.e('HUD').attr({x: 25, y: 450, w: 100, h: 50})
      .text("P:"+Game.points+"H:"+Game.health)
      .textColor('white')
      .textFont({
        size: '20px',
        weight: 'bold'
      })
      .bind("UpdatePoints", function(pointsDelta){var newPoints = Game.points = parseInt(pointsDelta) + parseInt(Game.points); this.text("P:"+Game.points+"H:"+Game.health)})
      .bind("AddHealth", function(healthDelta){ Game.health = parseInt(healthDelta) + parseInt(Game.health); this.text("P:"+Game.points+"H:"+Game.health)})
      .bind("SubtractHealth", function(healthDelta){ 
        //Game.health = parseInt(healthDelta) - parseInt(Game.health); this.text("P:"+Game.points+"H:"+Game.health)
        this.text("hello")
      });  

    //Crafty.viewport.clampToEntities = false
    Crafty.viewport.pan(0, 500, 6000)

    // Draw the grid
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        var at_edge = x == 0 || x == Game.map_grid.width-1;

        if (at_edge) {
          Crafty.e('Edge').at(x,y);  
        }
        // Draw a star at random grid squares
        else if (Math.random() < 0.06) {         
          // Place a star entity at the current tile
          Crafty.e('Star').at(x, y);

        }

      }
    }

    // Manually add enemies
    Crafty.e('Poison').at(5,54);
    Crafty.e('Enemy').at(5,55); 

    // Manually add clouds
    Crafty.e('Cloud').at(11, 30);
    Crafty.e('Cloud').at(12, 30);
    Crafty.e('Cloud').at(13, 30);

    // Maually add donuts
    Crafty.e('Donut').at(5,40);
    Crafty.e('Donut').at(5,44);

    // Manually add coffees
    Crafty.e('Coffee').at(5,46);
    Crafty.e('Coffee').at(5,50);


  
  }
}