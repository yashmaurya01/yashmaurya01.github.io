#!/usr/bin/env python3
"""Generate the public HTML and agent-readable editions. Python standard library only.

Run from any directory: python3 scripts/build_site.py
Node.js is used only to read the existing reading/data.js content source.
The checked-in outputs can be served directly by GitHub Pages without a build.
"""
from collections import OrderedDict
from html import escape
from html.parser import HTMLParser
from hashlib import sha256
import json
from pathlib import Path
import re
import subprocess
from string import Template
from urllib.parse import urljoin
from page_layout import build_pages, navigation

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / 'data/site.json').read_text())
BASE = DATA['siteUrl']


def absolute(url):
    return urljoin(BASE, url)


def link(label, url, **attrs):
    attributes = ''.join(f' {key}="{escape(str(value), quote=True)}"' for key, value in attrs.items())
    return f'<a href="{escape(url, quote=True)}"{attributes}>{label}</a>'


def marked_authors(authors):
    return escape(authors).replace('Yash Maurya', '<strong>Yash Maurya</strong>')


class MarkdownHTML(HTMLParser):
    """Small converter for the site's editorial HTML, retaining links and lists."""
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.links = []
        self.skip = 0
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style', 'nav', 'button'):
            self.skip += 1
        if self.skip:
            return
        if re.fullmatch('h[1-6]', tag):
            self.parts.append('\n\n' + '#' * int(tag[1]) + ' ')
        elif tag in ('p', 'section', 'div', 'article', 'ul', 'ol', 'blockquote'):
            self.parts.append('\n\n')
        elif tag == 'li':
            self.parts.append('\n- ')
        elif tag == 'br':
            self.parts.append('\n')
        elif tag == 'a':
            self.parts.append('[')
            self.links.append(absolute(attrs.get('href', '')))
        elif tag in ('strong', 'b'):
            self.parts.append('**')
        elif tag == 'code':
            self.parts.append('`')
        elif tag == 'img' and attrs.get('src'):
            self.parts.append(f"![{attrs.get('alt', '')}]({absolute(attrs['src'])})")

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'nav', 'button'):
            self.skip = max(0, self.skip - 1)
            return
        if self.skip:
            return
        if tag == 'a' and self.links:
            self.parts.append('](' + self.links.pop() + ')')
        elif tag in ('strong', 'b'):
            self.parts.append('**')
        elif tag == 'code':
            self.parts.append('`')
        elif tag in ('p', 'li') or re.fullmatch('h[1-6]', tag):
            self.parts.append('\n\n')

    def handle_data(self, value):
        if not self.skip:
            self.parts.append(re.sub(r'\s+', ' ', value))

    def text(self):
        result = re.sub(r'[ \t]+\n', '\n', ''.join(self.parts))
        return re.sub(r'\n[ \t]+', '\n', re.sub(r'\n{3,}', '\n\n', result)).strip()


def md(html):
    return MarkdownHTML(html).text()


def news_html(items):
    result = []
    for item in items:
        # Content is owner-maintained HTML; metadata and all other fields are escaped.
        html = re.sub(r' target="_blank"(?: rel="noopener noreferrer")?', '', item['html'])
        result.append(f'<li class="news-item"><time class="news-date" datetime="{escape(item["date"])}">{escape(item["date"])}</time><p>{html}</p></li>')
    return '\n'.join(result)


def paper_html(paper):
    visual = paper['visual']
    image = escape(visual['image'], quote=True)
    authors = paper['authors']
    author_html = f'<p class="authors">{marked_authors(authors)}</p>'
    primary_label = 'Paper'
    if 'presentation/' in paper['url']:
        primary_label = 'Talk'
    elif 'github.com/' in paper['url']:
        primary_label = 'Repository'
    elif 'Poster.pdf' in paper['url']:
        primary_label = 'Poster'
    resources = [link(primary_label + ' <span aria-hidden="true">↗</span>', paper['url'])]
    for resource in paper['resources']:
        if resource['url'] == paper['url']:
            continue
        resources.append(link(escape(resource['label'].capitalize()) + ' <span aria-hidden="true">↗</span>', resource['url']))
    venue = escape(paper['venue']).replace('Best Paper Award', '<span class="award">Best Paper Award</span>')
    figure_type = escape(visual.get('type') or ('Conceptual overview' if visual.get('illustration') else ('Presentation slide' if primary_label == 'Talk' else ('Poster preview' if primary_label == 'Poster' else 'Paper figure'))))
    return f'''<article class="paper" id="{escape(paper['id'])}" data-topics="{escape(' '.join(paper['topics']), quote=True)}" aria-labelledby="{escape(paper['id'])}-title">
        <figure class="paper-visual">
          <a class="figure-link" href="{image}" aria-label="Preview figure for {escape(paper['title'], quote=True)}"><img src="{image}" alt="{escape(visual['alt'], quote=True)}" width="520" height="320" loading="lazy" decoding="async"></a>
          <figcaption><span class="figure-type">{figure_type}</span>{link('Source ↗', visual['source'])}</figcaption>
        </figure>
        <div class="paper-copy">
          <p class="venue">{venue}</p>
          <h4 id="{escape(paper['id'])}-title">{link(escape(paper['title']), paper['url'], **{'class': 'paper-title'})}</h4>
          {author_html}
          <p class="paper-summary">{escape(paper['summary'])}</p>
          <div class="paper-links">{' '.join(resources)}</div>
        </div>
      </article>'''


