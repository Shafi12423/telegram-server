import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ==== CONFIGURE THESE ====
const BOT_TOKEN = "8480289322:AAEO3wYHPl-UYjakOBfL-60VZwbka8Gk4yQ"; // Replace with your BotFather token
const CHAT_ID = "-1002872076067";     // Replace with your chat ID
// =========================

app.post("/send-message", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ ok: false, error: "No message text" });
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      }
    );
    const data = await tgRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Telegram server running on port ${PORT}`);
});
