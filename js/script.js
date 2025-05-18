document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth scrolling for anchor links (from index.html navbar) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a same-page anchor and not just '#' or to another page
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Toast notification system ---
    function showToast(message, type = 'success') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Add to container
        toastContainer.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Contact Form (on index.html) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add validation feedback elements
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'invalid-feedback';
            feedbackDiv.textContent = `Please provide a valid ${input.placeholder || 'value'}.`;
            input.parentNode.appendChild(feedbackDiv);

            // Add input validation
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                } else {
                    this.classList.add('is-invalid');
                }
            });
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for this demo

            // Check form validity
            if (!this.checkValidity()) {
                event.stopPropagation();
                inputs.forEach(input => {
                    if (!input.checkValidity()) {
                        input.classList.add('is-invalid');
                    }
                });
                return;
            }

            const name = document.getElementById('contactName').value;
            showToast(`Thank you for your message, ${name}! (This is a demo, no data was sent).`);
            this.reset(); // Clear the form

            // Remove any validation classes
            inputs.forEach(input => input.classList.remove('is-invalid'));
        });
    }

    // --- Skill Tracker Functionality (for skills.html) ---
    const addSkillForm = document.getElementById('addSkillForm');
    const skillListDiv = document.getElementById('skillList');
    const noSkillsMessage = document.getElementById('noSkillsMessage');
    const skillsStorageKey = 'myTrackedSkillsPortfolioExam'; // Unique key

    // This function loads skills from local storage and displays them.
    function loadAndDisplaySkills() {
        if (!skillListDiv) return; // Only run if on skills.html

        try {
            const skills = JSON.parse(localStorage.getItem(skillsStorageKey)) || [];
            skillListDiv.innerHTML = ''; // Clear current list

            if (skills.length === 0) {
                if (noSkillsMessage) {
                    noSkillsMessage.style.display = 'block';
                } else { // Fallback if noSkillsMessage element was removed for some reason
                    const p = document.createElement('p');
                    p.className = 'list-group-item text-muted';
                    p.textContent = 'No skills tracked yet. Use the form above to add some!';
                    skillListDiv.appendChild(p);
                }
                return;
            }

            if (noSkillsMessage) {
                noSkillsMessage.style.display = 'none'; // Hide the default message
            }

            skills.forEach((skill, index) => {
                const skillElement = document.createElement('div');
                skillElement.className = 'list-group-item skill-item';
                skillElement.innerHTML = `
                    <div>
                        <strong>${escapeHTML(skill.name)}</strong> - Proficiency: ${escapeHTML(skill.level.toString())}/5
                    </div>
                    <button class="btn btn-sm btn-outline-danger remove-skill-btn" data-index="${index}"
                            aria-label="Remove ${escapeHTML(skill.name)}">
                        Remove
                    </button>
                `;
                skillListDiv.appendChild(skillElement);
            });

            // Add event listeners to newly created remove buttons
            document.querySelectorAll('.remove-skill-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const indexToRemove = parseInt(this.dataset.index);
                    removeSkill(indexToRemove);
                });
            });
        } catch (error) {
            console.error('Error loading skills:', error);
            showToast('Error loading skills. Please try refreshing the page.', 'error');
        }
    }

    // This function adds a new skill to local storage.
    function addNewSkill(name, level) {
        try {
            const skills = JSON.parse(localStorage.getItem(skillsStorageKey)) || [];
            skills.push({ name, level });
            localStorage.setItem(skillsStorageKey, JSON.stringify(skills));
            loadAndDisplaySkills(); // Refresh the displayed list
            showToast(`Skill "${name}" added successfully!`);
        } catch (error) {
            console.error('Error adding skill:', error);
            showToast('Error adding skill. Please try again.', 'error');
        }
    }

    // This function removes a skill from local storage.
    function removeSkill(index) {
        try {
            let skills = JSON.parse(localStorage.getItem(skillsStorageKey)) || [];
            const removedSkill = skills[index];
            skills.splice(index, 1); // Remove skill at given index
            localStorage.setItem(skillsStorageKey, JSON.stringify(skills));
            loadAndDisplaySkills(); // Refresh the displayed list
            showToast(`Skill "${removedSkill.name}" removed successfully!`);
        } catch (error) {
            console.error('Error removing skill:', error);
            showToast('Error removing skill. Please try again.', 'error');
        }
    }

    // Helper function to prevent XSS
    function escapeHTML(str) {
        if (typeof str !== 'string') str = String(str); // Ensure it's a string
        return str.replace(/[&<>"']/g, function (match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }

    // Check if localStorage is available
    function isLocalStorageAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Event listener for the add skill form
    if (addSkillForm) {
        // Add validation feedback elements
        const skillNameInput = document.getElementById('skillName');
        const skillLevelInput = document.getElementById('skillLevel');

        [skillNameInput, skillLevelInput].forEach(input => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'invalid-feedback';

            if (input.id === 'skillName') {
                feedbackDiv.textContent = 'Please enter a valid skill name.';
            } else {
                feedbackDiv.textContent = 'Please enter a proficiency level between 1 and 5.';
            }

            input.parentNode.appendChild(feedbackDiv);

            // Add input validation
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                }
            });
        });

        addSkillForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = skillNameInput.value.trim();
            const level = parseInt(skillLevelInput.value);

            let isValid = true;

            // Validate skill name
            if (!name) {
                skillNameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                skillNameInput.classList.remove('is-invalid');
            }

            // Validate skill level
            if (isNaN(level) || level < 1 || level > 5) {
                skillLevelInput.classList.add('is-invalid');
                isValid = false;
            } else {
                skillLevelInput.classList.remove('is-invalid');
            }

            if (isValid) {
                if (isLocalStorageAvailable()) {
                    addNewSkill(name, level);
                    addSkillForm.reset(); // Clear form fields
                    skillNameInput.focus(); // Focus back on skill name for easy next entry
                } else {
                    showToast('Local storage is not available in your browser.', 'error');
                }
            }
        });
    }

    // Set current year in footer copyright
    const footerYearElements = document.querySelectorAll('.copyright-year');
    if (footerYearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        footerYearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // Initial load of skills when the skills.html page is ready
    if (skillListDiv) { // This implies we are on skills.html
        if (isLocalStorageAvailable()) {
            loadAndDisplaySkills();
        } else {
            showToast('Local storage is not available in your browser.', 'error');
            if (noSkillsMessage) {
                noSkillsMessage.textContent = 'Skill tracking requires local storage, which is not available in your browser.';
            }
        }
    }
});
