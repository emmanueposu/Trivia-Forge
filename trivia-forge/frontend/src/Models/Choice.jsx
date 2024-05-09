export default class Choice {
    constructor(id, choice, questionID) {
        this.id = id;
        this.choice = choice;
        this.questionID = questionID;
    }

    toJsonObject() {
        return {
            id: this.id,
            choice: this.choice,
            questionID: this.questionID
        }
    }
}   