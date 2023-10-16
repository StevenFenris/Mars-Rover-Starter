const Message = require('../message.js');
const Command = require('../command.js');

class Rover {
   constructor (position){
         this.position = position;
         this.mode = 'NORMAL';
         this.generatorWatts = 110;
         
   }
   receiveMessage(Message){
      //check if valid message
      //results object{
      // constructor(){completed : true, resultMessage : null};
      //}
      //let arrResults
      //for loop to iterate through commands
      //for each command, this.mode, this.positon, this.generatorwatts = message.Command
      /*for (i=0; message.commands.length ; i++)
         if (message.command[i].commandType === 'MOVE' && this.mode = 'NORMAL'){
               this.position = message.command[i].value
               arrResults[i] = new results{completed : true}
         }else if(message.command[i].commandType === 'MOVE' && this.mode != 'NORMAL'){
               arrResults[i] = new results(completed : false)
         }else if(message.command[i].commandType === 'MODE_CHANGE')
               this.mode = message.command[i].value
               arrResults[i] = new results(completed : true) 
         }else if(message.command[i].commandType === 'STATUS_CHECK'){
               arrResults[i] = new results(completed : true)
         }



      //return (messageName, results) */
   }
}

module.exports = Rover;