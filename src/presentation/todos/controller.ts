import { Request, Response } from "express";

const todos=[
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: null },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
]

export class TodosController {
    //* DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodosById = (req: Request, res: Response) => {
        // +valor intenta parsear a numero el valor
        const id=+req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument is not a number`});

        const todo=todos.find(todo=>todo.id  === id);

        (todo) ? res.json(todo) : res.status(404).json({error:`TODO with id ${id} not found`});
    }

    public createTodo = (req: Request, res: Response) => {
        const {text }=req.body;

        if (!text) return res.status(400).json({error: 'Text property is required'})
        const newTodo={
            id:todos.length+1,
            text,
            completedAt:null
        }

        todos.push(newTodo);
        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
        
        const id=+req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument is not a number`});
        //* este todo tiene la referencia del al array inicial
        const todo=todos.find(todo=>todo.id  === id);
        if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});
        
        const { text, completedAt }=req.body;

        todo.text=text || todo.text;
        (completedAt=== null)
        ? todo.completedAt= null
        : todo.completedAt= new Date(completedAt|| todo.completedAt);

        //!OJO: Aqui pasa el resultado por referencia. no es recomendable
 
        // todos.forEach()
        res.json(todo);
        
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id=+req.params.id;
        if(isNaN(id)) return res.status(400).json({error:`ID argument is not a number`});
        //* este todo tiene la referencia del al array inicial
        const todoFilter=todos.find(todo=>todo.id  === id);
        if(!todoFilter) return res.status(404).json({error:`Todo with id ${id} not found`});
        
        todos.splice(todos.indexOf(todoFilter),1);
        res.json(todoFilter);
        
    }
    
}