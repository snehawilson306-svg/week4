// Load posts from backend
async function loadPosts() {

    try {

        const response = await fetch('/api/posts');

        const posts = await response.json();

        displayPosts(posts);

    } catch (error) {

        console.error("Error loading posts:", error);

    }

}


// Display posts
function displayPosts(posts) {

    const container = document.getElementById('posts-container');

    container.innerHTML = '';

    posts.forEach(post => {

        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <small>By ${post.author}</small>
            <br><br>

            <button onclick="editPost(${post.id}, '${post.title}', '${post.author}', \`${post.content}\`)">
                Edit
            </button>

            <button onclick="deletePost(${post.id})">
                Delete
            </button>

            <hr>
        `;

        container.appendChild(div);

    });

}


// Delete post
async function deletePost(id) {

    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (!confirmDelete) return;

    try {

        await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });

        alert("Post deleted successfully");

        loadPosts();

    } catch (error) {

        console.error("Error deleting post:", error);

        alert("Failed to delete post");

    }

}


// Create new post
async function createPost() {

    const title = prompt("Enter post title:");
    const author = prompt("Enter author name:");
    const content = prompt("Enter post content:");

    if (!title || !author || !content) {

        alert("All fields required");
        return;

    }

    try {

        const response = await fetch('/api/posts', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                author,
                content
            })

        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        alert("Post created successfully");

        loadPosts();

    } catch (error) {

        console.error("Error creating post:", error);

    }

}


// Edit post
async function editPost(id, oldTitle, oldAuthor, oldContent) {

    const title = prompt("Edit title:", oldTitle);
    const author = prompt("Edit author:", oldAuthor);
    const content = prompt("Edit content:", oldContent);

    if (!title || !author || !content) {

        alert("All fields required");
        return;

    }

    try {

        await fetch(`/api/posts/${id}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                author,
                content
            })

        });

        alert("Post updated successfully");

        loadPosts();

    } catch (error) {

        console.error("Error updating post:", error);

        alert("Failed to update post");

    }

}


// Make functions global
window.createPost = createPost;
window.deletePost = deletePost;
window.editPost = editPost;


// Load posts when page opens
loadPosts();