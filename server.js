const http = require("http");
const querystring = require("querystring");
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});
let tmpmsg = ""

http.createServer(function(req, res){
  if (req.method == 'POST'){
    let data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      let dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      if (dataObject.type == "event") {
        if (dataObject.type == "event") {
          usualactivity();
        }
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

client.on('ready', message =>{
  console.log('Bot is ready');
  client.user.setActivity('/help is not yet defined')
});

client.on('messageCreate', message => {
  if (message.channel.id == process.env.CHANNEL_ID && message.author.id == client.user.id) {
    message.react("✋");
    message.react("👋");
  }
})


client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == tmpmsg && user.id != client.user.id) {
    reaction.message.channel.send(`ID:${user.id}\nemoji:${reaction.emoji.name}`);
  }
});

let usualactivity =()=> {
  let d = new Date();
  d.setDate(d.getDate() + 2);
  let a = ["日", "月", "火", "水", "木", "金", "土"];
  let msg = `${d.getMonth()}月${d.getDate()}日(${a[d.getDay()]})の部活動に......
    :raised_hand: 参加します！
    :wave: 参加しません……`;
  client.channels.cache.get(process.env.CHANNEL_ID).send(msg)
    .then(message => {
      tmpmsg = message.id;
    })
}

client.login( process.env.BOT_TOKEN );
