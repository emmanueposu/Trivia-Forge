import React from "react";
import Questions from "../Components/Questions";

function Categories({ category, index, changeValue, isMultipleChoice }) {
    let questions = category.questions;
    const path = ['categories', index];
    
    return (
        <div>
            <h2>{category.title || category.name}</h2>
            {questions.map((question, index) => {
                return (
                    <Questions key={index} data={question} path={path} index={index} changeValue={changeValue} isMultipleChoice={isMultipleChoice}/>
                );
            })}
        </div>
    );
}
export default Categories;