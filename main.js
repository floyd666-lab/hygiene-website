// GSAP Animations
if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    document.addEventListener('DOMContentLoaded', () => {

        // 00. Assortment Showcase (Refined Fan Reveal)
        if (document.querySelector(".assortment-showcase")) {
            const assortTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".assortment-showcase",
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            // Initial state: stacked and invisible
            gsap.set(".pack-main, .pack-left, .pack-right", { 
                opacity: 0, 
                y: 50, 
                x: 0, 
                rotate: 0, 
                scale: 0.9 
            });

            assortTl
                .to(".pack-main", { 
                    opacity: 1, 
                    y: 0, 
                    scale: 2.2, 
                    duration: 1, 
                    ease: "power3.out" 
                })
                .to(".pack-left", { 
                    opacity: 1, 
                    x: -220, 
                    y: -75,
                    rotate: -18, 
                    scale: 1.3, 
                    duration: 1, 
                    ease: "power3.out" 
                }, "-=0.7")
                .to(".pack-right", { 
                    opacity: 1, 
                    x: 220, 
                    y: -75,
                    rotate: 18, 
                    scale: 1.3, 
                    duration: 1, 
                    ease: "power3.out" 
                }, "-=0.8")
                .fromTo(".feature-item-v2", 
                    { opacity: 0, x: 40 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power2.out"
                    }, 
                    "-=0.6"
                );
        }

        // 1. Production Video Auto-play (Bento Grid)
        const videos = document.querySelectorAll('.production-video');
        if (videos.length > 0) {
            ScrollTrigger.create({
                trigger: '.video-accordion',
                start: "top 80%",
                onEnter: () => {
                    videos.forEach(v => {
                        v.play().catch(e => console.log("Auto-play blocked:", e));
                    });
                },
                onLeave: () => {
                    videos.forEach(v => v.pause());
                },
                onEnterBack: () => {
                    videos.forEach(v => v.play());
                }
            });
        }

        // Initialize Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // --- Ultra-Luxury Hero Animations ---
        if (document.querySelector(".hero-luxury-wrap")) {
            const luxTl = gsap.timeline();

            // Set initial states to absolute zero
            gsap.set(".lux-word, .luxury-badge, .luxury-lead, .luxury-cta-wrap, .glass-element, .main-lux-img", {
                opacity: 0
            });
            gsap.set(".lux-word", { y: 100 });
            gsap.set(".luxury-badge, .luxury-lead, .luxury-cta-wrap", { x: -30 });
            gsap.set(".glass-element", { scale: 0 });
            gsap.set(".main-lux-img", { scale: 0.7, y: 0 });

            luxTl
                // 1. TEXT FIRST
                .to(".lux-word", {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out"
                })
                .to(".luxury-badge, .luxury-lead, .luxury-cta-wrap", {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.05
                }, "-=0.4")
                // 2. DROPLETS SECOND (starting during text)
                .to(".glass-element", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.03,
                }, "-=0.6")
                // 3. PACK THIRD (now much faster)
                .to(".main-lux-img.active", {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");

            // (Idle floating animation removed as requested)

            // --- Hero Multi-Product Slider Logic ---
            const heroImgs = document.querySelectorAll('.hero-product-slider .main-lux-img');
            let currentHeroIdx = 0;

            // Strict initialization: Hide all images except the first one
            gsap.set(heroImgs, { opacity: 0, x: 0, y: 0, scale: 0.9, pointerEvents: "none" });
            const firstImg = document.querySelector('.main-lux-img.active');
            if (firstImg) {
                gsap.set(firstImg, { opacity: 1, scale: 1, x: 0, y: 0, pointerEvents: "auto" });
                // Update currentHeroIdx to match actual active element
                heroImgs.forEach((img, idx) => {
                    if (img.classList.contains('active')) currentHeroIdx = idx;
                });
            }

            function cycleHero() {
                const prevImg = heroImgs[currentHeroIdx];
                currentHeroIdx = (currentHeroIdx + 1) % heroImgs.length;
                const nextImg = heroImgs[currentHeroIdx];

                // Kill existing tweens on these elements to prevent overlap artifacts
                gsap.killTweensOf(prevImg);
                gsap.killTweensOf(nextImg);

                const tl = gsap.timeline();

                // 1. Hide current product
                tl.to(prevImg, {
                    opacity: 0,
                    x: -60,
                    scale: 0.9,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        prevImg.classList.remove('active');
                        // Reset position for next entry
                        gsap.set(prevImg, { x: 0 });
                    }
                });

                // 2. Reveal next product
                tl.fromTo(nextImg,
                    { opacity: 0, x: 60, y: 0, scale: 1.1 },
                    { 
                        opacity: 1, 
                        x: 0, 
                        y: 0, 
                        scale: 1, 
                        duration: 1, 
                        ease: "power3.out",
                        onStart: () => {
                            nextImg.classList.add('active');
                        }
                    },
                    "-=0.4" // Overlap for smoother transition
                );
            }

            // Start cycling with a more relaxed interval (3.5s)
            let heroInterval;
            ScrollTrigger.create({
                trigger: ".hero-luxury-wrap",
                start: "top 100%",
                end: "bottom 0%",
                onEnter: () => {
                    if (!heroInterval) {
                        heroInterval = setInterval(cycleHero, 3500);
                    }
                },
                onLeave: () => {
                    clearInterval(heroInterval);
                    heroInterval = null;
                },
                onEnterBack: () => {
                    if (!heroInterval) {
                        heroInterval = setInterval(cycleHero, 3500);
                    }
                },
                onLeaveBack: () => {
                    clearInterval(heroInterval);
                    heroInterval = null;
                }
            });


            gsap.to(".glass-element", {
                y: (i) => (i % 2 === 0 ? 30 : -30),
                x: (i) => (i % 2 === 0 ? -20 : 20),
                duration: 6 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.5
            });

            // Parallax on Mouse Move (Desktop Only)
            mm.add("(min-width: 1025px)", () => {
                const onMouseMove = (e) => {
                    const x = (e.clientX - window.innerWidth / 2) / 80;
                    const y = (e.clientY - window.innerHeight / 2) / 80;

                    gsap.to(".glass-element", {
                        x: (i) => x * (i + 1) * 3,
                        y: (i) => y * (i + 1) * 3,
                        duration: 3,
                        ease: "power1.out"
                    });
                };
                document.addEventListener("mousemove", onMouseMove);
                return () => document.removeEventListener("mousemove", onMouseMove);
            });
        }

        // 3. Stats Counter Animation
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');

            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(stat, {
                        innerText: target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: "power1.out"
                    });
                }
            });
        });

        // 4. Sunlight-Style Reveal Animations
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Staggered reveal for grids (Stats, Products, Flow)
        const grids = ['.stats-grid', '.products-grid', '.flow-container'];
        grids.forEach(grid => {
            const parent = document.querySelector(grid);
            if (parent) {
                gsap.from(parent.children, {
                    scrollTrigger: {
                        trigger: parent,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out"
                });
            }
        });

        // --- Mobile Navigation Toggle ---
        const navToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Mobile menu toggled');
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });

            // Close menu when clicking links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });
        }

        // 5. Catalog Filtering (Preserved with stagger)
        const tabs = document.querySelectorAll('.tab-btn');
        const products = document.querySelectorAll('.product-card');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const cat = tab.getAttribute('data-category');

                products.forEach(prod => {
                    if (prod.getAttribute('data-category') === cat) {
                        gsap.to(prod, { opacity: 1, scale: 1, duration: 0.5, display: "block", ease: "power2.out" });
                    } else {
                        gsap.to(prod, { opacity: 0, scale: 0.95, duration: 0.4, display: "none" });
                    }
                });
            });
        });

        // Initial filter (Default to wipes if on index page)
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            products.forEach(prod => {
                if (prod.getAttribute('data-category') !== 'wipes') {
                    gsap.set(prod, { opacity: 0, scale: 0.95, display: "none" });
                }
            });
        }

        // 6. Interactive & CTA Reveals
        const specialSections = ['.interactive-visual', '.contact-card', '.brands-split'];
        specialSections.forEach(s => {
            gsap.from(s, {
                scrollTrigger: {
                    trigger: s,
                    start: "top 85%"
                },
                scale: 0.98,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out"
            });
        });


        // 7. Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // 8. 3D Pack Reveal Enhancement (optional JS trigger)
        const pack = document.querySelector('.pack-3d');
        if (pack) {
            pack.addEventListener('mouseenter', () => {
                gsap.to(".pack-flap", { rotateX: -120, duration: 0.8, ease: "power2.out" });
            });
            pack.addEventListener('mouseleave', () => {
                gsap.to(".pack-flap", { rotateX: 0, duration: 0.8, ease: "power2.in" });
            });
        }

        // 9. Contacts Page Map Switcher & Animations
        const mapTabs = document.querySelectorAll('.map-tab');
        const mapViews = document.querySelectorAll('.map-view');

        if (mapTabs.length > 0) {
            mapTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const mapType = tab.getAttribute('data-map');
                    mapTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const targetMap = document.getElementById(`${mapType}-map`);
                    if (targetMap) {
                        mapViews.forEach(v => v.classList.remove('active'));
                        targetMap.classList.add('active');
                        gsap.from(targetMap, { opacity: 0, scale: 0.98, duration: 0.4 });
                    }
                });
            });
        }

        const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right');
        animatedElements.forEach(el => {
            let x = 0, y = 0;
            if (el.classList.contains('animate-up')) y = 40;
            if (el.classList.contains('animate-left')) x = -30;
            if (el.classList.contains('animate-right')) x = 30;

            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                x: x,
                y: y,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });




        // 11. Products Fullpage Catalog Logic
        const catalogViewport = document.querySelector('.fullpage-catalog-viewport');
        const packTabsContainer = document.getElementById('catalog-pack-tabs');
        const catalogGrid = document.getElementById('catalog-full-grid');
        const productModal = document.getElementById('product-modal');
        const btnCloseModal = document.getElementById('btn-close-modal');

        if (catalogViewport && packTabsContainer && catalogGrid) {
            const modalImg = document.getElementById('modal-img');
            const modalTitle = document.getElementById('modal-title');
            const modalDesc = document.getElementById('modal-desc');
            const modalSpecPack = document.getElementById('modal-spec-pack');
            const modalTags = document.getElementById('modal-tags');
            const modalSpecsList = document.getElementById('modal-specs-list');

            // --- Data Generation ---
            const ecoProducts = [
                // 120
                { brand: 'eco', pack: '120', subcat: '', product: 'Aloe', img: 'img/ECO/120/aloe-120.png', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Antibacterial', img: 'img/ECO/120/antibacterial-120.png', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Aroma', img: 'img/ECO/120/aroma-120.png', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Baby Blue', img: 'img/ECO/120/baby-blue-120.png', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Baby Orange', img: 'img/ECO/120/baby-orange-120.png', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Baby Pink', img: 'img/ECO/120/baby-pink-120.png', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Baby Yellow', img: 'img/ECO/120/baby-yellow-120.png', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Chamomile', img: 'img/ECO/120/chamo-120.png', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Cream', img: 'img/ECO/120/cream-120.png', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'For Man', img: 'img/ECO/120/for-man-120.png', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'For Woman', img: 'img/ECO/120/for-woman-120.png', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'eco', pack: '120', subcat: '', product: 'Profit Extra', img: 'img/ECO/120/porofit-extra-120.png', color: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' },
                // 72
                { brand: 'eco', pack: '72', subcat: '', product: 'Aloe', img: 'img/ECO/72/aloe-72.png', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Antibacterial', img: 'img/ECO/72/antibacterial-72.png', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Aroma', img: 'img/ECO/72/aroma-72.png', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Baby Blue', img: 'img/ECO/72/baby-blue-72.png', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Baby Orange', img: 'img/ECO/72/baby-orange-72.png', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Baby Pink', img: 'img/ECO/72/baby-pink-72.png', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Baby Yellow', img: 'img/ECO/72/baby-yellow-72.png', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Chamomile', img: 'img/ECO/72/chamo-72.png', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Cream', img: 'img/ECO/72/cream-72.png', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'For Man', img: 'img/ECO/72/for-man-72.png', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'For Woman', img: 'img/ECO/72/for-woman-72.png', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'eco', pack: '72', subcat: '', product: 'Profit Extra', img: 'img/ECO/72/profit-extra-72.png', color: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' },
                // 20
                { brand: 'eco', pack: '20', subcat: '', product: 'Aloe', img: 'img/ECO/20/aloe-20.png', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'Antibacterial', img: 'img/ECO/20/antibacterial-20.png', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'Aroma', img: 'img/ECO/20/aroma-20.png', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'Baby Blue', img: 'img/ECO/20/baby-blue-20.png', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'Baby Yellow', img: 'img/ECO/20/baby-yellow-20.png', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'Chamomile', img: 'img/ECO/20/chamo-20.png', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'For Man', img: 'img/ECO/20/for-man-20.png', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'eco', pack: '20', subcat: '', product: 'For Woman', img: 'img/ECO/20/for-woman-20.png', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                // 15+2
                { brand: 'eco', pack: '15+2', subcat: 'Baby', product: 'Baby Blue', img: 'img/ECO/15+2/bab-blue-15+2.jpg', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Baby', product: 'Baby Green', img: 'img/ECO/15+2/bab-green-15+2.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Baby', product: 'Baby Pink', img: 'img/ECO/15+2/bab-pink-15+2.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Baby', product: 'Baby Yellow', img: 'img/ECO/15+2/bab-yellow-15+2.jpg', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Universal', product: 'Universal Blue', img: 'img/ECO/15+2/universal-blue-15+2.jpg', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Universal', product: 'Universal Green', img: 'img/ECO/15+2/universal-green-15+2.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Universal', product: 'Universal Orange', img: 'img/ECO/15+2/universal-orange-15+2.jpg', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '15+2', subcat: 'Universal', product: 'Universal Pink', img: 'img/ECO/15+2/universal-pink-15+2.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                // 15
                { brand: 'eco', pack: '15', subcat: '', product: 'Aloe', img: 'img/ECO/15/aloe-15.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '15', subcat: '', product: 'Antibacterial', img: 'img/ECO/15/antibactrial-15.jpg', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'eco', pack: '15', subcat: '', product: 'Aroma', img: 'img/ECO/15/aroma-15.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Baby', product: 'Baby Blue', img: 'img/ECO/15/baby-blue-15.jpg', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Baby', product: 'Baby Green', img: 'img/ECO/15/baby-green-15.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Baby', product: 'Baby Orange', img: 'img/ECO/15/baby-orange-15.jpg', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Baby', product: 'Baby Yellow', img: 'img/ECO/15/baby-yellow-15.jpg', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '15', subcat: '', product: 'Chamomile', img: 'img/ECO/15/chamo-15.jpg', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Fruit', product: 'Citrus', img: 'img/ECO/15/citrus-15.jpg', color: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Fruit', product: 'Kalendula', img: 'img/ECO/15/kalendula-15.jpg', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Fruit', product: 'Lime', img: 'img/ECO/15/lime-15.jpg', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Fruit', product: 'Peach', img: 'img/ECO/15/peach-15.jpg', color: 'linear-gradient(135deg, #fbe9e7 0%, #ffccbc 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Fruit', product: 'Strawberry', img: 'img/ECO/15/staw-15.jpg', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' },
                { brand: 'eco', pack: '15', subcat: 'Flowers', product: 'Lavanda', img: 'img/ECO/15/lavanda-15.jpg', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'eco', pack: '15', subcat: '', product: 'For Man', img: 'img/ECO/15/for-man-15.jpg', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'eco', pack: '15', subcat: '', product: 'For Woman', img: 'img/ECO/15/for-woman-15.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                // 10
                { brand: 'eco', pack: '10', subcat: '', product: 'Aloe', img: 'img/ECO/10/aloe-10.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '10', subcat: '', product: 'Antibacterial', img: 'img/ECO/10/antibakterial-10.jpg', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Baby', product: 'Baby Blue', img: 'img/ECO/10/baby-blue-10.jpg', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Baby', product: 'Baby Green', img: 'img/ECO/10/baby-green-10.jpg', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Baby', product: 'Baby Pink', img: 'img/ECO/10/baby-pink-10.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Baby', product: 'Baby Yellow', img: 'img/ECO/10/baby-yellow-10.jpg', color: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)' },
                { brand: 'eco', pack: '10', subcat: '', product: 'Chamomile', img: 'img/ECO/10/chamo-10.jpg', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Fruit', product: 'Citrus', img: 'img/ECO/10/citrus-10.jpg', color: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Compact', product: 'Compact', img: 'img/ECO/10/compact-10.jpg', color: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' },
                { brand: 'eco', pack: '10', subcat: '', product: 'For Man', img: 'img/ECO/10/for-man-10.jpg', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'eco', pack: '10', subcat: '', product: 'For Woman', img: 'img/ECO/10/for-woman-10.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Flowers', product: 'Lavanda', img: 'img/ECO/10/lavanda-10.jpg', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Fruit', product: 'Lime', img: 'img/ECO/10/lime-10.jpg', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Fruit', product: 'Peach', img: 'img/ECO/10/peach-10.jpg', color: 'linear-gradient(135deg, #fbe9e7 0%, #ffccbc 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Flowers', product: 'Rose', img: 'img/ECO/10/rose-10.jpg', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'eco', pack: '10', subcat: 'Fruit', product: 'Strawberry', img: 'img/ECO/10/straw-10.jpg', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' }
            ].map(p => {
                p.title = 'ECO ' + p.product;
                p.spec = p.subcat ? `${p.subcat} (${p.pack})` : `${p.pack} шт`;
                p.desc = `Оригинальные влажные салфетки ECO ${p.product} в удобной упаковке на ${p.pack} шт. Плотный материал, приятный аромат и бережный уход.`;
                if (!p.color) p.color = 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';

                // Add dynamic specs
                p.specs = [
                    { icon: 'package', key: 'spec_pcs', val: p.pack },
                    { icon: 'layers', label: (parseInt(p.pack) >= 72) ? 'Спанлейс 40г/м2' : 'Спанлейс 35г/м2' },
                    { icon: 'droplet', key: 'spec_water', prefix: '99% ' },
                    { icon: 'box', key: 'spec_box', suffix: (parseInt(p.pack) >= 120) ? ' 24 шт' : ' 48 шт' }
                ];
                return p;
            });
            const bloomyProducts = [
                // 120
                { brand: 'bloomy', pack: '120', product: 'Baby Blue', img: 'img/BLOOMY/120/12fdfdfd.webp', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Baby Pink', img: 'img/BLOOMY/120/fgbfgbgf.webp', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Magic', img: 'img/BLOOMY/120/iiii.webp', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Chamomile', img: 'img/BLOOMY/120/khfcv.webp', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Antibacterial', img: 'img/BLOOMY/120/kjgv.webp', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Aloe Extract', img: 'img/BLOOMY/120/klljnjb.webp', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'bloomy', pack: '120', product: 'Red Rose', img: 'img/BLOOMY/120/nbb.webp', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' },
                { brand: 'bloomy', pack: '120', product: 'For Men', img: 'img/BLOOMY/120/jn.webp', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                // 72
                { brand: 'bloomy', pack: '72', product: 'Chamomile', img: 'img/BLOOMY/72/bsbsfd.webp', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'bloomy', pack: '72', product: 'For Men', img: 'img/BLOOMY/72/loot.webp', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Magic', img: 'img/BLOOMY/72/c_c_c.webp', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Comfort', img: 'img/BLOOMY/72/f_v.webp', color: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Aloe Extract', img: 'img/BLOOMY/72/gegrrg.webp', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Red Rose', img: 'img/BLOOMY/72/knb.webp', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Baby Blue', img: 'img/BLOOMY/72/lknb.webp', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Baby Pink', img: 'img/BLOOMY/72/svdvsd.webp', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'bloomy', pack: '72', product: 'Antibacterial', img: 'img/BLOOMY/72/mn_m.webp', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                // 20
                { brand: 'bloomy', pack: '20', product: 'Chamomile', img: 'img/BLOOMY/20/bdbb.webp', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Aloe Extract', img: 'img/BLOOMY/20/bsfvf.webp', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Baby Blue', img: 'img/BLOOMY/20/cas2.webp', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'bloomy', pack: '20', product: 'For Men', img: 'img/BLOOMY/20/ccw.webp', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Baby Pink', img: 'img/BLOOMY/20/cscsc.webp', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Antibacterial', img: 'img/BLOOMY/20/fbfdb.webp', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Magic', img: 'img/BLOOMY/20/lc.webp', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'bloomy', pack: '20', product: 'Red Rose', img: 'img/BLOOMY/20/vvdvd.webp', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' },
                // 10
                { brand: 'bloomy', pack: '10', product: 'Antibacterial', img: 'img/BLOOMY/10/gfxhg.webp', color: 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Magic', img: 'img/BLOOMY/10/hgjklk.webp', color: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Chamomile', img: 'img/BLOOMY/10/hkv.webp', color: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Baby Pink', img: 'img/BLOOMY/10/ji.webp', color: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Baby Blue', img: 'img/BLOOMY/10/kbjbjb.webp', color: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Red Rose', img: 'img/BLOOMY/10/lbkjv.webp', color: 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)' },
                { brand: 'bloomy', pack: '10', product: 'Aloe Extract', img: 'img/BLOOMY/10/vcb_nbjh.webp', color: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' },
                { brand: 'bloomy', pack: '10', product: 'For Men', img: 'img/BLOOMY/10/wsfsfvd.webp', color: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)' }
            ].map(p => {
                p.subcat = '';
                p.title = 'Bloomy ' + p.product;
                p.spec = p.pack + ' шт';
                p.desc = `Премиальные влажные салфетки Bloomy ${p.product} в удобной упаковке на ${p.pack} шт. Плотный материал, изысканный аромат и бережный уход.`;
                p.specs = [
                    { icon: 'package', key: 'spec_pcs', val: p.pack },
                    { icon: 'layers', label: (parseInt(p.pack) >= 72) ? 'Спанлейс 40г/м2' : 'Спанлейс 35г/м2' },
                    { icon: 'droplet', key: 'spec_water', prefix: '99% ' },
                    { icon: 'box', key: 'spec_box', suffix: (parseInt(p.pack) >= 120) ? ' 24 шт' : ' 48 шт' }
                ];
                return p;
            });

            const packsConfig = [
                { id: '120', name: '120' },
                { id: '72', name: '72' },
                { id: '20', name: '20' },
                { id: '15+2', name: '15+2' },
                { id: '15', name: '15' },
                { id: '10', name: '10' }
            ];

            let catalogRevealed = false;
            let currentCat = 'wipes';
            let currentBrand = null;
            let currentPackId = '120';
            let allProducts = [...ecoProducts, ...bloomyProducts];

            const comingSoon = document.getElementById('coming-soon');
            const csBackBtn = document.querySelector('.cs-back-btn');
            const brandSwBtn = document.querySelectorAll('.brand-sw-btn');
            const catNavBtn = document.querySelectorAll('.cat-nav-btn');

            function renderTabs(brand) {
                packTabsContainer.innerHTML = '';
                const lang = localStorage.getItem('hygiene_lang') || 'ru';
                const pcsSuffix = translations[lang]['spec_pcs'] || 'шт';

                // Define which packs are available for which brand
                const availablePacks = packsConfig.filter(p => {
                    if (brand === 'bloomy') {
                        // Bloomy doesn't have 15 and 15+2
                        return p.id !== '15' && p.id !== '15+2';
                    }
                    return true; // ECO has all
                });

                // Ensure currentPackId is valid for the new brand
                if (!availablePacks.find(p => p.id === currentPackId)) {
                    currentPackId = availablePacks[0].id;
                }

                availablePacks.forEach((pack, idx) => {
                    const tab = document.createElement('div');
                    tab.className = 'catalog-pack-tab' + (pack.id === currentPackId ? ' active' : '');
                    tab.innerText = pack.name + ' ' + pcsSuffix;
                    tab.addEventListener('click', () => {
                        currentPackId = pack.id;
                        document.querySelectorAll('.catalog-pack-tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        renderGrid(currentPackId, brand);
                    });
                    packTabsContainer.appendChild(tab);
                });

                renderGrid(currentPackId, brand);
            }

            function renderGrid(packId, brand) {
                catalogGrid.innerHTML = '';
                const lang = localStorage.getItem('hygiene_lang') || 'ru';
                const moreText = translations[lang]['ca_more'] || 'Подробнее';

                let filtered = allProducts.filter(p => p.brand === brand);
                if (packId !== 'all') filtered = filtered.filter(p => p.pack === packId);

                filtered.forEach((pd, idx) => {
                    const prodKey = 'prod_' + pd.product.toLowerCase().replace(/ /g, '_');
                    const prodTitle = translations[lang][prodKey] || pd.product;
                    const specSuffix = translations[lang]['spec_pcs'] || 'шт';
                    const displaySpec = pd.subcat ? `${pd.subcat} (${pd.pack} ${specSuffix})` : `${pd.pack} ${specSuffix}`;

                    const item = document.createElement('div');
                    item.className = 'catalog-item-card brand-' + pd.brand;
                    item.innerHTML = `
                        <div class="ca-img-wrap"><img src="${pd.img}"></div>
                        <div class="ca-info">
                            <h3 class="ca-title">${prodTitle}</h3>
                            <p class="ca-spec">${displaySpec}</p>
                            <div class="ca-view-btn">
                                <i data-lucide="eye"></i>
                                <span>${moreText}</span>
                            </div>
                        </div>
                    `;

                    if (pd.color) {
                        item.style.setProperty('--card-bg', pd.color);
                    }

                    const isMobile = window.innerWidth <= 768;
                    gsap.fromTo(item,
                        { opacity: 0, y: isMobile ? 20 : 30 },
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: isMobile ? 0.4 : 0.5, 
                            delay: idx * (isMobile ? 0.03 : 0.05), 
                            ease: isMobile ? "power2.out" : "back.out(1.5)" 
                        }
                    );

                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        openProductModal(pd);
                    });
                    catalogGrid.appendChild(item);
                });

                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }

            let isModalAnimating = false;
            let lastCloseTime = 0;

            // --- Product Modal Logic --- //
            function openProductModal(product) {
                if (Date.now() - lastCloseTime < 400) return;
                if (isModalAnimating || productModal.style.display === 'flex') return;
                isModalAnimating = true;

                // Prevent background scroll and jumping
                const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = `${scrollBarWidth}px`;
                const header = document.querySelector('app-header');
                if (header) header.style.paddingRight = `${scrollBarWidth}px`;

                const lang = localStorage.getItem('hygiene_lang') || 'ru';
                const prodKey = 'prod_' + product.product.toLowerCase().replace(/ /g, '_');
                const prodTitle = translations[lang][prodKey] || product.product;
                const prodDesc = translations[lang]['prod_desc_standard'] || product.desc;
                const specSuffix = translations[lang]['spec_pcs'] || 'шт';
                const displaySpec = product.subcat ? `${product.subcat} (${product.pack} ${specSuffix})` : `${product.pack} ${specSuffix}`;

                if (modalImg) modalImg.src = product.img;
                if (modalTitle) modalTitle.innerHTML = prodTitle;
                if (modalDesc) modalDesc.innerText = prodDesc;
                if (modalSpecPack) modalSpecPack.innerText = displaySpec;

                if (modalTags) {
                    modalTags.innerHTML = `<span class="tag">${product.brand.toUpperCase()}</span>`;
                    if (product.subcat) modalTags.innerHTML += `<span class="tag">${product.subcat}</span>`;
                }

                if (modalSpecsList && product.specs) {
                    modalSpecsList.innerHTML = product.specs.map(s => {
                        let label = s.label;
                        if (s.key) {
                            const trans = translations[lang][s.key] || '';
                            label = (s.prefix || '') + (s.val || '') + trans + (s.suffix || '');
                        }
                        return `<li><i data-lucide="${s.icon}"></i> <span>${label}</span></li>`;
                    }).join('');
                }

                const leftPane = document.querySelector('.modal-left');
                if (leftPane) leftPane.style.setProperty('--theme-color', product.color.replace('135deg', 'circle'));

                productModal.style.display = 'flex';
                productModal.style.pointerEvents = 'all';
                
                // Add brand-specific classes for styling
                productModal.className = 'product-modal-overlay is-' + product.brand;
                if (parseInt(product.pack) <= 20) productModal.classList.add('is-small-pack');

                gsap.fromTo(productModal,
                    { opacity: 0, backdropFilter: 'blur(0px)' },
                    { opacity: 1, backdropFilter: 'blur(25px)', duration: 0.4, onComplete: () => { isModalAnimating = false; } }
                );
                gsap.fromTo('.product-modal-content',
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
                );

                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }

            function closeModal(e) {
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }

                if (isModalAnimating) return;
                isModalAnimating = true;
                lastCloseTime = Date.now();

                productModal.style.pointerEvents = 'none';

                gsap.to('.product-modal-content', { y: 30, opacity: 0, scale: 0.98, duration: 0.3 });
                gsap.to(productModal, {
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                    duration: 0.3,
                    onComplete: () => {
                        productModal.style.display = 'none';
                        document.body.style.overflow = '';
                        document.body.style.paddingRight = '';
                        const header = document.querySelector('app-header');
                        if (header) header.style.paddingRight = '';
                        isModalAnimating = false;
                    }
                });
            }

            btnCloseModal.addEventListener('click', closeModal);

            // Close on backdrop click
            productModal.addEventListener('click', (e) => {
                if (e.target === productModal) closeModal(e);
            });

            // Close on Escape key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && productModal.style.display === 'flex') closeModal();
            });

            // --- Brand Switcher Logic --- //
            brandSwBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filter = btn.getAttribute('data-filter');
                    currentBrand = filter;
                    brandSwBtn.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const brandContainer = document.querySelector('.brand-bar-container');
                    if (brandContainer && brandContainer.classList.contains('expanded')) {
                        gsap.to(brandContainer, {
                            scale: 0.9, opacity: 0.5, duration: 0.2, onComplete: () => {
                                brandContainer.classList.remove('expanded');
                                gsap.to(brandContainer, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
                            }
                        });
                    }

                    if (!catalogRevealed && currentCat === 'wipes') {
                        revealCatalog();
                    }

                    renderTabs(filter);
                });
            });

            function revealCatalog() {
                if (catalogRevealed) return;
                catalogRevealed = true;

                gsap.set(catalogViewport, { display: 'block', opacity: 1 });
                gsap.set(comingSoon, { opacity: 0, pointerEvents: 'none' });

                const tl = gsap.timeline();
                tl.fromTo(catalogViewport, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
            }


            function showComingSoonOverlay() {
                catalogRevealed = true;

                // Hide the brand bar because non-wipe sections don't have brands yet
                const brandBar = document.querySelector('.brand-bar');
                if (brandBar) {
                    gsap.to(brandBar, {
                        height: 0, opacity: 0, pointerEvents: 'none', duration: 0.4, onComplete: () => {
                            brandBar.style.display = 'none';
                        }
                    });
                }

                gsap.set(catalogViewport, { display: 'block', opacity: 1 });
                gsap.fromTo(comingSoon, { opacity: 0 }, { opacity: 1, pointerEvents: 'all', duration: 0.4 });

                const mainContent = document.querySelector('.catalog-main-content');
                if (mainContent) {
                    gsap.to(mainContent, { opacity: 0, filter: 'blur(10px)', duration: 0.4, display: 'none' });
                }
            }

            catNavBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    const cat = btn.getAttribute('data-cat');
                    currentCat = cat;
                    catNavBtn.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    if (cat === 'wipes') {
                        // Show the brand bar again
                        const brandBar = document.querySelector('.brand-bar');
                        if (brandBar) {
                            brandBar.style.display = 'flex';
                            gsap.to(brandBar, { height: 'auto', opacity: 1, pointerEvents: 'all', clearProps: 'margin,padding', duration: 0.5 });
                        }

                        if (catalogRevealed) {
                            gsap.to(comingSoon, { opacity: 0, pointerEvents: 'none', duration: 0.4 });
                            const mainContent = document.querySelector('.catalog-main-content');
                            if (mainContent) {
                                mainContent.style.display = 'block';
                                gsap.to(mainContent, { opacity: 1, filter: 'blur(0px)', duration: 0.4 });
                            }
                        }
                    } else {
                        showComingSoonOverlay();
                    }
                });
            });

            if (csBackBtn) {
                csBackBtn.addEventListener('click', () => {
                    const wipesBtn = document.querySelector('[data-cat="wipes"]');
                    if (wipesBtn) wipesBtn.click();
                });
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // --- Language Changed Listener --- //
            window.addEventListener('languageChanged', (e) => {
                if (currentBrand) {
                    renderTabs(currentBrand);
                }
            });
        }
    }); // Closing DOMContentLoaded
} // Closing GSAP check

