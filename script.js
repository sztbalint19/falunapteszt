const imagePaths = [
    'hatterkep1.jpg', 'hatterkep2.jpg', 'hatterkep3.jpg', 'hatterkep4.jpg',
    'hatterkep5.jpg', 'hatterkep6.jpg', 'hatterkep7.jpg', 'hatterkep8.jpg',
    'hatterkep9.jpg', 'hatterkep10.jpg', 'hatterkep11.jpg', 'hatterkep12.jpg',
    'hatterkep13.jpg', 'hatterkep14.jpg'
];

// Eltároljuk, hogy jelenleg melyik képek láthatók
let currentlyUsedImages = [];

function changeImageWithFade(item) {
    // Fade-out az aktuális képnél
    item.style.transition = 'opacity 1s ease-in-out';
    item.style.opacity = '0';

    // 1 másodperc után új képet állít be
    setTimeout(() => {
        // Készítsük el az elérhető képek listáját
        const availableImages = imagePaths.filter(image => !currentlyUsedImages.includes(image));

        // Válassz egy random képet az elérhetőek közül
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

        // Az új képet adjuk hozzá a látható képekhez
        currentlyUsedImages = currentlyUsedImages.filter(image => image !== item.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1]);
        currentlyUsedImages.push(randomImage);

        // Állítsuk be a képet
        item.style.backgroundImage = `url('${randomImage}')`;

        // Fade-in az új képre
        item.style.opacity = '1';
    }, 1000); // Fade-out időzítés
}

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Kezdeti képek kiosztása, egyedi módon
    galleryItems.forEach((item, index) => {
        const randomImage = imagePaths[index % imagePaths.length]; // Egyedi kezdőkép
        currentlyUsedImages.push(randomImage); // Nyomon követjük a használt képeket
        item.style.backgroundImage = `url('${randomImage}')`;
        item.style.opacity = '1'; // Azonnali megjelenítés
    });

    // Indítsuk el a véletlenszerű képváltást
    startRandomImageSwaps(galleryItems);
}

function startRandomImageSwaps(galleryItems) {
    galleryItems.forEach(item => {
        setInterval(() => {
            changeImageWithFade(item);
        }, Math.floor(Math.random() * 10000) + 10000); // 10-20 másodperc között
    });
}

// Ha az oldal betöltődött, inicializáljuk a galériát
window.onload = initializeGallery;
