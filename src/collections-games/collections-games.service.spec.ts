import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsGamesService } from './collections-games.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CollectionsGames } from './entities/collections-games.entity';
import { Collection } from '../collections/entities/collection.entity';
import { Game } from '../games/entities/game.entity';

describe('CollectionsGamesService', () => {
  let service: CollectionsGamesService;

  const mockCollectionsGamesRepository = {
    save: jest.fn(),
  };

  const mockCollectionsRepository = {
    findOne: jest.fn(),
  };

  const mockGamesRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsGamesService,
        {
          provide: getRepositoryToken(CollectionsGames),
          useValue: mockCollectionsGamesRepository,
        },
        {
          provide: getRepositoryToken(Collection),
          useValue: mockCollectionsRepository,
        },
        {
          provide: getRepositoryToken(Game),
          useValue: mockGamesRepository,
        },
      ],
    }).compile();

    service = module.get<CollectionsGamesService>(CollectionsGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
