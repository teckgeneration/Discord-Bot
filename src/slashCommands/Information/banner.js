const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, italic } = require("discord.js");
const axios = require("axios")
const moment = require('moment');
moment.locale('fr');

module.exports = {
    name: "banner",
    description: "Permet de récupérer la bannière de quelqu'un",
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })
        
        const member = interaction.options.getMember("user");


        axios.get(`https://discord.com/api/users/${member.id}`, {

            headers: {
                Authorization: `Bot ${client.token}`
            },
        }).then(async (res) => {
            const { banner } = res.data

            if (banner) {
                const extension = banner.startsWith("a_") ? '.gif' : '.png'
                const image = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=2048`;

                const embed = new EmbedBuilder()
                    .setTitle(`${member.user.tag}`)
                    .setImage(image)
                    .setColor("#F71D0A")
                await interaction.reply({ embeds: [embed]});

            }else{
                return interaction.reply({content: `Ce membre n'a pas de banniére.`, ephemeral: true})
            }
        })
    }
}