import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes'
import userRepository from "../repositories/user.repository";

const usersRoute = Router()

// Buscar todos os usuários
usersRoute.get('/users', async ( req: Request, res: Response, next: NextFunction ) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})

// Buscar usuário específico
usersRoute.get('/users/:uuid', ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({ uuid })
})

// Criar usuário
usersRoute.post('/users', ( req: Request, res: Response, next: NextFunction ) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
})

// Alterar determinado usuário
usersRoute.put('/users/:uuid', ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    const uuid = req.params.uuid
    const modifiedUser = req.body

    modifiedUser.uuid = uuid

    res.status(StatusCodes.OK).send({ uuid })
})

// Remover usuário
usersRoute.delete('users/:uuid', ( req: Request<{ uuid: string }>, res: Response, next: NextFunction ) => {
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute