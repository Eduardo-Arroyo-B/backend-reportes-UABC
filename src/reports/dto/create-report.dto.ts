import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * Data Transfer Object para crear los reportes con validaciones.
 */

export class CreateReportDto {
  @IsNotEmpty({ message: "La fecha no puede ir vacia" })
  date: Date;

  @IsNotEmpty({ message: "La descripción no puede ir vacia" })
  description: string;

  @IsNotEmpty({ message: "La ubicación no puede ir vacia" })
  location: string

  @IsNotEmpty({ message: "El nombre no puede ir vacio" })
  name: string

  @IsNotEmpty({ message: "El teléfono no puede ir vacio" })
  phone: string

  @IsNotEmpty({ message: "El correo no puede ir vacio" })
  @IsEmail({}, { message: "Ingrese un correo electronico valido" })
  email: string
}
