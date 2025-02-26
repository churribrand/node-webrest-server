"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const create_todo_dto_1 = require("../../domain/dtos/todos/create-todo.dto");
const update_todo_dto_1 = require("../../domain/dtos/todos/update-todo.dto");
class TodosController {
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield postgres_1.prisma.todo.findMany();
                res.json(todos);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los TODOs' });
            }
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                if (isNaN(id)) {
                    res.status(400).json({ error: 'ID argument is not a number' });
                    return;
                }
                const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
                todo
                    ? res.json(todo)
                    : res.status(404).json({ error: `TODO with id ${id} not found` });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener el TODO' });
            }
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, createTodoDto] = create_todo_dto_1.CreateTodoDto.create(req.body);
                if (error)
                    return res.status(400).json({ error });
                const todo = yield postgres_1.prisma.todo.create({
                    data: JSON.parse(JSON.stringify(createTodoDto))
                });
                res.json(todo);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al crear el TODO' });
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const [error, updateTodoDto] = update_todo_dto_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
                if (error)
                    return res.status(400).json({ error });
                const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
                if (!todo) {
                    res.status(404).json({ error: `Todo with id ${id} not found` });
                    return;
                }
                const updatedTodo = yield postgres_1.prisma.todo.update({
                    where: { id },
                    data: updateTodoDto.values
                });
                res.json(updatedTodo);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al actualizar el TODO' });
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
                if (!todo) {
                    res.status(404).json({ error: `Todo with id ${id} not found` });
                    return;
                }
                const deletedTodo = yield postgres_1.prisma.todo.delete({ where: { id } });
                res.json(deletedTodo);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el TODO' });
            }
        });
    }
}
exports.TodosController = TodosController;
