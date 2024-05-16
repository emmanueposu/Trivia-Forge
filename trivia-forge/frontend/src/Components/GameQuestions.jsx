import { React, useState, useEffect } from "react";
import { getCategories, getQuestions } from "../Services/TF-db_services";

function GameQuestions(game) {
    const [categories, setCategories] = useState(null);
    const [questions, setQuestions] = useState(null);


    useEffect(() => {
        getCategories(game.data).then( res => {
            setCategories(res);
        });
    }, []);

    useEffect(() => {
        if (categories) {
            const category_ids = new Set();
            for (let i = 0; i < categories.length; i++) {
                category_ids.add(categories[i].id)
            };

            getQuestions(category_ids).then( res => {
                setQuestions(res);
            });
        }
    }, [categories]);

    return (
        <>
            {questions && (
                <span>{questions.length}</span>
            )}
        </>
    )
}

export default GameQuestions;