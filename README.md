# PPT Lyrics Slides Generator

A lightweight React.js app that generates PowerPoint-style *lyrics slides* automatically from song lyrics. Built with **React**, **Tailwind CSS**, and **shadcn/ui**, this project helps musicians, worship teams, and presenters quickly create slide decks with lyric lines, transitions, and export-ready slide images or PPTX files.

---

## Features

* Paste or upload song lyrics and auto-split into slides by line count or stanza.
* Multiple slide layout templates (title, centered lyric, two-column, verse/chorus emphasis).
* Styling controls: font family, size, alignment, letter spacing, and line height.
* Theme presets and custom color palettes (Tailwind + CSS variables).
* Preview mode with keyboard navigation between slides.
* Export options:PPTX export (client-side).


---

## Tech Stack

* **React** (v18+)
* **Tailwind CSS** (v4 using `@theme` CSS custom properties)
* **shadcn/ui** for components
* **TypeScript** (optional — repo includes `tsconfig` when enabled)
* **pptxgenjs** (or similar) for PPTX export



---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ppt-lyrics-generator.git
cd ppt-lyrics-generator
```

2. Install dependencies:

```bash
# npm
npm install
# or pnpm
pnpm install
# or yarn
yarn
```

3. Start the dev server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open `http://localhost:5173` (Vite default) or the port printed in your terminal.

---

## Usage

* Paste lyrics into the left-side editor.
* Pick a split rule: **Lines per slide**, **Blank-line stanza**, or **Custom regex**.
* Choose a layout and theme from the template selector.
* Tweak typography and alignment using the right-side controls (powered by shadcn form inputs).
* Click **Preview** to step through slides.
* Click **Export** and choose **PNG** or **PPTX**.


---

## Key Implementation Notes

### Lyrics splitting

* Provide multiple strategies: `linesPerSlide`, `stanzaBreaks` (blank-line delimiter), and `smart` (keeps chorus intact based on repeated stanza matching).
* Trim and sanitize whitespace; preserve intentional line breaks.


### Integrating shadcn/ui

* Import components where needed: `Button`, `Input`, `Select`, `Dialog`, etc.
* Keep shadcn components wrapped in small adapter components if you need custom behavior (e.g., tied to Tailwind theme tokens).

### Exporting PPTX

* Client-side generation with `pptxgenjs` works well for simple slides (text + background color/image).


---

## Deployment

* GitHub Pages are excellent for static deployments.
* If you need server-side PPTX processing, use a lightweight Node.js endpoint (e.g., Vercel Serverless or AWS Lambda).

---

## Contributing

PRs welcome. Please include:

* A clear description of the change
* Screenshots/GIFs for visual changes
* Unit tests for parsing/export logic when applicable

---

## License

MIT

---

## Acknowledgements

* Thanks to shadcn/ui for approachable components and Tailwind for utilities.
