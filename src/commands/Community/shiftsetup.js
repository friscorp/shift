
const shift = require('../../schemas/shiftsetup')
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ActionRow } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shift-setup')
    .setDescription('n/a')
    .addSubcommand(command => command.setName('setup').setDescription('Setup the shift system with a logging channel').addChannelOption(option => option.setName('channel').setDescription('Channel for shifts to be sent').setRequired(true)))
    .addSubcommand(command => command.setName('remove').setDescription('Disable the shift system'))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute (interaction) {
        const { options } = interaction;
        const sub = options.getSubcommand();
        const data = await shift.findOne({ Guild: interaction.guild.id });

        switch (sub) {
            case 'remove':
                if(!data) return await interaction.reply({ content: 'No shift system has been set up!'});
                else {
                    await shift.deleteOne({ Guild: interaction.guild.id});
                    await interaction.reply({ content: 'shift system deleted'});

                }
            break;
            case 'setup':
                
                if(data) return await interaction.reply({ content: 'Shift system already enabled'});
                else {
                    
                    const category = options.getChannel('channel');
                    await shift.create({
                        Guild: interaction.guild.id,
                        Category: category.id
                    });
                    await interaction.reply({ content: 'Setup', ephemeral:true })
                }

        }
    }
}