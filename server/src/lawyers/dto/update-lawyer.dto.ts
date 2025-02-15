import { PartialType } from '@nestjs/mapped-types';
import { CreateLawyerDto } from './create-lawyer.dto';

export class UpdateLawyerDto extends PartialType(CreateLawyerDto) {}
