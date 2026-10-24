document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFFET SUR LA BARRE DE NAVIGATION AU DÉFILEMENT
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 4, 7, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(197, 160, 89, 0.8)';
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 0 20px rgba(197, 160, 89, 0.2)';
        } else {
            navbar.style.background = 'rgba(3, 4, 7, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(197, 160, 89, 0.2)';
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. ANIMATION D'APPARITION DES ÉLÉMENTS (STYLE DÉPLOIEMENT SYSTÈME)
    const elementsToReveal = document.querySelectorAll('.card-royal, .jgc-main, .archive-box, .text-content, .db-file-row');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(el);
    });

    // 3. DÉFILEMENT FLUIDE POUR LES ANCRES (SPONSORING)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});

/* =========================================
   MOTEUR DU CARROUSEL DE GALERIE
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    // Trouve tous les sliders sur la page
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        let currentIndex = 0;
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        // S'il y a des images, on active le système
        if(slides.length > 0) {
            function showSlide(index) {
                // Retire la classe 'active' de toutes les photos
                slides.forEach(slide => slide.classList.remove('active'));
                
                // Si on dépasse la fin, on revient à la première
                if (index >= slides.length) currentIndex = 0;
                // Si on recule avant la première, on va à la dernière
                if (index < 0) currentIndex = slides.length - 1;
                
                // Affiche la bonne photo
                slides[currentIndex].classList.add('active');
            }

            // Action quand on clique sur SUIVANT
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                showSlide(currentIndex);
            });

            // Action quand on clique sur PRÉCÉDENT
            prevBtn.addEventListener('click', () => {
                currentIndex--;
                showSlide(currentIndex);
            });
        }
    });
});
