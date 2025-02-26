import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

    static get routes(): Router {
        
        const router = Router();

        const todoController = new TodosController();

        const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
            Promise.resolve(fn(req, res, next)).catch(next);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.put('/:id', asyncHandler(todoController.updateTodo));
        router.post('/', asyncHandler(todoController.createTodo));
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}