const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione Supabase (usa variabili d'ambiente per sicurezza)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Rotta di prova
app.get('/', (req, res) => {
  res.send('Server SocialLite attivo e funzionante! 🚀');
});

// Esempio: Rotta per ottenere i post tramite server
app.get('/api/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Esempio: Rotta per inviare una notifica (Logica personalizzata)
app.post('/api/notify', (req, res) => {
  const { userId, message } = req.body;
  console.log(`Notifica inviata a ${userId}: ${message}`);
  // Qui aggiungeresti la logica per Firebase o Push Notifications
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
