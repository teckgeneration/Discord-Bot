const { Client, CommandInteraction, PermissionsBitField } = require("discord.js");
const config = require("../../config")
const { QuickDB } = require("quick.db");
const db = new QuickDB()

module.exports = {
    name: "ticket-create",
    description: "Permet de créer un ticket",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve('SendMessages'))) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        const ticket = await db.get(`ticket_${interaction.guild.id}`)
        if (ticket === interaction.channel.name) {
            return interaction.reply({ content: `Vous avez déjà un ticket d'ouvert` })
        }

        interaction.guild.channels.create({
            name: `${interaction.user.username}`,
            topic: `${interaction.member.id}`,
            parent: (await db.get(`Channels_${interaction.guild.id}.Cat`)),
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: (interaction.member.id),
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ],
                    deny: [
                        PermissionsBitField.Flags.MentionEveryone,
                    ]
                },
                {
                    id: (await db.get(`Staff_${interaction.guild.id}.Admin`)),
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                },
                {
                    id: (await db.get(`Staff_${interaction.guild.id}.Moder`)),
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AttachFiles,
                        PermissionsBitField.Flags.EmbedLinks,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]
                },
            ],
        }).then(async channel => {
            channel = channel,

            await db.set(`ticket_${interaction.guild.id}`, interaction.user.id);
            await db.set(`ticket_channel_${interaction.guild.id}`, channel);
            await interaction.reply({ content: `Voici votre ticket <#${channel.id}>` })
        })
    }
}