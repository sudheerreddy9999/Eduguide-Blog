document.addEventListener("DOMContentLoaded", function () {
  const activeLink = document.querySelector(".pagination a.active");
  if (activeLink) {
    activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Fetch existing blog posts from the jsons/blogs.json file
  fetch("jsons/blogs.json")
    .then((response) => response.json())
    .then((posts) => {
      // Get posts stored in localStorage, if any
      const localStoragePosts = JSON.parse(localStorage.getItem("blogs")) || [];

      // Merge the posts from jsons/blogs.json and localStorage, removing duplicates by post.id
      const allPosts = [...posts, ...localStoragePosts];

      // Remove duplicates based on post.id
      const uniquePosts = allPosts.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );

      // Get the container where the blog posts will be displayed
      const container = document.getElementById("blog-grid");

      // Render each post
      uniquePosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
          <div class="blog-card" onclick="location.href='post.html?id=${post.id}'">
            <img src="${post.image}" alt="Blogs" />
            <div class="card-content">
              <h3>${post.title}</h3>
              <p>${post.summary}</p>
            </div>
          </div>
        `;
        container.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error loading posts:", error));
});

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("show");
}

fetch("jsons/news.json")
  .then((response) => response.json())
  .then((articles) => {
    const blogContainer = document.getElementById("blog-container");

    // Loop through the articles and create HTML dynamically
    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("blog-post");

      articleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <div class="post-content">
              <h2 class="post-title">${article.title}</h2>
              <p class="post-meta"><strong>Published on:</strong> ${article.date} | <strong>Author:</strong> ${article.author}</p>
              <p class="post-summary">${article.summary}</p>
              <p class="post-summary">${article.content}</p>
            </div>
          `;

      // Append each article to the container
      blogContainer.appendChild(articleElement);
    });
  })
  .catch((error) => console.error("Error loading the articles:", error));


  // Fetch the JSON data and render it to the page
fetch('jsons/events.json')
.then(response => response.json())
.then(events => {
  const eventsContainer = document.getElementById('events-container');
  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event-item');

    eventElement.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-content">
        <h2 class="event-title">${event.title}</h2>
        <p class="event-meta"><strong>Date:</strong> ${event.date} | <strong>Location:</strong> ${event.location}</p>
        <p class="event-summary">${event.summary}</p>
        <a href="${event.registerLink}" class="register-link">Register Now &rarr;</a>
        <div class="event-details">
          ${event.content}
        </div>
      </div>
    `;

    // Append each event to the container
    eventsContainer.appendChild(eventElement);
  });
})
.catch(error => console.error('Error loading the events:', error));
