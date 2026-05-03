// js/language.js

(function() {
    // 1. Evitar bucles en local
    if (window.location.protocol === 'file:') return;

    const path = window.location.pathname;
    const isEnPage = path.startsWith('/en');
    let userPref = localStorage.getItem('app_lang');

    // 2. Si no hay preferencia, detectamos el navegador
    if (!userPref) {
        const browserLang = navigator.language || navigator.userLanguage;
        userPref = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
        localStorage.setItem('app_lang', userPref);
    }

    // 3. Redirección automática inicial
    if (userPref === 'en' && !isEnPage) {
        window.location.href = '/en' + (path === '/' ? '' : path);
    } else if (userPref === 'es' && isEnPage) {
        window.location.href = path.replace(/^\/en/, '') || '/';
    }
})();

function switchLanguage(lang) {
    localStorage.setItem('app_lang', lang);
    const path = window.location.pathname;

    if (lang === 'en') {
        if (!path.startsWith('/en')) {
            window.location.href = '/en' + (path === '/' ? '' : path);
        }
    } else {
        window.location.href = path.replace(/^\/en/, '') || '/';
    }
}