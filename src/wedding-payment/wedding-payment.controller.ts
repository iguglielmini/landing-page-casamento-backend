import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { WeddingPaymentService } from './wedding-payment.service';
import { CreateWeddingPaymentDto } from './dto/create-wedding-payment.dto';

@Controller('wedding-payment')
export class WeddingPaymentController {
  constructor(private readonly paymentService: WeddingPaymentService) {}

  @Post()
  create(@Body() dto: CreateWeddingPaymentDto) {
    return this.paymentService.create(dto);
  }

  @Get('by-expense/:expenseId')
  getByExpense(@Param('expenseId', ParseIntPipe) id: number) {
    return this.paymentService.findAllByExpense(id);
  }
}
