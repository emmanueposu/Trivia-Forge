import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from supabase import create_client, Client

load_dotenv()

bp = Blueprint('game', __name__, url_prefix='/games')

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
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

    # @bp.route('/games_with_details', methods=['GET'])
    # def get_games_with_details():
    #     user_id = request.args.get('user_id')
    #     try:
    #         games_query = supabase.table("Games").select("*").eq("user_id", user_id).execute()
    #         games = games_query.data
    #         print(games)
        
    #         if not games:
    #             return {"error": "No games found"}
        
    #      # Fetch related data
    #         game_ids = [game['id'] for game in games]
    #         try:
    #             categories_query = supabase.table("Categories").select("*").eq("game_id", game['id']).execute()
    #             categories = categories_query.data
    #         except Exception as e:
    #             return {"error": "No categories found while fetching details"}
        
    #         try:
    #             questions_query = supabase.table("Questions").select("*").eq("category_id", category['id']).execute()
    #             questions = questions_query.data
    #         except Exception as e:
    #             return {"error": "No questions found while fetching details"}

    #         try:
    #             choices_query = supabase.table("Choices").select("*").execute()
    #             choices = choices_query.data
    #         except Exception as e:
    #             return {"error": "No choices found while fetching details"}

    #      # Organize data into a nested structure
    #         game_details = []
    #         for game in games:
    #             game_detail = game
    #             game_categories = [category for category in categories if category['game_id'] == game['id']]
    #             for category in game_categories:
    #                 category_questions = [question for question in questions if question['category_id'] == category['id']]
    #                 for question in category_questions:
    #                     question_choices = [choice for choice in choices if choice['question_id'] == question['id']]
    #                     question['choices'] = question_choices
    #                 category['questions'] = category_questions
    #             game_detail['categories'] = game_categories
    #             game_details.append(game_detail)
        
    #         return jsonify(game_details)
    #     except Exception as e:
    #         return {"error": str(e)}


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
        print(f"Fetching games with details for user_id: {user_id}")
        games_query = supabase.table("Games").select("*").eq("user_id", user_id).execute()
        games = games_query.data
        
        game_details = []
        for game in games:
            game_detail = game
            categories_query = supabase.table("Categories").select("*").eq("game_id", game['id']).execute()
            categories = categories_query.data
            for category in categories:
                questions_query = supabase.table("Questions").select("*").eq("category_id", category['id']).execute()
                questions = questions_query.data
                for question in questions:
                    choices_query = supabase.table("Choices").select("*").eq("question_id", question['id']).execute()
                    choices = choices_query.data
                    question['choices'] = choices
                category['questions'] = questions
            game['categories'] = categories
            game_details.append(game_detail)
        #print(game_details)
        print(f"Returning game details:")
        return jsonify(game_details)
    except Exception as e:
        print(f"Error fetching games with details: {str(e)}")
        return jsonify({"error": str(e)})