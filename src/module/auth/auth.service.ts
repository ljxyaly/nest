import { Injectable } from '@nestjs/common'
import { UserService } from '@/module/user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService, private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.authFindOne({ username })
    if (!user) return null
    const { password: db_password } = user
    const isMatch = await bcrypt.compare(password, db_password)
    if (isMatch) {
      return {
        username: user.username,
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    }
  }

  async login(user: any) {
    const payload = await this.validateUser(user.username, user.password)
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
