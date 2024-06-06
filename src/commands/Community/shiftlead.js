const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const testSchema = require('../../schemas/shift')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shift-leaderboard')
    .setDescription('manage yuor shift'),
    async execute(interaction, client) {

    const data = await testSchema.find();

    var values = [];
    var times = [];
    var validations = [];
    var guilds = [];
    await data.forEach(async d => {
        validations.push(d.shiftid)
    })
    await data.forEach(async d => {
        values.push(d.user);
    });
    await data.forEach(async d => {
        times.push(d.time);
    });
    await data.forEach(async d => {
        guilds.push(d.Guild);
    });
    if (values[0] == null) {
        values.push('The database is empty!')
    }
    if (times[0] == null) {
        times.push('The database is empty!')
    }
    user = ''
    searchin = ''
    preuse=  []
    thises = false
    
    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
    for (let i = 0; i<values.length; i++) {
        guildcheck = false
        
        const data = await testSchema.findOne({ shiftid: validations[i]});
        if(!data || data == null) {
            return await interaction.reply('No shifts to display!')
        }
        console.log(data.Guild + ' ' + data.shiftid)
        if (data.Guild!= interaction.guild.id) {
            guildcheck = true
            console.log('Diverted from reference guild, reference: ' + guildcheck)
        }
        if(preuse.includes(values[i])) {
            thises = true
        }
        if (getOccurrence(values, values[i])>1 && thises == false && guildcheck == false) {
            console.log('Hit correct guild, reference: ' + guildcheck)
            preuse += values[i]
            searchin = values[i]
            timein = 0
            for (let x = 0; x<values.length; x++) {
                if (values[x] == searchin && guilds[i]== interaction.guild.id) {
                    timein += Number(Math.floor(times[x]))/60
                    console.log(times[x])
                    console.log(times)
                }
            }
            user += values[i] + ': ' + Number(timein).toFixed(1) + ' minutes \n'
            console.log(timein)
            const embed = new EmbedBuilder()
        .setTitle('Shift Panel')
        .setDescription(user)
        .setColor('336d91')
        .setTimestamp()
        //.addFields({ name: 'Players', value: response.CurrentPlayers})
        //.addFields({ name: 'Players', value: response.CurrentPlayers.toString() + ' out of ' + response.MaxPlayers.toString() + ' max players', inline: true })

            
            
            
        } else {
        if (thises == false && guildcheck == false) {
            console.log('hit reference: ' + guildcheck)
        preuse += values[i]
        
        user += '**' + values[0] + '**: ' + (Number((times[i]))/60).toFixed(1) + ' minutes\n'
        }
    }
        thises = false
    }
    console.log('suffix' + user)
    if (user=='') {
        user = 'No Shifts!'
    }
    console.log(times + values)
        const embed = new EmbedBuilder()
        .setTitle('Shift Leaderboard')
        .setDescription(user)
        .setColor('336d91')
        .setTimestamp()
        //.addFields({ name: 'Players', value: response.CurrentPlayers})
        //.addFields({ name: 'Players', value: response.CurrentPlayers.toString() + ' out of ' + response.MaxPlayers.toString() + ' max players', inline: true })

        interaction.reply({ embeds: [embed]})


    }
}
