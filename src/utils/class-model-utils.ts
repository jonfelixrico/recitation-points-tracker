import { Expose, Transform, Type, plainToInstance } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  ValidateNested,
  validateOrReject,
} from 'class-validator'
import { ClassEntity, SeatingArrangement } from 'src/models/entities'

class SeatingArrangementTransformer implements SeatingArrangement {
  @Expose()
  @IsNotEmpty()
  @ArrayMinSize(1)
  columns!: number[]

  @Expose()
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

type ClassEntityBody = Omit<ClassEntity, 'id'>

class ClassEntityTransformer implements ClassEntityBody {
  @Expose()
  @IsNotEmpty()
  name!: string

  @Expose()
  @IsNotEmpty()
  tags!: string[]

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SeatingArrangementTransformer)
  seatingArrangement!: SeatingArrangement
}

export async function validateAndCovertClassEntityBody(
  toConvert: unknown
): Promise<ClassEntityBody> {
  const converted = plainToInstance(ClassEntityTransformer, toConvert, {
    excludeExtraneousValues: true,
  })

  console.log(converted)
  await validateOrReject(converted)

  return converted
}
