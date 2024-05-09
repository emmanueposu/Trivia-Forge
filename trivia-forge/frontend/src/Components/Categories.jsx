import React from "react";
import Questions from "../Components/Questions";

function Categories({ category }) {
    let questions = category.questions;
    return (
        <div>
            <h2>{category.name}</h2>
            {questions.map((question, index) => {
                return (
                    <Questions key={index} data={question} />
                );
            })}
        </div>
    );
}
export default Categories;