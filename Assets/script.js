const API_KEY = "pub_47217066e783d2b4adf0ab1e018ce93d5e419";
const url = "https://newsdata.io/api/1/news?q=";

window.addEventListener("load", () => fetchNews("India"));

const d = new Date();
console.log(d);

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.pubDate).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source_id} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.link, "_blank");
    })
}


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', ()=> {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


window.addEventListener("load", () => {
    const popup = document.getElementById('newsletter-popup');
    const closeBtn = document.getElementById('close-popup');
    const sendBtn = document.getElementById('send-button');

    popup.style.display = "block";

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    sendBtn.onclick = function() {
        const email = document.getElementById('email').value;
        if(!email) return;
        // Handle the newsletter subscription here
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});


