const axios = require('axios');
const { prefix: PREFIX } = require('../config');

const thumbUrl = "https://files.catbox.moe/letvwf.jpg";

async function sendUnknownCommandReply(sock, msg, sender) {
  try {
   
    const { data: thumbBuffer } = await axios.get(thumbUrl, { responseType: 'arraybuffer' });

    const jid = msg.key.remoteJid;

    await sock.sendMessage(jid, {
      text: `❌ This command does not exist.\nPlease type \`${PREFIX}menu\` and try again.`,
      contextInfo: {
        mentionedJid: [sender, "94772563976@s.whatsapp.net"],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "META AI • Command Not Found",
          body: "𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚀𝚄𝙴𝙴𝙽 𝙸𝙼𝙰𝙻𝚂𝙷𝙰",
          mediaType: 2,
          thumbnailUrl: thumbUrl,
          jpegThumbnail: thumbBuffer,
          sourceUrl: "https://wa.me/13135550002?s=5",
        },
      },
    });
  } catch (error) {
    console.error("❌ Error sending unknown command reply:", error);
    await sock.sendMessage(msg.from, {
      text: `❌ This command does not exist. Please type \`${PREFIX}menu\` and try again.`,
    });
  }
}

module.exports = {
  sendUnknownCommandReply,
};
