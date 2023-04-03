import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Types, UpdateQuery } from 'mongoose';
import { GroupService } from './app.service';
import { Group, GroupDocument } from './database/schemas/EAC-grouping.schema';
import {CreateGroupDto} from './database/dtos/create-Group.dto'
import { Delete } from '@nestjs/common/decorators';


@Controller('Groups')
export class GroupController {
  constructor(private readonly GroupService: GroupService) {}

  @Post()
  async creatGroup(@Body() createGroupDto : CreateGroupDto) : Promise<Group>{
      return this.GroupService.create(createGroupDto)
  }

  @Get()
  async getGroups() : Promise<Group[]>{
      return this.GroupService.find();
  }

  @Get(':id')
  async getGroup(@Param('id') id : Types.ObjectId) : Promise<Group>{
      return this.GroupService.findOne(id);
  }

  @Patch(':id')
  async updateGroup(@Param('id') id : Types.ObjectId, @Body() update : UpdateQuery<GroupDocument>) : Promise<Group>{
      return this.GroupService.findOneAndUpdate(id , update);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id : Types.ObjectId) : Promise<Group>{
    return this.GroupService.delete(id);
  }

  @Post(':id')
  async addElement(@Param('id') id : Types.ObjectId, @Body('element') element: string) : Promise<Group> {
    return this.GroupService.addElement(id, element);
  }

}
