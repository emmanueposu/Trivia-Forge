import os
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from supabase import create_client, Client

load_dotenv()

bp = Blueprint('choice', __name__, url_prefix='/choices')

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


@bp.route('', methods=['POST', 'GET'])
def post_get_choices():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_choice = supabase.table("Choices").insert(data).execute()
            return jsonify(new_choice.data[0])
        except Exception as e:
            return {"error": e.details}
    elif request.method == 'GET':
        query = supabase.table("Choices").select("*").execute()
        choices = query.data
        if not choices:
            return {"error": "No choices found"}
        return jsonify([choice for choice in choices])


@bp.route('/<choice_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_choice(choice_id):
    query = supabase.table("Choices").select("*").eq("id", choice_id).execute()
    choice = query.data
    if not choice:
        return {"error": "Choice not found"}
    elif request.method == 'GET':
        return jsonify(choice[0])
    elif request.method == 'PATCH':
        data = request.get_json()
        updated_data = {'text': data['text']}
        updated_choice = supabase.table("Choices").update(updated_data).eq("id", choice_id).execute()
        return jsonify(updated_choice.data[0])
    elif request.method == 'DELETE':
        supabase.table("Choices").delete().eq("id", choice_id).execute()
        return {}
