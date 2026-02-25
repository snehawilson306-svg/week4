const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Data file path
const DATA_FILE = path.join(__dirname, '../frontend/data/blog-posts.json');


/* =========================
   ROOT ROUTE
========================= */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


/* =========================
   GET POSTS
========================= */

app.get('/api/posts', (req, res) => {

    try {

        if (!fs.existsSync(DATA_FILE)) {
            return res.json([]);
        }

        const posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        res.json(posts);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to read posts"
        });

    }

});


/* =========================
   CREATE POST
========================= */

app.post('/api/posts', (req, res) => {

    try {

        let posts = [];

        if (fs.existsSync(DATA_FILE)) {
            posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }

        const newPost = {
            id: Date.now(),
            title: req.body.title || "Untitled",
            author: req.body.author || "Unknown",
            content: req.body.content || "",
            publishDate: new Date().toISOString().split('T')[0],
            published: true
        };

        posts.push(newPost);

        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));

        res.status(201).json(newPost);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to create post"
        });

    }

});
/* =========================
   UPDATE POST
========================= */

app.put('/api/posts/:id', (req, res) => {

    try {

        let posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        const id = parseInt(req.params.id);

        const index = posts.findIndex(post => post.id === id);

        if (index === -1) {
            return res.status(404).json({ error: "Post not found" });
        }

        posts[index] = {
            ...posts[index],
            ...req.body
        };

        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));

        res.json(posts[index]);

    } catch (error) {

        console.error(error);

        res.status(500).json({ error: "Failed to update post" });

    }

});

/* =========================
   DELETE POST
========================= */

app.delete('/api/posts/:id', (req, res) => {

    try {

        let posts = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

        const id = parseInt(req.params.id);

        posts = posts.filter(post => post.id !== id);

        fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));

        res.json({ message: "Deleted successfully" });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to delete"
        });

    }

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(`Server running at: http://localhost:${PORT}`);

});