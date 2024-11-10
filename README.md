# Portfolio Website

A modern, interactive portfolio website built with Next.js, Three.js, and Framer Motion. Features a dynamic 3D background, skill visualization, and responsive design.

## 🌟 Features

- Interactive 3D background animations using Three.js
- Smooth page transitions and animations with Framer Motion
- Dynamic skill visualization with interactive orbit system
- Responsive design for all devices
- Custom cursor implementation
- Dock-style navigation menu
- Project showcase with hover effects
- Contact form with availability status
- Dark theme optimized

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** Framer Motion, GSAP
- **Typography:** Custom fonts (Geist Sans, Geist Mono, Arcade)
- **Icons:** React Icons
- **Type Checking:** TypeScript

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/UknesStudio/portfolio.git
```

2. Install dependencies:
```bash
cd portfolio
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── app/                  # Next.js app directory
├── components/          # React components
├── public/             # Static assets
└── styles/            # Global styles
```

## 🎨 Key Components

- **Scene.tsx**: 3D background animation
- **SkillsOrbit.tsx**: Interactive skill visualization
- **ProjectCard.tsx**: Project showcase cards
- **DockMenu.tsx**: macOS-style dock navigation
- **ScrollProgress.tsx**: Page scroll progress indicator

## 🔧 Configuration

The project uses various configuration files:

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy

## 📝 Environment Variables

Create a `.env.local` file in the root directory:


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- **Rayane Makrane**
- LinkedIn: [Rayane Makrane](https://www.linkedin.com/in/rayane-makrane-a16377293/)
- GitHub: [@UknesStudio](https://github.com/UknesStudio)

## 🙏 Acknowledgments

- Three.js for 3D graphics
- Framer Motion for animations