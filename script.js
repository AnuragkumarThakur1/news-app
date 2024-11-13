const API_KEY = "e40b44dc8b7e4a92ae61d66e650eaabd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function scrollToFooter() {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
}



function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

function postNews() {
    // Redirect to a news submission page or form
    window.location.href = "post-news.html";
}
function postNews() {
    // Open the news submission modal
    document.getElementById("news-modal").style.display = "block";
}
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
}





function scrollToContact() {
    // Open the contact form modal when clicking Contact Us
    document.getElementById("contact-modal").style.display = "block";
}

function closeContactModal() {
    // Close the contact form modal
    document.getElementById("contact-modal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("contact-modal");
    if (event.target === modal) {
        closeContactModal();
    }
}

// Handle contact form submission (optional, replace with your logic)
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Get form data
    const name = event.target["contact-name"].value;
    const email = event.target["contact-email"].value;
    const message = event.target["contact-message"].value;

    // You can add your logic to send this data to your server here.

    console.log("Contact Submitted:", { name, email, message });
    closeContactModal(); // Close the modal after submission
});


function closeModal() {
    // Close the news submission modal
    document.getElementById("news-modal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("news-modal");
    if (event.target === modal) {
        closeModal();
    }
}

// Handle form submission (optional, replace with your logic)
document.getElementById("news-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    // Get form data
    const title = event.target["news-title"].value;
    const content = event.target["news-content"].value;
    const author = event.target["news-author"].value;
    const imageFile = event.target["news-image"].files[0];

    
    // You can add your logic to send this data to your server here.

    console.log("News Submitted:", { title, content, author,imageFile});
    closeModal(); // Close the modal after submission
});


searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});