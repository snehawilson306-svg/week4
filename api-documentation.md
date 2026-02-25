
# Week 4 Documentation: APIs and Data Flow

## Overview

In Week 4, we built a backend server using Node.js and Express.js and connected it to the frontend using REST API endpoints. Instead of loading static JSON files directly in the frontend, the frontend now communicates with the backend server to perform CRUD (Create, Read, Update, Delete) operations.

This simulates real-world web application architecture where frontend and backend are separated.

---

## What is an API?

API stands for Application Programming Interface. It allows communication between different software components.

In this project:

- Frontend sends requests
- Backend processes requests
- Backend sends responses
- Frontend displays data

Example:

Frontend → GET /api/posts → Backend → Returns posts → Frontend displays posts

---

## Technologies Used

- Node.js
- Express.js
- JavaScript (Frontend)
- JSON (Database)
- REST API architecture

---

## Server Setup

The backend server was created using Express.js.

Main file:

```

backend/server.js

```

Server runs on:

```

[http://localhost:3000](http://localhost:3000)

```

Middleware used:

```

app.use(express.json())

```

This allows the server to read JSON data from frontend.

---

## Data Storage

Data is stored in:

```

frontend/data/blog-posts.json

````

This file acts as a simple database.

Example:

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "author": "Sneha",
    "content": "Hello world"
  }
]
````

---

## API Endpoints

### 1. GET /api/posts

Purpose: Get all blog posts

Method: GET

Example:

```
http://localhost:3000/api/posts
```

Response:

```json
[
  {
    "id": 1,
    "title": "Post title",
    "author": "Author",
    "content": "Post content"
  }
]
```

---

### 2. POST /api/posts

Purpose: Create a new post

Method: POST

Request body:

```json
{
  "title": "New Post",
  "author": "Sneha",
  "content": "Post content"
}
```

Response:

```json
{
  "id": 123456,
  "title": "New Post",
  "author": "Sneha",
  "content": "Post content"
}
```

---

### 3. PUT /api/posts/:id

Purpose: Update an existing post

Example:

```
PUT /api/posts/123456
```

Request body:

```json
{
  "title": "Updated title",
  "author": "Sneha",
  "content": "Updated content"
}
```

---

### 4. DELETE /api/posts/:id

Purpose: Delete a post

Example:

```
DELETE /api/posts/123456
```

Response:

```json
{
  "message": "Deleted successfully"
}
```

---

## Frontend Integration

Frontend file:

```
frontend/js/app.js
```

Functions used:

* loadPosts() → Fetch posts
* createPost() → Create new post
* editPost() → Update post
* deletePost() → Delete post

Frontend communicates with backend using fetch():

Example:

```javascript
fetch('/api/posts')
```

---

## Data Flow

Step 1: User clicks button
Step 2: Frontend sends API request
Step 3: Backend processes request
Step 4: Backend updates JSON file
Step 5: Backend sends response
Step 6: Frontend updates display

---

## Folder Structure

```
project/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── js/app.js
│   └── data/blog-posts.json
│
└── docs/
    └── week4/
        └── api-documentation.md
```

---

## Features Implemented

* Backend server created
* REST API created
* Frontend connected to backend
* Create posts
* View posts
* Edit posts
* Delete posts
* Data stored in JSON file

---

## Challenges Faced

* Understanding API communication
* Fixing fetch errors
* Connecting frontend and backend
* Managing file paths

---

## What I Learned

* How backend works
* How to create REST APIs
* How frontend connects to backend
* How CRUD operations work
* How data flows in web applications

---

## Conclusion

This week helped me understand backend development and API communication. I successfully created a full-stack application where the frontend communicates with a backend server to manage blog posts.

```



