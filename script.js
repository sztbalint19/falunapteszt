const imagePaths = [
    'images/hatterkep1.jpg', 'images/hatterkep2.jpg', 'images/hatterkep3.jpg', 'images/hatterkep4.jpg',
    'images.hatterkep5.jpg', 'images.hatterkep6.jpg', 'images.hatterkep7.jpg', 'images.hatterkep8.jpg',
    'images.hatterkep9.jpg', 'images.hatterkep10.jpg', 'images.hatterkep11.jpg', 'images.hatterkep12.jpg',
    'images.hatterkep13.jpg', 'images.hatterkep14.jpg',
    'images.hatterkep15.jpg', 'images.hatterkep16.jpg', 'images.hatterkep17.jpg', 'images.hatterkep18.jpg',
    'images.hatterkep19.jpg', 'images.hatterkep20.jpg', 'images.hatterkep21.jpg', 'images.hatterkep22.jpg',
    'images.hatterkep23.jpg', 'images.hatterkep24.jpg', 'images.hatterkep25.jpg', 'images.hatterkep26.jpg',
    'images.hatterkep27.jpg', 'images.hatterkep28.jpg', 'images.hatterkep29.jpg', 'images.hatterkep30.jpg',
    'images.hatterkep31.jpg', 'images.hatterkep32.jpg', 'images.hatterkep33.jpg', 'images.hatterkep34.jpg',
    'images.hatterkep35.jpg', 'images.hatterkep36.jpg', 'images.hatterkep37.jpg', 'images.hatterkep38.jpg',
    'images.hatterkep39.jpg', 'images.hatterkep40.jpg', 'images.hatterkep41.jpg', 'images.hatterkep42.jpg',
    'images.hatterkep43.jpg', 'images.hatterkep44.jpg', 'images.hatterkep45.jpg', 'images.hatterkep46.jpg',
    'images.hatterkep47.jpg', 'images.hatterkep48.jpg', 'images.hatterkep49.jpg', 'images.hatterkep50.jpg',
    'images.hatterkep51.jpg', 'images.hatterkep52.jpg', 'images.hatterkep53.jpg', 'images.hatterkep54.jpg',
    'images.hatterkep55.jpg', 'images.hatterkep56.jpg', 'images.hatterkep57.jpg', 'images.hatterkep58.jpg',
    'images.hatterkep59.jpg', 'images.hatterkep60.jpg', 'images.hatterkep61.jpg', 'images.hatterkep62.jpg',
    'images.hatterkep63.jpg', 'images.hatterkep64.jpg'
];

let currentLanguage = "hu";
let eventData = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            eventData = data.event;
            updateLanguage();
            setupProgramModal();
        })
        .catch(error => console.error('Hiba a data.json betöltésekor:', error));

    const languageToggle = document.getElementById("language-toggle");
    if (!languageToggle) {
        console.error("A nyelvváltó gomb nem található!");
        return;
    }

    languageToggle.addEventListener("click", () => {
        currentLanguage = currentLanguage === "hu" ? "de" : "hu";
        updateLanguage();
    });
});

function updateLanguage() {
    if (!eventData) return;

    const lang = currentLanguage;

    // Frissítjük az oldal címét
    document.title = eventData.title[lang];

    // Frissítjük a fejléc szövegeit
    const headerTitleText = document.getElementById("header-title-text");
    const headerSub = document.querySelector("header h2");
    if (headerTitleText) headerTitleText.textContent = eventData.title[lang].split(" - ")[0];
    if (headerSub) headerSub.textContent = eventData.title[lang].split(" - ")[1];

    // Frissítjük az esemény dátumát
    const eventDate = document.querySelector(".event-date");
    if (eventDate) eventDate.innerHTML = `<strong>${lang === "hu" ? "Időpont:" : "Datum:"}</strong> ${eventData.date}, ${eventData.day[lang]}`;

    // Frissítjük a program megjegyzést
    const programNote = document.querySelector(".program-note");
    if (programNote) programNote.textContent = lang === "hu"
        ? "Kattintson egy programra, hogy részletesebb leírást kapjon!"
        : "Klicken Sie auf ein Programm, um weitere Details zu erhalten!";

    // Frissítjük a programok listáját
    const programItems = document.querySelectorAll(".container ul li");
    const programKeys = Object.keys(eventData.highlights);
    programItems.forEach((item, index) => {
        const img = item.querySelector("img");
        const p = item.querySelector("p");
        if (img) img.alt = eventData.highlights[programKeys[index]][lang];
        if (p) p.innerHTML = `${eventData.emojis[programKeys[index]]} <strong>${eventData.highlights[programKeys[index]][lang]}</strong>`;
    });

    // Frissítjük a lábléc szövegét
    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.textContent = lang === "hu"
            ? "© 2025 Minden jog fenntartva"
            : "© 2025 Alle Rechte vorbehalten";
    }

    // Frissítjük a nyelvváltó gomb szövegét
    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
        languageToggle.alt = lang === "hu" ? "Deutsch" : "Magyar";
        languageToggle.src = lang === "hu" ? "images/deutsch.png" : "images/hungarian.png";
    }

    // Update the event description
    const descriptionElement = document.getElementById('event-description');
    if (descriptionElement) {
        descriptionElement.textContent = eventData.description[lang];
    }
}

