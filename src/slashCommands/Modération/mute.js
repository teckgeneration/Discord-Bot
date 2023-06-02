const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction } = require("discord.js")
const ms = require("ms");
const config = require("../../config")

module.exports = {
    name: "mute",
    description: "Permet de mute un utilisateur",
    options: [
        {
          name: "user",
          description: "Quel est l'utilisateur ?",
          required: true,
          type: ApplicationCommandOptionType.User,
        },
        {
            name: "time",
            description: "Quel est le temps ?",
            required: true,
            type: ApplicationCommandOptionType.String,
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

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("MuteMembers"))) return interaction.reply({content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true})
        if(!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("MuteMembers"))) return interaction.reply({content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true})


        const mutee = interaction.options.getMember('user');
        const reason  = interaction.options.getString('reason');
        const timed  = interaction.options.getString('time');

        if (!mutee) return interaction.reply({content: `Veuillez entrer un utilisateur valide pour le mute`, ephemeral: true});

        if (mutee === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous mute`, ephemeral: true})
    
        if(reason.length > 1500) return interaction.reply({content: `La raison de votre mute est trop long. Veuillez le raccourci`, ephemeral: true});
    
        if (mutee.user.bot) return interaction.reply({content: `Impossible de mute les bots`, ephemeral: true});
    
        const convertdTime = ms(timed)

        mutee.timeout(convertdTime)
        interaction.reply({content: `L'utilisateur ${mutee.user.username} a été mute pendant ${timed} pour la raison : ${reason}`})


    }
}
