from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from dotenv import dotenv_values



bp = Blueprint('game', __name__, url_prefix='/games')

config = dotenv_values("./.env")
url: str = config.get('SUPABASE_URL')
key: str = config.get('SUPABASE_KEY')
supabase: Client = create_client(url, key)


@bp.route('', methods=['POST', 'GET'])
def post_get_games():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_game = supabase.table("Games").insert(data).execute()
            return jsonify(new_game.data[0])
        except Exception as e:
            return {"error": e.details}
    elif request.method == 'GET':
        user_id = request.args.get('user_id')
        if user_id:
            query = supabase.table("Games").select("*").eq("user_id", user_id).execute()
        else:
            query = supabase.table("Games").select("*").execute()
        games = query.data
        if not games:
            return {"error": "No games found"}
        return jsonify([game for game in games])


@bp.route('/<game_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_game(game_id):
    query = supabase.table("Games").select("*").eq("id", game_id).execute()
    game = query.data
    if not game:
        return {"error": "Game not found"}
    elif request.method == 'GET':
        return jsonify(game[0])
    elif request.method == 'PATCH':
        data = request.get_json()
        updated_data = {'title': data['title']}
        updated_game = supabase.table("Games").update(updated_data).eq("id", game_id).execute()
        return jsonify(updated_game.data[0])
    elif request.method == 'DELETE':
        supabase.table("Games").delete().eq("id", game_id).execute()
        return {}

@bp.route('/games_with_details', methods=['GET'])
def get_games_with_details():
    user_id = request.args.get('user_id')  
    try:
        games_query = supabase.table("Games").select("*").eq("user_id", user_id).execute()
        games = games_query.data
        
        for game in games:
            categories_query = supabase.table("Categories").select("*").eq("game_id", game['id']).execute()
            categories = categories_query.data
            for category in categories:
                questions_query = supabase.table("Questions").select("*").eq("category_id", category['id']).execute()
                questions = questions_query.data
                category['questions'] = questions
            game['categories'] = categories
        
        return jsonify(games)
    except Exception as e:
        print(f"Error fetching games with details: {str(e)}")
        return jsonify({"error": str(e)})