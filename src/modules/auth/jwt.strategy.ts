import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { User } from "../users/user.entity";
import { UsersRepository } from "../users/users.repository";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'super-secret'
    })}

    async validate(payload:{id: string}): Promise<User> {
        const {id} = payload
        const user = await this.usersRepository.findOneBy({id})
        if(!user) {
            throw new UnauthorizedException('Usuário não encontrado')
        }

        return user
    }
}