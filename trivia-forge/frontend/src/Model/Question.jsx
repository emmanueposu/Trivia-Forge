export class Question {
    constructor(id, question, answer, categoryID) {
        this.id = id;
        this.question = question;
        this.answer = answer;
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