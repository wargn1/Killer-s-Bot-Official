const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json"); 


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setActivity(`Estou aqui para matar e esfolar pessoas, hehehehe! Não se intrometa na minha vida!`);
// caso queira o bot trasmitindo use:
/*
   client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/ladonegro'} });
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
      */
});

client.on("guildCreate", guild => {
  console.log(`O bot entrou nos servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
  client.user.setActivity(`Estou aqui para matar e esfolar pessoas, hehehehe! Não se intrometa na minha vida!`);
});

client.on("guildDelete", guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou aqui para matar e esfolar pessoas, hehehehe! Não se intrometa na minha vida!`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  //comando jRespostas1
  if(comando === "Você,tem,namorada?") {
  return message.reply("Mais é claro! A jane é minha fiel companheira! Mas de vez enquando rola algumas coisinhas :smiling_imp: ");
  }
  //comando jRespostas
  if(comando === "você,matou,quantas,pessoas?") {
    return message.reply("Inumeras! haahahahah! A proxima pessoa será você! :smiling_imp:");
  }
  //comando jeff
  if(comando === "jeff") {
    return message.reply("https://media1.tenor.com/images/2580506c719dd661ab9c5eb0b73ec320/tenor.gif?itemid=8287273 Aproveite o horror! :smiling_imp: ");
  }
  //comando dev
  if(comando === "dev") {
    return message.reply("Meu desenvolvedor é: @Zax#3581");
  }
  // comando ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }
  //comando falar
  if(comando === "say") { 
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }
//comando apagar
  if(comando === "apagar") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("De 1 a 100, Diga o tanto de mensagens que devo eliminar! 👹 ");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
  }
  // comando chutar 
  if(comando === "kick") {
//adicione o nome dos cargos que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo 1", "Nome de outro cargo 2"].includes(r.name)) )
    if(!message.member.roles.some(r=>["🔪Killer🔪", "ADMIN"].includes(r.name)) )
    if(!message.member.roles.some(r=>["Moderador", "Ajudante"].includes(r.name)) )
    if(!message.member.roles.some(r=>["🔪Killer DEV🔪"].includes(r.name)) )
      return message.reply("Ei!, eu não fui gostei dei você! Por isso não irei fazer isso!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Fale quem eu devo retirar daqui! 👹");
    if(!member.kickable) 
      return message.reply("Eu não posso expulsar este usuário! Eles pode ter um cargo mais alto ou eu não tenho permissões de expulsar?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Ei!, você não disse por que quer que eu tire ele daqui!";
    
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui expulsar o membro devido o: ${error}`));
    message.reply(`${member.user.tag} foi kickado por ${message.author.tag} Motivo: ${reason}`);

  }
  // comando ban
  if(comando === "ban") {
    //adicione o nome do cargo que vc quer que use esse comando!
    if(!message.member.roles.some(r=>["Nome do cargo"].includes(r.name)) )
    if(!message.member.roles.some(r=>["🔪Killer🔪"].includes(r.name)) )
    if(!message.member.roles.some(r=>["ADMIN"].includes(r.name)) )
    if(!message.member.roles.some(r=>["Moderador"].includes(r.name)) )
    if(!message.member.roles.some(r=>["🔪Killer DEV🔪"].includes(r.name)) )
      return message.reply("Ei!, eu não gostei dei você! Por isso não irei fazer isso!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Fale o nome de quem irei matar e retirar do servidor! 👹");
    if(!member.bannable)
      return message.reply("Eu não posso matar ou esfolar este pessoa! Ele tem algo maior do que eu!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Ei!, você não disse por que quer que eu mate ou esfole ele!";

    await member.ban(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido o : ${error}`));
    message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
  }
  
}); 

client.login(config.token);