function setupProgramModal() {
    if (!eventData) return;

    const programItems = document.querySelectorAll('.container ul li');
    const programDetails = eventData.program_details;

    programItems.forEach((item) => {
        const programKey = item.querySelector('img').dataset.program;
        const modal = document.createElement('div');
        modal.classList.add('modal', 'hidden');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p id="modal-content-${programKey}">${programDetails[programKey][currentLanguage]}</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('visible');
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('visible');
                modal.classList.add('hidden');
            }
        });

        item.addEventListener('click', () => {
            modal.querySelector(`#modal-content-${programKey}`).textContent = programDetails[programKey][currentLanguage];
            modal.classList.add('visible');
            modal.classList.remove('hidden');
        });
    });
}

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = () => {
    const slideshowTrack = document.querySelector('.slideshow-track');
    const slideshowImages = Array.from(document.querySelectorAll('.slideshow-track img'));

    if (slideshowTrack && slideshowImages.length > 0) {
        const shuffledImages = shuffleArray(slideshowImages);
        slideshowTrack.innerHTML = '';
        shuffledImages.forEach((img) => {
            slideshowTrack.appendChild(img);
        });

        let scrollPosition = 0;
        let isPaused = false;
        let hoverTimeout;

        function scrollSlideshow() {
            if (!isPaused) {
                scrollPosition += window.innerWidth <= 768 ? 0.3 : 0.2;
                slideshowTrack.style.transform = `translateX(-${scrollPosition}px)`;

                const totalWidth = slideshowTrack.scrollWidth / 2;
                if (scrollPosition >= totalWidth) {
                    scrollPosition = 0;
                    slideshowTrack.style.transform = `translateX(0px)`;
                }
            }
        }

        slideshowTrack.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isPaused = true;
                slideshowTrack.style.transition = 'transform 0.3s ease';
            }, 100);
        });

        slideshowTrack.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                isPaused = false;
                slideshowTrack.style.transition = 'none';
            }, 100);
        });

        if (window.innerWidth <= 768) {
            setInterval(scrollSlideshow, 50);
        } else {
            function animateSlideshow() {
                scrollSlideshow();
                requestAnimationFrame(animateSlideshow);
            }
            animateSlideshow();
        }
    }

    startCountdown();

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const descriptionElement = document.getElementById('event-description');
            if (descriptionElement && data.event.description) {
                descriptionElement.textContent = data.event.description[currentLanguage];
            }
        })
        .catch(error => console.error('Hiba a data.json betöltésekor:', error));
};

// debounce optimaliálás
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('hidden-header');
        } else {
            header.classList.remove('hidden-header');
        }
    }, 200); // Increased debounce delay for smoother performance
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImage = modal ? modal.querySelector('#modal-image') : null;
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (!modal || !modalImage || !closeButton) {
        console.error('A modális ablak vagy annak elemei nem találhatók.');
        return;
    }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const leaves = document.querySelectorAll('#header .leaf');

    leaves.forEach((leaf) => {
        leaf.textContent = '🍂';
        leaf.style.left = `${Math.random() * 100}%`; 
        leaf.style.top = `${Math.random() * -200}px`; 
        leaf.style.setProperty('--random-sway', `${Math.random() * 40 - 20}px`); 
        leaf.style.animationDelay = '0s';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    function createFallingLeaf() {
        if (window.innerWidth <= 768) return;
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.textContent = '🍂';
        leaf.style.left = `${Math.random() * 100}%`; 
        leaf.style.top = `-50px`; 
        leaf.style.setProperty('--random-sway', `${Math.random() * 40 - 20}px`); 
        leaf.style.animationDelay = '0s'; 
        leaf.style.animationDuration = `${Math.random() * 3 + 3}s`;

        header.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }

    if (window.innerWidth > 768) {
        setInterval(createFallingLeaf, 10000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.onerror = () => {
            console.error(`Image not found: ${img.src}`);
            img.src = 'images/placeholder.jpg'; // Fallback image
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-image');
    images.forEach(img => {
        img.onerror = () => {
            console.error(`Image not found: ${img.src}`);
            img.src = 'images/placeholder.jpg';
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});

document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('footer .social-media a');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(`Social media link clicked: ${link.href}`);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slideshowImages = document.querySelectorAll('.slideshow-track img');
    slideshowImages.forEach(img => {
        img.loading = 'lazy';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

function openModal(image) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = image.src;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false'); // Accessibility improvement
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true'); // Accessibility improvement
    document.body.style.overflow = ''; // Restore background scroll
}
