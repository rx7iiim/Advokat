import { PartialType } from '@nestjs/mapped-types';
import { CreateLawFirmDto } from './create-law-firm.dto';

export class UpdateLawFirmDto extends PartialType(CreateLawFirmDto) {}
