import { IsNumber, IsUUID } from 'class-validator';

export class CreateTrainingDto {
  @IsUUID()
  personal_id: string;

  @IsNumber()
  day: number;

  @IsNumber()
  hour: number;
}

//   0 - 1 - 2 - 3 - 4 - 5 - 6
// 0 t
// 1 f
// 2 f
// 3 f
// 4 f
// 5 t
// 6 t
// 7
// 8
// 9
// 10
