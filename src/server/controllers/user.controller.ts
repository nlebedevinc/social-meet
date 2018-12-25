import * as User from '../models/user';
import { Request, ResponseObject, ResponseToolkit } from 'hapi';
import { badData, badImplementation, badRequest, unauthorized } from 'boom';

const COLLECTION_NAME = 'Users';

export default class UserController {
    async createUser(request: CreateUserRequest, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            const { low } = request.server.app.services;
            let existedUser: User.Interface | null = await User.Model.findOne(low.getConnection(), COLLECTION_NAME, { login: request.payload.login })
            if (existedUser) {
                return badData(`User with login "${request.payload.login}" already exists`)
            }

            let user = new User.Model(request.payload)

            await user.save()

            return toolkit.response(user)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }

    async updateUser(request: UpdateUserRequest, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            const { low } = request.server.app.services;
            let user: User.Interface | null = await User.Model.findById(low.getConnection, COLLECTION_NAME, request.params.id)

            if (!user) {
                return badRequest(`Can't find user with ID: ${request.params.id}`, { request })
            }

            let existedUser: User.Interface | null = await User.Model.findOne({
                id: { $ne: user.id },
                login: request.payload.login
            })

            if (existedUser && existedUser.id !== user.id) {
                return badData(`User with login "${request.payload.login}" already exists`)
            }

            user = Object.assign(user as User.Interface, request.payload as User.Interface)

            for (let propertyName in request.payload) {
                user.markModified(propertyName)
            }

            user = await user.save()

            return toolkit.response(user)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }

    async loginUser(request: LoginUserRequest, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        let { login, password } = request.payload
        try {
            const user: User.Interface | null = await User.Model.findOne({ login })

            if (!user) {
                return unauthorized('User does not exist')
            }

            if (!user.validatePassword(password)) {
                return unauthorized('Password is invalid')
            }

            user.token = user.generateToken()
            user.markModified('token')
            await user.save()

            return toolkit.response(user).header('X-Access-Token', user.token)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }

    async authUser(request: AuthorizedRequest, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            let user: User.Interface | null = await User.Model.findById(request.auth.credentials.sub)

            if (!user) {
                return unauthorized('User does not exist')
            }

            user.generateToken()

            await user.save()

            return toolkit.response(user)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }

    async logoutUser(request: AuthorizedRequest, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            let user: User.Interface | null = await User.Model.findById(request.auth.credentials.sub)

            if (!user) {
                return unauthorized('User does not exist')
            }

            user.token = undefined
            user.markModified('token')
            await user.save()

            return toolkit.response(user)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }

    async deleteUser(request: Request, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
        try {
            let user: User.Interface | null = await User.Model.findById(request.params.id)

            if (!user) {
                return badRequest(`Can't find user with ID: ${request.params.id}`, { request })
            }

            user.isActive = false
            user.markModified('isActive')
            await user.save()

            return toolkit.response(user)
        } catch (error) {
            return badImplementation(error.message, { error })
        }
    }
}
