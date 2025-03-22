import { Module } from '@nestjs/common';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { SubscriptionController } from 'src/subscription/subscription.controller';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
