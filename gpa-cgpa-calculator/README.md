# GPA & CGPA Calculator for Engineering Students

A modern, responsive full-stack website for calculating GPA and CGPA specifically designed for engineering students. This application includes interactive features with a focus on animations and a polished user experience.

## Features

### User Interface
- **Modern Design**: Clean UI with sidebar and top navigation bar
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop
- **Theme Options**: Light, Dark, and Engineer Blue themes
- **Language Toggle**: Support for English and Hindi
- **Animated Elements**: Smooth transitions and animations throughout

### GPA Calculator
- Dynamic subject table with add/remove functionality
- Fields for subject name, grade (dropdown), and credit hours
- Real-time GPA calculation with animations
- Grade point reference popup (A+ = 10, A = 9, etc.)
- Data saved in localStorage automatically

### CGPA Calculator
- Dynamic semester inputs with add/remove functionality
- Fields for semester name, GPA, and credit hours
- Live CGPA calculation with animated progress bar
- Performance feedback based on CGPA score
- Data persistence using localStorage

### Advanced Features
- **Full-Stack Implementation**: Next.js with Netlify Functions
- **Backend Processing**: Server-side form handling for contact form
- **PDF Export**: Generate and download PDF reports of calculations
- **Animations**: Using Framer Motion for smooth transitions
- **Multilingual Support**: Complete English and Hindi translations
- **Dark Mode**: Smooth theme transitions with multiple theme options
- **Local Storage**: Save and restore calculator data automatically

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/gpa-cgpa-calculator.git
cd gpa-cgpa-calculator
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Netlify

This project is configured for easy deployment on Netlify:

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Select your repository
4. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## License

This project is licensed under the MIT License - see the LICENSE file for details.
