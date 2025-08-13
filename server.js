const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

// ==== CONFIGURE THESE ====
const BOT_TOKEN = "7326125859:AAG8-uLiYmw-rzsa1SsyECo57pD7tj_3hiY"; // Replace with your BotFather token
const CHAT_ID = "-1002774812952"; // Replace with your chat ID
// =========================

app.post("/send-message", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        disable_web_page_preview: true // 🔹 Link preview off
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
