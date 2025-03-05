document.addEventListener('DOMContentLoaded', () => {
    const topics = document.querySelectorAll('.topic');

    async function populateTopicTable(topicId) {
        const tableBody = document.getElementById(topicId);
        if (!tableBody) return;

        try {
            const response = await fetch('guides.json');
            const data = await response.json();

            // Filter for Algebra 1 topics
            const topicData = data.filter(item =>
                item.tags.includes('Algebra 1') &&
                item.name.toLowerCase().includes(topicId.replace('-table-body', '').split('-')[0])
            );

            tableBody.innerHTML = '';

            topicData.forEach(item => {
                const row = document.createElement('tr');

                // Guide column
                const guideCell = document.createElement('td');
                if (item.guideLink) {
                    const guideLink = document.createElement('a');
                    guideLink.textContent = 'Guide';
                    guideLink.href = item.guideLink;
                    guideLink.target = '_blank';
                    guideLink.className = 'guide-link';
                    guideCell.appendChild(guideLink);
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

                row.appendChild(guideCell);
                row.appendChild(practiceCell);
                row.appendChild(extraHelpCell);

                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error(`Error loading topic ${topicId} data:`, error);
        }
    }

    populateTopicTable('factoring-trinomials-table-body');
    populateTopicTable('multiplying-binomials-table-body');
    populateTopicTable('linear-function-basics-table-body');
    populateTopicTable('graphing-equations-table-body');
    populateTopicTable('points-table-table-body');
    populateTopicTable('systems-equations-table-body');
    populateTopicTable('exponent-properties-table-body');

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

    topics.forEach(topic => {
        const button = topic.querySelector('.topic-button');

        button.addEventListener('click', () => {
            topic.classList.toggle('active');
        });
    });
}); 