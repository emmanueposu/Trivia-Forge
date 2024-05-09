export class Question {
    constructor(question, answer, hint, categoryID = null) {
        this.id = null;
        this.question = question;
        this.answer = answer;
        this.hint = hint;
        this.categoryID = categoryID;
        this.choices = [];
    }

    addChoice(choice) {
        this.choices.push(choice);
    }

    toJsonObject() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            categoryID: this.category
        }
    }
}