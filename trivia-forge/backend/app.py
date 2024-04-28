import os
from flask import Flask, render_template, json, redirect

app = Flask(__name__)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

@app.route('/')
def home():
    return 'Hello, World!'
