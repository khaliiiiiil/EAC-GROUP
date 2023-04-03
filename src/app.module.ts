import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './app.controller';
import { GroupService } from './app.service';
import { Group, GroupSchema } from './database/schemas/EAC-grouping.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://k14512415:khalil1451@cluster0.qej0gup.mongodb.net/test'),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}