function addComment() {
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');

        const today = new Date();
        const date = `${today.getDate()} ${today.toLocaleString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;

        newComment.innerHTML = `
            <div class="comment-header">
                <h4>Client Anonyme</h4>
                <span class="date">${date}</span>
            </div>
            <p>${commentText}</p>
        `;

        commentList.prepend(newComment); // Ajoute le commentaire en haut de la liste
        commentInput.value = ''; // Vide le champ de saisie
    } else {
        alert('Veuillez entrer un commentaire.');
    }
}
function saveCommentaire(commentaire) {
    fetch('http://localhost:3000/api/commentaire', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentaire)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Erreur:', error));
}