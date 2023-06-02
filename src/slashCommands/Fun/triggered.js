const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");
const DIG = require('discord-image-generation');

module.exports = {
    name: "triggered",
    description: "Permet de triggered un utilisateur",
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            const user = interaction.options.getMember("user");        
            let avatar = await user.user.displayAvatarURL({ dynamic: false, format: 'png' });
            let image = await new DIG.Triggered().getImage(avatar);

            const attachment = new AttachmentBuilder(image, { name: 'triggered.gif' });
        
            let msg = await interaction.reply({ 
              files: [attachment],
            })

        } catch (err) {
            interaction.reply({content: "Une erreur inconnu viens de ce produire sur l'api !", ephemeral: true})
        }
    }
}