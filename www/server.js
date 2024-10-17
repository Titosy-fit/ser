// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Pour lire les données JSON dans les requêtes
app.use(express.json());

// Endpoint pour sauvegarder une commande
app.post('/api/commande', (req, res) => {
    const commande = req.body;
    fs.readFile('commandes.json', 'utf-8', (err, data) => {
        const commandes = data ? JSON.parse(data) : [];
        commandes.push(commande);
        fs.writeFile('commandes.json', JSON.stringify(commandes), (err) => {
            if (err) return res.status(500).json({ error: "Erreur d'écriture dans le fichier" });
            res.json({ message: 'Commande sauvegardée' });
        });
    });
});

// Endpoint pour récupérer toutes les commandes
app.get('/api/commandes', (req, res) => {
    fs.readFile('commandes.json', 'utf-8', (err, data) => {
        const commandes = data ? JSON.parse(data) : [];
        res.json(commandes);
    });
});

// Endpoint pour sauvegarder un commentaire
app.post('/api/commentaire', (req, res) => {
    const commentaire = req.body;
    fs.readFile('commentaires.json', 'utf-8', (err, data) => {
        const commentaires = data ? JSON.parse(data) : [];
        commentaires.push(commentaire);
        fs.writeFile('commentaires.json', JSON.stringify(commentaires), (err) => {
            if (err) return res.status(500).json({ error: "Erreur d'écriture dans le fichier" });
            res.json({ message: 'Commentaire sauvegardé' });
        });
    });
});

// Endpoint pour récupérer tous les commentaires
app.get('/api/commentaires', (req, res) => {
    fs.readFile('commentaires.json', 'utf-8', (err, data) => {
        const commentaires = data ? JSON.parse(data) : [];
        res.json(commentaires);
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
