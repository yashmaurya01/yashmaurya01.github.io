# Reading and tools design review

Applied [Unslop](https://github.com/heydamir/unslop) by [Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The existing homepage supplies the approved direction.

## Direction

- Product: Yash's reading log, study material, and small browser tools for readers of his academic website.
- Character: Precise, approachable, curious.
- World: Research notes and working documents, using the homepage's neutral page, system type, and restrained blue links.
- Moments: The actual writing, flashcard answer, marked text changes, and generated QR code.
- Signature: Quiet date markers and aligned content, continuing the homepage's research archive.

## Audit

- Reading and recap pages used blue radial washes, colored borders, serif display headings, and a purple theme toggle unrelated to the homepage.
- Repeated hero, filter, archive, and nested article boxes made the reading page feel like a collection of panels.
- Thirteen filter chips dominated the first screen, followed by duplicate topic chips in the article.
- Four differently colored article actions competed with the title and writeup.
- Notes displayed a remote placeholder figure and template prompts as though they were finished content.
- Diff and QR pages used a separate typeface, spacing, navigation, and light-only colors.
- Theme and menu code was duplicated or missing across pages.
- The homepage's Markdown and For agents labels represented overlapping ways into the same content.

## Passes

1. Spacing: Use the homepage's 1040px wrap, 24/32px section rhythm, compact controls, and aligned reading dates. Desktop filters occupy a small left column; mobile filters wrap above the archive.
2. Color: Remove radial washes, colored panel borders, and colored action backgrounds. Keep the common light/dark neutral palette. Diff additions, removals, and feedback retain semantic colors.
3. Icons: Reuse the homepage's 16px, 1.5-stroke theme icons. Remove Material Icons, Font Awesome, and external font requests from the current pages.
4. Copy: Shorten labels and descriptions. Retain the existing reading writeup, all topics, flashcards, and quiz content. Present the notes summary using existing text; label the detailed notes as a draft, keep its writing outline collapsed, and remove the fake figure and implementation instructions.
5. Type: Reuse system fonts, 400/500 weights, a 30-40px page title, and 13-15px controls and body text. Tool text inputs and diff output use a native monospace font.
6. Layout: Share the homepage header, mobile menu, theme behavior, and page width. Give each tool the layout its task needs: two text columns or a form beside a QR preview.
7. Details: Add native-button keyboard access for flashcard flipping, pressed states for modes and topic filters, labeled radio groups, live feedback, and explicit empty/error states. Keep interactive values local.
8. Visuals: Let actual content and tool output carry detail. No generated decoration. The QR library is now served locally with its original license.
9. Motion: Keep short hover/press feedback. Remove lifting cards, color washes, and decorative animation.

## Agent access

Keep static semantic HTML and page-specific Markdown, with complete flashcards and quiz answers in the text edition. Retain `/llms.txt` as a discovery index and `/llms-full.txt` as the combined export. Link the index in page metadata with `rel="describedby"`, and the matching text version with `rel="alternate" type="text/markdown"`, following the [llms.txt proposal](https://llmstxt.org/). One visible Markdown label replaces overlapping format/agent choices. Existing paper anchors and Markdown URLs remain available.

## Scope

Current pages: homepage navigation, reading log, recap hub, flashcards, quiz, detailed reading notes, text diff, and QR generator. Existing redirect URLs remain intact. Files in `old/` remain historical snapshots.

## Validation

- Desktop, tablet (768px), and phone (390px) layouts checked with no horizontal overflow. Reading and tool layouts reviewed in light and dark themes.
- Reading filter selection and clearing work; all 13 original topics, article text, 12 flashcards, and 8 quiz questions remain available.
- Native keyboard activation flips a flashcard. Next/previous navigation resets the answer face; switching modes, grading a partial quiz, and resetting were checked.
- Diff comparison, unified layout, clipboard copying, and ignore-case matching were checked. The status message now correctly reports a match when normalization makes the texts equal.
- QR generation produces a valid PNG data URL with an explicit filename. A 512px output fits the phone viewport. The PNG export is a native download link.
- Shared navigation opens and closes on phones. The homepage's email-copy action and research filters still work after extracting shared navigation code.
- Local assets and links, fragment targets, unique IDs, JavaScript syntax, and per-page Markdown/discovery metadata pass static checks. The text export includes every flashcard answer and quiz explanation.
