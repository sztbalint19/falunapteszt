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
    'images.hatterkep39.jpg', 'images.hatterkep40.jpg'
];

let currentLanguage = "hu";
let eventData = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            eventData = data.event;
            updateLanguage(); // Call updateLanguage only after eventData is loaded
            setupProgramModal();
        })
        .catch(error => console.error('Hiba a data.json betöltésekor:', error));

    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            currentLanguage = currentLanguage === "hu" ? "de" : "hu";
            updateLanguage();
        });
    }
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function checkCookieConsent() {
    const consent = getCookie("cookieConsent");
    if (!consent) {
        document.getElementById("cookie-banner").style.display = "block";
    }
}

function updateLanguage() {
    if (!eventData) {
        console.error("Event data is not loaded.");
        return;
    }

    const lang = currentLanguage;

    document.title = eventData.title[lang];

    const headerTitleText = document.getElementById("header-title-text");
    const headerSub = document.querySelector("header h2");
    if (headerTitleText) headerTitleText.textContent = eventData.title[lang];
    if (headerSub) headerSub.textContent = eventData.description[lang];

    const eventDate = document.querySelector(".event-date");
    if (eventDate) eventDate.innerHTML = `<strong>${lang === "hu" ? "Időpont:" : "Datum:"}</strong> ${eventData.date}, ${eventData.day[lang]}`;

    const programNote = document.querySelector(".program-note");
    if (programNote) programNote.textContent = lang === "hu"
        ? "Kattintson egy programra, hogy részletesebb leírást kapjon!"
        : "Klicken Sie auf ein Programm, um weitere Details zu erhalten!";

    const programsTitle = document.getElementById("programs-title");
    if (programsTitle) programsTitle.textContent = eventData.programs_title[lang];

    const programItems = document.querySelectorAll(".container ul li");
    const programKeys = Object.keys(eventData.highlights);
    programItems.forEach((item, index) => {
        const img = item.querySelector("img");
        const p = item.querySelector("p");
        if (img) img.alt = eventData.highlights[programKeys[index]][lang];
        if (p) p.innerHTML = `${eventData.emojis[programKeys[index]]} <strong>${eventData.highlights[programKeys[index]][lang]}</strong>`;
    });

    const footerText = document.querySelector("footer p");
    if (footerText) {
        footerText.textContent = lang === "hu"
            ? "© 2025 Minden jog fenntartva"
            : "© 2025 Alle Rechte vorbehalten";
    }

    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
        languageToggle.alt = lang === "hu" ? "Deutsch" : "Magyar";
        languageToggle.src = lang === "hu" ? "images/deutsch.png" : "images/hungarian.png";
    }

    const galleryButton = document.querySelector(".gallery-button");
    if (galleryButton) {
        galleryButton.textContent = lang === "hu" ? "Galéria" : "Galerie";
    }
}

function setupProgramModal() {
    if (!eventData) return;

    const programItems = document.querySelectorAll('.container ul li');
    const programDetails = eventData.program_details;

    programItems.forEach((item) => {
        const programKey = item.querySelector('img').dataset.program;
        if (!programDetails[programKey]) {
            console.warn(`No details found for program: ${programKey}`);
            return;
        }

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
    const eventDate = new Date('2025-09-24T01:00:00');
    const interval = setInterval(() => {
        const now = new Date();
        const diff = eventDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            countdownElement.textContent = currentLanguage === "hu"
                ? "Az esemény elkezdődött!"
                : "Die Veranstaltung hat begonnen!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const units = eventData.countdown_units;
        countdownElement.textContent = `${days} ${units.days[currentLanguage]} ${hours} ${units.hours[currentLanguage]} ${minutes} ${units.minutes[currentLanguage]} ${seconds} ${units.seconds[currentLanguage]}`;
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

        function scrollSlideshow() {
            scrollPosition += window.innerWidth <= 768 ? 0.3 : 0.2;
            slideshowTrack.style.transform = `translateX(-${scrollPosition}px)`;

            const totalWidth = slideshowTrack.scrollWidth / 2;
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
                slideshowTrack.style.transform = `translateX(0px)`;
            }
        }

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
    }, 200);
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
        leaf.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    function createFallingLeaf() {}
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.onerror = () => {
            console.error(`Image not found: ${img.src}`);
            img.src = 'images/placeholder.jpg';
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
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = getCookie("language");
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }

    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            currentLanguage = currentLanguage === "hu" ? "de" : "hu";
            setCookie("language", currentLanguage, 30);
            updateLanguage();
        });
    }

    const acceptCookiesButton = document.getElementById("accept-cookies");
    if (acceptCookiesButton) {
        acceptCookiesButton.addEventListener("click", () => {
            setCookie("cookieConsent", "true", 365);
            document.getElementById("cookie-banner").style.display = "none";
        });
    }

    checkCookieConsent();
});

document.addEventListener('DOMContentLoaded', () => {
    // Accessibility: Ensure focus is trapped inside modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        });
    });

    // Accessibility: Add skip link for quick navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Ugrás a fő tartalomhoz';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '10px';
    skipLink.style.background = '#d46a6a';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '10px';
    skipLink.style.zIndex = '1000';
    skipLink.style.transition = 'top 0.3s ease';
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '10px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.prepend(skipLink);
});
