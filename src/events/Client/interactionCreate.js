const { CommandInteraction, Client, InteractionType, PermissionFlagsBits, ContextMenuCommandBuilder } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
        let prefix = client.prefix;

        if (interaction.type === InteractionType.ApplicationCommand) {
            const SlashCommands = client.slashCommands.get(interaction.commandName);
            if (!SlashCommands) return;
            try {
                await SlashCommands.run(client, interaction, prefix);
            } catch (error) {
                if (interaction.replied) {
                    await interaction.editReply({content: `Une erreur inconnu viens de ce produire.`}).catch(() => { });
                } else {
                    await interaction.reply({ ephemeral: true, content: `Une erreur inconnu viens de ce produire.` }).catch(() => { });
                }
                console.log(error);
            }
        }

        if (interaction.isButton()) {};
    }
};
