from flask import Blueprint, request, jsonify
from supabase import create_client, Client
from dotenv import dotenv_values


bp = Blueprint('user', __name__, url_prefix='/users')

config = dotenv_values("./.env")
url: str = config.get('SUPABASE_URL')
key: str = config.get('SUPABASE_KEY')
supabase: Client = create_client(url, key)


def serialize_user(user):
    """Convert user dictionary to a JSON serializable format."""
    return {
        "id": user.get("id"),
        "username": user.get("username"),
        "email": user.get("email")
    }


@bp.route('', methods=['POST', 'GET'])
def post_get_users():
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_user = supabase.table("Users").insert(data).execute()
            return jsonify(new_user.data[0])
        except Exception as e:
            return {"error": e.details}
    elif request.method == 'GET':
        query = supabase.table("Users").select("*").execute()
        users = query.data
        if not users:
            return {"error": "No users found"}
        return jsonify([serialize_user(user) for user in users])


@bp.route('/<user_id>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_user(user_id):
    query = supabase.table("Users").select("*").eq("id", user_id).execute()
    user = query.data
    if not user:
        return {"error": "User not found"}
    elif request.method == 'GET':
        return jsonify(serialize_user(user[0]))
    elif request.method == 'PATCH':
        data = request.get_json()
        updated_data = {'password': data['password'], 'email': data['email']}
        updated_user = supabase.table("Users").update(updated_data).eq("id", user_id).execute()
        return jsonify(updated_user.data[0])
    elif request.method == 'DELETE':
        supabase.table("Users").delete().eq("id", user_id).execute()
        return {}
