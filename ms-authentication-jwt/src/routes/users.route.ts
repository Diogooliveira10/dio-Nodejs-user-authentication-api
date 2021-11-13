import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import { DatabaseError } from "pg-protocol";
import userRepository from "../repositories/user.repository";

const usersRoute = Router()

// Buscar todos os usuários
usersRoute.get('/users', async ( req: Request, res: Response, next: NextFunction ) => {

    console.log(req.headers['authorization'])

    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})

// Buscar usuário específico
usersRoute.get('/users/:uuid', async ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    try {
        const uuid = req.params.uuid
        const user = await userRepository.findById(uuid)
        res.status(StatusCodes.OK).send(user)     
    } catch (error) {
        next(error)
    }
})

// Criar usuário
usersRoute.post('/users', async ( req: Request, res: Response, next: NextFunction ) => {
    const newUser = req.body
    const uuid = await userRepository.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
})

// Alterar um determinado usuário
usersRoute.put('/users/:uuid', async ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    const uuid = req.params.uuid
    const modifiedUser = req.body

    modifiedUser.uuid = uuid

    await userRepository.update(modifiedUser)

    res.status(StatusCodes.OK).send()
})

// Remover usuário
usersRoute.delete('users/:uuid', async ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    const uuid = req.params.uuid
    await userRepository.remove(uuid)
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute