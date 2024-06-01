export class Choice {
    constructor(text, questionID = null) {
        this.id = null;
        this.text = text;
        this.questionID = questionID;
    }

    toJsonObject() {
        return {
            text: this.text,
            question_id: this.questionID
        }
    }
}
