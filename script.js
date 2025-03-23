const imagePaths = [
    'images/hatterkep1.jpg', 'images/hatterkep2.jpg', 'images/hatterkep3.jpg', 'images/hatterkep4.jpg',
    'images/hatterkep5.jpg', 'images/hatterkep6.jpg', 'images/hatterkep7.jpg', 'images/hatterkep8.jpg',
    'images/hatterkep9.jpg', 'images/hatterkep10.jpg', 'images/hatterkep11.jpg', 'images/hatterkep12.jpg',
    'images/hatterkep13.jpg', 'images/hatterkep14.jpg',
    'images/hatterkep15.jpg', 'images/hatterkep16.jpg', 'images/hatterkep17.jpg', 'images/hatterkep18.jpg',
    'images/hatterkep19.jpg', 'images/hatterkep20.jpg', 'images/hatterkep21.jpg', 'images/hatterkep22.jpg',
    'images/hatterkep23.jpg', 'images/hatterkep24.jpg', 'images/hatterkep25.jpg', 'images/hatterkep26.jpg',
    'images/hatterkep27.jpg', 'images/hatterkep28.jpg', 'images/hatterkep29.jpg', 'images/hatterkep30.jpg',
    'images/hatterkep31.jpg', 'images/hatterkep32.jpg', 'images/hatterkep33.jpg', 'images/hatterkep34.jpg',
    'images/hatterkep35.jpg', 'images/hatterkep36.jpg', 'images/hatterkep37.jpg', 'images/hatterkep38.jpg',
    'images/hatterkep39.jpg', 'images/hatterkep40.jpg', 'images/hatterkep41.jpg', 'images/hatterkep42.jpg',
    'images/hatterkep43.jpg', 'images/hatterkep44.jpg', 'images/hatterkep45.jpg', 'images/hatterkep46.jpg',
    'images/hatterkep47.jpg', 'images/hatterkep48.jpg', 'images/hatterkep49.jpg', 'images/hatterkep50.jpg',
    'images/hatterkep51.jpg', 'images/hatterkep52.jpg', 'images/hatterkep53.jpg', 'images/hatterkep54.jpg',
    'images/hatterkep55.jpg', 'images/hatterkep56.jpg', 'images/hatterkep57.jpg', 'images/hatterkep58.jpg',
    'images/hatterkep59.jpg', 'images/hatterkep60.jpg', 'images/hatterkep61.jpg', 'images/hatterkep62.jpg',
    'images/hatterkep63.jpg', 'images/hatterkep64.jpg'
];

function setupProgramModal() {
    const programItems = document.querySelectorAll('.container ul li');
    
    if (programItems.length === 0) {
        console.warn('Nincsenek program elemek az oldalon.');
        return;
    }

    programItems.forEach((item) => {
        const programKey = item.querySelector('img').dataset.program;
        const modal = document.createElement('div');
        modal.classList.add('modal', 'hidden');
        const modalContentText = programKey === 'grape_harvest' 
            ? 'blabla1' 
            : programKey === 'brass_band' 
            ? 'blabla2' 
            : programKey === 'cultural_dance' 
            ? 'blabla3' 
            : programKey === 'wine_tasting' 
            ? 'blabla4' 
            : programKey === 'tractor_show' 
            ? 'blabla5' 
            : 'Később ide írjuk a részletes leírást';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p id="modal-content-${programKey}">${modalContentText}</p>
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
        // Limit the number of images for mobile devices
        const limitedImages = window.innerWidth <= 768 ? slideshowImages.slice(0, 10) : slideshowImages;
        const shuffledImages = shuffleArray(limitedImages);
        slideshowTrack.innerHTML = '';
        shuffledImages.forEach((img) => {
            slideshowTrack.appendChild(img.cloneNode(true));
        });

        let scrollPosition = 0;

        function scrollSlideshow() {
            scrollPosition += window.innerWidth <= 768 ? 1.0 : 0.1; // Reduce scroll speed for mobile
            slideshowTrack.style.transform = `translateX(-${scrollPosition}px)`;

            const totalWidth = slideshowTrack.scrollWidth / 2;
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
                slideshowTrack.style.transform = `translateX(0px)`;
            }
        }

        if (window.innerWidth <= 768) {
            setInterval(scrollSlideshow, 50); // Lower frame rate for mobile
        } else {
            function animateSlideshow() {
                scrollSlideshow();
                requestAnimationFrame(animateSlideshow);
            }
            animateSlideshow();
        }
    } else {
        console.error('A slideshow-track vagy a képek nem találhatók.');
    }

    setupProgramModal();
    startCountdown();
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const modalImage = modal ? modal.querySelector('#modal-image') : null;
    const closeButton = modal ? modal.querySelector('.close-button') : null;

    if (!modal || !modalImage || !closeButton) {
        console.error('A modális ablak vagy annak elemei nem találhatók.');
        return;
    }
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
        if (window.innerWidth <= 768) return; // Mobilon ne generáljunk faleveleket
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.textContent = '🍂';
        leaf.style.left = `${Math.random() * 100}%`; 
        leaf.style.top = `-50px`; 
        leaf.style.setProperty('--random-sway', `${Math.random() * 40 - 20}px`); 
        leaf.style.animationDelay = '0s'; 
        leaf.style.animationDuration = `${Math.random() * 3 + 3}s`; // Rövidebb időtartam

        header.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    }

    if (window.innerWidth > 768) {
        setInterval(createFallingLeaf, 10000); // 10 másodpercenként új falevél
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy'; // Csak akkor töltődik be, ha szükséges
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Megakadályozzuk a vízszintes görgetést
    document.body.style.overflowX = 'hidden';
});
