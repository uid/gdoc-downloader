#!/usr/bin/env python2.7
# gdoc2latex.py uses Python 2.7 syntax.

# Note that the Google Drive REST API v3 is great for downloading files in a range of formats
# using the HTTP Accept header (e.g. Accept: text/plain).
# https://developers.google.com/drive/v3/web/manage-downloads#downloading_google_documents

"""
usage:
  python gdoc2text.py <URL> [<username>]
  python gdoc2text.py <.gdoc or .gddoc filename> [<username>]

example:
  python gdoc2text.py https://docs.google.com/document/d/1yEyXxtEeQ5_E7PibjYpofPC6kP4jMG-EieKhwkK7oQE/edit
  python gdoc2text.py test.gddoc

example for private documents:
  python gdoc2text.py https://docs.google.com/document/d/1yEyXxtEeQ5_E7PibjYpofPC6kP4jMG-EieKhwkK7oQE/edit USERNAME
"""

from gdoc2latex import fetchGoogleDoc, html_to_text
import getpass
import sys

def main():
    arg_count = len(sys.argv) - 1
    if arg_count == 0 or arg_count > 2:
        sys.stderr.write(__doc__)
        sys.exit(1)

    if arg_count == 1:
        html = fetchGoogleDoc(sys.argv[1])
    else:
        password = getpass.getpass()
        html = fetchGoogleDoc(sys.argv[1], sys.argv[2], password)

    text = html_to_text(html)
    sys.stdout.write(text)


if __name__ == '__main__':
    main()
