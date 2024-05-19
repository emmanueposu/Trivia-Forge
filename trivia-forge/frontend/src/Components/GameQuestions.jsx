import { React, useState, useEffect } from "react";
import { getCategories, getQuestions } from "../Services/TF-db_services";

function GameQuestions(game) {
    //const [categories, setCategories] = useState(null);
    //const [questions, setQuestions] = useState(null);
    let categories = game.data.categories;
    function questionCount() {
        let count = 0;
        for (let i = 0; i < categories.length; i++) {
            count += categories[i].questions.length;
        }
        return count;
    };

    // useEffect(() => {
    //     getCategories(game.data).then( res => {
    //         setCategories(res);
    //     });
    // }, []);

    // useEffect(() => {
    //     if (categories) {
    //         const category_ids = new Set();
    //         for (let i = 0; i < categories.length; i++) {
    //             category_ids.add(categories[i].id)
    //         };

    //         getQuestions(category_ids).then( res => {
    //             setQuestions(res);
    //         });
    //     }
    // }, [categories]);

    return (
        <>

            <span>{questionCount()}</span>

        </>
    )
}

export default GameQuestions;