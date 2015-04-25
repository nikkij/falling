describe('game',function() {

  it ('has a background color of rgb 22, 23, 87', function() {
    expect(Game.background).toEqual('rgb(22, 23, 87)');
  });

  it ('has background dimensions of 352 by 544', function() {
    expect(Game.width()).toEqual(352);
    expect(Game.height()).toEqual(544); 
  });

});