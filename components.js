const footerHTML = `
    <footer class="footer" style="background: var(--primary); color: #fff; padding: 100px 0 40px; margin-top: auto; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        <div style="position: absolute; bottom: -20%; right: -5%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%); border-radius: 50%; pointer-events: none;"></div>

        <div class="container" style="position: relative; z-index: 1;">
            <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 80px;">
                <div class="footer-col" style="display: flex; flex-direction: column; gap: 25px;">
                    <a href="index.html" class="footer-logo" style="display: flex; align-items: center; gap: 15px; text-decoration: none;">
                        <span class="logo-text" style="font-size: 32px; color: #fff; letter-spacing: 1px;">HYGIENE</span>
                    </a>
                    <p style="color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1.8; max-width: 350px;" data-i18n="footer_desc">
                        Премиальная гигиеническая продукция. Создаем чистоту и заботу в каждом движении с заботой об экологии.
                    </p>
                    <div class="footer-socials" style="display: flex; gap: 15px; margin-top: 10px;">
                        <a href="#" style="width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.3);" onmouseover="this.style.background='#fff'; this.style.color='var(--primary)';" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="#" style="width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.3);" onmouseover="this.style.background='#fff'; this.style.color='var(--primary)';" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" style="width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: #fff; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.3);" onmouseover="this.style.background='#fff'; this.style.color='var(--primary)';" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </a>
                    </div>
                </div>

                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; margin-bottom: 5px;" data-i18n="footer_nav">Навигация</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="index.html" data-i18n="nav_home" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Главная</a></li>
                        <li><a href="about.html" data-i18n="nav_about" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">О компании</a></li>
                        <li><a href="products.html" data-i18n="nav_products" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Продукция</a></li>
                        <li><a href="production.html" data-i18n="nav_production" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Производство</a></li>
                    </ul>
                </div>

                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; margin-bottom: 5px;" data-i18n="footer_cats">Категории</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li><a href="products.html" data-i18n="cat_wet" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Влажные салфетки</a></li>
                        <li><a href="products.html" data-i18n="cat_pads" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Прокладки</a></li>
                        <li><a href="products.html" data-i18n="cat_towels" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Бумажная продукция</a></li>
                        <li><a href="products.html" data-i18n="footer_eco" style="color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.3s; font-size: 16px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">Линейка ECO</a></li>
                    </ul>
                </div>

                <div class="footer-col" style="display: flex; flex-direction: column; gap: 20px;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; margin-bottom: 5px;" data-i18n="footer_cont">Контакты</h4>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 15px;">
                        <li style="display: flex; align-items: flex-start; gap: 12px; color: rgba(255,255,255,0.8); font-size: 15px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="margin-top: 2px; flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            <span data-i18n="cont_office_addr">Узбекистан, Ташкентская обл., Янгиюльский р-н, улица Навруз, 93</span>
                        </li>
                        <li style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8); font-size: 15px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="flex-shrink: 0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <a href="tel:+998903271720" style="color: inherit; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'"  >+998 (90) 327-17-20</a>
                        </li>
                        <li style="display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8); font-size: 15px;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="flex-shrink: 0;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <a href="mailto:hygieneuz@mail.ru" style="color: inherit; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">hygieneuz@mail.ru</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom" style="display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.6); font-size: 14px;">
                <p>&copy; 2026 HYGIENE Group. <span data-i18n="footer_rights">All rights reserved.</span></p>
                <div style="display: flex; gap: 20px;">
                    <a href="#" data-i18n="footer_privacy" style="color: inherit; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Политика конфиденциальности</a>
                    <a href="#" data-i18n="footer_terms" style="color: inherit; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.6)'">Условия использования</a>
                </div>
            </div>
            
            <style>
                @media (max-width: 992px) {
                    .footer-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 576px) {
                    .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
                    .footer-bottom { flex-direction: column; gap: 15px; text-align: center; }
                }
            </style>
        </div>
    </footer>
`;

