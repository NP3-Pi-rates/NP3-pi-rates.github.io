document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburgerButton = document.querySelector('.hamburger-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    hamburgerButton.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!hamburgerMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
        }
    });

    // Load announcements
    async function loadAnnouncements() {
        try {
            const response = await fetch('announcement-holder.txt');
            const text = await response.text();
            const announcements = text.split('\n\n');

            const announcementsContainer = document.querySelector('.announcements-scroll');
            announcements.forEach(announcement => {
                const div = document.createElement('div');
                div.className = 'announcement';
                div.textContent = announcement;
                announcementsContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Error loading announcements:', error);
        }
    }

    loadAnnouncements();
}); 