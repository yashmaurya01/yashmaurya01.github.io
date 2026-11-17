"""Shared navigation and static reading/tool pages. No build dependencies."""
from hashlib import sha256
from html import escape
from pathlib import Path
from string import Template
from urllib.parse import quote
import json

ROOT = Path(__file__).resolve().parent.parent


def asset(prefix, path):
    version = sha256((ROOT / path).read_bytes()).hexdigest()[:12]
    return prefix + path + '?v=' + version


def navigation(prefix='', home=False):
    html = Template((ROOT / 'templates/partials/navigation.html').read_text()).substitute(prefix=prefix)
    return html.replace('href="index.html#', 'href="#') if home else html


def reading_content(reading):
    tags = sorted({tag for item in reading['articles'] for tag in item['tags']})
    topics = sorted({topic for item in reading['articles'] for topic in item['topics']} - set(tags))

    def buttons(names):
        return '<div class="topic-list">' + ''.join(
            f'<button type="button" class="topic-chip" data-filter="{escape(name, quote=True)}" aria-pressed="false">{escape(name)}</button>'
            for name in names) + '</div>'

    filters = buttons(tags)
    if topics:
        filters += '<details class="more-topics"><summary>More topics</summary>' + buttons(topics) + '</details>'
    entries = []
    for item in reading['articles']:
        names = list(dict.fromkeys(item['tags'] + item['topics']))
        article_id = quote(item['id'], safe='')
        entries.append(f'''<article class="reading-item" id="{escape(item['id'], quote=True)}" data-topics="{escape(json.dumps(names), quote=True)}">
          <time class="reading-date" datetime="{escape(item['published'], quote=True)}">{escape(item['published'])}</time>
          <div class="reading-copy">
            <h3><a href="{escape(item['url'], quote=True)}" target="_blank" rel="noopener noreferrer">{escape(item['title'])}</a></h3>
            <p class="reading-meta">{escape(item['venue'])}</p>
            <p class="reading-blurb">{escape(item['blurb'])}</p>
            <div class="text-links"><a href="{escape(item['url'], quote=True)}" target="_blank" rel="noopener noreferrer">Read article <span aria-hidden="true">↗</span></a><a href="{escape(item['notesUrl'], quote=True)}">Notes</a><a href="quiz.html?set={article_id}&amp;mode=flashcards">Flashcards</a><a href="quiz.html?set={article_id}&amp;mode=quiz">Quiz</a></div>
            <div class="reading-writeup"><h4>Takeaway</h4><p>{escape(item.get('writeup', ''))}</p></div>
            <details class="article-topics"><summary>Topics</summary><p>{escape(' · '.join(names))}</p></details>
          </div>
        </article>''')
    return filters, '\n'.join(entries)


def build_pages(reading, updated):
    configs = [
        ('reading/index.html', 'reading', 'Reading logs', 'Reading notes, topics, and recap questions.', '../', ['assets/reading.js']),
        ('reading/quiz.html', 'recap', 'Recap Studio', 'Flashcards and quizzes for the reading log.', '../', ['reading/data.js', 'assets/recap.js']),
        ('reading/notes/frontier-training-methodologies.html', 'note', 'Frontier model training methodologies', 'Reading summary and draft notes on frontier model training.', '../../', []),
        ('diff.html', 'diff', 'Text diff', 'Compare two versions of a text in your browser.', '', ['assets/diff.js']),
        ('qrcode.html', 'qrcode', 'QR code generator', 'Create and download a QR code in your browser.', '', ['assets/vendor/qrcode.min.js', 'assets/qrcode.js']),
    ]
    filters, entries = reading_content(reading)
    note = next(article for article in reading['articles'] if article['id'] == 'frontier-training-methodologies')
    (ROOT / 'reading/index.md').write_text((ROOT / 'reading.md').read_text())
    (ROOT / 'reading/quiz.md').write_text((ROOT / 'reading.md').read_text())
    note_markdown = f'''# Frontier model training methodologies

Source: [{note['venue']}]({note['url']})
Published: {note['published']}

## Reading summary

{note['writeup']}

## Notes in progress

The detailed notes and figures are still a draft. The HTML page contains a writing outline, not completed notes.

[Reading log](https://yashmaurya.com/reading/) · [Flashcards and quiz questions](https://yashmaurya.com/reading/quiz.md)
'''
    (ROOT / 'reading/notes/frontier-training-methodologies.md').write_text(note_markdown)
    for path, template, title, description, prefix, scripts in configs:
        markdown_url = Path(path).with_suffix('.md').name
        body = Template((ROOT / f'templates/pages/{template}.html').read_text()).substitute(
            reading_filters=filters, reading_entries=entries,
            reading_count=f'{len(reading["articles"])} reading' + ('s' if len(reading['articles']) != 1 else ''),
            reading_summary=escape(note['writeup']),
            draft_outline=(ROOT / 'templates/partials/notes-outline.html').read_text())
        script_tags = '\n'.join(f'  <script src="{asset(prefix, script)}" defer></script>' for script in ['assets/navigation.js'] + scripts)
        footer = f'''<footer class="wrap site-footer"><span>© {updated[:4]} Yash Maurya</span><div><a href="{prefix}reading/">Reading</a><a href="{prefix}diff.html">Text diff</a><a href="{prefix}qrcode.html">QR code</a><a href="{markdown_url}">Markdown</a></div></footer>'''
        html = f'''<!doctype html>
<!-- Generated by scripts/build_site.py. Edit templates/pages/ and assets/, then rebuild. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)} | Yash Maurya</title>
  <meta name="description" content="{escape(description, quote=True)}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#ffffff">
  <link rel="canonical" href="https://yashmaurya.com/{path.replace('index.html', '')}">
  <link rel="icon" href="{prefix}images/favicon.png" type="image/png">
  <link rel="alternate" type="text/markdown" href="{markdown_url}" title="This page in Markdown">
  <link rel="describedby" href="{prefix}llms.txt" type="text/plain">
  <link rel="stylesheet" href="{asset(prefix, 'assets/site.css')}">
  <link rel="stylesheet" href="{asset(prefix, 'assets/pages.css')}">
  <script>try {{ const theme = localStorage.getItem('theme'); if (theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.dataset.theme = 'dark'; }} catch (_) {{}}</script>
{script_tags}
</head>
<body class="subpage {template}-page">
  <a class="skip-link" href="#main">Skip to content</a>
{navigation(prefix)}
{body}
{footer}
</body>
</html>
'''
        (ROOT / path).write_text(html)
