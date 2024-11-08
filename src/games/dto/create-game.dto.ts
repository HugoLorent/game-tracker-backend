import { GAME_PLATFORM } from '../interfaces/games.interface';

export class CreateGameDto {
  name: string;
  platform: GAME_PLATFORM;
}
