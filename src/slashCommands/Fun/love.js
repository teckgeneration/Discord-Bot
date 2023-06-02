const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: "love",
    description: "Permet de voir le % d'amour",
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

            async function work() {
            let owo = (await neko.hug());

            const love = Math.round(Math.random() * 100);

            const loveEmbed = new EmbedBuilder()
                .setColor("Random")
                .setDescription(`${interaction.user.username} + ${user} = ${love}% d'amour!`)
                .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
                .setImage(owo.url)
                .setTimestamp()
            return interaction.reply({ embeds: [loveEmbed] })
            
        }
        work();
        } catch (err) {
            console.log("Une erreur est survenue", err)
        }
    }
}