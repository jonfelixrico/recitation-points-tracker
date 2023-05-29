import { Type, plainToInstance } from 'class-transformer'
import {
  IsNotEmpty,
  Length,
  MinLength,
  ValidateNested,
  validateOrReject,
} from 'class-validator'
import { ClassEntity, SeatingArrangement } from 'src/models/entities'

class SeatingArrangementTransformer implements SeatingArrangement {
  @MinLength(1)
  columns!: number[]

  @Length(2, undefined, {
    each: true,
  })
  occupants!: SeatingArrangement['occupants']
}

class ClassEntityTransformer implements ClassEntity {
  @IsNotEmpty()
  id!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  tags!: string[]

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SeatingArrangementTransformer)
  seatingArrangement!: SeatingArrangement
}

export async function toClassEntity(toConvert: unknown): Promise<ClassEntity> {
  const converted = plainToInstance(ClassEntityTransformer, toConvert)

  await validateOrReject(converted)

  return converted
}
