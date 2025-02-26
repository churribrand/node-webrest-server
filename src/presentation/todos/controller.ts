import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { create } from "domain";
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodosController {


    constructor(){}


    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await prisma.todo.findMany();
            res.json(todos);
          } catch (error) {
            res.status(500).json({ error: 'Error al obtener los TODOs' });
          }
        };


    public getTodoById = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                res.status(400).json({ error: 'ID argument is not a number' });
                return;
            }

            const todo = await prisma.todo.findFirst({ where: { id } });
            todo
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el TODO' });
        }
    };

    public createTodo = async (req: Request, res: Response) => {
        try {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);
            if (error) return res.status(400).json({ error });

            const todo = await prisma.todo.create({
                data: JSON.parse(JSON.stringify(createTodoDto))
            });

            res.json(todo);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el TODO' });
        }
    };

    public updateTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
            if (error) return res.status(400).json({ error });

            const todo = await prisma.todo.findFirst({ where: { id } });
            if (!todo) {
                res.status(404).json({ error: `Todo with id ${id} not found` });
                return;
            }

            const updatedTodo = await prisma.todo.update({
                where: { id },
                data: updateTodoDto!.values
            });

            res.json(updatedTodo);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el TODO' });
        }
    };

    public deleteTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;

            const todo = await prisma.todo.findFirst({ where: { id } });
            if (!todo) {
                res.status(404).json({ error: `Todo with id ${id} not found` });
                return;
            }

            const deletedTodo = await prisma.todo.delete({ where: { id } });
            res.json(deletedTodo);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el TODO' });
        }
    };
}