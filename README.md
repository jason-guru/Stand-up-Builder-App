# Stand-Up Builder (Impact-First) 🚀

A modern, intuitive web application designed to help teams create structured, impact-focused stand-up updates. Built with React, TypeScript, and Tailwind CSS.

![Stand-Up Builder App](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.1.4-purple?logo=vite)

## ✨ Features

### 📝 **Structured Stand-Up Format**
- **Yesterday**: Past-tense accomplishments with impact
- **Today**: Present-continuous tasks with expected outcomes  
- **Blockers**: Dependencies and risks with workarounds

### 🎯 **Smart Verb Selection**
- **40+ Action Verbs** organized by category:
  - **Technical**: Resolved, Optimized, Implemented, Automated...
  - **Collaboration**: Guided, Mentored, Facilitated, Coordinated...
  - **Leadership**: Proposed, Initiated, Championed, Prioritized...
  - **Innovation**: Identified, Explored, Designed, Prototyped...

### 🤖 **Intelligent Verb Conjugation**
- Automatically converts verbs to appropriate tense:
  - Yesterday: Past tense ("Resolved", "Implemented")
  - Today: Present continuous ("Resolving", "Implementing")

### 💡 **Impact-First Formula**
- **Yesterday**: `[Verb] + [what you did] → [impact]`
- **Today**: `[Verb-ing] + [task] → [expected outcome]`
- **Blockers**: `[Need/Waiting] → [risk/workaround]`

### 🔧 **User Experience**
- **Live Preview** with formatted output
- **One-Click Copy** to clipboard
- **Add/Remove** items dynamically
- **Notes Section** for additional context
- **Responsive Design** for all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jason-guru/Stand-up-Builder-App.git
   cd Stand-up-Builder-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📖 Usage

### Creating Your Stand-Up

1. **Yesterday Section**
   - Select an action verb (past tense)
   - Describe what you accomplished
   - Add the impact or outcome

2. **Today Section**  
   - Choose an action verb (auto-converts to -ing form)
   - Describe your planned task
   - Note the expected outcome

3. **Blockers Section**
   - List dependencies, approvals, or external blockers
   - Describe risks and potential workarounds

4. **Preview & Copy**
   - Review the formatted output in the preview section
   - Click "Copy update" to copy to clipboard
   - Paste directly into Slack, Teams, or email

### Example Output
```
**Yesterday**
- Resolved WooCommerce sync bug → reduced order mismatches.
- Implemented new caching layer → improved API response time by 40%.

**Today**
- Improving OCU affiliate selector input → enhancing usability.
- Optimizing database queries → expecting 25% performance boost.

**Blockers**
- Waiting for security team approval → may delay feature release by 2 days.

_Notes_: Demo scheduled for Friday 2PM. New API documentation available at wiki/api-v2.
```

## 🛠️ Built With

### Core Technologies
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Design
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Class Variance Authority](https://cva.style/)** - Component variant management
- **Custom Design System** - Consistent theming with CSS variables

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

## 📁 Project Structure

```
standup-builder-app/
├── src/
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       └── badge.tsx
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles & CSS variables
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 Customization

### Adding New Verbs
Edit the `VERBS` object in `src/App.tsx`:

```typescript
const VERBS = {
  Technical: [
    "Resolved", "Optimized", "YourNewVerb"
    // Add more verbs here
  ],
  // Add new categories
  YourCategory: [
    "Verb1", "Verb2", "Verb3"
  ]
};
```

### Styling
The app uses CSS variables for theming. Modify `src/index.css` to customize colors:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* Customize other colors */
}
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by best practices in agile stand-up meetings
- Built with accessibility and user experience in mind
- Designed for teams who value clear, impact-focused communication

---

**Made with ❤️ for better stand-ups**

*Keep Yesterday → past, Today → -ing, Blockers → dependencies.*
