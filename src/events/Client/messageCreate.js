const { EmbedBuilder, Message, Client, PermissionsBitField } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if (message.author.bot) return;
}};