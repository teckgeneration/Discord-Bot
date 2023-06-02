const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../../config");
const pet = require('pet-pet-gif');

module.exports = {
    name: "pcf",
    description: "Permet de pet un utilisateur",
    options: [
        {
            name: "valeur",
            description: "Pierre, feuille, ciseaux",
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
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            const args = interaction.options.getString("valeur");

            const rps = ['ciseaux', 'pierre', 'feuille'];
            const res = ['Ciseaux ✂️', 'Pierre ✊', 'Feuille 🤚'];

            let userChoice;
            if (args.length) userChoice = args
            if (!rps.includes(userChoice)) return interaction.reply({ content: 'Merci d\'entrer `pierre`, `feuille`, ou `ciseaux`.' });

            userChoice = rps.indexOf(userChoice);

            const botChoice = Math.floor(Math.random() * 3);
            let result;

            if (userChoice === botChoice) result = 'C\'est un match nul!';

            else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = `**${client.user.username}** gagne !`;
            else result = `**${interaction.user.user}** gagne !`;

            const embed = new EmbedBuilder()
                .setTitle(`${interaction.user.username} vs. ${client.user.username}`)
                .addFields(
                    { name: 'Votre choix:', value: `${res[userChoice]}` },
                    { name: `Le choix de ${client.user.username}`, value: `${res[botChoice]}`, inline: true },
                    { name: 'Résultat', value: `${result}`, inline: true },
                )
                .setTimestamp()
                .setColor("Random");
            return interaction.reply({ embeds: [embed] })

        } catch (error) {
            interaction.reply({ content: `Une erreur inconnu viens de ce produire !`, ephemeral: true })
        }
    }
}