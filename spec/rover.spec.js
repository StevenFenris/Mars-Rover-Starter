const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", ()=> {
    let testRover = new Rover(91234);
    expect(testRover.generatorWatts).toBe(110);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.position).toBe(91234);
  });

it("response returned by receiveMessage contains the name of the message", ()=> {
    let testRover = new Rover(91234);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let testMessage = new Message('Test Name', commands);
    let testMessageResponse = testRover.receiveMessage(testMessage);
    expect(testMessageResponse.messageName).toBe('Test Name');
  });
it("response returned by receiveMessage includes two results if two commands are sent in the message", ()=> {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  expect(response.results.length).toBe(2)
});

it("responds correctly to the status check command", ()=> {
  let commands = new Command('STATUS_CHECK');
  let message = new Message('sending a status check', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  expect(response.results.roverStatus.mode).toBe(rover.mode);
  expect(response.results.roverStatus.position).toBe(rover.position);
  expect(response.results.roverStatus.generatorWatts).toBe(rover.generatorWatts);
});
it("responds correctly to the mode change command", ()=> {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MODE_CHANGE', 'NORMAL')];
  let message = new Message('sending mode changes', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  for(let i=0; i<response.results.length; i++){
    expect(response.results[i].completed).toBe(true);
  }

});
it("responds with a false completed value when attempting to move in LOW_POWER mode", ()=> {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 91234)];
  let message = new Message('sending mode change and move', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  expect(response.results[1].completed).toBe(false);
  expect(rover.position).toBe(98382);
});
it("responds with the position for the move command", ()=> {
  let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 91234)];
  let message = new Message('sending mode change and move', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  expect(response.results[1].completed).toBe(true);
  expect(rover.position).toBe(91234);
});

});
