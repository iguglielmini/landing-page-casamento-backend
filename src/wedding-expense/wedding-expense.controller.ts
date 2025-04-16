import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WeddingExpenseService } from './wedding-expense.service';
import { CreateWeddingExpenseDto } from './dto/create-wedding-expense.dto';
import { UpdateWeddingExpenseDto } from './dto/update-wedding-expense.dto';
import { PayExpenseDto } from './dto/pay-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('expenses')
export class WeddingExpenseController {
  constructor(private readonly service: WeddingExpenseService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateWeddingExpenseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('summary')
  getSummaryByType() {
    return this.service.getSummaryByType();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateWeddingExpenseDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }

  @Patch(':id/pay')
  @Roles('admin')
  pay(@Param('id') id: string, @Body() dto: PayExpenseDto) {
    return this.service.pay(+id, dto);
  }
}
