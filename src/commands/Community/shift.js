const { SlashCommandBuilder, ModalAssertions, TextInputStyle, TextInputBuilder, ModalBuilder, ModalSubmitFields, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const testSchema = require('../../schemas/shift')
const idSchema = require('../../schemas/shiftid')
const shift = require('../../schemas/shiftsetup')
dbTime=0
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shift')
    .setDescription('manage yuor shift'),
    async execute(interaction, client) {
        const shiftdat = await shift.find();
        var validations = []
        await shiftdat.forEach(async d => {
            validations.push(d.Guild)
        })
        if (validations.includes(interaction.guild.id) == false) {
            return interaction.reply('This server has not set up a shift system yet! Ask your Owner/Admin to use /shift-setup to enable!')
        }
        const embed = new EmbedBuilder()
        .setTitle('Shift Panel')
        .setDescription('Manage')
        .setColor('336d91')
        .setTimestamp()
        //.addFields({ name: 'Players', value: response.CurrentPlayers})
        //.addFields({ name: 'Players', value: response.CurrentPlayers.toString() + ' out of ' + response.MaxPlayers.toString() + ' max players', inline: true })
        const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('start')
        .setLabel('Start')
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End')
        .setStyle(ButtonStyle.Danger)
    );

        const shiftpan = await interaction.reply({ embeds: [embed], components: [button] });

        const collector = shiftpan.createMessageComponentCollector();
    collector.on('collect', async i => {
        const jsTime = Math.floor(Date.now() / 1000);
        const currentTime = '<t:' + jsTime + ':R>';
        if (i.customId === 'start') {
            dbTime = Date.now()
            return await i.reply({ content: 'Started Shift at ' + currentTime, ephemeral: true })
        } else if (i.customId === 'end') {
            const shiftid = Math.random().toString(36).slice(2)
            const modal = new ModalBuilder()
        .setTitle(shiftid)
        .setCustomId('shiftmod')


        const violator = new TextInputBuilder()
        .setCustomId('violator')
        .setRequired(true)
        .setLabel('Shift Description')
        .setPlaceholder('Describe some key events in your shift. 2-3 sentences is sufficient')
        .setMaxLength(1_000)
        .setStyle(TextInputStyle.Paragraph);
        const shifti = new TextInputBuilder()
        .setCustomId('shifti')
        .setRequired(true)
        .setLabel('Shift ID (Do not change this)')
        .setPlaceholder(shiftid)
        .setValue(shiftid)
        .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(violator)
        const secondActionRow = new ActionRowBuilder().addComponents(shifti)
        modal.addComponents(firstActionRow)
        if(dbTime == 0) {
            return await i.reply('You must start your shift first!')
        }
        i.showModal(modal)
            endedTime = Date.now()-dbTime
            
            await testSchema.create({
                Guild: interaction.guild.id,
                user: interaction.user.username,
                time: endedTime/1000,
                shiftid: shiftid
            });
            const idpass = await idSchema.findOne({ password: 'admin' });
            if(!idpass) {
                await idSchema.create({
                    shiftid: shiftid,
                    password: 'admin'
                });
            } else {
                await idSchema.updateOne( {password: 'admin' }, 
                    {
                        $set: {
                            shiftid: shiftid
                        }
                    })
            }
            const data = await testSchema.find();
            //return await i.reply({ content: 'Ended Shift at ' + currentTime + '. Your shift was ' + endedTime/1000 + ' seconds long', ephemeral: true })
            
        }
    })

    }
}
