import React, { useState } from "react"; // variables that cause the component to re-render when they change
import OpenAI from "openai";
import { useNavigate } from "react-router-dom";


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
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const navigate = useNavigate();
    


    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent default form submission behavior(browser reload)

        let prompt = `Generate ${numberOfQuestions} trivia questions about ${category}.`;
        if (isMultipleChoice) {
            prompt += "Each question should include four multiple-choice options, the correct answer, and a fun fact. Separate each component with a newline.";
        } else {
            prompt += "Each question should come with its answer and a fun fact. Separate each component with a newline.";
        }

        // api call
        try {

            // API call to OpenAI
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompt }],
                // adjust and use token limit if necessary
                // max_tokens: 200
                // implment and adjust temperature if needed
                // temperature scale is 0-1 and used to tune randomness of output
                // temperature: .5
            });
            
            const questions = completion.choices[0].message.content.split('\n'); // store trivia questions
            // state property to pass data as object to new route
            navigate('/review', { state: { questions } });
            //console.log(completion.choices[0].message);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    };

    // render component as a form
    return (
        <div>
            <h1>
                Trivia Generator
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="triviaTitle">Number of Questions:</label>
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
                    <label htmlFor="triviaCategory">Category:</label>
                    <input 
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="form-control" 
                        id="triviaCategory" 
                        placeholder="Category" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="multipleChoice">Include Multiple Choice Answers:</label>
                    <input 
                        type="checkbox"
                        checked={isMultipleChoice}
                        onChange={e => setIsMultipleChoice(e.target.value)}
                        //className="form-control" 
                        id="multipleChoice" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Generate</button>
            </form>

        </div>
    );

}
export default TriviaGenPage;