def reading_data():
    # The existing reading list is JS with comments and trailing commas, not JSON.
    # Use its existing runtime format instead of maintaining a second content copy.
    script = "const fs=require('node:fs'),vm=require('node:vm');const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('reading/data.js','utf8'),sandbox);process.stdout.write(JSON.stringify(sandbox.window.READING_DATA));"
    result = subprocess.run(['node', '-e', script], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def reading_markdown():
    reading = reading_data()
    parts = ['# Reading notes', '', f'Website: {absolute("reading/")}', '', 'This edition contains the public reading list, writeups, flashcards, and recap questions with answers. Detailed notes that are still drafts are labeled as such.', '']
    for article in reading['articles']:
        parts.extend([f'## {article["title"]}', '', f'Source: [{article["venue"]}]({article["url"]})', '', f'Published: {article["published"]}', '', 'Tags: ' + ', '.join(article['tags']), '', article['blurb'], '', '### Writeup', '', article['writeup'], '', '### Topics', ''])
        parts.extend('- ' + topic for topic in article['topics'])
        parts.extend(['', f'[Notes page]({absolute(article["notesUrl"])})', '', 'The notes page includes the reading summary. Detailed notes and figures are still a draft.', ''])
        quiz = reading.get('quizzes', {}).get(article['id'])
        cards = reading.get('flashcards', {}).get(article['id'], [])
        if cards:
            parts.extend(['### Flashcards', ''])
            for i, card in enumerate(cards, 1):
                parts.extend([f'{i}. {card["front"]}', '', f'   {card["back"]}', ''])
        if quiz:
            parts.extend(['### ' + quiz['title'], ''])
            for i, question in enumerate(quiz['questions'], 1):
                parts.extend([f'{i}. {question["prompt"]}', ''])
                parts.extend(f'   {chr(65+j)}. {option}' for j, option in enumerate(question['options']))
                parts.extend(['', f'   Answer: {chr(65+question["answer"])}. {question["feedback"]}', ''])
    return '\n'.join(parts).rstrip() + '\n'


def tool_markdown():
    return {
        'diff.md': f'''# Text diff

Page: {absolute('diff.html')}

Compare two versions of a text. Everything stays in the browser.

## Use

1. Enter the original text and the revised text.
2. Optionally ignore whitespace or letter case.
3. Select Compare to show changed, added, and removed lines.
4. Switch between side-by-side and unified views.
5. Copy the diff to the clipboard.

Processing happens locally in the browser with JavaScript. Text is not uploaded to a server. This page has no server API.
''',
        'qrcode.md': f'''# QR code generator

Page: {absolute('qrcode.html')}

Turn a link or text into a QR code. Everything stays in the browser.

## Use

1. Enter a URL or text.
2. Choose an image size: 128, 192, 256, 384, or 512 pixels square. The default is 256.
3. Choose error correction: low (7%), medium (15%), quartile (25%), or high (30%). The default is medium.
4. Select Generate QR code.
5. Download the result as a PNG.

Processing happens locally in the browser with JavaScript and QRCode.js. Input is not uploaded to a server. The QR library is served from this website. This page has no server API.

Library: [QRCode.js](https://github.com/davidshimjs/qrcodejs), MIT license.
'''
    }


def main():
    profile = DATA['profile']
    topic_labels = {topic['id']: topic['label'] for topic in DATA['researchTopics']}
    grouped = OrderedDict()
    seen = set()
    for paper in DATA['papers']:
        if paper['id'] in seen:
            raise ValueError('Duplicate paper ID: ' + paper['id'])
        seen.add(paper['id'])
        if not paper['topics'] or any(topic not in topic_labels for topic in paper['topics']):
            raise ValueError('Missing or unknown research topic: ' + paper['id'])
        if not (ROOT / paper['visual']['image']).is_file():
            raise FileNotFoundError(paper['visual']['image'])
        grouped.setdefault(paper['year'], []).append(paper)

    research = []
    for year, papers in grouped.items():
        research.append(f'<section class="research-year" id="year-{year}" aria-labelledby="heading-{year}"><h3 class="year-heading" id="heading-{year}">{year}</h3>\n' + '\n'.join(paper_html(p) for p in papers) + '\n</section>')
    schema = {
        '@context': 'https://schema.org', '@type': 'Person', 'name': profile['name'],
        'url': BASE, 'image': absolute('images/yash.jpeg'), 'jobTitle': profile['role'],
        'worksFor': {'@type': 'Organization', 'name': profile['organization'], 'url': profile['organizationUrl']},
        'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'Carnegie Mellon University'},
        'sameAs': [item['url'] for item in profile['links'] if item['url'].startswith('https:')],
        'knowsAbout': ['AI safety', 'Model evaluation', 'Red teaming', 'Privacy engineering', 'Machine unlearning', 'Differential privacy']
    }
    html = Template((ROOT / 'templates/index.html').read_text()).substitute(
        navigation=navigation(home=True),
        navigation_version=sha256((ROOT / 'assets/navigation.js').read_bytes()).hexdigest()[:12],
        css_version=sha256((ROOT / 'assets/site.css').read_bytes()).hexdigest()[:12],
        js_version=sha256((ROOT / 'assets/site.js').read_bytes()).hexdigest()[:12],
        structured_data=json.dumps(schema, ensure_ascii=False).replace('<', '\\u003c'),
        organization_url=escape(profile['organizationUrl'], quote=True), organization=escape(profile['organization']),
        focus=escape(profile['focus']), intro=re.sub(r'(\([^()]+\))', r'<em class="intro-aside">\1</em>', escape(profile['intro'])), about=escape(profile['about']), email=escape(profile['email']),
        profile_links=' '.join(link(escape(item['label']), item['url']) for item in profile['links'] if item['label'] != 'CV'),
        background=''.join('<p>' + escape(p) + '</p>' for p in profile['background']),
        recent_news=news_html(DATA['news'][:3]), older_news=news_html(DATA['news'][3:]), older_news_count=len(DATA['news'][3:]),
        year_links=' '.join(link(year, '#year-' + year) for year in grouped),
        topic_buttons=' '.join(f'<button type="button" class="topic-filter" data-topic="{escape(topic["id"], quote=True)}" aria-pressed="false">{escape(topic["label"])}</button>' for topic in DATA['researchTopics']),
        papers='\n'.join(research), speaker_bio=escape(profile['speakerBio'])
    )
    (ROOT / 'index.html').write_text(html)

    lines = ['# Yash Maurya', '', f'Website: {BASE}', f'Last content update: {DATA["updated"]}', '', f'{profile["role"]} at [{profile["organization"]}]({profile["organizationUrl"]}) · {profile["focus"]}', '', '## About', '', profile['intro'], '', profile['about'], '']
    for p in profile['background']:
        lines.extend([p, ''])
    lines.extend(['## Contact and profiles', '', f'- [Email](mailto:{profile["email"]})'])
    lines.extend(f'- [{item["label"]}]({absolute(item["url"])})' for item in profile['links'])
    lines.extend(['## News', ''])
    for item in DATA['news']:
        lines.extend([f'- **{item["date"]}**: {md(item["html"])}', ''])
    lines.extend(['## Research', '', '\\* indicates equal contribution. Years follow the website’s existing grouping and can differ from the final publication year shown in the venue.', ''])
    for year, papers in grouped.items():
        lines.extend(['### ' + year, ''])
        for p in papers:
            v = p['visual']
            authors = p['authors'].replace('*', '\\*')
            lines.extend(['#### ' + p['title'], '', f'Authors: {authors}', '', f'Venue: {p["venue"]}', '', 'Topics: ' + ', '.join(topic_labels[topic] for topic in p['topics']), '', p['summary'], '', f'[Paper or presentation]({absolute(p["url"])}) · [Website entry]({BASE}#{p["id"]})'])
            lines.extend(f'- [{r["label"]}]({absolute(r["url"])})' for r in p['resources'])
            lines.extend(['', f'Preview: [{v["alt"]}]({absolute(v["image"])})', f'Figure source: {absolute(v["source"])}', ''])
            if v.get('illustration'):
                lines.extend(['Preview is an original conceptual illustration for this website, not a figure from the paper.', ''])
    lines.extend(['## Speaker bio', '', profile['speakerBio'], '', f'[Plain text speaker bio]({absolute("speaker-bio.txt")})', '', '## Other pages', '', f'- [Reading notes and recap questions]({absolute("reading.md")}). Public reading list, writeups, topics, flashcards, and quizzes.', f'- [Reading interface]({absolute("reading/")}). Topic filters and links to notes, flashcards, and quizzes.', f'- [Text diff]({absolute("diff.md")}). Browser tool for comparing two texts.', f'- [QR code generator]({absolute("qrcode.md")}). Browser tool for generating QR codes.', f'- [ML privacy mitigations repository](https://github.com/Privacy-Engineering-CMU/Awesome-ML-Privacy-Mitigations)', f'- [CV (PDF)]({absolute("cv.pdf")})', ''])
    markdown = '\n'.join(lines).rstrip() + '\n'
    reading = reading_markdown()
    (ROOT / 'index.md').write_text(markdown)
    (ROOT / 'reading.md').write_text(reading)
    tools = tool_markdown()
    for path, content in tools.items():
        (ROOT / path).write_text(content)
    (ROOT / 'speaker-bio.txt').write_text(profile['speakerBio'] + '\n')
    (ROOT / 'llms-full.txt').write_text('\n---\n\n'.join([markdown, reading, *tools.values()]))
    (ROOT / 'llms.txt').write_text(f'''# Yash Maurya

> Research Engineer at Scale AI working on AI safety, model evaluation, red teaming, and privacy-preserving machine learning. M.S. in Privacy Engineering, Carnegie Mellon University.

## Canonical content

- [Complete website in plain-text Markdown]({absolute('llms-full.txt')}): Full profile, all {len(DATA['papers'])} research entries with authors, venues, summaries, figure sources, all news, speaker bio, public reading notes, flashcards, quiz content, and tool descriptions. No JavaScript required.
- [Homepage as Markdown]({absolute('index.md')}): Profile, research, news, contact links, and speaker bio.
- [Reading as Markdown]({absolute('reading/index.md')}): Public reading list, writeups, topics, flashcards, and recap questions with answers.
- [Detailed notes]({absolute('reading/notes/frontier-training-methodologies.md')}): Existing reading summary and explicit draft status for the detailed notes.
- [Speaker bio]({absolute('speaker-bio.txt')}): Owner-provided third-person biography for event introductions.
- [Structured content]({absolute('data/site.json')}): Homepage source data and image provenance.
- [Website]({BASE}): Human-readable HTML with stable paper anchors.

## Other pages

- [CV]({absolute('cv.pdf')}): Curriculum vitae in PDF.
- [Text diff]({absolute('diff.md')}): Browser-local text comparison tool, inputs, modes, and output.
- [QR code generator]({absolute('qrcode.md')}): Browser-local QR code tool, settings, and PNG download.

Publication years are recorded in each entry's venue; archive year groupings follow the existing site. Images are source figures, slides, or posters except the explicitly labeled illustrated overviews. Detailed notes that are not written yet are marked as drafts.
''')
    # Existing static HTML site: prevent Markdown conversion by GitHub Pages.
    (ROOT / '.nojekyll').touch()
    paths = ['', 'reading/', 'reading/quiz.html', 'reading/notes/frontier-training-methodologies.html', 'diff.html', 'qrcode.html', 'index.md', 'reading.md', 'reading/index.md', 'reading/quiz.md', 'reading/notes/frontier-training-methodologies.md', 'diff.md', 'qrcode.md', 'llms.txt', 'llms-full.txt', 'speaker-bio.txt', 'cv.pdf', 'Awesome-ML-Privacy-Mitigations/']
    generated = set(paths) - {'cv.pdf', 'Awesome-ML-Privacy-Mitigations/'}
    urls = []
    for path in paths:
        modified = f'<lastmod>{escape(DATA["updated"])}</lastmod>' if path in generated else ''
        urls.append(f'  <url><loc>{escape(absolute(path))}</loc>{modified}</url>')
    (ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(urls) + '\n</urlset>\n')
    build_pages(reading_data(), DATA['updated'])
    print(f'Built homepage, reading and tool pages, and Markdown editions ({len(seen)} research entries).')


if __name__ == '__main__':
    main()
