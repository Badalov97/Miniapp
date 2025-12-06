// Telegram WebApp obyektini yuklash
const tg = window.Telegram.WebApp;

// 1. Ilovani yuklashda Telegram'ning asosiy tugmalarini koʻrsatish
tg.ready();

// 2. Ilovani yopish tugmasi
document.getElementById('closeButton').addEventListener('click', function() {
    // Mini-Appni yopish uchun Telegram funksiyasi
    tg.close();
});

// 3. Kino haqida maʼlumot koʻrsatish funksiyasi
function showDetails(movieTitle) {
    alert(movieTitle + ' filmi uchun pleer sahifasiga oʻtish lozim. Backend (server) kodini qoʻshing.');
    
    // Telegram'ning asosiy tugmasida qisqa xabar koʻrsatish (Masalan, "Yuklanmoqda...")
    tg.MainButton.setText('Yuklanmoqda...');
    tg.MainButton.show();

    // 5 soniyadan keyin tugmani yashirish
    setTimeout(() => {
        tg.MainButton.hide();
    }, 5000);
}

// 4. Qidiruv funksiyasi (Faqat interfeysda yashirish/koʻrsatish)
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');

    movieCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
