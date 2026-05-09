// Archivo: js/language.js

// 1. Diccionario exacto de nombres de archivo (Soporta con y sin .html)
const translations = {
    'es-en': {
        'contacto.html': 'contact.html',
        'contacto': 'contact',
        'nosotros.html': 'about-us.html',
        'nosotros': 'about-us',
        'servicios.html': 'services.html',
        'servicios': 'services',
        'galeria.html': 'gallery.html',
        'galeria': 'gallery',
        '': '' // Para el index
    },
    'en-es': {
        'contact.html': 'contacto.html',
        'contact': 'contacto',
        'about-us.html': 'nosotros.html',
        'about-us': 'nosotros',
        'services.html': 'servicios.html',
        'services': 'servicios',
        'gallery.html': 'galeria.html',
        'gallery': 'galeria',
        '': '' // Para el index
    }
};

// 2. Autodetección inicial (Redirección automática)
(function() {
    if (window.location.protocol === 'file:') return;

    let userPref = localStorage.getItem('app_lang');
    if (!userPref) {
        const browserLang = navigator.language || navigator.userLanguage;
        userPref = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
        localStorage.setItem('app_lang', userPref);
    }

    // Usamos la misma función robusta de abajo para redirigir si es necesario
    const path = window.location.pathname;
    const isEnPage = path.includes('/en');

    if (userPref === 'en' && !isEnPage) {
        switchLanguage('en', true);
    } else if (userPref === 'es' && isEnPage) {
        switchLanguage('es', true);
    }
})();

// 3. Función del botón del Menú (Súper robusta)
function switchLanguage(lang, isAuto = false) {
    if (!isAuto) localStorage.setItem('app_lang', lang);
    
    // Obtenemos la ruta actual dividida en partes
    let currentPath = window.location.pathname;
    let segments = currentPath.split('/');
    
    // Sacamos el último pedazo (el nombre del archivo)
    let filename = segments.pop() || ''; 

    if (lang === 'en') {
        // Si no estamos ya en la carpeta EN
        if (!segments.includes('en')) {
            // Buscamos la traducción, si no existe, dejamos el mismo nombre (ej. index.html)
            let translatedFile = translations['es-en'][filename] || filename;
            
            // Agregamos la carpeta 'en' y el archivo traducido
            segments.push('en');
            segments.push(translatedFile);
            
            window.location.href = segments.join('/');
        }
    } else {
        // Si queremos ir a Español y estamos dentro de EN
        if (segments.includes('en')) {
            // Buscamos la traducción
            let translatedFile = translations['en-es'][filename] || filename;
            
            // Borramos la carpeta 'en' de la ruta
            segments = segments.filter(folder => folder !== 'en');
            
            // Agregamos el archivo en español
            segments.push(translatedFile);
            
            window.location.href = segments.join('/');
        }
    }
}