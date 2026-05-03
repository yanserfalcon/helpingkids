// Archivo: js/language.js

// 1. Diccionario de traducción de páginas (Soporta nombres con y sin .html)
const routes = {
    'es-en': {
        '/contacto': '/contact',
        '/contacto.html': '/contact.html',
        '/nosotros': '/about-us',
        '/nosotros.html': '/about-us.html',
        '/servicios': '/services',
        '/servicios.html': '/services.html'
    },
    'en-es': {
        '/contact': '/contacto',
        '/contact.html': '/contacto.html',
        '/about-us': '/nosotros',
        '/about-us.html': '/nosotros.html',
        '/services': '/servicios',
        '/services.html': '/servicios.html'
    }
};

// 2. Autodetección al cargar la página
(function() {
    if (window.location.protocol === 'file:') return;

    let path = window.location.pathname;
    const isEnPage = path.startsWith('/en');
    let userPref = localStorage.getItem('app_lang');

    if (!userPref) {
        const browserLang = navigator.language || navigator.userLanguage;
        userPref = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
        localStorage.setItem('app_lang', userPref);
    }

    if (userPref === 'en' && !isEnPage) {
        let translatedPath = routes['es-en'][path] || path;
        window.location.href = '/en' + (translatedPath === '/' ? '' : translatedPath);
    } else if (userPref === 'es' && isEnPage) {
        let basePath = path.replace(/^\/en/, '') || '/';
        let translatedPath = routes['en-es'][basePath] || basePath;
        window.location.href = translatedPath;
    }
})();

// 3. Función al hacer clic en el botón del menú
function switchLanguage(lang) {
    localStorage.setItem('app_lang', lang);
    let path = window.location.pathname;

    if (lang === 'en') {
        if (!path.startsWith('/en')) {
            let translatedPath = routes['es-en'][path] || path;
            window.location.href = '/en' + (translatedPath === '/' ? '' : translatedPath);
        }
    } else {
        if (path.startsWith('/en')) {
            let basePath = path.replace(/^\/en/, '') || '/';
            let translatedPath = routes['en-es'][basePath] || basePath;
            window.location.href = translatedPath;
        }
    }
}