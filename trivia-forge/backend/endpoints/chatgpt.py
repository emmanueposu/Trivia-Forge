import os
from dotenv import load_dotenv
from flask import Blueprint, request
from openai import OpenAI

load_dotenv()

bp = Blueprint('chatgpt', __name__, url_prefix='/chatgpt')
# initialize openai client using configuration specified in vite environment variables 
# reference: https://platform.openai.com/docs/api-reference/making-requests
openai = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@bp.post('')
def post_prompt():
    data = request.get_json()
    responses = []

    for i in range(len(data['categories'])):
        prompt = f"Generate {data['numberOfQuestions']} trivia questions that have an overall theme of {data['Theme']} about {data['categories'][i]['name']}."

        if data['isMultipleChoice']:
             prompt += "Each question should be in the format Question:...\nChoice:...\nChoice:...\nChoice:...\nChoice:...\nAnswer:...\nHint:...\n---\nQuestion:... ect. Do not include A), B), C), or D) in the choices."
        else:
            prompt += "Each question should be in the format \nQuestion:...\nAnswer:...\nHint:...\n---\nQuestion:... ect."
        # api call
        try:
            # API call to OpenAI
            completion = openai.chat.completions.create(
                messages = [{ "role": "user", "content": prompt }],
                model = "gpt-3.5-turbo",
                # adjust and use token limit if necessary
                # max_tokens: 200
                # implment and adjust temperature if needed
                # temperature scale is 0-1 and used to tune randomness of output
                # temperature: .5
            )
            response = completion.choices[0].message.content.split('\n');
            responses.append(response)
        except Exception as error:
            print('Error calling OpenAI API:', error)
    # create a new game and category object and add category to game
    # need to change third parameter to current User ID once Users can sign in.    
    game = {'id': None,
            'name': data['Title'],
            'theme': data['Theme'],
            'categories': [],
            'userID': data['user']['id']}
    
    for i in range(len(data['categories'])):
        newCategory = {'id': None,
                       'name': data['categories'][i]['name'],
                       'gameID': None,
                       'questions': []}     
        game['categories'].append(newCategory)
        # parse response from API
        sections = responses[i] # store trivia questions
        temp = []
        for i in range(len(sections)):
            if sections[i] != "":
                temp.append(sections[i])
        sections = temp
        # loop through sections and create question and choice objects    
        if data['isMultipleChoice']:
            for i in range(0, len(sections), 7):
                question = sections[i][10:]
                choices = []
                for k in range(4):
                    choice = sections[i + k + 1]
                    newChoice = {'id': None,
                                 'text': choice[8:],
                                 'questionID': None}
                    choices.append(newChoice)

                answer = sections[i + 5][8:]
                hint = sections[i + 6][6:]
                # create question object and add it to category
                newQuestion = {'id': None,
                               'question': question,
                               'answer': answer,
                               'hint': hint,
                               'multipleChoice': data['isMultipleChoice'],
                               'categoryID': None,
                               'choices': []}
                newCategory['questions'].append(newQuestion)
                # add choices to question object
                for i in range(len(choices)):
                    newQuestion['choices'].append(choices[i])
        else:
            for j in range(0, len(sections), 3):
                question = sections[j][10:]
                answer = sections[j + 1][8:]
                hint = sections[j + 2][6:]
                # create question object and add it to category
                newQuestion = {'id': None,
                               'question': question,
                               'answer': answer,
                               'hint': hint,
                               'multipleChoice': data['isMultipleChoice'],
                               'categoryID': None,
                               'choices': []}
                newCategory['questions'].append(newQuestion)
    return game
