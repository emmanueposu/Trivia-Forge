import React, { useState } from "react"; // variables that cause the component to re-render when they change
import OpenAI from "openai";
import { Game } from "../models/game";
import { useNavigate } from "react-router-dom";
import { Question } from "../models/question";
import { Choice } from "../models/choice";
import { Category } from "../models/category";
import { Card } from "react-bootstrap";
import useStore from '../hooks/useStore'; // global state management
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import GenerateButtonTooltip from "../components/GenerateButtonTooltip";

// initialize openai client using configuration specified in vite environment variables 
// reference: https://platform.openai.com/docs/api-reference/making-requests
const openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY, // vite does not process 'process.env' like Create React APP, use import.meta.env
    dangerouslyAllowBrowser: true // set to true to enable local testing (not recommended for production)
});

function TriviaGenPage() {
    // state hooks for managaing number of questions and catergory input by user 
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [Title, setTitle] = useState('');
    const [Theme, setTheme] = useState('');
    const [categories, setCategories] = useState([{ name: '' }]);
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [spinnerVisibility, setSpinnerVisibility] = useState("none");
    const [submitBtnLabel, setSubmitBtnLabel] = useState("Generate");
    const navigate = useNavigate();
    const user = useStore(state => state.currentUser); // get current user from global state
    const [categoryCount, setCategoryCount] = useState(1);

    const handleAddCategory = () => {
        if (categoryCount >= 5) {
            return;
        }
        else {
            const newCategory = { name: '' };
            setCategories([...categories, newCategory]);
            let count = categoryCount
            setCategoryCount(count + 1);
        }
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

        setSubmitBtnLabel("Generating...")
        setSpinnerVisibility("")

        let responses = []

        for (let i = 0; i < categories.length; i++) {
            let prompt = `Generate ${numberOfQuestions} trivia questions that have an overall theme of ${Theme} about ${categories[i].name}.`;
            if (isMultipleChoice) {
                prompt += "Each question should be in the format Question:...\nChoice:...\nChoice:...\nChoice:...\nChoice:...\nAnswer:...\nHint:...\n---\nQuestion:... ect. Do not include A), B), C), or D) in the choices.";
            } else {
                prompt += "Each question should be in the format \nQuestion:...\nAnswer:...\nHint:...\n---\nQuestion:... ect.";
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
        let game = new Game(Title, Theme, user.id);

        for (let i = 0; i < categories.length; i++) {
            let newCategory = new Category(categories[i].name);
            game.addCategory(newCategory);
            //parse response from API
            let sections = responses[i]; // store trivia questions
            for (let i = 0; i < sections.length; i++) {
                if (sections[i] === '') { sections.splice(i, 1); }
            }
            //loop through sections and create question and choice objects
            if (isMultipleChoice) {
                for (let i = 0; i < sections.length; i += 7) {
                    let question = sections[i].slice(10);
                    let choices = [];
                    for (let k = 0; k < 4; k++) {
                        let choice = sections[i + k + 1];
                        let newChoice = new Choice(choice.slice(8));
                        choices.push(newChoice);
                    }
                    let answer = sections[i + 5].slice(8);
                    let hint = sections[i + 6].slice(6);

                    //create question object and add it to category
                    let newQuestion = new Question(question, answer, hint, isMultipleChoice);
                    newCategory.addQuestion(newQuestion);

                    //add choices to question object
                    for (let i = 0; i < choices.length; i++) {
                        newQuestion.addChoice(choices[i]);
                    }
                }
            } else {
                for (let j = 0; j < sections.length; j += 3) {
                    let question = sections[j].slice(10);
                    let answer = sections[j + 1].slice(8);
                    let hint = sections[j + 2].slice(6);

                    //create question object and add it to category
                    let newQuestion = new Question(question, answer, hint, isMultipleChoice);
                    newCategory.addQuestion(newQuestion);
                }
            }
        }
        // state property to pass data as object to new route
        navigate('/review', { state: { game: game, page: 'review', isMultipleChoice: isMultipleChoice } });
        //console.log(completion.choices[0].message);
    };
    // render component as a form
    return (
        <>
            <title>Create New Trivia</title>

            <h1 className="text-center mt-5">
                Trivia Generator
            </h1>

            <div className="d-flex justify-content-center">
                <Card className="mt-4" style={{ width: "35rem" }}>
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
                                required
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
                                required
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
                                required
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
                                            required
                                        />
                                        <br />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <button type="button" className="btn btn-secondary ms-4" onClick={handleAddCategory}>Add Category</button>

                        <div className="form-group">
                            <input
                                type="checkbox"
                                checked={isMultipleChoice}
                                onChange={e => setIsMultipleChoice(!isMultipleChoice)}
                                //className="form-control" 
                                id="multipleChoice"
                            />
                            <label htmlFor="multipleChoice" className="ms-2">Include Multiple Choice Answers</label>
                        </div>

                        <div className="d-flex justify-content-center mb-4">
                            {user ? (
                                <Button type="submit" variant="primary">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        style={{ display: spinnerVisibility }}
                                        className="me-2"
                                    />
                                    {submitBtnLabel}
                                </Button>
                            ) : (
                                <GenerateButtonTooltip />
                            )}
                        </div>
                    </form >
                </Card >

            </div >
        </>
    );

}

export default TriviaGenPage;
