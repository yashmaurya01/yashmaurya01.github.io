# Unslop review

## Current portrait treatment

The owner prefers the cutout but found its hard shoulder edge unnatural. The introduction uses `images/yash-cutout-v2.png` in black and white, without a frame or rounded container. A CSS alpha gradient fades only the bottom 24% into the page, preserving the face and hair and adapting to light and dark themes. This supersedes the brief framed-photo treatment. The explanatory preview note beneath the research archive was removed at the owner's request.

Applied [Unslop](https://github.com/heydamir/unslop) by [Damir Sokolovsky (@heydamir)](https://x.com/heydamir), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Direction

- **Purpose:** An academic research profile for researchers, collaborators, and readers of the work.
- **Character:** Precise, approachable, curious.
- **World:** Research papers and measurement, expressed through neutral surfaces and native system typography.
- **Moments:** The original portrait as a background-free cutout, and actual diagrams and results from each paper.
- **Signature:** Consistent year markers and aligned figure/citation columns.

The approved compact, Apple-inspired direction is retained. This is a polish pass on the existing design, plus the explicitly requested portrait extraction.

## Audit

- Hero portrait: a rounded rectangular photo interrupts the open page composition.
- Hero resources: profile links under the photo split the reader’s path from the contact controls and background information.
- Research heading: duplicate Scholar links and a topic subtitle repeat information from the introduction.
- Paper previews: repeated borders turn the figures into a second layer of interface boxes.
- Paper metadata: blue venue labels compete with the actual resource links, while 11px venues and 13px summaries read as fine print.
- Desktop columns: hero text and publication text begin at different horizontal positions.
- Long archive: the main navigation disappears while scrolling the research list.

## Passes

1. **Spacing:** Align desktop hero and paper text to a shared 240px figure column with a 24px gutter. Use one resource row below the two contact controls. Preserve compact 20px paper padding and consistent section spacing.
2. **Color:** Retain the neutral light/dark system. Venue metadata now uses muted text; blue marks actionable research links. No color washes or glows.
3. **Icons:** Keep the existing single 1.5-stroke icon treatment. Decorative labels are not added. Background and speaker-bio disclosures retain explicit directional affordances.
4. **Copy:** Rewrite the homepage introduction around frontier AI safety, evaluation, adversarial behavior, monitoring, and control, using the earlier site and supplied speaker bio. Preserve the exact event bio. Shorten the background disclosure label and remove repeated research-heading copy. Rename the utility area to “Notes & tools.”
5. **Type:** Preserve the user-approved native Apple/system font stack. Use 500-weight paper titles at 18px, summaries at 14px, and venue metadata at 12px. The name uses 500 weight instead of introducing heavier display type.
6. **Layout:** Retain the introduction → recent news → research → supporting resources order. Bring Scholar, GitHub, LinkedIn, speaker bio, and background together. Keep Email as the primary action and CV as the secondary action. A quiet sticky header supports the long research archive.
7. **Details:** Combine the research title and year navigation, preserve clear keyboard focus states, and remove unnecessary figure borders. Full author lists and the event bio remain accessible through native disclosures.
8. **Visuals:** Render the refined AI portrait directly with its transparent alpha; preserve the original source photograph separately. Preserve every paper preview and its source attribution. The one conceptual illustration remains labeled.
9. **Motion:** Keep only short hover/press feedback and native navigation. No looping, decorative reveal, floating, or parallax animation. Reduced-motion preferences remain respected.

## Portrait asset and prompt

- **Mode:** Built-in Image Generation tool, background extraction with transparent output. No CLI/API fallback.
- **Original:** `images/yash.jpeg` (1984 × 1984), unchanged.
- **Saved output:** `images/yash-cutout-v2.png` (1254 × 1254 RGBA), a new extraction from the original photograph.
- **Website composition:** A direct transparent image replaces the misaligned alpha-mask overlay. There is no CSS mask or inset that can introduce a second contour.

Prompt supplied to the built-in tool:

> Use case: background-extraction. Edit this original portrait photograph into a polished, natural photographic cutout with genuine transparent alpha. Remove only the gray wall background. Preserve this exact person's identity, facial proportions, expression, eyes, teeth, beard, hairstyle, skin texture, gray T-shirt, pose, original square framing, and lighting as faithfully as possible. Do not beautify or stylize. Pay special attention to professional edge matting: natural fine hair detail, clean beard/ear boundaries and shoulder contours, smooth anti-aliased alpha, no jagged edges, no stray opaque pixels, no light gray or dark outline, no background-color fringe, no glow and no drop shadow. The result must look equally clean directly on white and near-black website backgrounds. Keep the complete visible head and existing shoulders/chest; do not extend or invent body parts or clothes. Do not add text, shapes, scenery, an outline, or a replacement background. Output one final transparent portrait suitable to render directly in an HTML img element, not a mask or a compositing layer.

## Validation

- Desktop: common hero/paper text alignment; refined transparent portrait rendered directly; no horizontal overflow; light and dark visual review.
- Phone: 390px viewport; no name/portrait overlap or horizontal overflow; menu closes after navigation.
- Email copy confirms success, the speaker-bio shortcut opens the full bio, and both hero actions remain available.
- All 21 research entries, local links, anchors, and the exact 773-character speaker bio are present. Markdown parity and the section order remain intact.
- Original portrait bytes match the tracked original. The current portrait has genuine transparent alpha and uses no CSS masking.
- JavaScript syntax, generated HTML/content checks, and Git whitespace checks pass.

## Research metadata update

Added SG-LegalClarify from arXiv:2611.19643, including its published Figure 1, full author list, project, code, and dataset links. The figure preview is an optimized WebP derived from the published PNG. ROK-FORTRESS now lists its NeurIPS acceptance while retaining its workshop award; HarnessOpt-Bench lists its acceptance to Findings of EACL. Acceptance information comes from the site owner; no unprovided conference year or acceptance date is inferred. HTML and agent-readable outputs share the same data source.

## News placement

Recent news now follows the introduction and precedes Research, as requested by the site owner. The EACL Findings and NeurIPS acceptances lead the three visible updates; previous news remains available in the expandable archive. New announcements use year-only dates because exact acceptance dates were not supplied. The Markdown and full-text editions follow the same section order.

## Acceptance copy and conference years

News announcements lead with the paper title instead of repeating “Our paper.” HarnessOpt-Bench is listed as accepted to Findings of EACL 2027, and ROK-FORTRESS to NeurIPS 2026, in both news and venue metadata. EACL’s official call (https://2027.eacl.org/calls/papers/) places the current acceptance round in November 2026 for its March 2027 conference; the EACL year is inferred from that round and the owner’s reported acceptance. ROK-FORTRESS coauthor Kyungho Song’s research page (https://songkyungho.github.io/research) lists NeurIPS 2026. Year-only news dates remain announcement years, distinct from conference years.

## Research topics and previews

The topic controls now use six themes grounded in the primary materials: Agents & reasoning (5), Safety & governance (4), ML privacy (6), Usable privacy (3), Federated learning (2), and Interpretability (2). MoReBench intentionally spans two themes. The full 21-entry archive remains the default. The [entry-by-entry content review](research-content-review.md) records the reviewed sections, rationale, source limitations, and image decisions.

Ten previews were replaced or reframed. Nine use source figures, slide content, or poster excerpts; one is a labeled illustrated overview. The federated-learning workflow now uses the original hospital/server graphic from slide 12 of the owner-supplied GCAT 2022 presentation. The SG-LegalClarify pipeline is rendered from the original PDF because the HTML SVG omitted labels in some renderers. Attribution heatmaps replace the full Score-CAM poster, and the complete trajectory illustration replaces its clipped crop. Relevant existing diagrams and plots were retained for the other 11 entries.

The opening now uses a conversational parenthetical about agent access, followed by control, monitoring, and multi-agent safety. The homepage and both generated full-text editions contain no em dashes. The profile photograph uses a grayscale display filter.
