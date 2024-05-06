import * as db from './TF-db_services';

export const addAllForGame = async (game) => {
    const newGame = await db.addGame(game);
    game.categories.forEach(async (category) => {
        category.gameID = newGame.id;
        const newCategory = await db.addCategory(category);
        category.questions.forEach(async (question) => {
            question.categoryID = newCategory.id;
            const newQuestion = await db.addQuestion(question);
            question.choices.forEach(async (choice) => {
                choice.questionID = newQuestion.id;
                await db.addChoice(choice);
            });
        });
    });
    return newGame;
}