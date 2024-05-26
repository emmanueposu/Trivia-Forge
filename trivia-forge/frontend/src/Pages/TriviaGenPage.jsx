import React, { useState } from "react"; // variables that cause the component to re-render when they change
import OpenAI from "openai";
import { Game } from "../Models/Game";
import { useNavigate } from "react-router-dom";
import { Question } from "../Models/Question";
import { Choice } from "../Models/Choice";
import { Category } from "../Models/Category";
import { Card } from "react-bootstrap";
import useStore from '../Components/useStore'; // global state management



// initialize openai client using configuration specified in vite environment variables 
// reference: https://platform.openai.com/docs/api-reference/making-requests
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY, // vite does not process 'process.env' like Create React APP, use import.meta.env
    dangerouslyAllowBrowser: true // set to true to enable local testing (not recommended for production)
});

function TriviaGenPage() {
    // state hooks for managaing number of questions and catergory input by user 
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [category, setCategory] = useState('');
    const [Title, setTitle] = useState('');
    const [Theme, setTheme] = useState('');
    const [categories, setCategories] = useState([]);
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const navigate = useNavigate();
    const user = useStore(state => state.currentUser); // get current user from global state
    // custom hook for adding game to global state
    const addGame = useStore(state => state.addGame);

    const handleAddCategory = () => {
        const newCategory = { name: '' };
        setCategories([...categories, newCategory]);
    };

    const handleChangeCategoryDetail = (index, field, value) => {
        const newCategories = categories.map((category, idx) => {
            if (idx === index) {
                return { ...category, [field]: value };
            }
            return category;
        });
        setCategories(newCategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent default form submission behavior(browser reload)

        let responses = []

        for (let i = 0; i < categories.length; i++) {
            let prompt = `Generate ${numberOfQuestions} trivia questions that have an overall theme of ${Theme} about ${categories[i].name}.`;
            if (isMultipleChoice) {
                prompt += "Each question should be in the format Question:...\nChoice:...\nChoice:...\nChoice:...\nChoice:...\nAnswer:...\nHint:...\n---\nQuestion:... ect. include four multiple-choice options";
            } else {
                prompt += "Each question should be in the format \nQuestion:...\nAnswer:...\n---\nQuestion:... ect.";
            }

            // api call
            try {

                // API call to OpenAI
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    // adjust and use token limit if necessary
                    // max_tokens: 200
                    // implment and adjust temperature if needed
                    // temperature scale is 0-1 and used to tune randomness of output
                    // temperature: .5
                });
                let response = completion.choices[0].message.content.split('\n');

                responses.push(response);
            }
            catch (error) {
                console.error('Error calling OpenAI API:', error);
            }
        }
        //create a new game and category object and add category to game
        //need to change third parameter to current User ID once Users can sign in.
        let game = new Game(Title, Theme, 1);

        for (let i = 0; i < categories.length; i++) {
            let newCategory = new Category(categories[i].name);
            console.log(newCategory.name);
            game.addCategory(newCategory);

            //parse response from API
            let sections = responses[i]; // store trivia questions
            for (let i = 0; i < sections.length; i++) {
                if (sections[i] === '') { sections.splice(i, 1); }
            }
            //loop through sections and create question and choice objects
            for (let i = 0; i < sections.length; i += 7) {
                let question = sections[i];
                let choices = [];
                for (let k = 0; k < 4; k++) {
                    let choice = sections[i + k + 1];
                    let newChoice = new Choice(choice);
                    choices.push(newChoice);
                }
                let answer = sections[i + 5];
                let hint = sections[i + 6];

                //create question object and add it to category
                let newQuestion = new Question(question, answer, hint, isMultipleChoice);
                newCategory.addQuestion(newQuestion);

                //add choices to question object
                for (let i = 0; i < choices.length; i++) {
                    newQuestion.addChoice(choices[i]);
                }
            }

            console.log("Category Questions:", newCategory.questions);
        }
        console.log("Game Categories", game.categories);

        // Save game to global state and local storage
        addGame(game);
        // state property to pass data as object to new route
        navigate('/review', { state: { game: game, page: 'review' } });
        //console.log(completion.choices[0].message);


    };

    // render component as a form
    return (
        <div>
            <title>Create New Trivia</title>
            <h1>
                Trivia Generator
            </h1>
            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="triviaTitle">Title:</label>
                        <input
                            type="text"
                            value={Title}
                            onChange={e => setTitle(e.target.value)}
                            className="form-control"
                            id="triviaTitle"
                            placeholder="Title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="triviaTitle">Theme:</label>
                        <input
                            type="text"
                            value={Theme}
                            onChange={e => setTheme(e.target.value)}
                            className="form-control"
                            id="triviaTheme"
                            placeholder="Theme"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="triviaTitle">Number of Questions per Category:</label>
                        <input
                            type="number"
                            value={numberOfQuestions}
                            onChange={e => setNumberOfQuestions(Math.min(10, Math.max(1, parseInt(e.target.value, 10))))}
                            className="form-control"
                            id="triviaTitle"
                            placeholder="Number of Questions"
                        />
                    </div>

                    <div className="form-group">

                        {categories.map((category, index) => (
                            <Card key={index} className="CardPadding">
                                <div >
                                    <label>Category Name:</label>
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={e => handleChangeCategoryDetail(index, 'name', e.target.value)}
                                        className="form-control"
                                        id="categoryName"
                                        placeholder="Category"
                                    />

                                    <br />
                                </div>
                            </Card>

                        ))}

                    </div>
                    <button type="button" className="btn btn-secondary" onClick={handleAddCategory}>Add Category</button>



                    <div className="form-group">
                        <label htmlFor="multipleChoice">Include Multiple Choice Answers:</label>
                        <input
                            type="checkbox"
                            checked={isMultipleChoice}
                            onChange={e => setIsMultipleChoice(!isMultipleChoice)}
                            //className="form-control" 
                            id="multipleChoice"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Generate</button>
                </form >
            </Card >

        </div >
    );

}
export default TriviaGenPage;
