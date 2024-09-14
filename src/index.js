const { Client, GatewayIntentBits, TextInputBuilder, EmbedBuilder, WebhookClient, Events, PermissionsBitField, Permissions, MessageManager, Embed, Collection, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);
const fs = require('fs');
const ms = require('ms');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const testSchema = require('../src/schemas/shift')
const shiftidpass = require('../src/schemas/shiftid')
const shiftset = require('../src/schemas/shiftsetup')
client.commands = new Collection();
require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isModalSubmit()) return;

if (interaction.customId === 'addshift') {
    

const shiftidblah = interaction.fields.getTextInputValue('shiftidea');
const timeadd = interaction.fields.getTextInputValue('addtime');
if (timeadd.includes("m")) {
    timeaddd = timeadd.replace("m", "");
    console.log(timeaddd + ' this point')
    timeaddd = Number(timeaddd) * 60
    console.log('finish' + timeaddd)
} else if (timeadd.includes('s')) {
    timeaddd = timeadd.replace("s", "");
} else if (timeadd.includes('h')) {
    timeaddd = timeadd.replace("h", "");
    timeaddd = Number(timeaddd) * 60 * 60
} else {
    return await interaction.reply( 'Invalid time format, please try again using the specified examples in the box.')
}
console.log('stone' + timeaddd)
const shiftobe = await testSchema.findOne({ shiftid: shiftidblah });
if (!shiftobe) {
    return await interaction.reply('Invalid shift ID, please try again and try to remove any extra spaces in your input.')
}
await testSchema.updateOne( {shiftid: shiftidblah }, 
    {
        $set: {
            time: Number(shiftobe.time) + Number(timeaddd)
        }
    })
const officer = interaction.user.id
await interaction.reply({ content: 'Shift Time Added', ephemeral: true})
//console.log(`from ${officer} Name ${violato} and th e desc ${descr}`)
const ticketEmbed = new EmbedBuilder()
.setTitle('Manually Added Time')
.setDescription(`<@${officer}> added time to ${shiftobe.user}'s shift with ID: ${shiftidblah}`)
.setColor('FF0000')
.setTimestamp()
.setFooter({text: `Time added: ${timeaddd}`})

const shiftdata = await shiftset.findOne({ Guild: interaction.guild.id });
const ticklog =  await client.channels.cache.get(shiftdata.Category).send({ embeds: [ticketEmbed] });
}
if (interaction.customId == 'removeshiftime') {
    const shiftidblah = interaction.fields.getTextInputValue('removedId');
    const timeadd = interaction.fields.getTextInputValue('addtime');
    if (timeadd.includes("m")) {
        timeaddd = timeadd.replace("m", "");
        console.log(timeaddd + ' this point')
        timeaddd = Number(timeaddd) * 60
        console.log('finish' + timeaddd)
    } else if (timeadd.includes('s')) {
        timeaddd = timeadd.replace("s", "");
    } else if (timeadd.includes('h')) {
        timeaddd = timeadd.replace("h", "");
        timeaddd = Number(timeaddd) * 60 * 60
    } else {
        return await interaction.reply( 'Invalid time format, please try again using the specified examples in the box.')
    }
    console.log('stone' + timeaddd)
    const shiftobe = await testSchema.findOne({ shiftid: shiftidblah });
    if (!shiftobe) {
        return await interaction.reply('Invalid shift ID, please try again and try to remove any extra spaces in your input.')
    }
    if (Number(shiftobe.time) - Number(timeaddd) < 0) {
        return await interaction.reply('You are trying to remove more time than the length of the shift! The shift is ' + shiftobe.time/60 + ' minutes long.')
    }
    await testSchema.updateOne( {shiftid: shiftidblah }, 
        {
            $set: {
                time: Number(shiftobe.time) - Number(timeaddd)
            }
        })
    const officer = interaction.user.id
    await interaction.reply({ content: 'Shift Time Removed', ephemeral: true})
    //console.log(`from ${officer} Name ${violato} and th e desc ${descr}`)
    const ticketEmbed = new EmbedBuilder()
    .setTitle('Manually Removed Time')
    .setDescription(`<@${officer}> removed time to ${shiftobe.user}'s shift with ID: ${shiftidblah}`)
    .setColor('FF0000')
    .setTimestamp()
    .setFooter({text: `Time removed: ${timeaddd}`})
    
    const shiftdata = await shiftset.findOne({ Guild: interaction.guild.id });
    const ticklog =  await client.channels.cache.get(shiftdata.Category).send({ embeds: [ticketEmbed] });
}
if (interaction.customId == 'removeshift') {
    const shiftidblah = interaction.fields.getTextInputValue('shfitidea');
const shiftobe = await testSchema.findOne({ shiftid: shiftidblah });
if (!shiftobe) {
    return await interaction.reply('Invalid shift ID, please try again and try to remove any extra spaces in your input.')
}
    const shiftdata = await shiftset.findOne({ Guild: interaction.guild.id });
    const shiftmsg = await testSchema.findOne({ shiftid: shiftidblah });
    const channelId = shiftdata.Category;
    const messageId = shiftmsg.link;
    console.log(messageId)

    client.channels.fetch(channelId).then(channel => {
        channel.messages.delete(messageId);
    });
await testSchema.deleteOne({shiftid:shiftidblah})
return await interaction.reply({ content: 'Shift deleted', ephemeral: true})
}
if (interaction.customId === 'shiftmod') {
    await interaction.reply({ content: 'logged', ephemeral: true})


const violato = interaction.fields.getTextInputValue('violator');
console.log('id: '+interaction.title)
//shiftia = interaction.fields.getTextInputValue('shifti');



const officer = interaction.user.id
const usersch = interaction.user.username
//const database = client.db('test');
        //const collection = database.collection('shiftschema13421422');
        
        // Sort documents by timestamp in descending order and limit to 1
const iddata = await shiftidpass.findOne({ password: "admin" })
console.log(iddata.shiftid)
console.log(iddata.shiftid + ': real')
const data = await testSchema.findOne({shiftid: iddata.shiftid})
//console.log(data)
shiftia = data.shiftid
mstime = data.time
function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
    }
