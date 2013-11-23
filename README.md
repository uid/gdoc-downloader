gdoc-downloader
===============

`gdoc2latex.py` is a Python script that downloads Google Docs as plain text files
(with LaTeX markup), which enables collaborative workflows. For example, co-authors
can simultaneously edit the same LaTeX files without fear of merge conflicts.


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
    
to download a set of Google Docs to your computer in parallel, which is faster than running
`gdoc2latex.py` separately for each file. Customize the `files` list in `parallel_download_gdocs.py` to
specify which files to download. Here is an example configuration:

    files = [
        ('https://docs.google.com/document/d/1XhnvsR9uje1m0mu-RvJ9_ZtsqnsqO1NgtHm9c2MKi0A/edit', 'paper.tex'),
        ('https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit', 'intro.tex'),
        ('https://docs.google.com/document/d/1Nt8d_-mwu2z1S1-zgakHxFxb246ZJu2DkN6BwwC0roY/edit', 'conclusion.tex'),
    ]

Running this script will download the first file and save it as `paper.tex`, the second as `intro.tex`, and the
third as `conclusion.tex`.

This script terminates only when **all** of the files have been downloaded.


### Downloading and compiling LaTeX

Run `make` in the top-level directory to execute the following contents of the `Makefile`:

    all:
	    python parallel_download_gdocs.py
	    pdflatex paper.tex
	    
This will download three Google Docs LaTeX files specified in `parallel_download_gdocs.py` and run
`pdflatex` to compile them into `paper.pdf`.

Note that some of files required by the LaTeX document (e.g., `sigchi.cls` and `figures/nerd-cat.jpg`)
are stored locally, not in Google Docs. So you do not need to put everything in the cloud.


### Collaborative LaTeX workflow

Here is how multiple people can simulataneously edit and compile LaTeX files using these scripts:

1. Create a Google Drive directory and make it editable by anyone with the link
2. Create a Dropbox folder shared amongst all co-authors.
3. Put the scripts in this repository into the shared Dropbox folder.
4. Put auxiliary files (e.g., style and image files) into the shared Dropbox folder.
5. Create an arbitrary number of Google Docs representing LaTeX files ([example](https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit)), and add their URLs and filenames to `parallel_download_gdocs.py`.
6. Now all co-authors can simultaneously edit without conflicts.
7. To compile a PDF, run `make` in the shared Dropbox folder (see above).


The benefits of this workflow over traditional version control systems are:

- lack of merge conflicts
- leaving comments in Google Docs margins
- seeing everyone's cursors
- in-document chat
- revision history diff view is good (as long as each individual LaTeX file is not huge)


However, some drawbacks are:

- cannot use your own favorite text editor
- no LaTeX syntax highlighting in Google Docs editor
- requires Internet access to write in Google Docs (it is possible to write offline, but then merge conflicts can result)
- navigating through a long document feels slow (but section headings and Table of Contents help)


