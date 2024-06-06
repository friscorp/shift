const { SlashCommandBuilder, ModalAssertions, TextInputStyle, TextInputBuilder, ModalBuilder, ModalSubmitFields, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const testSchema = require('../../schemas/shift')
dbTime=0
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shift-manage')
    .setDescription('manage others shift'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle('Shift Manager')
        .setDescription('Manage')
        .setColor('336d91')
        .setTimestamp()
        //.addFields({ name: 'Players', value: response.CurrentPlayers})
        //.addFields({ name: 'Players', value: response.CurrentPlayers.toString() + ' out of ' + response.MaxPlayers.toString() + ' max players', inline: true })
        const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('add')
        .setLabel('Add Time')
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId('removetime')
        .setLabel('Remove Time')
        .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
        .setCustomId('remove')
        .setLabel('Remove Shift')
        .setStyle(ButtonStyle.Danger)
    );

        const shiftpan = await interaction.reply({ embeds: [embed], components: [button] });

        const collector = shiftpan.createMessageComponentCollector();
    collector.on('collect', async i => {
        const jsTime = Math.floor(Date.now() / 1000);
        const currentTime = '<t:' + jsTime + ':R>';
        if (i.customId === 'add') {
            dbTime = Date.now()
            const modal = new ModalBuilder()
        .setTitle('Shift Logged')
        .setCustomId('addshift')
        const shiftIb = new TextInputBuilder()
        .setCustomId('shiftidea')
        .setRequired(true)
        .setLabel('Enter the shift ID to add time to')
        .setStyle(TextInputStyle.Short);
            const addtime = new TextInputBuilder()
        .setCustomId('addtime')
        .setRequired(true)
        .setLabel('Add Time')
        .setPlaceholder('e.g. 9m, 1h, 30s')
        .setStyle(TextInputStyle.Short);
        const secondActionRow = new ActionRowBuilder().addComponents(addtime)
        const firstActionRow = new ActionRowBuilder().addComponents(shiftIb)
        modal.addComponents(firstActionRow,secondActionRow)
        i.showModal(modal)
        } else if (i.customId === 'removetime') {
            dbTime = Date.now()
            const modal = new ModalBuilder()
        .setTitle('Shift Manage')
        .setCustomId('removeshiftime')
        const shiftIb = new TextInputBuilder()
        .setCustomId('removedId')
        .setRequired(true)
        .setLabel('Enter shift ID to remove time')
        .setStyle(TextInputStyle.Short);
            const addtime = new TextInputBuilder()
        .setCustomId('addtime')
        .setRequired(true)
        .setLabel('Remove Time')
        .setPlaceholder('e.g. 9m, 1h, 30s')
        .setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(shiftIb)
        const secondActionRow = new ActionRowBuilder().addComponents(addtime)
        modal.addComponents(firstActionRow, secondActionRow)
        i.showModal(modal)
        } else if (i.customId == 'remove') {
            dbTime = Date.now()
            const modal = new ModalBuilder()
        .setTitle('Shift Manage')
        .setCustomId('removeshift')
        const shiftIb = new TextInputBuilder()
        .setCustomId('shfitidea')
        .setRequired(true)
        .setLabel('Enter the shift ID to remove')
        .setStyle(TextInputStyle.Short);
           
        const firstActionRow = new ActionRowBuilder().addComponents(shiftIb)
        modal.addComponents(firstActionRow)
        i.showModal(modal)
        }
    })

    }
}