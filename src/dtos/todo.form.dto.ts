import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TodoFormDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class TodoUpdateFormDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}

export class TodoCompletionFormDto {
  @IsBoolean()
  completed: boolean;
}
