export class Question {
    constructor(question, answer, hint, multipleChoice, categoryID = null) {
        this.id = null;
        this.question = question;
        this.answer = answer;
        this.hint = hint;
        this.multipleChoice = multipleChoice;
        this.categoryID = categoryID;
        this.choices = [];
    }

    addChoice(choice) {
        this.choices.push(choice);
    }
    setCategoryID(categoryID) {
        this.category = categoryID;
    }

    toJsonObject() {
        return {
            problem: this.question,
            answer: this.answer,
            hint: this.hint,
            multiple_choice: this.multipleChoice,
            category_id: this.categoryID
        }
    }
}