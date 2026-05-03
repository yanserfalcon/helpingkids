// js/language.js

(function() {
    // ESCUDO PROTECTOR: Si estamos abriendo el archivo doble clic en la PC, no hacer nada.
    if (window.location.protocol === 'file:') {
        console.log("Modo de desarrollo local: Redirección de idiomas desactivada para evitar errores.");
        return; 
    }

    // 1. Saber en qué página estamos actualmente
    const currentPath = window.location.pathname;
    const isEnglishPage = currentPath.startsWith('/en');

    // 2. Revisar si el usuario ya eligió un idioma antes (memoria)
    let userPref = localStorage.getItem('app_lang');

    // 3. Si es su primera visita, detectamos el idioma
    if (!userPref) {
        const browserLang = navigator.language || navigator.userLanguage;
        // Si el navegador empieza con 'es', asignamos español. Si no, forzamos inglés.
        userPref = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en';
        localStorage.setItem('app_lang', userPref);
    }

    // 4. Redirigir si el idioma preferido NO coincide con la página actual
    if (userPref === 'en' && !isEnglishPage) {
        window.location.replace('/en' + currentPath);
    } 
    else if (userPref === 'es' && isEnglishPage) {
        const newPath = currentPath.replace(/^\/en/, '') || '/';
        window.location.replace(newPath);
    }
})();

// Función que se ejecutará cuando el usuario haga clic en el botón del menú

// Función que se ejecutará cuando el usuario haga clic en el botón del menú
function switchLanguage(targetLang) {
    localStorage.setItem('app_lang', targetLang);
    
    // Si estamos en la PC, cancelamos la redirección silenciosamente
    if (window.location.protocol === 'file:') {
        console.log("Cambio de idioma simulado a: " + targetLang);
        return;
    }

    let currentPath = window.location.pathname;
    
    if (targetLang === 'en') {
        // Solo agregar /en si NO estamos ya dentro de la carpeta de inglés
        if (!currentPath.startsWith('/en')) {
            // Si la ruta es la raíz "/", la limpiamos para no tener "/en//"
            let cleanPath = currentPath === '/' ? '' : currentPath;
            window.location.href = '/en' + cleanPath;
        }
    } else {
        // Quitar /en de la ruta para volver a español
        const newPath = currentPath.replace(/^\/en/, '') || '/';
        window.location.href = newPath;
    }
}