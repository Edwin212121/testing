# Interactive Portfolio Website

An interactive and responsive portfolio website to showcase your projects in a professional and visually appealing layout.

## Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Interactive Project Cards**: Engaging project displays with animations and details
- **Project Modal**: Detailed project information in an accessible modal window
- **Smooth Animations**: Subtle animations enhance the user experience
- **Contact Form**: Interactive form with validation for visitor inquiries
- **Customizable**: Easy to personalize with your own projects and information

## Getting Started

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code, Sublime Text, etc.)
- Node.js and npm (for development environment)

### Installation

1. Clone or download this repository
2. Navigate to the project folder in your terminal
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and visit `http://localhost:8080`

## Customization Guide

### Personal Information

Edit the `src/index.html` file to update:
- Your name and title
- About Me section
- Skills and expertise
- Contact information

### Project Showcase

Update the project data in `data/projects.json`:
- Project titles and descriptions
- Technologies used
- Project images (replace placeholder URLs)
- Live demo and code repository links

### Styling

Customize the styling by modifying:
- `src/css/style.css` for general styling
- `src/css/layout.css` for layout structure
- `src/css/animations.css` for animation effects

### Colors and Theme

Modify the CSS variables in `src/css/style.css` to change the color scheme:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
  /* Other variables */
}
```

## Deployment

To build the project for production:

```
npm run build
```

This will create a `dist` directory with all necessary files. You can deploy this folder to any static site hosting service like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## File Structure

```
portfolio-website/
├── public/                  # Static assets
│   ├── assets/              # Images, icons, etc.
│   └── favicon.svg          # Site favicon
├── src/                     # Source files
│   ├── css/                 # CSS stylesheets
│   │   ├── style.css        # Main styles
│   │   ├── layout.css       # Layout styles
│   │   └── animations.css   # Animation styles
│   ├── js/                  # JavaScript files
│   │   ├── main.js          # Main functionality
│   │   ├── animations.js    # Animation scripts
│   │   └── projects.js      # Project loading/display
│   └── index.html           # Main HTML file
├── data/                    # Data files
│   └── projects.json        # Project information
├── package.json             # Project configuration
└── README.md                # Project documentation
```

## Browser Compatibility

This portfolio website is compatible with:
- Google Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Placeholder.com for placeholder images