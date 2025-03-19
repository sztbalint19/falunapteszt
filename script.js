const imagePaths = [
    'images/hatterkep1.jpg', 'images/hatterkep2.jpg', 'images/hatterkep3.jpg', 'images/hatterkep4.jpg',
    'images/hatterkep5.jpg', 'images/hatterkep6.jpg', 'images/hatterkep7.jpg', 'images/hatterkep8.jpg',
    'images/hatterkep9.jpg', 'images/hatterkep10.jpg', 'images/hatterkep11.jpg', 'images/hatterkep12.jpg',
    'images/hatterkep13.jpg', 'images/hatterkep14.jpg'
];

// Az éppen megjelenített képek követése
let currentlyUsedImages = [];

// Véletlenszerű sorrend generálása
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Háttérképek inicializálása és frissítése
function initializeGallery() {
    const galleryContainer = document.querySelector('.gallery-container');

    if (!galleryContainer) {
        console.error('A .gallery-container elem nem található az initializeGallery függvényben!');
        return; // Kilépünk, ha az elem nem létezik
    }

    galleryContainer.innerHTML = ''; // Töröljük az esetleges meglévő elemeket

    // Az összes kép hozzáadása az imagePaths tömb alapján
    imagePaths.forEach((path) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.style.backgroundImage = `url('${path}')`;
        galleryContainer.appendChild(galleryItem);
    });
}

// Kikapcsoljuk a képek változását
function updateGallery() {
    console.log('A képek változása jelenleg ki van kapcsolva.');
}

// Modális funkció beállítása
function setupProgramModal() {
    console.log('setupProgramModal fut'); // Ellenőrzés
    const modal = document.getElementById('program-modal');
    const closeButton = modal.querySelector('.close-button');
    const modalContent = modal.querySelector('.modal-content p'); // Select modal content
    const programImages = document.querySelectorAll('.container ul li img');

    // Betöltjük a JSON adatokat
    fetch('./data.json') // Győződj meg róla, hogy a fájl elérési útja helyes
        .then(response => {
            if (!response.ok) {
                throw new Error('Hálózati válasz nem megfelelő');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.event || !data.event.highlights || !data.event.emojis) {
                throw new Error('A JSON fájl szerkezete nem megfelelő.');
            }

            programImages.forEach((image) => {
                image.addEventListener('click', () => {
                    console.log('Képre kattintottak'); // Ellenőrzés

                    // Mindig az alapértelmezett szöveg jelenik meg
                    modalContent.textContent = "Később ide írjuk a részletes leírást"; // Sor: 90
                    modal.classList.add('visible'); // Modális megjelenítése
                    modal.classList.remove('hidden'); // Remove hidden class
                });
            });
        })
        .catch(error => console.error('Hiba a JSON betöltésekor vagy feldolgozásakor:', error));

    closeButton.addEventListener('click', () => {
        modal.classList.remove('visible'); // Modális elrejtése
        modal.classList.add('hidden'); // Add hidden class
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible'); // Modális elrejtése
            modal.classList.add('hidden'); // Add hidden class
        }
    });
}

// Visszaszámláló inicializálása
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('2025-09-24T00:00:00');
    const interval = setInterval(() => {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            countdownElement.textContent = 'Az esemény elkezdődött!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days} nap ${hours} óra ${minutes} perc ${seconds} másodperc`;
    }, 1000);
}

// Galéria animáció beállítása
function startGalleryAnimation() {
    const galleryContainer = document.querySelector('.gallery-container');

    if (!galleryContainer) {
        console.error('A .gallery-container elem nem található a startGalleryAnimation függvényben!');
        return; // Kilépünk, ha az elem nem létezik
    }

    let scrollAmount = 0;

    setInterval(() => {
        scrollAmount += 1; // Görgetés sebessége
        galleryContainer.scrollLeft = scrollAmount;

        // Ha elérjük a végét, visszaállítjuk az elejére
        if (scrollAmount >= galleryContainer.scrollWidth - galleryContainer.clientWidth) {
            scrollAmount = 0; // Visszaállítás az elejére
        }
    }, 30); // Animáció sebessége
}

// Inicializálás az oldal betöltődésekor
window.onload = () => {
    initializeGallery(); // Háttérképek inicializálása
    startGalleryAnimation(); // Automatikus görgetés bekapcsolva
    setupProgramModal(); // Modális funkció inicializálása
    startCountdown(); // Visszaszámláló indítása
};
