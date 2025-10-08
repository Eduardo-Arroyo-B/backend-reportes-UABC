import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('create')
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get('getAll')
  findAll() {
    return this.reportsService.findAll();
  }

  @Patch('update/:id')
  updateReport(@Param('id') id: string) {
    return this.reportsService.updateReport(+id);
  }
}
