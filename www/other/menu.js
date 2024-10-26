// function filterMenu() {
//     const searchBar = document.getElementById('searchBar');
//     const filter = searchBar.value.toLowerCase();
//     const menu = document.getElementById('menu');
//     const menuItems = menu.getElementsByClassName('menu-items');

//     for (let i = 0; i < menuItems.length; i++) {
//         const item = menuItems[i];
//         const textValue = item.textContent || item.innerText;
        
//         if (textValue.toLowerCase().indexOf(filter) > -1) {
//             item.style.display = "";
//         } else {
//             item.style.display = "none";
//         }
//     }
// }

function filterMenu() {
    const searchBar = document.getElementById('searchBar');
    const filter = searchBar.value.toLowerCase();
    const menu = document.getElementById('menu');
    const menuItems = menu.getElementsByClassName('menu-items');

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        const textValue = item.textContent || item.innerText;
        
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
}

// Ajout de la fonctionnalité de reconnaissance vocale
const voiceSearchButton = document.getElementById('voiceSearchButton');
const searchBar = document.getElementById('searchBar');

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR'; // Définit la langue en français
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    voiceSearchButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchBar.value = transcript; // Remplit la barre de recherche avec le texte transcrit
        filterMenu(); // Lance la fonction de filtrage avec le texte transcrit
    };

    recognition.onerror = (event) => {
        console.error('Erreur de reconnaissance vocale :', event.error);
    };
} else {
    console.error("L'API Web Speech n'est pas supportée par ce navigateur.");
}
