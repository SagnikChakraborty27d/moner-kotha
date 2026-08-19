from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
app=FastAPI(title='Moner Kotha API')
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])
SONGS=json.loads(Path(__file__).parents[1].joinpath('data/songs.json').read_text(encoding='utf-8'))
@app.get('/health')
def health(): return {'status':'ok','service':'moner-kotha-api'}
@app.get('/songs')
def get_songs(): return SONGS
@app.get('/songs/{song_id}')
def get_song(song_id:str): return next((s for s in SONGS if s['id']==song_id), None)
