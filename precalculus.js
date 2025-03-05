document.addEventListener('DOMContentLoaded', () => {
    const chapters = document.querySelectorAll('.chapter');

    async function populateChapterTable(chapterNum) {
        const tableBody = document.getElementById(`chapter${chapterNum}-table-body`);
        if (!tableBody) return;

        try {
            const response = await fetch(`precalculus_ch${chapterNum}_guides.json`);
            const data = await response.json();

            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');

                const tagsCell = document.createElement('td');
                tagsCell.textContent = item.tags.join(', ');

                // Name column
                const nameCell = document.createElement('td');
                if (item.guideLink) {
                    const nameLink = document.createElement('a');
                    nameLink.textContent = item.name;
                    nameLink.href = item.guideLink;
                    nameLink.target = '_blank';
                    nameLink.className = 'guide-link';
                    nameCell.appendChild(nameLink);
                } else {
                    nameCell.textContent = item.name;
                }

                // Practice column
                const practiceCell = document.createElement('td');
                item.practiceLinks.forEach((linkData, index) => {
                    const practiceLink = document.createElement('a');
                    practiceLink.textContent = linkData.name;
                    practiceLink.href = linkData.link;
                    practiceLink.target = '_blank';
                    practiceLink.className = 'practice-link';
                    practiceCell.appendChild(practiceLink);
                    if (index < item.practiceLinks.length - 1) {
                        practiceCell.appendChild(document.createElement('br'));
                    }
                });

                // Extra Help column
                const extraHelpCell = document.createElement('td');
                item.extraHelpLinks.forEach((linkData, index) => {
                    const extraHelpLink = document.createElement('a');
                    extraHelpLink.textContent = linkData.name;
                    extraHelpLink.href = linkData.link;
                    extraHelpLink.target = '_blank';
                    extraHelpLink.className = 'help-link';
                    extraHelpCell.appendChild(extraHelpLink);
                    if (index < item.extraHelpLinks.length - 1) {
                        extraHelpCell.appendChild(document.createElement('br'));
                    }
                });

                row.appendChild(tagsCell);
                row.appendChild(nameCell);
                row.appendChild(practiceCell);
                row.appendChild(extraHelpCell);

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error(`Error loading chapter ${chapterNum} data:`, error);
        }
    }

    populateChapterTable(1);
    populateChapterTable(2);
    populateChapterTable(3);
    populateChapterTable(4);
    populateChapterTable(5);
    populateChapterTable(6);
    populateChapterTable(7);
    populateChapterTable(8);
    populateChapterTable(9);
    populateChapterTable(10);
    populateChapterTable(11);
    populateChapterTable(12);
    populateChapterTable(13);

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

    chapters.forEach(chapter => {
        const button = chapter.querySelector('.chapter-button');

        button.addEventListener('click', () => {
            chapter.classList.toggle('active');
        });
    });
}); 