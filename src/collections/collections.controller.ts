import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { AuthorizationGuard } from '../common/guards/authorization.guard';
import { AddGamesToCollectionDto } from './dto/add-games-to-collection.dto';

@Controller('users/:userId/collections')
export class CollectionsController {
  private readonly logger = new Logger(CollectionsController.name);

  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(AuthorizationGuard)
  @Post()
  public async create(
    @Param('userId') userId: number,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    try {
      return this.collectionsService.create(userId, createCollectionDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Get()
  public async findAll(@Param('userId') userId: number): Promise<Collection[]> {
    try {
      return this.collectionsService.findAll(userId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Get(':collectionId')
  public async findOne(
    @Param('collectionId') collectionId: number,
  ): Promise<Collection> {
    try {
      return this.collectionsService.findOne(collectionId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Patch(':collectionId')
  public async update(
    @Param('collectionId') collectionId: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    try {
      return this.collectionsService.update(collectionId, updateCollectionDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Delete(':collectionId')
  public async remove(
    @Param('collectionId') collectionId: number,
  ): Promise<Collection> {
    try {
      return this.collectionsService.remove(collectionId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizationGuard)
  @Post(':collectionId')
  public async addGamesToCollection(
    @Param('collectionId') collectionId: number,
    @Body() addGamesToCollectionDto: AddGamesToCollectionDto,
  ): Promise<void> {
    try {
      return this.collectionsService.addGamesToCollection(
        collectionId,
        addGamesToCollectionDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
