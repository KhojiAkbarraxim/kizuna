const NAV_ITEMS = [
  { label: 'ホーム', path: 'index.html' },
  { label: '会社概要', path: 'about.html' },
  { label: 'サービス', path: 'services.html' },
  { label: '業務の流れ', path: 'how-we-work.html' },
  { label: 'ネットワーク', path: 'network.html' },
  { label: '代表紹介', path: 'team.html' },
  { label: 'お問い合わせ', path: 'contact.html' },
];

const FOOTER_NAV_ITEMS = [
  { label: '会社概要', path: 'about.html' },
  { label: 'サービス', path: 'services.html' },
  { label: '業務の流れ', path: 'how-we-work.html' },
  { label: 'ネットワーク', path: 'network.html' },
  { label: 'お問い合わせ', path: 'contact.html' },
];

const LOGO_URL =
  'assets/images/kizuna_cropped.png';
const FALLBACK_LOGO = 'assets/images/kizuna_cropped.png';

function getCurrentPage() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const file = path.split('/').pop();
  if (!file || !file.length) return 'index.html';

  const routeAliases = {
    about: 'about.html',
    services: 'services.html',
    'how-we-work': 'how-we-work.html',
    network: 'network.html',
    team: 'team.html',
    contact: 'contact.html',
    '404': '404.html',
  };

  if (routeAliases[file]) return routeAliases[file];
  return file.includes('.') ? file : `${file}.html`;
}

function iconMenu() {
  return '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>';
}

function iconClose() {
  return '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
}

function iconWhatsApp() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.3 0 2.2 1.2 4.2 3 5.6L5.8 20l3.3-1.7c.9.2 1.9.3 2.9.3 4.7 0 8.5-3.3 8.5-7.3s-3.8-7.8-8.5-7.8Z"/></svg>';
}

function iconTelegram() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 4 11 13"/><path d="m21 4-6 16-4-7-7-4Z"/></svg>';
}

