const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const qrSchema = new mongoose.Schema({
  upiId: String,
  name: String,
  amount: String,
  qrCodeUrl: String,
});

const QR = mongoose.model('QR', qrSchema);

app.post('/api/qr', async (req, res) => {
  console.log("Received data:", req.body);
  const { upiId, name, amount, qrCodeUrl } = req.body;

  const newQR = new QR({
    upiId,
    name,
    amount,
    qrCodeUrl,
  });

  try {
    const savedQR = await newQR.save();
    res.json(savedQR);
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: 'Failed to save QR data' });
  }
});

app.get('/api/qr/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid QR code ID' });
  }

  try {
    const qrData = await QR.findById(id);
    if (!qrData) {
      return res.status(404).json({ error: 'QR data not found' });
    }
    res.json(qrData);
  } catch (err) {
    console.error("Error fetching QR data:", err);
    res.status(500).json({ error: 'Failed to fetch QR data' });
  }
});

mongoose.connect('mongodb://localhost:27017/qrcodes', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
