"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new controller_1.TodosController();
        const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.put('/:id', asyncHandler(todoController.updateTodo));
        router.post('/', asyncHandler(todoController.createTodo));
        router.delete('/:id', todoController.deleteTodo);
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
