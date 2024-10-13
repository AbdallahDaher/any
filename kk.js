const express = require('express');
const app = express();
const port = 3000; // You can change this to any port number you prefer

// Define a route that returns "Hello, World!"
app.get('/abd', (req, res) => {
    res.send('sara is prety');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
