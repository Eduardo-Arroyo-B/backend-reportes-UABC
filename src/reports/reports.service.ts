import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import prisma from '../../prisma/PrismaClient';

@Injectable()
export class ReportsService {
  async create(createReportDto: CreateReportDto) {
    try {
      const { date, ...reportData } = createReportDto;

        const createReport = await prisma.reports.create({
            data: {
              date: new Date(),
                ...reportData
            }
        });

        if (!createReport) {
            throw new HttpException('El reporte no se pudo crear', HttpStatus.BAD_REQUEST);
        }

        return {
            status: HttpStatus.CREATED,
            message: 'Reporte creado exitosamente',
            data: createReport,
        }
    } catch(error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
        const findReports = await prisma.reports.findMany();

        if (!findReports) {
            throw new HttpException('No se encontraron reportes', HttpStatus.NOT_FOUND);
        }

        return {
            status: HttpStatus.OK,
            message: 'Reportes encontrados exitosamente',
            data: findReports,
        };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateReport(id: number) {
    return `Este action actualiza el reporte con el id #${id}`;
  }
}
