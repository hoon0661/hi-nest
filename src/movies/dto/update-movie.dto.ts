import { CreateMovieDto } from './create-movie.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }

//Using PartialType creates the same code as above.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
