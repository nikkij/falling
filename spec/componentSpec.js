describe('component',function() {

  it ('has a grid', function() {
  	var grid = Crafty("Grid");
    expect(grid).not.toBeNull();
  });

  it ('has a grid with with a w attribute', function() {
  	var grid = Crafty("Grid");
  	grid.w = 16;
    expect(grid.w).toEqual(16);
  });
  
});