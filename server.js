const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// MongoDB Schema
const entrySchema = new mongoose.Schema({
    nameOfParent: String,
    parentsContactNo: String,
    grade: String,
    classesMode: String,
});

const Entry = mongoose.model('Entry', entrySchema);

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Routes
app.post('/entry', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        res.status(201).json({ message: 'Entry saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
