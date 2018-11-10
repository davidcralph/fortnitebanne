const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const prefix = "f?";

function saveGuilds() { 
 fs.writeFile("./guilds.json", JSON.stringify(saveGuilds), err => { 
 	 if (err) console.log(err);
    }); 
}
function loadGuilds() {
    fs.readFile("./guilds.json", (err, data) => {
        if (err) return console.log(err);
        guilds = JSON.parse(data);
    });
}

client.on("ready", () => { loadGuilds();} );

client.on("message", (message) => {
if (!message.guild || message.author.bot) return;
const banned = require("./banned.json"); 
if( banned.some(word => message.content.includes(word)) ) { message.delete(); } //nice meme
 if (!message.content.startsWith(prefix)) return;
    let cmd = message.content.split(" ")[0];
    cmd = cmd.slice(prefix.length);
    let args = message.content.split(" ").slice(1);
      if (cmd == "ping") {
        msg.channel.send(`Pong! The ping is **${(bot.ping).toFixed(0)}**ms! :ping_pong:`);
    }
   if (cmd == "help") {
   	     msg.channel.send("", { embed: new Discord.RichEmbed().setTitle("Help").setColor("ff0000").setDescription("**f?help** - Shows this message\n**f?ping** - Tells you the bot PONG:tm:\n**f?setup** - Setup the Fortnite ban!\n**f?toggle** - Toggles the Fortnite ban!").setFooter("Stats Command") });
   }
  if (cmd === "setup") {
        if (!message.member.hasPermission("MANAGE_GUILD")) { return message.channel.send(":x: You don't have the required permission to ban Fortnite. (MANAGE_GUILD)"); }
        guilds[message.guild.id] = { "enabled": true };
        message.channel.send(":white_check_mark: Fortnite has been banned:tm:");
        saveGuilds();
    }
       if (cmd === "toggle") {
        if (!message.member.hasPermission("MANAGE_GUILD")) { return message.channel.send(":x: You don't have the required permission to toggle the Fortnite ban. (MANAGE_GUILD)"); }
        if (!guilds[message.guild.id]) { return message.channel.send(":x: You have to ban Fortnite first! Do **f?setup** to ban.") }
        guilds[message.guild.id].enabled = !guilds[message.guild.id].enabled;
        let state = guilds[message.guild.id].enabled ? "active" : "inactive";
        message.channel.send(":white_check_mark: Fortnite ban is now " + state);
        saveGuilds();
    }
}); 
client.login("");