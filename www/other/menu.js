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

