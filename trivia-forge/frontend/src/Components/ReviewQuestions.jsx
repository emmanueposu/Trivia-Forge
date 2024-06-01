import React from "react";
import ReviewChoices from "../Components/ReviewChoices";
import { Card } from "react-bootstrap";
import { Question } from "../Models/Question";


//logic for button to generate new question
//
//
//
//

function ReviewQuestions({ data, path, index, changeValue, isMultipleChoice }) {
    let choices = data.choices;
    let newPath = structuredClone(path);
    const key = data.problem ? "problem" : "question";
    newPath.push('questions', index);

    return (
        <div>
            <Card className="CardPadding">
                <h2 className="centered">Question</h2>
                {/* //Button to generate new question somewhere in here */}
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.problem || data.question} onChange={(e) => { changeValue(newPath, key, e.target.value) }}></textarea>
                </div>

                {isMultipleChoice && (
                    <>
                        <h2>Choices</h2>
                        {choices.map((choice, index) => {
                            return (
                                <ReviewChoices key={index} data={choice} path={newPath} index={index} changeValue={changeValue} />
                            );
                        })}
                    </>
                )}

                <h2>Answer</h2>
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.answer} onChange={(e) => { changeValue(newPath, "answer", e.target.value) }}></textarea>
                </div>

                <h2>Hint</h2>
                <div className="card-body">
                    <textarea className="form-control" defaultValue={data.hint} onChange={(e) => { changeValue(newPath, "hint", e.target.value) }}></textarea>
                </div>
            </Card>
        </div >
    )
}
export default ReviewQuestions;