// Map Switcher Function
function switchMap(type) {
    const googleMap = document.getElementById('map-google');
    const yandexMap = document.getElementById('map-yandex');
    const btns = document.querySelectorAll('.map-btn');

    btns.forEach(btn => btn.classList.remove('active'));

    if (type === 'google') {
        if (googleMap) googleMap.style.display = 'block';
        if (yandexMap) yandexMap.style.display = 'none';
        const btn = Array.from(btns).find(b => b.getAttribute('onclick')?.includes('google'));
        if (btn) btn.classList.add('active');
    } else {
        if (googleMap) googleMap.style.display = 'none';
        if (yandexMap) yandexMap.style.display = 'block';
        const btn = Array.from(btns).find(b => b.getAttribute('onclick')?.includes('yandex'));
        if (btn) btn.classList.add('active');
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || localStorage.getItem('hygiene_lang') || 'ru';
    // Small delay to let custom elements render their lang buttons
    setTimeout(() => {
        setLanguage(savedLang);
    }, 50);
});

// Event delegation for lang-btn clicks — works even if buttons are injected after DOMContentLoaded
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.getAttribute('data-lang');
    if (!lang) return;
    setLanguage(lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
});

// --- New Reviews Swiper (V2) Initialization ---
function initReviewsSwiper() {
    const reviewsElem = document.querySelector('.reviews-v2-swiper');
    if (reviewsElem && typeof Swiper !== 'undefined') {
        new Swiper('.reviews-v2-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            observer: true,
            observeParents: true,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.rv2-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.rv2-next',
                prevEl: '.rv2-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

// Initialize on window load for maximum stability
window.addEventListener('load', initReviewsSwiper);
