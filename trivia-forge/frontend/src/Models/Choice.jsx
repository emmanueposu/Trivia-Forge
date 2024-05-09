export class Choice {
    constructor(choice, questionID = null) {
        this.id = null;
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