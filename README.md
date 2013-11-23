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


### Downloading multiple files

Run:

    python parallel_download_gdocs.py
    
to download a set of Google Docs to your computer in parallel, which runs faster than running
`gdoc2latex.py` separately for each file. Customize the `files` list in `parallel_download_gdocs.py` to
specify which files to download. Here is an example configuration:

    files = [
        ('https://docs.google.com/document/d/1XhnvsR9uje1m0mu-RvJ9_ZtsqnsqO1NgtHm9c2MKi0A/edit', 'paper.tex'),
        ('https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit', 'intro.tex'),
        ('https://docs.google.com/document/d/1Nt8d_-mwu2z1S1-zgakHxFxb246ZJu2DkN6BwwC0roY/edit', 'conclusion.tex'),
    ]

Running this script will download the first file and save it as `paper.tex`, the second one as `intro.tex`, and the
third one as `conclusion.tex`.

This script terminates only when **all** of the files have been downloaded.


### Collaborative LaTeX workflow

Run `make` in the top-level directory to execute the following contents of the `Makefile`:

    all:
	    python parallel_download_gdocs.py
	    pdflatex paper.tex
	    
This will download three Google Docs LaTeX files (specified in `parallel_download_gdocs.py`) and then run
`pdflatex` to compile them into `paper.pdf`. Note that style files such as `sigchi.cls` and image files
such as `figures/nerd-cat.jpg` are stored locally, not in Google Docs.

1. Create a Google Drive directory and make it editable by anyone with the link, then create individual documents representing LaTeX files ([example](https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit))
2. Create a Dropbox folder shared among all co-authors.
3. Put the scripts in this repository into the shared Dropbox folder.
4. Put auxiliary files (e.g., style and image files) into the shared Dropbox folder.
5. Now whenever you want to compile LaTeX into PDF, run `make`, which downloads all of the Google Docs in parallel, saves them locally as *.tex files, and runs `pdflatex` to compile everything into a PDF.

