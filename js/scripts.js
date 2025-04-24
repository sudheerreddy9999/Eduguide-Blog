document.addEventListener("DOMContentLoaded", function () {
  const activeLink = document.querySelector(".pagination a.active");
  if (activeLink) {
    activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("jsons/blogs.json")
    .then((response) => response.json())
    .then((posts) => {
      const container = document.getElementById("blog-grid");
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "blog-post";
        postElement.innerHTML = `
      <div class="blog-card" onclick="location.href='post.html?id=${post.id}'">
        <img src="${post.image}" alt="Blogs" />
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.summary}
          </p>
        </div>
        `;
        container.appendChild(postElement);
      });
    })
    .catch((error) => console.error("Error loading posts:", error));
});


