"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, createdAt) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.createdAt)
            returnObj.createdAt = this.createdAt;
        return returnObj;
    }
    static create(props) {
        const { id, text, createdAt } = props;
        let newCreatedAt = createdAt;
        if (!id || isNaN(Number(id))) {
            return ['id must be a number!'];
        }
        if (createdAt) {
            newCreatedAt = new Date(createdAt);
            if (newCreatedAt.toString() === 'Invalid Date') {
                return [' CreatedAt must be a valid date! '];
            }
        }
        return [undefined, new UpdateTodoDto(text, newCreatedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
