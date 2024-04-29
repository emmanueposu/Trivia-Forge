from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from dotenv import dotenv_values


bp = Blueprint('question', __name__, url_prefix='/questions')

config = dotenv_values("./.env")
url: str = config.get('SUPABASE_URL')
key: str = config.get('SUPABASE_KEY')
supabase: Client = create_client(url, key)


@bp.route('', methods=['POST', 'GET'])
def post_get_questions():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_question = supabase.table("Questions").insert(data).execute()
            return jsonify(new_question.data[0])
        except Exception as e:
            return {"error": e.details}
    elif request.method == 'GET':
        query = supabase.table("Questions").select("*").execute()
        questions = query.data
        if not questions:
            return {"error": "No questions found"}
        return jsonify([question for question in questions])


@bp.route('/<question_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_question(question_id):
    query = supabase.table("Questions").select("*").eq("id", question_id).execute()
    question = query.data
    if not question:
        return {"error": "Question not found"}
    elif request.method == 'GET':
        return jsonify(question[0])
    elif request.method == 'PATCH':
        data = request.get_json()
        updated_data = {'problem': data['problem'],
                        'answer': data['answer'],
                        'multiple_choice': data['multiple_choice'],
                        'hint': data['hint'],
                        'category_id': data['category_id']}
        updated_question = supabase.table("Questions").update(updated_data).eq("id", question_id).execute()
        return jsonify(updated_question.data[0])
    elif request.method == 'DELETE':
        supabase.table("Questions").delete().eq("id", question_id).execute()
        return {}
