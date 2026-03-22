const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    console.error(error);
    return res.status(500).send("Error saving message");
  }

  res.send("Message saved successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));