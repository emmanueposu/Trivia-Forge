from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from dotenv import dotenv_values


bp = Blueprint('category', __name__, url_prefix='/categories')

config = dotenv_values("./.env")
url: str = config.get('SUPABASE_URL')
key: str = config.get('SUPABASE_KEY')
supabase: Client = create_client(url, key)


@bp.route('', methods=['POST', 'GET'])
def post_get_categories():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_category = supabase.table("Categories").insert(data).execute()
            return jsonify(new_category.data[0])
        except Exception as e:
            return {"error": e.details}
    elif request.method == 'GET':
        query = supabase.table("Categories").select("*").execute()
        categories = query.data
        if not categories:
            return {"error": "No categories found"}
        return jsonify([category for category in categories])


@bp.route('/<category_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_category(category_id):
    query = supabase.table("Categories").select("*").eq("id", category_id).execute()
    category = query.data
    if not category:
        return {"error": "Category not found"}
    elif request.method == 'GET':
        return jsonify(category[0])
    elif request.method == 'PATCH':
        data = request.get_json()
        updated_data = {'title': data['title']}
        updated_category = supabase.table("Categories").update(updated_data).eq("id", category_id).execute()
        return jsonify(updated_category.data[0])
    elif request.method == 'DELETE':
        supabase.table("Categories").delete().eq("id", category_id).execute()
        return {}
