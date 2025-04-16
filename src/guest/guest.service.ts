import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { Guest } from './entities/guest.entity';
import { ConfirmGuestDto } from './dto/confirm-guest.dto';
import { NotFoundCustomException } from '../common/exceptions/not-found.exception';
import { successResponse } from '../common/responses/success.response';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}

  async create(createGuestDto: CreateGuestDto) {
    const guest = this.guestRepository.create(createGuestDto);
    const saved = await this.guestRepository.save(guest);
    return successResponse('Convidado criado com sucesso', saved);
  }

  async findAll() {
    const guests = await this.guestRepository.find({
      order: { createdAt: 'DESC' },
    });
    return successResponse('Lista de convidados', guests);
  }

  async findOne(id: string) {
    const guest = await this.guestRepository.findOne({ where: { id } });
    if (!guest) throw new NotFoundCustomException('Convidado não encontrado');
    return successResponse('Convidado encontrado', guest);
  }

  async update(id: string, updateGuestDto: UpdateGuestDto) {
    const guest = await this.guestRepository.findOne({ where: { id } });
    if (!guest) throw new NotFoundCustomException('Convidado não encontrado');

    await this.guestRepository.update(id, updateGuestDto);
    const updated = await this.guestRepository.findOne({ where: { id } });
    return successResponse('Convidado atualizado com sucesso', updated);
  }

  async remove(id: string) {
    const guest = await this.guestRepository.findOne({ where: { id } });
    if (!guest) throw new NotFoundCustomException('Convidado não encontrado');

    await this.guestRepository.delete(id);
    return successResponse('Convidado removido com sucesso');
  }

  async confirmPresence(dto: ConfirmGuestDto) {
    const guest = await this.guestRepository.findOne({
      where: { phone: dto.phone },
    });

    if (!guest) {
      throw new NotFoundCustomException('Telefone não encontrado');
    }

    guest.hasCompanion = dto.hasCompanion;
    guest.confirmed = true;
    await this.guestRepository.save(guest);

    return successResponse('Presença confirmada com sucesso', guest);
  }
}
