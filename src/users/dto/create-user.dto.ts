import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
// @ts-ignore
import { Role } from '@prisma/client';

/**
 * Data Transfer Object para crear el usuario con validaciones.
 */

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico no debe estar vacío' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
  password: string;

  @IsNotEmpty({ message: 'La confirmación de la contraseña no debe estar vacía' })
  password_confirm: string;

  @IsEnum(Role, { message: 'El rol no es válido' })
  role: Role;
}
