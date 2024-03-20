import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService, private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.authFindOne(username)
    if (!user) return null
    const { password: db_password } = user
    // console.log(typeof this.configService.get('BCRYPT_HASH_ROUNDS'))
    // const hash = await bcrypt.hash(password, 10)
    const isMatch = await bcrypt.compare(password, db_password)
    if (isMatch) {
      return {
        id: user.id,
        username: user.username
      }
    }
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
