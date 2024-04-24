import React, { useState } from "react";
import OpenAI from "openai";


// initialize openai client
// reference: https://platform.openai.com/docs/api-reference/making-requests
const openai = new OpenAI({
    // vite does not process 'process.env' like Create React APP, use import.meta.env
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

function TriviaGenPage() {
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [category, setCategory] = useState('');
    


    const handleSubmit = async (event) => {
        event.preventDefault();

        // api call
        try {
            const prompt = `Generate ${numberOfQuestions} trivia questions about ${category}.`;

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
            
            console.log(completion.choices[0]);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
        }
    };


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
                    <label htmlFor="triviaAnswer">placeholder</label>
                    <input type="text" className="form-control" id="triviaAnswer" placeholder="Place holder" />
                </div>
                <button type="submit" className="btn btn-primary">Generate</button>
            </form>

        </div>
    );

}
export default TriviaGenPage;
