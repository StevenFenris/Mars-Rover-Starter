const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor (position){
         this.position = position;
         this.mode = 'NORMAL';
         this.generatorWatts = 110;
         
   }
   receiveMessage(message){
      if (message instanceof Message){
      //console.log(message);      
        //check if valid message
      //let messageHome = {received:message, arrResults : []};
      let arrResults = [];
      //for loop to iterate through commands
      //for each command, this.mode, this.positon, this.generatorwatts = message.Command
      for (let i=0; i<message.commands.length ; i++){
         if (message.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL'){
               this.position = message.commands[i].value;
               arrResults[i] = {completed : true};
         }else if(message.commands[i].commandType === 'MOVE' && this.mode != 'NORMAL'){
               arrResults[i] = {completed : false};
         }else if(message.commands[i].commandType === 'MODE_CHANGE'){
               this.mode = message.commands[i].value;
               arrResults[i] = {completed : true};
         }else if(message.commands[i].commandType === 'STATUS_CHECK'){
               let Roverstatus = {mode : this.mode, generatorWatts : this.generatorWatts, position : this.position};   
               arrResults[i] = {completed : true, roverStatus : Roverstatus};
               console.log(arrResults[i].roverStatus)
         }
      }
      let MessageHome = {message : message.name , results : arrResults};
      return (MessageHome)
      }else console.log('not a valid message');
      
      }
      
      
}



module.exports = Rover;
