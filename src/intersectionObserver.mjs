// Wacht tot DOM geladen is (basisstructuur exclusief afbeeldingen, videos, stylesheets, ...)
document.addEventListener('DOMContentLoaded', () => {
    // Selecteer alle afbeeldingen
    const images = document.querySelectorAll('img.lazy-img');
    
    // Configuratie voor de IntersectionObserver
    const options = {
      // Laad afbeeldingen wanneer ze binnen 200px van de viewport komen
      rootMargin: '200px 0px',
      // Threshold van 0.1 betekent dat de afbeelding wordt geladen wanneer ten minste 10% ervan zichtbaar is
      threshold: 0.1
    };
    
    // Functie die wordt uitgevoerd wanneer een afbeelding in beeld komt
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        // Controleer of het element in beeld is
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Haal de URL op van het data-src attribuut
          const src = img.dataset.src;
          
          // Zet data-src om naar de echte src om het laden te starten
          img.src = src;

          img.classList.remove('lazy-img');
          
          // Voeg een event listener toe om te detecteren wanneer de afbeelding geladen is
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          // Stop met observeren van deze afbeelding
          observer.unobserve(img);
        }
      });
    };
    
    // Maak een nieuwe IntersectionObserver aan
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Begin met het observeren van elke lazy-load afbeelding
    images.forEach(image => {
      observer.observe(image);
    });
  });

