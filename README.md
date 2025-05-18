# Web Developer Portfolio

A responsive web developer portfolio website created using HTML5, CSS3, JavaScript, and Bootstrap.

## Project Overview

This project was created as part of a final exam to demonstrate web development skills.

## Features

- Responsive design that works on all devices
- Interactive project filtering
- Contact form with local storage
- Google Maps integration
- SVG graphics
- CSS animations and transitions
- Bootstrap grid system
- JavaScript functionality

## Technologies Used

- **HTML5**: Semantic markup, forms, iframes, SVG
- **CSS3**: Flexbox, media queries, animations, custom properties
- **JavaScript**: DOM manipulation, event handling, local storage
- **Bootstrap 5**: Grid system, components, utilities
- **jQuery**: (Optional) DOM manipulation
- **Font Awesome**: Icons

## Project Structure
```
portfolio-exam/
├── index.html
├── README.md
├── skills.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Requirements Fulfilled

### Skill Tracker (Local Storage)

The skill tracker uses local storage to save and manage skills. Here's how it works:

    The implementation uses a unique storage key to avoid conflicts:

js/script.js

const skillsStorageKey = 'myTrackedSkillsPortfolioExam'; // Unique key

    When adding a skill, it:
        Retrieves existing skills from local storage
        Adds the new skill to the array
        Saves the updated array back to local storage

js/script.js

function addNewSkill(name, level) {
    const skills = JSON.parse(localStorage.getItem(skillsStorageKey)) || [];
    skills.push({ name, level });
    localStorage.setItem(skillsStorageKey, JSON.stringify(skills));
    loadAndDisplaySkills(); // Refresh the displayed list
}

    When removing a skill, it:
        Retrieves the skills array
        Removes the skill at the specified index
        Saves the updated array back to storage

js/script.js

function removeSkill(index) {
    let skills = JSON.parse(localStorage.getItem(skillsStorageKey)) || [];
    skills.splice(index, 1); // Remove skill at given index
    localStorage.setItem(skillsStorageKey, JSON.stringify(skills));
    loadAndDisplaySkills(); // Refresh the displayed list
}

    The skills are loaded and displayed when the page loads:

js/script.js

if (skillListDiv) { // This implies we are on skills.html
    loadAndDisplaySkills();
}

The implementation includes proper escaping of HTML content to prevent XSS attacks when displaying the skills.

### HTML

- HTML5 skeleton with proper document structure
- Semantic headings (h1, h2, h3)
- Contact form with validation
- Meta tags (author, keywords, description)
- External CSS linkage
- Google Maps iframe
- SVG icon in the navbar
- Hyperlinks and anchor navigation

### CSS

- Media queries for responsive design
- Flexbox layout in multiple sections
- Custom animations and transitions
- External stylesheet

### JavaScript

- Project filtering functionality
- Form validation
- Local storage for saving form data
- Smooth scrolling
- Dynamic project loading

### Bootstrap

- Grid system for layout
- Responsive navigation
- Cards, buttons, and other components

## How to Run Locally

1. Clone this repository
2. Open the project folder in your code editor
3. Start a local server (you can use Live Server in VS Code, or run `npx http-server`)
4. Open your browser and navigate to the local server address (typically [Local Server Address](http://localhost:8080))

## Publishing with FTP

To publish this website using FTP (File Transfer Protocol), follow these steps:

1. **Download and Install FileZilla**:
   - Go to [FileZilla's website](https://filezilla-project.org/) and download the client version
   - Install the application on your computer

2. **Gather FTP Credentials**:
   - You'll need the following information from your hosting provider:
     - Host address (e.g., ftp.yourdomain.com)
     - Username
     - Password
     - Port (usually 21 for FTP)

3. **Connect to Your Server**:
   - Open FileZilla
   - Enter your FTP credentials in the quickconnect bar at the top
   - Click "Quickconnect" to establish a connection

4. **Navigate to the Correct Directory**:
   - In the right panel (remote site), navigate to the directory where you want to upload your website
   - This is typically the public_html, www, or httpdocs folder

5. **Upload Your Files**:
   - In the left panel (local site), navigate to your project folder
   - Select all files and folders
   - Right-click and select "Upload" or drag the files to the right panel

6. **Verify Your Upload**:
   - Check that all files have been uploaded correctly
   - Visit your website URL to make sure everything is working properly

7. **Troubleshooting**:
   - If your website doesn't appear correctly, check the file permissions
   - HTML, CSS, and JavaScript files typically need 644 permissions
   - Directories typically need 755 permissions

## SEO Considerations

This website includes several SEO best practices:

1. **Meta Tags**: Proper meta description and keywords
2. **Semantic HTML**: Using appropriate HTML5 elements
3. **Mobile Responsiveness**: Ensuring the site works well on all devices
4. **Fast Loading**: Optimized images and minimal dependencies
5. **Descriptive Alt Text**: For all images

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Remzi Nura - [hi@remzinura.com](mailto:hi@remzinura.com)

---

*This project was created as part of a web development final exam holded by ICT Academy [ictkosovo.eu](https://ictkosovo.eu/).*
