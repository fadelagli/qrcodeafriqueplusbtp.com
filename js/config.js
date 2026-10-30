/* =====================================================
   CONFIGURATION : c'est ICI que vous ajoutez vos médias.
   Aucun autre fichier à toucher pour changer les vidéos
   ou les catalogues.
   ===================================================== */
window.SITE_CONFIG = {

  /* CARROUSEL 3D VIDEO (haut de page)
     - Exportez en MP4 H.264, 1920x1080, 8-12 Mbit/s, sans son ou avec son.
     - webm est optionnel (meilleure qualité/poids sur Chrome/Android).
     - Ajoutez autant de vidéos que vous voulez : copiez un bloc { ... }, */
  videos: [
    { src: "videos/video-1.mp4", webm: "", poster: "images/poster-1.jpg",
      title: "Nos réalisations", caption: "Lomé, Togo" },
    { src: "videos/video-2.mp4", webm: "", poster: "images/poster-2.jpg",
      title: "ADEBISSI DREAM HOUSE", caption: "Villas pour le Togo et la diaspora" },
    { src: "videos/video-3.mp4", webm: "", poster: "images/poster-3.jpg",
      title: "NOS PROJETS", caption: "Découvrez notre expertise" }
  ],

  /* CARROUSEL CATALOGUES
     - cover : 1re photo du catalogue (affichée en carte)
     - photos : (optionnel) autres photos qui défilent sur la carte
     - pdf : fichier dans le dossier /catalogues
     Ajoutez autant de catalogues que vous voulez. */
  catalogues: [
    { title: "Villas Dream House", tag: "Immobilier",
      cover: "images/cat-1.jpg", photos: ["images/cat-1b.jpg","images/cat-1c.jpg"],
      pdf: "catalogues/catalogue-villas.pdf" },
    { title: "Bâtiment & Travaux publics", tag: "BTP",
      cover: "images/cat-2.jpg", photos: ["images/cat-2b.jpg","images/cat-2c.jpg"],
      pdf: "catalogues/catalogue-btp.pdf" },
    { title: "Réalisations", tag: "Portfolio",
      cover: "images/cat-3.png", photos: ["images/cat-3b.jpg"],
      pdf: "catalogues/catalogue-realisations.pdf" }
  ]
};
