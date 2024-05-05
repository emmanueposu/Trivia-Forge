export class Category {
    constructor(id, name, gameID) {
        this.id = id;
        this.name = name;
        this.gameID = gameID
        this.questions = [];
    }

    toJsonObject() {
        return {
            id: this.id,
            name: this.name,
            gameID: this.gameID
        }
    }
}