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
            title: this.name,
            game_id: this.gameID
        }
    }
}
