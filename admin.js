document.addEventListener('DOMContentLoaded', function () {
    const guideForm = document.getElementById('guide-form');
    const guideIdInput = document.getElementById('guide-id');
    const nameInput = document.getElementById('name');
    const tagsInput = document.getElementById('tags');
    const guideLinkInput = document.getElementById('guideLink');
    const practiceLinksContainer = document.getElementById('practice-links-container');
    const addPracticeLinkButton = document.getElementById('add-practice-link');
    const extraHelpLinksContainer = document.getElementById('extra-help-links-container');
    const addExtraHelpLinkButton = document.getElementById('add-extra-help-link');
    const saveGuideButton = guideForm.querySelector('button[type="submit"]');
    const cancelEditButton = document.getElementById('cancel-edit');
    const adminTableBody = document.getElementById('admin-table-body');
    const downloadJsonButton = document.getElementById('download-json');
    const jsonDownloadStatus = document.getElementById('json-download-status');

    let currentGuidesData = [];
    let editingGuideId = null;

    loadGuides();

    function loadGuides() {
        fetch('guides.json')
            .then(response => response.json())
            .then(data => {
                currentGuidesData = data;
                renderGuideTable(data);
            })
            .catch(error => console.error('Error loading guides:', error));
    }

    function renderGuideTable(guides) {
        adminTableBody.innerHTML = '';
        guides.forEach(guide => {
            const row = adminTableBody.insertRow();
            row.innerHTML = `
                <td>${guide.name}</td>
                <td>${guide.tags.join(', ')}</td>
                <td>
                    <button class="edit-button" data-id="${guides.indexOf(guide)}">Edit</button>
                    <button class="delete-button" data-id="${guides.indexOf(guide)}">Delete</button>
                </td>
            `;
        });

        addTableButtonListeners();
    }

    function addTableButtonListeners() {
        adminTableBody.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                editingGuideId = parseInt(this.dataset.id);
                const guideToEdit = currentGuidesData[editingGuideId];
                guideIdInput.value = editingGuideId;
                nameInput.value = guideToEdit.name;
                tagsInput.value = guideToEdit.tags.join(', ');
                // Remove the 'guides/' prefix when populating the input for editing
                guideLinkInput.value = guideToEdit.guideLink.startsWith('./guide-files/') 
    ? guideToEdit.guideLink.substring('./guide-files/'.length) 
    : guideToEdit.guideLink;


                // Populate practice links
                practiceLinksContainer.innerHTML = '';
                guideToEdit.practiceLinks.forEach(addPracticeLinkInput);

                // Populate extra help links
                extraHelpLinksContainer.innerHTML = '';
                guideToEdit.extraHelpLinks.forEach(addExtraHelpLinkInput);

                saveGuideButton.textContent = 'Update Guide';
                cancelEditButton.style.display = 'inline-block';
            });
        });

        adminTableBody.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const idToDelete = parseInt(this.dataset.id);
                if (confirm('Are you sure you want to delete this guide?')) {
                    currentGuidesData.splice(idToDelete, 1);
                    renderGuideTable(currentGuidesData);
                }
            });
        });
    }

    cancelEditButton.addEventListener('click', function () {
        editingGuideId = null;
        guideIdInput.value = '';
        nameInput.value = '';
        tagsInput.value = '';
        guideLinkInput.value = '';
        practiceLinksContainer.innerHTML = '';
        extraHelpLinksContainer.innerHTML = '';
        addPracticeLinkButton.click(); // Add one default input
        addExtraHelpLinkButton.click(); // Add one default input
        saveGuideButton.textContent = 'Save Guide';
        cancelEditButton.style.display = 'none';
    });

    guideForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const practiceLinks = Array.from(practiceLinksContainer.querySelectorAll('.practice-link-group'))
            .map(group => ({
                name: group.querySelector('.practice-name').value,
                link: group.querySelector('.practice-link').value
            }));

        const extraHelpLinks = Array.from(extraHelpLinksContainer.querySelectorAll('.extra-help-link-group'))
            .map(group => ({
                name: group.querySelector('.extra-help-name').value,
                link: group.querySelector('.extra-help-link').value
            }));

        const guideData = {
            name: nameInput.value,
            tags: tagsInput.value.split(',').map(tag => tag.trim()),
            // Construct the guideLink here
            guideLink: `./guide-files/${guideLinkInput.value}`,
            practiceLinks: practiceLinks,
            extraHelpLinks: extraHelpLinks
        };

        if (editingGuideId !== null) {
            currentGuidesData[editingGuideId] = guideData;
        } else {
            currentGuidesData.push(guideData);
        }

        renderGuideTable(currentGuidesData);
        // Reset the form
        editingGuideId = null;
        guideIdInput.value = '';
        nameInput.value = '';
        tagsInput.value = '';
        guideLinkInput.value = '';
        practiceLinksContainer.innerHTML = '';
        extraHelpLinksContainer.innerHTML = '';
        addPracticeLinkButton.click(); // Add one default input
        addExtraHelpLinkButton.click(); // Add one default input
        saveGuideButton.textContent = 'Save Guide';
        cancelEditButton.style.display = 'none';
    });

    downloadJsonButton.addEventListener('click', function () {
        const jsonString = JSON.stringify(currentGuidesData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guides.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        jsonDownloadStatus.textContent = 'guides.json downloaded. Manually replace the file in your repository.';
    });

    addPracticeLinkButton.addEventListener('click', addPracticeLinkInput);
    addExtraHelpLinkButton.addEventListener('click', addExtraHelpLinkInput);

    function addPracticeLinkInput(linkData) {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('practice-link-group');
        linkDiv.innerHTML = `
            <label>Name:</label>
            <input type="text" class="practice-name" value="${linkData ? linkData.name : ''}">
            <label>URL:</label>
            <input type="text" class="practice-link" value="${linkData ? linkData.link : ''}">
            <button type="button" class="remove-practice-link">Remove</button>
        `;
        practiceLinksContainer.appendChild(linkDiv);

        linkDiv.querySelector('.remove-practice-link').addEventListener('click', () => {
            linkDiv.remove();
        });
    }

    function addExtraHelpLinkInput(linkData) {
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('extra-help-link-group');
        linkDiv.innerHTML = `
            <label>Name:</label>
            <input type="text" class="extra-help-name" value="${linkData ? linkData.name : ''}">
            <label>URL:</label>
            <input type="text" class="extra-help-link" value="${linkData ? linkData.link : ''}">
            <button type="button" class="remove-extra-help-link">Remove</button>
        `;
        extraHelpLinksContainer.appendChild(linkDiv);

        linkDiv.querySelector('.remove-extra-help-link').addEventListener('click', () => {
            linkDiv.remove();
        });
    }
});