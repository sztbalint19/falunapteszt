const imagePaths = [
    'hatterkep1.jpg', 'hatterkep2.jpg', 'hatterkep3.jpg', 'hatterkep4.jpg',
    'hatterkep5.jpg', 'hatterkep6.jpg', 'hatterkep7.jpg', 'hatterkep8.jpg',
    'hatterkep9.jpg', 'hatterkep10.jpg', 'hatterkep11.jpg', 'hatterkep12.jpg',
    'hatterkep13.jpg', 'hatterkep14.jpg'
];

// Az éppen megjelenített képek követése
let currentlyUsedImages = [];

function changeImageWithFade(item) {
    item.style.transition = 'opacity 1s ease-in-out';
    item.style.opacity = '0';

    setTimeout(() => {
        const availableImages = imagePaths.filter(image => !currentlyUsedImages.includes(image));
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        currentlyUsedImages = currentlyUsedImages.filter(image => image !== item.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1]);
        currentlyUsedImages.push(randomImage);

        item.style.backgroundImage = `url('${randomImage}')`;
        item.style.opacity = '1';
    }, 1000);
}

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        const randomImage = imagePaths[index % imagePaths.length];
        currentlyUsedImages.push(randomImage);
        item.style.backgroundImage = `url('${randomImage}')`;
        item.style.opacity = '1';
    });

    startRandomImageSwaps(galleryItems);
}

function startRandomImageSwaps(galleryItems) {
    galleryItems.forEach(item => {
        setInterval(() => {
            changeImageWithFade(item);
        }, Math.floor(Math.random() * 10000) + 10000);
    });
}

// Visszaszámláló hozzáadása
function startCountdown() {
    const eventDate = new Date('2025-09-24T00:00:00'); // Az esemény dátuma
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate - now;

        if (timeDifference < 0) {
            countdownElement.textContent = "Az esemény elkezdődött!";
            clearInterval(intervalId); // Leállítjuk az intervallumot, ha elérkezik az idő
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownElement.textContent = `Visszaszámlálás: ${days} nap ${hours} óra ${minutes} perc ${seconds} másodperc`;
    }

    const intervalId = setInterval(updateCountdown, 1000); // Másodpercenként frissítjük
    updateCountdown(); // Azonnali frissítés a betöltéskor
}

// Inicializálás az oldal betöltődésekor
window.onload = () => {
    initializeGallery();
    startCountdown();
};
