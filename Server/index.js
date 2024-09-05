const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const allowedOrigins=["http://localhost:5173",'https://chat-app-frontend-client.onrender.com']

// Add CORS middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            // Allow requests with no origin (like mobile apps or curl requests)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true
}));

// Define a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Server is running');
});

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                // Allow requests with no origin (like mobile apps or curl requests)
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },  // Replace with your frontend's origin
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Store users and their socket IDs
const users = {};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Store user's socket ID with their username
    socket.on('registerUser', (username) => {
        users[username] = socket.id;
        console.log(`User registered: ${username} with socket ID ${socket.id}`);
    });

    socket.on('chatMessage', ({ to, text, from }) => {
        if (users[to]) {
            io.to(users[to]).emit('chatMessage', { from, text });
        }
        socket.emit('chatMessage', { from, text }); // Notify sender as well
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
