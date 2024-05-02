from flask import Blueprint


bp = Blueprint('home', __name__, url_prefix='/')


@bp.get('')
def get_home():
    return 'Welcome to Trivia Forge!'
