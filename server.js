const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all to handle all other routes
app.get('*', (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } catch (err) {
        next(err);
    }
});

// Error-handling middleware
app.use((err, req, res, _next) => {
    if (err) {
        console.error(err.stack || "Unknown Error");
        res.status(500).send('Something went wrong!');
    }
    console.error("No errors proceeding");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
