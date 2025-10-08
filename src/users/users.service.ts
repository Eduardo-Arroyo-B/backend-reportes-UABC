import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import prisma from '../../prisma/PrismaClient';

@Injectable()
export class UsersService {
  // Servicio para crear un nuevo usuario
  async create(createUserDto: CreateUserDto) {

    try {
      const { password_confirm, password, ...userData } = createUserDto;

      const user = await prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (user) {
        throw new HttpException('El correo electrónico ya está en uso', HttpStatus.BAD_REQUEST);
      }

      if (password !== password_confirm) {
        throw new HttpException('Las contraseñas no coinciden', HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const createUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      })

      if (!createUser) {
        throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      }

      return {
        status: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente',
        data: createUser,
      }
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Servicio para obtener todos los usuarios
  async findAll() {
    try {
      const users = await prisma.user.findMany();

      if (!users) {
        throw new HttpException('No users found', HttpStatus.NOT_FOUND);
      }

      return {
        status: HttpStatus.OK,
        message: 'Usuarios encontrados exitosamente',
        data: users,
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Servicio para obtener un usuario por su ID
  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
