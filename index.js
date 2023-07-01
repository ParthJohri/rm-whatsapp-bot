// * To downlod the youtube video from the URL
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// *!whatsbot
const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageType,
  downloadMediaMessage,
} = require("@whiskeysockets/baileys");

const store = {};
const getMessage = (key) => {
  const { id } = key;
  if (store[id]) return store[id].message;
};

async function WABot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    getMessage,
  });
  const getText = (message) => {
    try {
      return (
        message.conversation ||
        message.extendedTextMessage.text ||
        message.imageMessage.caption
      );
    } catch {
      return "";
    }
  };
  const sendMessage = async (jid, content) => {
    try {
      const sent = await sock.sendMessage(jid, content);
      store[sent.key.id] = sent;
    } catch (err) {
      console.error("Error sending message: ", err);
    }
  };
  // Replace the placeholder with your Atlas connection string
  const uri = process.env.MONGODB_URI;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const handleJobOrDashboard = async (remoteJid, reply) => {
    await sendMessage(remoteJid, { text: reply });
  };

  async function run() {
    try {
      await client.connect();
      const db = client.db("learning_mongodb");
      const collection = db.collection("jobs");

      let previousJob = null,
        previousDb = null;
      const msg = process.env.GROUPID;
      while (true) {
        const lastDocument = await collection
          .find({})
          .sort({ _id: -1 })
          .limit(1)
          .toArray();

        // console.log("Last Document:", lastDocument[0]);
        const ld = lastDocument[0];
        console.log(ld);
        const tempcurrentJob = ld.previousjob;
        const tempcurrentDb = ld.previousdata;

        const currentJob = tempcurrentJob
          .replace(/<b>/g, "*")
          .replace(/<\/b>/g, "*")
          .replace(/<i>/g, "_")
          .replace(/<\/i>/g, "_")
          .replace(/\n\n\n/g, "")
          .replace(/\n\n/g, "\n");
        const currentDb = tempcurrentDb
          .replace(/<b>/g, "*")
          .replace(/<\/b>/g, "*")
          .replace(/<i>/g, "_")
          .replace(/<\/i>/g, "_")
          .replace(/\n\n\n/g, "")
          .replace(/\n\n/g, "\n");
        console.log("Current Job:", currentJob);
        console.log("Current Data:", currentDb);
        if (currentJob !== previousJob) {
          await handleJobOrDashboard(
            msg,
            "🔥 New Job Posted 🔥\n-------------------------------------\n" +
              currentJob
          );
          previousJob = currentJob;
        }

        if (currentDb !== previousDb) {
          await handleJobOrDashboard(
            msg,
            "🚀 RM Dashboard 📊\n------------------------------------\n" +
              currentDb
          );
          previousDb = currentDb;
        }
        // Delay between iterations (e.g., 5 seconds)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
  sock.ev.process(async (events) => {
    if (events["connection.update"]) {
      const { connection, lastDisconnect } = events["connection.update"];
      if (connection === "close") {
        if (
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut
        ) {
          WABot();
        } else {
          console.log("Disconnected because you logged out");
        }
      }
    }
    if (events["creds.update"]) {
      await saveCreds();
    }
    if (events["messages.upsert"]) {
      const { messages } = events["messages.upsert"];
      messages.forEach((msg) => {
        // processing
        // if (getText(msg.message).startsWith("@hi")) {
        //   console.log(msg.key.remoteJid);
        // }
      });
    }
  });
}

WABot();
