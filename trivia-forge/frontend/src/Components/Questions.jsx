import React from "react";
import Choices from "../Components/Choices";

import { Question } from "../Model/Question";

function Questions({ data }) {
    let choices = data.choices;
    return (
        <div>
            <div className="card-body">
                <textarea className="form-control" defaultValue={data.question}></textarea>
            </div>
            <Choices choices={choices} />
            <div className="card-body">
                <textarea className="form-control" defaultValue={data.answer}></textarea>
            </div>
            <div className="card-body">
                <textarea className="form-control" defaultValue={data.hint}></textarea>
            </div>
        </div>
    )
}
export default Questions;