import { React} from "react";

function GameQuestions(game) {
    let categories = game?.data.categories || [];
    function questionCount() {
        let count = 0;
        for (let i = 0; i < categories.length; i++) {
            count += categories[i].questions.length;
        }
        return count;
    };

    return (
        <>
            <span>{questionCount()}</span>
        </>
    )
}

export default GameQuestions;
