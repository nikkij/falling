# falling
A Javascript game

# Quick Story Breakdown
Context: Chrome or Firefox browser.

As a player I want
* to see a canvas that will be the background of the game
* to see a player entity on the browser screen
* to move the player entity with the arrow keys
* the player entity to experience gravity
* the background canvas to scroll to simulate falling
* the falling to be enforced by a sliding window
* to see points in the bottom of the screen starting with 0
* to see hearts in the bottom of the screen showing health
* to gain points by collecting artifacts
* to avoid pillows which I bounce off of ( visual effect the feathers explode )
* to avoid piles / platforms of books which stop me from falling
* to gain speed by grabbing an anchor
* to loose speed by grabbing an umbrella
* to avoid flying monkeys with bat wings
* to grab donouts to give me points
* to grab coffee to restore health
* to see a fox sprite as the player entity

4/24:
* Added npm, grunt and jasmine support
* Added 1 currently failing test
* To run tests from command line root dir:  grunt test

4/25
* Removed node_modules dir, use npm install to install from package.json in future
* Added .gitignore so node_modules will not be accidentally committed in future
* Added spec folder to hold test files, removed old game.test.js
* Removed boilerplate failing test and added first game specific test
* Changed background color to better night sky color
* Changed dimensions of background to be better for up down scroller / falling

4/26
* Added component and componentSpec
* Added Grid and Actor componenets
* Added Star entity and random generated star field to Game
* Added controllable Player entity to Game with fourway movement
* TODO: can't figure out how to init Crafty to use in unit tests, need to figure out so can add tests for compoenents next - coding without testing - bad juju nikki