shifttime = secondsToDhms(mstime);


//console.log(`from ${officer} Name ${violato} and th e desc ${descr}`)

const ticketEmbed = new EmbedBuilder()
.setTitle(`New shift from ${usersch}`)
.setDescription(`Total shift time: ${shifttime}`)
.setColor('000000')
.setTimestamp()
.addFields({ name: 'Description', value: violato})
.setFooter({text: `Shift ID: ${shiftia}`});

const button = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('reject')
    .setLabel('Reject')
    .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
    .setCustomId('approve')
    .setLabel('Approve')
    .setStyle(ButtonStyle.Success)
);
const shiftdata = await shiftset.findOne({ Guild: interaction.guild.id });
const ticklog =  await client.channels.cache.get(shiftdata.Category).send({ embeds: [ticketEmbed], components: [button] });
await testSchema.updateOne( {shiftid: iddata.shiftid }, 
    {
        $set: {
            link: ticklog.id
        }
    })
const collector = ticklog.createMessageComponentCollector();
collector.on('collect', async i => {
    if (i.customId === 'reject') {
        client.users.send(officer, 'Your shift log was denied, most likely you need to add more detail. If it was more severe a discussion will be opened shortly.');
        const data = await testSchema.find();
        await testSchema.deleteOne({ shiftid:  shiftia})
        await i.reply({ content: 'Denied Shift, Shift ' + shiftia + ' was deleted. Deleting shift log in <t:' +(Math.floor(Date.now() / 1000)+3) + ':R>', ephemeral: true })
        function greet() {
            ticklog.delete()
        }
        
        setTimeout(greet, 3000);
        //ticklog.delete()
        return

    } else if (i.customId === 'approve') {
        const approver = i.user.username
        const data = await shiftset.findOne({Guild: interaction.guild.id});
        gmem = interaction.guild.members.cache.find(member => member.id === interaction.user.id)
        console.log(data.Role)
        if (gmem.roles.cache.some(role => role.id === data.Role)) {
            console.log('x')
        } else {
            return await i.reply({content: 'You are not allowed to use this!', ephemeral: true})
        }
        const newEmbed = new EmbedBuilder()
.setTitle('New Shift')
.setDescription(`From ${usersch}`)
.setColor('00FF00')
.setTimestamp()
.addFields({ name: 'Description', value: violato})
.setFooter({text: `Shift ID: ${shiftia}, Approved by ${approver}`});
const button = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('reject')
    .setLabel('Reject')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(true),

    new ButtonBuilder()
    .setCustomId('approve')
    .setLabel('Approve')
    .setStyle(ButtonStyle.Success)
    .setDisabled(true)
);
        ticklog.edit({embeds:[newEmbed], components: [button]})
        return await i.reply({content: 'Approved Shift', ephemeral: true})
    }
})
}
})
