import React from "react";
import ReviewQuestions from "../Components/ReviewQuestions";


function ReviewCategories({ category, index, changeValue, isMultipleChoice }) {
    let questions = category.questions;
    const path = ['categories', index];

    return (
        <div>
            <h2>{category.title || category.name}</h2>
            {questions.map((question, index) => {
                return (
                    <ReviewQuestions key={index} data={question} path={path} index={index} changeValue={changeValue} isMultipleChoice={isMultipleChoice} />
                );
            })}
        </div>
    );
}

export default ReviewCategories;
