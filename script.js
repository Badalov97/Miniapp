// Telegram WebApp obyektini yuklash
const tg = window.Telegram.WebApp;
tg.ready();

// Kino Maʼlumotlari (Real linklar oʻrniga YouTube treyler linklari)
const MOVIES = [
    {
        id: 1,
        title: "Qasoskorlar: Intiho",
        year: 2019,
        genre: "Jangari, Fantastik",
        poster: "https://i.ibb.co/68fD4wS/avengers.jpg", // Plakat uchun ixtiyoriy rasm linki
        description: "Marvel olamidagi eng yirik jang, Qasoskorlar Tanosga qarshi. Dunyo taqdiri ularning qoʻlida.",
        // YouTube embed linki (autoplay va controls oʻchirilgan)
        videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=0&controls=1&showinfo=0"
    },
    {
        id: 2,
        title: "Sen Menga Keraksan",
        year: 2025,
        genre: "Drama, Romantika",
        poster: "https://i.ibb.co/4TqJ4mX/sen-keraksan.jpg", // Ixtiyoriy rasm linki
        description: "Sevgi, ayriliq va yana uchrashish haqidagi taʼsirli oʻzbek filmi.",
        // YouTube embed linki (ixtiyoriy o'zbek treyleri)
        videoUrl: "https://www.youtube.com/embed/5D34tD8b9A8?autoplay=0&controls=1&showinfo=0"
    },
    {
        id: 3,
        title: "Dunyo Urushi Z",
        year: 2013,
        genre: "Qoʻrqinchli, Fantastik",
        poster: "https://i.ibb.co/p26V40g/wwz.jpg", // Ixtiyoriy rasm linki
        description: "Butun dunyo zombilar epidemiyasiga uchraganida, BMT xodimi oilasini qutqarish uchun kurashadi.",
        videoUrl: "https://www.youtube.com/embed/4PsK_u6R73Q?autoplay=0&controls=1&showinfo=0"
    },
];

const movieContainer = document.getElementById('movieContainer');
const catalogPage = document.getElementById('catalogPage');
const playerPage = document.getElementById('playerPage');
const backButton = document.getElementById('backButton');
const searchInput = document.getElementById('searchInput');

// --- 1. Katalog yaratish ---
function renderMovies(movies) {
    movieContainer.innerHTML = ''; // Kontentni tozalash
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.setAttribute('data-id', movie.id);
        
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title} poster" loading="lazy">
            <div class="card-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre} | ${movie.year}</p>
            </div>
        `;
        card.addEventListener('click', () => showPlayer(movie.id));
        movieContainer.appendChild(card);
    });
}

// --- 2. Sahifalarni almashtirish ---
function switchPage(pageId) {
    if (pageId === 'player') {
        catalogPage.classList.remove('active');
        playerPage.classList.add('active');
        tg.MainButton.hide();
    } else {
        playerPage.classList.remove('active');
        catalogPage.classList.add('active');
        // Pleer yopilganda iframe kontentini tozalash (audio davom etmasligi uchun)
        document.getElementById('playerContent').innerHTML = ''; 
    }
}

// --- 3. Pleer sahifasini koʻrsatish ---
function showPlayer(id) {
    const movie = MOVIES.find(m => m.id === id);
    if (!movie) return;

    document.getElementById('movieTitle').textContent = movie.title;
    document.getElementById('movieDescription').textContent = movie.description;
    
    // Video Pleerni iframe orqali joylashtirish
    const playerHtml = `
        <iframe 
            src="${movie.videoUrl}" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    document.getElementById('playerContent').innerHTML = playerHtml;

    switchPage('player');
}

// --- 4. Hodisalarni ulash ---
backButton.addEventListener('click', () => switchPage('catalog'));
window.addEventListener('load', () => renderMovies(MOVIES));

// --- 5. Qidiruv funksiyasi ---
searchInput.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = MOVIES.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm) || 
        movie.genre.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
});

// Telegram MainButton ni oʻchirish (Biz navigatsiya uchun oʻz tugmalarimizni ishlatamiz)
tg.MainButton.hide();
