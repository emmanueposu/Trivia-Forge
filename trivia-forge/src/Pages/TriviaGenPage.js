import React from "react";

function TriviaGenPage() {
    return (
        <>
            <h1>
                Trivia Generator
            </h1>
            <form>
                <div className="form-group">
                    <label for="triviaTitle">placeholder</label>
                    <input type="text" className="form-control" id="triviaTitle" placeholder="Place holder" />
                </div>
                <div className="form-group">
                    <label for="triviaQuestion">placeholder</label>
                    <input type="text" className="form-control" id="triviaQuestion" placeholder="Place holder" />
                </div>
                <div className="form-group">
                    <label for="triviaAnswer">placeholder</label>
                    <input type="text" className="form-control" id="triviaAnswer" placeholder="Place holder" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    );

}
export default TriviaGenPage;