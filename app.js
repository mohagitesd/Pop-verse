let currentAudio = null;

function toggleMusic(button, musicSource) {
  const icon = button.querySelector(".music-icon");
  const column = button.closest(".column"); // Récupérer la colonne parente

  // Si une musique est en cours de lecture
  if (currentAudio) {
    // On arrête la musique
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;

    // On réinitialise tous les boutons
    document.querySelectorAll(".music-button").forEach((btn) => {
      btn.querySelector(".music-icon").textContent = "🔇";
      btn.classList.remove("playing");
    });

    return;
  }

  // Si aucune musique ne joue, on démarre la nouvelle
  currentAudio = new Audio(musicSource);
  currentAudio.loop = true;
  currentAudio.play();
  icon.textContent = "🔊";
  button.classList.add("playing");

  // Ajouter l'écouteur d'événement pour arrêter la musique quand on quitte la colonne
  column.addEventListener("mouseleave", () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
      icon.textContent = "🔇";
      button.classList.remove("playing");
    }
  });
}

// Arrêter la musique quand on ferme l'onglet/la page
window.onbeforeunload = function () {
  if (currentAudio) {
    currentAudio.pause();
  }
};
