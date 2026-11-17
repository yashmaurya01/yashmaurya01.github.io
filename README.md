# Yash Maurya’s website

A static academic website, published through GitHub Pages at [yashmaurya.com](https://yashmaurya.com/). The checked-in HTML, CSS, JavaScript, images, and text files are the complete deployable site; no server runtime or package installation is needed.

## Preview

```sh
python3 -m http.server 8000
```

Open [the local preview](http://localhost:8000/).

## Update content

Edit `data/site.json`, then run:

```sh
python3 scripts/build_site.py
```

The generator uses Python’s standard library and Node.js to load the existing `reading/data.js` source. It regenerates the homepage, reading pages, tools, and their Markdown editions, plus `llms.txt`, `llms-full.txt`, and `speaker-bio.txt`. Commit these generated files alongside their sources so GitHub Pages can serve them directly. Update `updated` in the JSON when changing editorial content.

- **Profile and speaker bio:** `profile` in `data/site.json`. Homepage introduction fields are independent of `speakerBio`. A compact Recent news section follows the introduction, with three visible updates and an expandable archive. Research comes next, followed by event resources. The event bio is preserved verbatim in an expandable utility, Markdown, and downloadable text file. The top shortcut opens the disclosure directly.
- **Research:** `papers` in `data/site.json`, with full author lists, venue, summary, links, and figure provenance. Existing paper anchors remain stable. Archive years preserve the original website’s grouping; the venue records the publication year.
- **Research topics:** `researchTopics` defines the filter labels; every paper’s `topics` array lists one or more topic IDs. The default view shows all research. Filtering hides unmatched papers, empty years, and their year links; following a link to a hidden paper restores the full view. All papers and their topic labels remain in the Markdown and full-text editions. Without JavaScript, the full archive is visible and the filters stay hidden.
- **News:** `news` in `data/site.json`. The first three updates are shown immediately; the archive uses native HTML disclosure. News `html` is trusted, owner-maintained markup.
- **Layout:** `templates/index.html` for the homepage, `templates/pages/` for the current reading and tool pages, `templates/partials/navigation.html` for their shared header. `assets/site.css` defines the common design; `assets/pages.css` styles the reading and tools.
- **Controls:** `assets/navigation.js` shares theme switching and mobile navigation. `assets/site.js` enhances the homepage; each reading or tool page has its own script in `assets/`. The hero Email button copies the address and briefly confirms success; its no-JavaScript fallback is an email link.
- **Reading:** `reading/data.js` remains the source for articles, writeups, filters, 12 flashcards, and 8 quiz questions. The reading list and notes summary are rendered as static HTML. The detailed notes page is explicitly a draft; its writing outline is collapsed and the placeholder image is removed.
- **Tools:** Text diff and QR generation run in the browser. `assets/vendor/qrcode.min.js` is the existing QRCode.js 1.0.0 library, served locally with its MIT license in `assets/vendor/qrcode.LICENSE`.

## Paper previews

Optimized previews live in `images/papers/`. Each paper’s `visual` object records the original source and descriptive alternative text. Most previews come from paper figures, presentation slides, and posters. One labeled illustrated overview summarizes the privacy framework. The federated-learning workflow comes from slide 12 of the supplied GCAT 2022 presentation. Original authors retain credit; each preview links to its source. The [content review](docs/research-content-review.md) records the topic assignments, evidence, and preview choices for every entry.

Selecting a paper image opens an on-page modal preview. Close it with Escape, the close button, or the backdrop; focus returns to the selected image. Without JavaScript, the image remains a normal link in the current tab. CSS and JavaScript URLs include content hashes so updated controls load without stale browser caches.

The colorectal cancer paper uses the original workflow graphic extracted from the supplied GCAT 2022 presentation. Preserve entire axes and labels when replacing chart crops.

## Agent-readable editions

- `/index.md`: complete homepage content, all authors, summaries, news, speaker bio, and links.
- `/reading.md`: public reading list, writeups, topics, and recap questions with answers.
- `/reading/index.md` and `/reading/quiz.md`: reading and recap editions, including flashcards and quiz answers.
- `/reading/notes/frontier-training-methodologies.md`: reading summary and draft status.
- `/diff.md` and `/qrcode.md`: tool descriptions, inputs, settings, and outputs.
- `/llms.txt`: a concise index of the canonical content and available formats.
- `/llms-full.txt`: the homepage and reading content combined into one plain-text Markdown response.
- `/speaker-bio.txt`: the third-person bio as plain text.
- `/data/site.json`: structured homepage data, including image sources.

All Markdown links are absolute. Each current page has a Markdown link, a matching `rel="alternate"` in its head, and `rel="describedby"` pointing to `llms.txt`. The agent index remains available without a second “For agents” navigation label. These discovery links follow the [llms.txt proposal](https://llmstxt.org/), an additional hint rather than a guarantee that every agent will use them. `.nojekyll` keeps GitHub Pages from transforming Markdown. Homepage and reading-list content are available without JavaScript; interactive tool results and recap controls require it, with the full recap content also in Markdown.

## Design credit

The design follows the review principles of [Unslop](https://github.com/heydamir/unslop), created by [Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The compact portrait-led introduction takes layout cues from [Ruchi Thosar’s website](https://thosarruchi.github.io/). The implementation uses native system typography, Apple-inspired rounded controls, restrained neutral surfaces, original paper imagery, and denser research rows. No reference-site copy, code, or artwork is included. The latest [design review](docs/design-review.md) records the audit, nine passes, and portrait edit prompt.

The introduction uses `images/yash-cutout-v2.png` in black and white, with a CSS fade across the lower shoulder edge so the cutout blends into either page theme. The original `images/yash.jpeg` remains unchanged. See the design review for the extraction prompt.