function renderHeader(activePage) {
  const container = document.getElementById('site-header');
  if (!container) return;

  const desktopLinks = NAV_ITEMS.map((item) => {
    const isActive = item.path === activePage;
    return `<a href="${item.path}" class="site-nav-link ${isActive ? 'is-active' : ''}">${item.label}</a>`;
  }).join('');

  const mobileLinks = NAV_ITEMS.map((item) => {
    const isActive = item.path === activePage;
    return `<a data-mobile-link href="${item.path}" class="site-mobile-link ${isActive ? 'is-active' : ''}">${item.label}</a>`;
  }).join('');

  container.innerHTML = `
    <nav class="site-header">
      <div class="site-header-inner">
        <a href="index.html" class="site-header-brand" aria-label="KizunaGroup | 絆グループ Home">
          <img
            src="${LOGO_URL}"
            alt="Kizuna Group"
            class="site-header-logo"
            onerror="this.onerror=null;this.src='${FALLBACK_LOGO}'"
          />
        </a>
        <div class="site-header-nav">${desktopLinks}</div>
        <button
          id="mobile-menu-toggle"
          class="site-mobile-toggle"
          aria-label="Open menu"
          aria-expanded="false"
        >
          ${iconMenu()}
        </button>
      </div>
      <div id="mobile-menu" class="site-mobile-menu">
        <div class="site-mobile-menu-inner">${mobileLinks}</div>
      </div>
    </nav>
  `;

  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  let open = false;
  toggle.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('is-open', open);
    toggle.innerHTML = open ? iconClose() : iconMenu();
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  menu.querySelectorAll('[data-mobile-link]').forEach((link) => {
    link.addEventListener('click', () => {
      open = false;
      menu.classList.remove('is-open');
      toggle.innerHTML = iconMenu();
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function renderFooter() {
  const container = document.getElementById('site-footer');
  if (!container) return;

  const navLinks = FOOTER_NAV_ITEMS.map(
    (item) =>
      `<a href="${item.path}" class="footer-link text-sm font-medium tracking-wide transition-colors duration-200">${item.label}</a>`
  ).join('');

  container.innerHTML = `
    <footer class="footer-unified footer-frame border-t">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          <div>
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 border-2 footer-accent-border rounded-sm flex items-center justify-center">
                <span class="font-heading text-sm font-bold footer-accent">橋</span>
              </div>
              <span class="font-heading text-base font-semibold tracking-wide">KizunaGroup | 絆グループ</span>
            </div>
            <p class="text-sm leading-relaxed max-w-xs footer-muted">
              言語・文化・信頼できるネットワークを通じて、日本とウズベキスタンを繋ぎます。
            </p>
          </div>
          <div>
            <h4 class="font-heading text-sm font-semibold mb-4 tracking-wide footer-accent">ナビゲーション</h4>
            <div class="flex flex-col gap-2">${navLinks}</div>
          </div>
          <div>
            <h4 class="font-heading text-sm font-semibold mb-4 tracking-wide footer-accent">お問い合わせ</h4>
            <div class="flex flex-col gap-2">
              <a href="mailto:rakhimovanvarbek@gmail.com" class="footer-link text-sm font-medium tracking-wide transition-colors duration-200">rakhimovanvarbek@gmail.com</a>
              <a href="tel:+817017100770" class="footer-link text-sm font-medium tracking-wide transition-colors duration-200">+81 70-1710-0770</a>
            </div>
          </div>
        </div>
        <div class="footer-divider border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs footer-soft">
            本サービスはビジネスコーディネーションおよびコミュニケーション支援のみを提供します。法律・税務相談は行っておりません。
          </p>
          <div class="flex items-center gap-6 text-xs footer-soft">
            <span>プライバシーポリシー</span>
            <span>利用規約</span>
            <span>© ${new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderFloatingActions() {
  const container = document.getElementById('floating-actions');
  if (!container) return;

  container.innerHTML = `
    <div class="floating-stack">
      <a
        href="https://wa.me/817017100770"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-btn floating-btn-wa"
        aria-label="WhatsApp"
      >
        ${iconWhatsApp()}
      </a>
      <a
        href="https://t.me/+817017100770"
        target="_blank"
        rel="noopener noreferrer"
        class="floating-btn floating-btn-telegram"
        aria-label="Telegram"
      >
        ${iconTelegram()}
      </a>
    </div>
  `;
}

function initReveal() {
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!revealElements.length) return;

  // Prevent a brief flash of final values before count-up starts.
  document.querySelectorAll('[data-count-target]').forEach((counterEl) => {
    const prefix = counterEl.getAttribute('data-count-prefix') || '';
    const suffix = counterEl.getAttribute('data-count-suffix') || '';
    counterEl.textContent = `${prefix}0${suffix}`;
  });

  const animateCounter = (counterEl) => {
    if (!counterEl || counterEl.dataset.countAnimated === 'true') return;

    const rawTarget = counterEl.getAttribute('data-count-target');
    const parsedTarget = Number.parseInt(
      rawTarget ?? counterEl.textContent.replace(/[^0-9-]/g, ''),
      10
    );
    if (!Number.isFinite(parsedTarget)) return;

    const target = parsedTarget;
    const prefix = counterEl.getAttribute('data-count-prefix') || '';
    const suffix = counterEl.getAttribute('data-count-suffix') || '';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    counterEl.dataset.countAnimated = 'true';

    if (reducedMotion) {
      counterEl.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const duration = Number.parseInt(counterEl.getAttribute('data-count-duration') || '1400', 10);
    const startValue = 0;
    const startTime = performance.now();
    counterEl.textContent = `${prefix}${startValue}${suffix}`;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (target - startValue) * eased);
      counterEl.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        counterEl.textContent = `${prefix}${target}${suffix}`;
      }
    };

    window.requestAnimationFrame(tick);
  };

  const revealElement = (element) => {
    element.classList.add('is-visible');
    const width = element.getAttribute('data-width');
    if (width) element.style.width = width;

    element.querySelectorAll('[data-width]').forEach((target) => {
      const targetWidth = target.getAttribute('data-width');
      if (targetWidth) target.style.width = targetWidth;
    });

    const runCounters = () => {
      if (element.hasAttribute('data-count-target')) {
        animateCounter(element);
      }
      element.querySelectorAll('[data-count-target]').forEach((counterEl) => {
        animateCounter(counterEl);
      });
    };

    const delay = Number.parseInt(element.getAttribute('data-delay') || '0', 10);
    if (delay > 0) {
      window.setTimeout(runCounters, delay);
    } else {
      runCounters();
    }
  };

  revealElements.forEach((element) => {
    const delay = element.getAttribute('data-delay');
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => {
      revealElement(element);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealElement(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitButton = document.getElementById('contact-submit');
  const formWrap = document.getElementById('contact-form-wrap');
  const success = document.getElementById('contact-success');
  const resetButton = document.getElementById('contact-reset');
  const idleSubmitMarkup =
    '<span class="contact-submit-content"><svg class="contact-submit-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.2 3.8 10.3 14.6"></path><path d="m21.2 3.8-6.1 16.4-4.1-7.2L3.8 8.9Z"></path></svg><span>送信する</span></span>';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!submitButton || !formWrap || !success) return;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="contact-submit-content"><span class="contact-submit-spinner" aria-hidden="true"></span><span>送信中...</span></span>';

    window.setTimeout(() => {
      formWrap.classList.add('hidden');
      success.classList.remove('hidden');
      submitButton.disabled = false;
      submitButton.innerHTML = idleSubmitMarkup;
    }, 900);
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      form.reset();
      if (formWrap && success) {
        success.classList.add('hidden');
        formWrap.classList.remove('hidden');
      }
    });
  }
}

function bootstrapSite() {
  const currentPage = getCurrentPage();
  renderHeader(currentPage);
  renderFooter();
  renderFloatingActions();
  initReveal();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', bootstrapSite);
