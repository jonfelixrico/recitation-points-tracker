import { Type, plainToInstance } from 'class-transformer'
import {
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
  id!: string
  name!: string
  tags!: string[]

  @ValidateNested()
  @Type(() => SeatingArrangementTransformer)
  seatingArrangement!: SeatingArrangement
}

export async function toClassEntity(toConvert: unknown): Promise<ClassEntity> {
  const converted = plainToInstance(ClassEntityTransformer, toConvert, {
    excludeExtraneousValues: true,
  })

  await validateOrReject(converted)

  return converted
}
