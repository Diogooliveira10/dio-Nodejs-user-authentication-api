import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';

const authorizationRoute = Router()

authorizationRoute.post('/token', ( req: Request, res: Response, next: NextFunction ) => {

    try {
        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new ForbiddenError('Credentials not informed')
        }

        // Basic YWRtaW46YWRtaW4=

        const [authorizationType, token] = authorizationHeader.split(' ')

        if (authorizationType !== 'Basic' || !token) {
            throw new ForbiddenError('Invalid authentication type')
        }

        const tokenContent = Buffer.from(token, "base64").toString('utf-8')

        const [username, password] = tokenContent.split(':')

        if (!username || password) {
            throw new ForbiddenError('Unfilled Credentials')
        }

        console.log(username, password)

    } catch (error) {
        next(error)
    }

})

export default authorizationRoute