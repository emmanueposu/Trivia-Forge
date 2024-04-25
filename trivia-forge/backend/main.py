from flask import Flask, request, jsonify
from config import create_app
from dotenv import load_dotenv

app = create_app()

def test_supabase_connection():
    try:
        # Replace 'your_table' with an actual table name to test fetching data
        supabase = app.config['CLIENT']  # Ensure this is consistent across your app
        data = supabase.table("Users").select("*").execute()
        if data.status_code == 200:
            print("Data fetched successfully:", data.data)
            return True, "Database connection was successful."
        
        print("Failed to fetch data:", data.error_message)
        return False, data.error_message
    except Exception as e:
        print("An error occurred during the database connection:", e)
        return False, str(e)

@app.route("/users", methods=['GET'])
def get_users():
    supabase = app.config['CLIENT']
    data = supabase.table("users").select("*").execute()
    users = data.data
    # Assuming you have a function to serialize data as JSON
    return jsonify([serialize_user(user) for user in users])

@app.route("/test", methods=['GET'])
def test():
    success, message = test_supabase_connection()
    return jsonify({"success": success, "message": message})

if __name__ == '__main__':
    app.run(debug=True)