// load-header.js
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Error loading header:', error));

  fetch("footer.html")
    .then(res => res.text())
    .then(html => document.getElementById("footer-placeholder").innerHTML = html);
