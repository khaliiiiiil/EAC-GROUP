import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {  FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { CreateGroupDto } from "./database/dtos/create-group.dto";
import { Group, GroupDocument } from "./database/schemas/EAC-grouping.schema";

@Injectable()
 export class GroupService {
    constructor(@InjectModel(Group.name) protected readonly GroupModel : Model<GroupDocument>) {}

    async create (createGroupDto : CreateGroupDto) : Promise<Group>{
        const createdGroup = new this.GroupModel({
            _id: new Types.ObjectId(),
            ...createGroupDto
        });
        return createdGroup.save();
    }

    async find() : Promise<Group[]> {
        const query = this.GroupModel.find().select('-location -dashboardPriotiy -placement -equipNumber -device');
        return query.exec();
    }

    async findOne(entityFilterQuery : FilterQuery<GroupDocument>) : Promise<Group>{
        return this.GroupModel.findById(entityFilterQuery).exec();
    }

    async findOneAndUpdate (entityFilterQuery : FilterQuery<GroupDocument>, updatedGroup : UpdateQuery<GroupDocument>) : Promise<Group>{
        return this.GroupModel.findOneAndUpdate(
            entityFilterQuery, 
            updatedGroup, {new : true}
        ).exec();
    }

    async delete(entityFilterQuery : FilterQuery<GroupDocument>) : Promise<Group>{
        return this.GroupModel.findByIdAndRemove(entityFilterQuery)
    }

    async addElement (entityFilterQuery : FilterQuery<GroupDocument>, element : string) : Promise<Group>{
        const result = await this.GroupModel.updateOne(
            { _id: entityFilterQuery },
            { $push: { elements: element } },
        );
        if (result.modifiedCount === 0) {
            throw new NotFoundException(`Cat with ID ${entityFilterQuery} not found`);
        }

        return this.GroupModel.findById(entityFilterQuery).exec();
    }
}