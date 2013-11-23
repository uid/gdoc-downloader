gdoc-downloader
===============

`gdoc2latex.py` is a Python script that downloads Google Docs as plain-text files,
which enables collaborative workflows such as multiple people editing the same LaTeX files.

### Basic usage

Run:

    python gdoc2latex.py <URL or .gdoc filename>

to download a single Google Doc (specified by either URL or .gdoc filename), convert it
to plain text (with special encoding for LaTeX symbols), and pipe to `stdout`. Note that
the file cannot be private; it must be viewable (or editable) by anyone with the link.

For example, run:

    python gdoc2latex.py https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit

to download [this LaTeX file](https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit)
to `stdout`. Note that the script ignores navigational markers and content before and after
`BEGIN_DOCUMENT` and `END_DOCUMENT` tags, respectively.


### Downloading multiple files in parallel




### Collaborative LaTeX workflow
