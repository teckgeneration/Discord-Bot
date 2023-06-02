require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "TOKEN_BOT",
    clientID: process.env.CLIENT_ID || "ID_BOT",
    ownerID: process.env.OWNERID || "OWNER_ID"
}