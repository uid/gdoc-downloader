# downloads N GDocs files in parallel and then terminates only when all
# files have been downloaded

from gdoc2latex import download_to_file
from multiprocessing import Process

files = [
  ('https://docs.google.com/document/d/1XhnvsR9uje1m0mu-RvJ9_ZtsqnsqO1NgtHm9c2MKi0A/edit', 'paper.tex'),
  ('https://docs.google.com/document/d/11ptby0jKoXqV06jbLf2-MAcqrvwynNjKFJBoaAQI5gg/edit', 'intro.tex'),
  ('https://docs.google.com/document/d/1Nt8d_-mwu2z1S1-zgakHxFxb246ZJu2DkN6BwwC0roY/edit', 'conclusion.tex'),
]

for tup in files:
    # spawn a new process 
    Process(target=download_to_file, args=tup).start()

