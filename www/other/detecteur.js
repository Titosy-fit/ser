let model;
let lastFaceDetectedTime = Date.now();

// Fonction pour vérifier les permissions caméra dans le navigateur
async function checkCameraPermissions() {
    try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        return true;
    } catch (error) {
        console.error("Accès à la caméra refusé ou non disponible.");
        return false;
    }
}

// Fonction pour configurer la caméra
async function setupCamera() {
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.style.display = 'none'; // Masquer la vidéo
    video.autoplay = true;
    document.body.appendChild(video);

    const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
    });
    video.srcObject = stream;
    await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(video);
    });
    return video;
}

// Fonction pour charger le modèle BlazeFace
async function loadModel() {
    try {
        model = await blazeface.load({
            modelUrl: '../asset/blazeface/model.json'
        });
        console.log('Modèle chargé avec succès');
    } catch (error) {
        console.error('Erreur lors du chargement du modèle :', error);
    }
}

// Fonction pour détecter les visages et vérifier l'inactivité
async function detect(video) {
    try {
        const predictions = await model.estimateFaces(video, false);
        if (predictions.length > 0) {
            lastFaceDetectedTime = Date.now(); // Réinitialiser le minuteur
            console.log('Visage détecté');
        }
        checkForInactivity(); // Vérifier l'inactivité
    } catch (error) {
        console.error('Erreur lors de la détection du visage :', error);
    }

    requestAnimationFrame(() => detect(video)); // Boucle de détection continue
}

// Vérifier l'inactivité et rediriger si nécessaire
function checkForInactivity() {
    const noFaceDetectedDuration = Date.now() - lastFaceDetectedTime;
    if (noFaceDetectedDuration > 5000) { // 10 secondes
        console.log('Redirection...');
        window.location.href = "../index.html"; // Redirection vers la page principale
    }
}

// Fonction principale pour initialiser la détection de visage
export async function initDetection() {
    const hasPermission = await checkCameraPermissions(); // Vérification des permissions

    if (!hasPermission) {
        console.error("Permission caméra refusée.");
        return;
    }

    const video = await setupCamera(); // Configurer la caméra
    await loadModel(); // Charger le modèle de détection
    detect(video); // Démarrer la détection
}

// Démarrer la détection lors du chargement de la page
document.addEventListener('DOMContentLoaded', initDetection);
