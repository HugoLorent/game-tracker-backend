import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CollectionsService {
  private readonly logger = new Logger(CollectionsService.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
    private readonly usersService: UsersService,
  ) {}

  public async create(
    userId: number,
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    try {
      const collection = new Collection();
      collection.name = createCollectionDto.name;
      collection.user = await this.usersService.findUserById(userId);
      return this.collectionsRepository.save(collection);
    } catch (error) {
      this.logger.error('Error creating collection', error);
      throw error;
    }
  }

  public async findAll(userId: number): Promise<Collection[]> {
    try {
      return this.collectionsRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      this.logger.error('Error finding collections', error);
      throw error;
    }
  }

  public async findOne(collectionId: number): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      return collection;
    } catch (error) {
      this.logger.error('Error finding collection', error);
      throw error;
    }
  }

  public async update(
    collectionId: number,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      await this.collectionsRepository.update(
        { id: collectionId },
        updateCollectionDto,
      );
      return this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
    } catch (error) {
      this.logger.error('Error updating collection', error);
      throw error;
    }
  }

  public async remove(collectionId: number): Promise<Collection> {
    try {
      const collection = await this.collectionsRepository.findOne({
        where: { id: collectionId },
      });
      if (!collection) {
        throw new NotFoundException('Collection not found');
      }
      return this.collectionsRepository.remove(collection);
    } catch (error) {
      this.logger.error('Error removing collection', error);
      throw error;
    }
  }
}
