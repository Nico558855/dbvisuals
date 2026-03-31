document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Tracking Hover Glow Effect im Hintergrund
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMouseMoving = false;

    // Start with glow visible only after first mouse movement
    document.addEventListener('mousemove', (e) => {
        if(!isMouseMoving) {
            cursorGlow.style.opacity = '1';
            isMouseMoving = true;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth animation loop für den Hintergrund-Glow
    function animateGlow() {
        // Lineare Interpolation für einen weichen Folge-Effekt
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 2. 3D Tilt Effekt für die Social Media und Service Karten
    const cards = document.querySelectorAll('.social-card, .service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Position der Maus innerhalb der Karte
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Mitte der Karte
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Berechnung der Rotation (max 10 Grad)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            // Styling anwenden
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Zurücksetzen der Karte wenn die Maus das Element verlässt
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
        });
    });
});
