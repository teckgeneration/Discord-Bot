const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    name: "bingo",
    description: "Permet de fournir des numéros de bingo pour jouer au bingo",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            let y = Math.floor(Math.random() * (Math.floor(75) - Math.ceil(1) + 1)) + Math.ceil(1);
            let x = null;
        
            if (y < 15) { x = "B"; } 
            else if (y < 30){ x = "I"; } 
            else if (y < 45){ x = "N"; } 
            else if (y < 60){ x = "G"; } 
            else { x = "O"; }
        
           return interaction.reply({content: `${x + y}`});
        } catch(error) {
            interaction.reply({content: `Une erreur inconnu viens de ce produire !`, ephemeral: true})
        }
    }
}