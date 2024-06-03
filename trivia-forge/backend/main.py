import os
from dotenv import load_dotenv
from flask import Flask
from endpoints import home, user, game, category, question, choice
from flask_cors import CORS

load_dotenv()

host = os.environ.get("HOST")


app = Flask(__name__)
CORS(app)

app.register_blueprint(home.bp)
app.register_blueprint(user.bp)
app.register_blueprint(game.bp)
app.register_blueprint(category.bp)
app.register_blueprint(question.bp)
app.register_blueprint(choice.bp)


if __name__ == '__main__':
    app.run(host=host, port=5000, debug=True)
