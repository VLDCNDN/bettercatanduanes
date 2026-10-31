# BetterCatanduanes

A website project for Catanduanes, built with React, TypeScript, Vite, and Tailwind CSS. Content is stored in Markdown and YAML.

## Local development

Requires Node.js 22.12+ and pnpm 10.7.1.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite.

`pnpm dev`, `pnpm build`, and `pnpm test` prepare a lightweight listing index and versioned project-detail files from the saved public-data snapshot. These generated files are ignored by Git; the canonical snapshot remains in `src/data/funding/public-data.json`. Use `pnpm data:sync` to refresh it from the public sources.

## 📚 Documentation

- **[STARTER-KIT-README.md](STARTER-KIT-README.md)** - Complete setup and customization guide
- **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** - Content writing and contribution guidelines
- **[CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md)** - Guide for non-technical users to edit and manage website content
- **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** - Deployment instructions for Vercel and other platforms
- **[STARTER-KIT-SUMMARY.md](STARTER-KIT-SUMMARY.md)** - Audit results and implementation summary
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes
- **[docs/meilisearch.md](docs/meilisearch.md)** - Meilisearch search setup and integration guide

## 🛠️ Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Fix ESLint issues
- `pnpm run format` - Format code with Prettier
- `pnpm run setup` - Run setup script for new installations
- `pnpm run convert-yaml` - Convert YAML to JSON
- `pnpm run dev:yaml` - Convert YAML and start dev server

### Project Structure

```
content/
├── government/         # Government section markdown & YAML
│   └── departments/    # Department pages (executive, legislative, etc.)
└── services/           # Services section markdown & YAML

src/
├── components/         # Reusable UI components
│   ├── home/           # Home page components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/             # Basic UI components
├── data/               # YAML configuration (services.yaml, government.yaml)
├── i18n/               # Internationalization
├── lib/                # Utility functions (markdownLoader, yamlLoader)
├── pages/              # Page components (Home, Services, Government, Document)
└── types/              # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions from everyone! Whether you're a developer, government official, or community member, there are many ways to help improve this project.

### 🌟 For Non-Technical Contributors

**No coding experience required!** You can contribute valuable content and improvements using GitHub's web interface.

#### Quick Start for Non-Technical Users

1. **Create a GitHub account** (free at github.com)
2. **Navigate to the repository** in your web browser
3. **Use our detailed guide**: [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) - Complete step-by-step instructions for editing content without any technical knowledge

#### What You Can Contribute

- **📝 Content Updates**: Fix outdated information, add new services, improve descriptions
- **🌐 Translations**: Help translate content to Filipino, Cebuano, or other local languages
- **📋 Service Information**: Add details about government services, requirements, and processes
- **🔍 Content Review**: Check for accuracy, clarity, and completeness
- **💡 Suggestions**: Propose new features or improvements

#### How to Contribute (No Git Required)

1. **Find content to edit**:
   - Go to `content/services/` for service pages or `content/government/` for department pages
   - Choose a category (health, education, business, departments, etc.)
   - Click on any `.md` file to edit

2. **Make your changes**:
   - Click the pencil icon (✏️) to edit
   - Update the content using simple text formatting
   - Add new information, fix errors, or improve clarity

3. **Save your changes**:
   - Write a brief description of what you changed
   - Click "Commit changes"
   - Submit a pull request for review

#### Content Types You Can Edit

- **Service Descriptions**: How to apply for permits, scholarships, health services
- **Requirements**: Documents needed, eligibility criteria, deadlines
- **Contact Information**: Office locations, phone numbers, hours
- **Process Steps**: Step-by-step instructions for government services
- **Translations**: Help make content available in local languages

### 👨‍💻 For Technical Contributors

1. Create a branch for your change.
2. Follow the existing code and content patterns.
3. Check your changes locally with `pnpm dev`.
4. Run `pnpm lint` and `pnpm build` before submitting a pull request to this repository.

### 📋 Contribution Guidelines

#### Content Guidelines

- **Accuracy First**: Ensure all information is current and correct
- **Clear Language**: Write for the general public, avoid jargon
- **Complete Information**: Include all necessary details (requirements, steps, contacts)
- **Local Context**: Consider the specific needs of your community
- **Accessibility**: Use clear headings, simple language, and logical structure

#### Technical Guidelines

- Follow existing code style and patterns
- Test your changes thoroughly
- Update documentation when needed
- Ensure mobile responsiveness
- Maintain accessibility standards

### 🎯 Priority Areas for Contribution

1. **Content Accuracy**: Update outdated information, fix errors
2. **Localization**: Translate content to Filipino, Cebuano, and other Philippine languages
3. **Service Coverage**: Add missing government services and programs
4. **User Experience**: Improve clarity and ease of use
5. **Accessibility**: Ensure content is accessible to all citizens

### 🆘 Need Help?

- **For Content Questions**: Check [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md)
- **For Technical Issues**: Open an issue on GitHub
- **For General Questions**: Contact the project maintainers

### 🏆 Recognition

All contributors are recognized in our project documentation. Your contributions help make government services more accessible to all citizens!

## 📄 License

This project is licensed under the Creative Commons Zero (CC0) License - see the [LICENSE](LICENSE) file for details.

**CC0 License Benefits:**

- **Public Domain**: No restrictions on use, modification, or distribution
- **Government Friendly**: Perfect for public sector projects
- **Maximum Reusability**: Anyone can use, modify, and distribute freely
- **No Attribution Required**: Though attribution is appreciated

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS v4](https://tailwindcss.com/)
- UI components by [@bettergov/kapwa](https://github.com/bettergov/kapwa)
- Icons by [Lucide React](https://lucide.dev/)
- Content management with [YAML](https://yaml.org/)
- Internationalization with [i18next](https://www.i18next.com/)

---

**Made with ❤️ for Philippine Local Government Units**
