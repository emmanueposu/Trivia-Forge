import React from "react";
import Choices from "../Components/Choices";
import { Card } from "react-bootstrap";

import { Question } from "../Model/Question";

function Questions({ data }) {
    let choices = data.choices;
    return (
        <div>
            <Card className="CardPadding">
                <h2 className="centered">Question</h2>
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.question}></textarea>
                </div>
                <h2>Choices</h2>
                <Choices choices={choices} />
                <h2>Answer</h2>
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.answer}></textarea>
                </div>
                <h2>Hint</h2>
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.hint}></textarea>
                </div>
            </Card>
        </div>
    )
}
export default Questions;