class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="header">
                <nav class="nav container">
                    <a href="index.html" class="logo">
                        <img src="assets/img_1691.webp" alt="HYGIENE Logo" class="logo-img">
                        <span class="logo-text">HYGIENE</span>
                    </a>
                    <ul class="nav-links">
                        <li><a href="index.html" data-i18n="nav_home">Главная</a></li>
                        <li><a href="about.html" data-i18n="nav_about">О компании</a></li>
                        <li><a href="products.html" data-i18n="nav_products">Продукция</a></li>
                        <li><a href="production.html" data-i18n="nav_production">Производство</a></li>
                        <li><a href="contacts.html" data-i18n="nav_contacts">Контакты</a></li>
                    </ul>
                    <div class="header-right">
                        <div class="lang-switcher">
                            <button class="lang-btn active" data-lang="ru">RU</button>
                            <button class="lang-btn" data-lang="uz">UZ</button>
                            <button class="lang-btn" data-lang="en">EN</button>
                        </div>
                        <a href="contacts.html" class="btn btn-outline desktop-coop-btn" data-i18n="btn_coop">Сотрудничество</a>
                    </div>
                    <button class="burger-btn" id="burger-btn" aria-label="Menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </nav>
            </header>
        `;
        
        // Inject mobile menu elements directly into body so position:fixed works correctly
        const injectMobileMenu = () => {
            if (!document.getElementById('mobile-menu')) {
                const overlayEl = document.createElement('div');
                overlayEl.className = 'mobile-menu-overlay';
                overlayEl.id = 'mobile-menu-overlay';
                document.body.appendChild(overlayEl);

                const menuEl = document.createElement('div');
                menuEl.className = 'mobile-menu';
                menuEl.id = 'mobile-menu';
                menuEl.setAttribute('role', 'dialog');
                menuEl.setAttribute('aria-modal', 'true');
                menuEl.setAttribute('aria-label', 'Navigation');
                menuEl.innerHTML = `
                    <div class="mobile-menu-header">
                        <span class="mobile-logo-text">HYGIENE</span>
                        <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <nav class="mobile-nav">
                        <a href="index.html" class="mobile-nav-link" data-i18n="nav_home">Главная</a>
                        <a href="about.html" class="mobile-nav-link" data-i18n="nav_about">О компании</a>
                        <a href="products.html" class="mobile-nav-link" data-i18n="nav_products">Продукция</a>
                        <a href="production.html" class="mobile-nav-link" data-i18n="nav_production">Производство</a>
                        <a href="contacts.html" class="mobile-nav-link" data-i18n="nav_contacts">Контакты</a>
                    </nav>
                    <div class="mobile-menu-footer">
                        <div class="mobile-lang-switcher">
                            <button class="lang-btn active" data-lang="ru">RU</button>
                            <button class="lang-btn" data-lang="uz">UZ</button>
                            <button class="lang-btn" data-lang="en">EN</button>
                        </div>
                        <a href="contacts.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;" data-i18n="btn_coop">Сотрудничество</a>
                    </div>
                `;
                document.body.appendChild(menuEl);
            }
            this._initBurger();
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectMobileMenu, { once: true });
        } else {
            injectMobileMenu();
        }

    }

    _initBurger() {
        const burgerBtn = document.getElementById('burger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        const closeBtn = document.getElementById('mobile-menu-close');

        if (!burgerBtn || !mobileMenu) return;

        const openMenu = () => {
            mobileMenu.classList.add('is-open');
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            burgerBtn.classList.add('is-active');
            burgerBtn.setAttribute('aria-expanded', 'true');
        };

        const closeMenu = () => {
            mobileMenu.classList.remove('is-open');
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
            burgerBtn.classList.remove('is-active');
            burgerBtn.setAttribute('aria-expanded', 'false');
        };

        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }
}

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = footerHTML;
    }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
