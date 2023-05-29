import { Transform, Type, plainToInstance } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  ValidateNested,
  validateOrReject,
} from 'class-validator'
import { ClassEntity, SeatingArrangement } from 'src/models/entities'

class SeatingArrangementTransformer implements SeatingArrangement {
  @IsNotEmpty()
  @ArrayMinSize(1)
  columns!: number[]

  @IsNotEmpty()
  @ArrayMinSize(2, {
    each: true,
  })
  @ArrayMaxSize(2, {
    each: true,
  })
  /*
   * Transforming to an obj is necessary to evaluate the value.
   * @See https://stackoverflow.com/a/72554754
   */
  @Transform(({ value }) => new Map(Object.entries(value)))
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

export async function validateAndCovertToClassEntity(
  toConvert: unknown
): Promise<ClassEntity> {
  const converted = plainToInstance(ClassEntityTransformer, toConvert)

  await validateOrReject(converted)

  return converted
}
