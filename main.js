// Sample data for the initial blogs
const initialBlogs = [
    {
        id: 1,
        title: "Abhinay's Microblogging App",
        content: "This is a simple microblogging application created using JavaScript, SCSS, and JSON.",
        author: "Chakradhar ",
        created: "2023-10-22T12:00:00Z",
        completed: false,
    },
];
// Function to fetch and display blogs
function fetchBlogs() {
    const blogsContainer = document.querySelector(".blogs-container");

    // Use XMLHttpRequest to fetch blogs from data.json
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const blogs = JSON.parse(xhr.responseText);
            blogs.forEach((blog) => {
                createBlogCard(blog);
            });
        } else {
            console.error('Failed to fetch blogs.');
        }
    };

    xhr.send();
}

// Function to expand a blog's content
function expandBlog(blogId) {
    const blogCard = document.getElementById(`blog-${blogId}`);
    const content = blogCard.querySelector(".blog-content");

    content.classList.toggle("expanded");
}

// Function to create a new blog card
function createBlogCard(blog) {
    const blogsContainer = document.querySelector(".blogs-container");

    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.id = `blog-${blog.id}`;

    blogCard.innerHTML = `
        <h3 class="blog-title">${blog.title}</h3>
        <p class="blog-content" style="overflow: scroll">${blog.content}</p>
        <p class="blog-author">Author: ${blog.author}</p>
        <p class="blog-date">Created: ${blog.created}</p>
        <div class="buttoncontainer">
        <button class="" onclick="expandBlog(${blog.id})">Expand</button>        
        <button class="edit-icon" data-blog-id="${blog.id}" id="edit-${blog.id}" onClick="toggleEdit(${blog.id})">Edit</button>
        <button class="save-icon" style="display:none" id="save-${blog.id}" data-blog-id="${blog.id}" onClick="toggleSave(${blog.id})">Save</button>
        </div>
    `;
    blogCard.addEventListener('click', () => {
        console.log("test");
        // Toggle the "expanded" class to expand or collapse the content
        blogCard.classList.toggle('expanded');
    });
    blogsContainer.appendChild(blogCard);
    
}
function toggleSave(id){    
    document.getElementById(`save-${id}`).style.display ="none";
    document.getElementById(`edit-${id}`).style.display = "block";
}

function toggleEdit(id){    
    document.getElementById(`save-${id}`).style.display ="block";
    document.getElementById(`edit-${id}`).style.display = "none";
}
// Function to show the create blog form
function showCreateBlogForm() {
    const createBlogForm = document.getElementById("create-blog-form");
    createBlogForm.style.display = "block";

    // Clear input fields
    document.getElementById("blog-title").value = "";
    document.getElementById("blog-author").value = "";
    document.getElementById("blog-content").value = "";

    const createButton = document.getElementById("create-button");
    createButton.style.display = "none";
}

// Function to add a new blog
function addNewBlog(title, content, author, e) {
    const currentDateTime = new Date().toISOString(); // Get the current date and time
    e.preventDefault();

    const newBlog = {
        id: Date.now(), // A simple way to generate a unique ID
        title,
        content,
        author,
        created: currentDateTime, // Set the creation date and time
        completed: false,
    };
createBlogCard(newBlog);

    // Hide the create-blog-form
    document.getElementById("create-blog-form").style.display = "none";
    document.getElementById("create-button").style.display = "block";
}

// Function to update a blog as complete
function updateBlog(blogId) {
    const blogCard = document.getElementById(`blog-${blogId}`);
    const content = blogCard.querySelector(".blog-content");
    const author = blogCard.querySelector(".blog-author");

    // Make the content and author fields editable
    content.contentEditable = true;
    author.contentEditable = true;

    // Add a class to indicate the blog is being edited
    blogCard.classList.add("editing");
}

// Function to save the edited content
function saveBlogEdit(blogId) {
    const blogCard = document.getElementById(`blog-${blogId}`);
    const content = blogCard.querySelector(".blog-content");
    const author = blogCard.querySelector(".blog-author");

    // Make the content and author fields non-editable
    content.contentEditable = false;
    author.contentEditable = false;

    // Remove the class indicating editing
    blogCard.classList.remove("editing");
}
// Event listeners for editing a blog
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-icon")) {
        const blogId = event.target.dataset.blogId;
        updateBlog(blogId);
    } else if (event.target.classList.contains("save-icon")) {
        const blogId = event.target.dataset.blogId;
        saveBlogEdit(blogId);
    }
});

// Event listener for the "Create Blog" button
document.getElementById("create-button").addEventListener("click", showCreateBlogForm);

// Event listener for the "Submit" button in the create blog form
document.getElementById("submit-blog").addEventListener("click", (e) => {    
    const title = document.getElementById("blog-title").value;
    const author = document.getElementById("blog-author").value;
    const content = document.getElementById("blog-content").value;

    addNewBlog(title, content, author, e);
});

// Call fetchBlogs to load blogs when the page loads
fetchBlogs();



