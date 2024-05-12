import { React, useState, useEffect } from "react";
import { getCategories } from "../Services/TF-db_services";

function GameCategories(game) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories(game.data).then( res => {
            setCategories(res);
        });
    }, []);

    return (
        <>
            {categories && (
                categories.map((category, index) => (
                    <span key={index}> • {category.title}</span>
                ))
            )}
        </>
    )
}

export default GameCategories;