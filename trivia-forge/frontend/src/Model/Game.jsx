export class Game {
    constructor(id, userID, date, name, questions) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.questions = [];
        this.userID = userID;
    }

    addGame(question) {
        this.questions.push(question);
    }

    toJsonObject() {
        return {
            id: this.id,
            date: this.date,
            name: this.name,
            userID: this.userID
        }
    }
}