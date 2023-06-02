const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")
const ms = require('ms')

module.exports = {
    name: "giveaway-start",
    description: "Permet de créer un giveaway",
    options: [
        {
          name: "channel",
          description: "Quel sera le salon ?",
          required: true,
          type: ApplicationCommandOptionType.Channel,
        },
        {
            name: "duration",
            description: "Quel sera la durée ?",
            required: true,
            type: ApplicationCommandOptionType.String,
          },
          {
            name: "gagnant",
            description: "Quel sera le gagnant ?",
            required: true,
            type: ApplicationCommandOptionType.Integer,
          },
          {
            name: "prix",
            description: "Quel sera le prix du giveaway ?",
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
      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })
      
            let channel = interaction.options.getChannel("channel")
    
            let duration = interaction.options.getString("duration")
    
            let winners = interaction.options.getInteger("gagnant")
    
            let prize = interaction.options.getString("prix")
    
            client.giveawaysManager.start(channel, {
                duration : ms(duration),
                prize : prize,
                winnerCount: winners,
                hostedBy: client.config.hostedBy ? message.author : null,
                messages: {
                    giveaway: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Giveaway",
                    giveawayEnd: (client.config.everyoneMention ? "@everyone\n\n" : '') + "Fin du Giveaway",
                    timeRemaining: "Temps restant **{duration}**",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer au tirage au sort.",
                    winMessage: "Félicitations {winners}, vous avez gagné le concours",
                    embedFooter: "C'est l'heure du tirage au sort !",
                    noWinner: "Impossible de déterminer un gagnant",
                    hostedBy: 'Organisé par {user}',
                    winners: "Gagnant",
                    endedAt: 'Se termine à',
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: 'heures',
                        days: 'jours',
                        pluralS: false
                    }
                },
               
            })
            interaction.reply({content: `Le giveaway a commencer dans le salon ${channel}`})
    }
}