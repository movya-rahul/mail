require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const sendMail = require("./mailer"); // Import mailer function

const app = express();

app.use(cors({
    // origin: ["http://localhost:5173","http://192.168.29.163:5173"], // Change this with local IP  
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Route to send an email
app.post("/send-email", async (req, res) => {
    try {
        console.log(req.body)
        const response = await sendMail(req.body);
        res.status(response.success ? 200 : 500).json(response);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});

// Create an HTTP server using the express app
const server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 3007;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;