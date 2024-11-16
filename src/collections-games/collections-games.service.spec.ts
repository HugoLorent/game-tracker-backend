import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsGamesService } from './collections-games.service';

describe('CollectionsGamesService', () => {
  let service: CollectionsGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionsGamesService],
    }).compile();

    service = module.get<CollectionsGamesService>(CollectionsGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
