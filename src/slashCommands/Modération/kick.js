const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "kick",
    description: "Permet de kick un utilisateur",
    options: [
        {
          name: "user",
          description: "Quel est l'utilisateur ?",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Quel est la raison ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
      ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
            if(!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("KickMembers"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
            if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("KickMembers"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})
    
            const kickMember = interaction.options.getMember('user');
            const reason  = interaction.options.getString('reason');
    
            if (!kickMember) return interaction.reply({content: "L'utilisateur n'est pas dans le serveur.", ephemeral: true});
            if (kickMember === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous expulser.`, ephemeral: true});
            if (!kickMember.kickable) return interaction.reply({content: `Impossible d'expulser cet utilisateur.`, ephemeral: true});
    
            kickMember.kick(reason.length).then(async () => {
            await interaction.reply({ content: `J'ai expulser ${kickMember.user.username} pour la raison : ${reason.length !== 0 ? `\n\`Raison\` - ${reason}` : `\n\`Raison\` - Aucune raison fournie`}` });
            }).catch(() => {
                return console.log(`Impossible d'expulser cet utilisateur ${kickMember}`);
            });

    }
}