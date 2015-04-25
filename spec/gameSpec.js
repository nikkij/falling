describe('game',function() {

  it ('has a background color of purple', function() {
  	//var game = new Game();
  	console.log(Game.background);
    expect(Game.background).toEqual('purple');
  });

});