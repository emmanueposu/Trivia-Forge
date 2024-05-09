export class Category {
    constructor(name, gameID = null) {
        this.id = null;
        this.name = name;
        this.gameID = gameID
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            gameID: this.gameID
        }
    }
}