#from flask_sqlalchemy import SQLAlchemy
from flask import Flask
#from flask_cors import CORS
from supabase import create_client, Client
#from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

def create_app():

    app = Flask(__name__)
    config = dotenv_values("./.env")
    url: str = config.get('SUPABASE_URL')
    key: str = config.get('SUPABASE_KEY')
    supabase: Client = create_client(url, key)
    app.config['Client'] = supabase
    return app



