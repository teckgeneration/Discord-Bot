const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, italic, ActivityType } = require("discord.js");

module.exports = {
    name: "set-status",
    description: "Permet de changer le status du bot",
    options: [{
        name: "valeur",
        description: "Choississez votre valeur !",
        required: true,
        type: 3,
        choices: [
            {
                name: "ONLINE",
                value: "online"
            },
            {
                name: "IDLE",
                value: "idle"
            },
            {
                name: "DND",
                value: "dnd"
            },
            {
                name: "INVISIBLE",
                value: "invisible"
            },
        ],
    },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande`, ephemeral: true })
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Vous n'avez pas la permissions de faire cette commande !`, ephemeral: true })

        try {
            const options = interaction.options.get("valeur");

            if (options.value === "online") {

            await client.user.setStatus('online');
            
            return interaction.reply({content: `J'ai bien changer le status en **ONLINE**`});

            }
            if (options.value === "idle") {

            await client.user.setStatus('idle');

            return interaction.reply({content: `J'ai bien changer le status en **IDLE**`});

            }
            if (options.value === "dnd") {

            await client.user.setStatus('dnd');

            return interaction.reply({content: `J'ai bien changer le status en **DND**`});

            }
            if (options.value === "invisible") {

                await client.user.setStatus('invisible');
    
                return interaction.reply({content: `J'ai bien changer le status en **INVISIBLE**`});
    
            }     


        } catch (error) {
            console.log(error)
        }

    }
}