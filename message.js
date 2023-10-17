const Command = require("./command");

class Message {
   constructor(name, commands){
      if(typeof name === "string"){
         this.name = name;
      } else throw Error("Must pass valid name as first parameter");
      this.commands = commands;
   }
}

module.exports = Message;
