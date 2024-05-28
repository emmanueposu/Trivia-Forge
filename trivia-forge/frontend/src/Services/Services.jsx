import * as db from './TF-db_services';
import { Game } from '../Models/Game';
import { Category } from '../Models/Category';
import { Question } from '../Models/Question';
import { Choice } from '../Models/Choice';



// export const AddAllForGame = async (game) => {
//     const newGame = await db.addGame(game);
//     game.categories.forEach(async (category) => {
//         category.gameID = newGame.id;
//         const newCategory = await db.addCategory(category);
//         category.questions.forEach(async (question) => {
//             console.log("Added Category ID", category.id);
//             question.categoryID = newCategory.id;
//             const newQuestion = await db.addQuestion(question);
//             question.choices.forEach(async (choice) => {
//                 choice.questionID = newQuestion.id;
//                 await db.addChoice(choice);
//             });
//         });
//     });
//     return newGame;
// }
export const AddAllForGame = async (game) => {
    try {
        // Add the game to the database
        //console.log("Adding game:", game);
        const newGame = await db.addGame(game);
        //console.log("Added game with ID:", newGame.id);

        // Process each category in the game's categories
        for (const category of game.categories) {
            category.gameID = newGame.id; // Link category to the game
            //console.log("Adding category:", category);
            const newCategory = await db.addCategory(category);
            //console.log("Added category with ID:", newCategory.id);

            // Process each question in the category's questions
            for (const question of category.questions) {
                question.categoryID = newCategory.id; // Link question to the category
                //console.log("Adding question:", question);
                const newQuestion = await db.addQuestion(question);
                //console.log("Added question with ID:", newQuestion.id);

                // Process each choice in the question's choices
                for (const choice of question.choices) {
                    choice.questionID = newQuestion.id; // Link choice to the question
                    //console.log("Adding choice:", choice);
                    const newChoice = await db.addChoice(choice);
                    //console.log("Added choice with ID:", newChoice.id);
                }
            }
        }

        // Return the newly created game
        return newGame;
    } catch (error) {
        console.error("Error adding game, categories, questions, or choices:", error);
        throw error;
    }
};

export const UpdateAllForGame = async (game) => {
    await db.editGame(game);
    game.categories.forEach(async (category) => {
        await db.editCategory(category);
        category.questions.forEach(async (question) => {
            await db.editQuestion(question);
            question.choices.forEach(async (choice) => {
                await db.editChoice(choice);
            });
        });
    });
}
