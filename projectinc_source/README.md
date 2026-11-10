# ProjectINc — website source files

This is the source-code version of the latest ProjectINc website with the contrast fixes.

## Folder structure

```
projectinc_source/
├── index.html       # Page structure and content
├── style.css        # Styles and layout
├── script.js        # Case, forum, reactions, likes and page navigation
└── assets/
    ├── postcard.jpg # Campaign visual
    └── boarding.jpg # Campaign visual
```

## Run locally in Visual Studio Code

1. Extract the ZIP file.
2. Open the **projectinc_source** folder in VS Code using **File → Open Folder**.
3. Open `index.html`.
4. Recommended: install VS Code extension **Live Server** and choose **Open with Live Server**. Or use `python -m http.server 8000` in the folder and open `http://localhost:8000`.
5. You can also double-click `index.html`, but using a local server generally provides more predictable localStorage behavior.

## Edit

- Edit page text/structure in `index.html`.
- Edit colors, typography, contrast and spacing in `style.css`.
- Edit the case, example ideas, allowed nationalities, likes and comments in `script.js`.
- The site uses **JavaScript**, not Java. The script is loaded as a classic deferred script so existing inline `onclick` controls work.

## Data and caveats

- Case submissions, likes and replies are stored locally in `localStorage` on the current browser + origin only.
- Users on different machines **cannot** see each other's work without a backend and shared database.
- The BIP interest/application page is a demonstration and does not send messages.
- Example forum posts are fictitious and are present for demonstration.
- Do not clear browser site storage if you want to retain local submissions. Data stored under `file://` may be unreliable across browsers; prefer Live Server.
- When switching from the original `file://` HTML file to `http://localhost`, browser storage is separate. Previous local posts won't automatically transfer.
- Web fonts load through Google Fonts when online; fallback system fonts are available offline.
