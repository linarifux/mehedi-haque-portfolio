# 🎨 Mehedi Haque - Digital Archive & Portfolio

> The official digital archive for Mehedi Haque, Senior Cartoonist at *New Age*, Executive Editor of *Unmad*, and Founder of *Dhaka Comics*.

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 Overview

This project is a bespoke portfolio and archival solution designed to showcase decades of artistic work. It moves beyond a standard gallery by implementing a robust tagging and categorization system, allowing visitors to explore the artist's evolution across political cartoons, comic books, and character designs.

**Live Demo:** [Link to Vercel/Netlify Deployment]

## ✨ Key Features

- **Dynamic Art Archive:** High-performance masonry grid layout for viewing hundreds of artworks.
- **Advanced Filtering:** Filter artworks by Category (Satire, Comics, Sketches), Publication, or Year using Redux state management.
- **Immersive Lightbox:** A custom viewing experience for comic strips and detailed illustrations.
- **CMS / Admin Panel:** A secure dashboard for the artist to upload, tag, and manage their portfolio content without touching code.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

### Client Side
- **Framework:** [React.js](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

### Server Side
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Image Storage:** [Cloudinary](https://cloudinary.com/) (Recommended for image optimization)

## 📂 Project Structure

```bash
mehedi-haque-portfolio/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable shadcn components
│   │   ├── features/      # Redux slices (gallery, auth)
│   │   ├── pages/         # Archive, Bio, Contact, Admin
│   │   └── utils/         # Helper functions
│   └── ...
├── server/                # Express Backend
│   ├── config/            # DB connection
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── ...
└── README.md