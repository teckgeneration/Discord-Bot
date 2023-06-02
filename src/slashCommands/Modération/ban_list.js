const { Client, CommandInteraction, PermissionsBitField, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "banlist",
    description: "Permet de voir la liste des membres bannit",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Tu n'a pas les autorisations pour faire cette commande**`, ephemeral: true })

        try {
            interaction.guild.bans.fetch().then(bans => {
                const obj = bans.map(c => ({
                    user: `Username => ${c.user.username}\nRaison => ${c.reason}`
                }));
                const bList = Array.from(obj)

                if (bList.length < 1) return interaction.reply({ content: `Il n'y a aucun utilisateur banni dans ce serveur`, ephemeral: true })

                const embed = new EmbedBuilder()
                    .setTitle(`Liste des bannit`)
                    .setDescription(`${bList.map(bl => `\n${bl.user}`).join("")}`)
                    .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
                    .setTimestamp()
                    .setColor("DarkGreen")
                return interaction.reply({ embeds: [embed], ephemeral: true })
            })
        } catch (error) {
            console.log(error)
        }

    }
}