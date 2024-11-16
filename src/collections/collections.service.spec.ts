import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsService } from './collections.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { UsersService } from '../users/users.service';
import { GamesService } from '../games/games.service';
import { CollectionsGamesService } from '../collections-games/collections-games.service';

describe('CollectionsService', () => {
  let service: CollectionsService;

  const mockCollectionsRepository = {
    save: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockUserService = {
    findUserById: jest.fn(),
  };

  const mockGamesService = {
    findUserById: jest.fn(),
  };

  const mockCollectionsGamesService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: getRepositoryToken(Collection),
          useValue: mockCollectionsRepository,
        },
        { provide: UsersService, useValue: mockUserService },
        { provide: GamesService, useValue: mockGamesService },
        {
          provide: CollectionsGamesService,
          useValue: mockCollectionsGamesService,
        },
      ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
