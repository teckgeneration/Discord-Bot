const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    name: "meme",
    description: "Permet de renvoyer un meme",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            let res = await fetch('https://meme-api.herokuapp.com/gimme');

            res = await res.json();
            const embed = new EmbedBuilder()
              .setTitle(res.title)
              .setImage(res.url)
              .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}` })
              .setTimestamp()
              .setColor("Random");
            
              return interaction.reply({embeds: [embed]})
          } catch (err) {
            console.log("Une erreur est survenue", err)
          }

    }
}