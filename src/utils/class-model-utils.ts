import {
  Expose,
  Transform,
  Type,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer'
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
  @Transform(({ value }) => new Map(Object.entries(value)), {
    toClassOnly: true,
  })
  // Without this, instanceToPlain will turn this into an empty obj
  @Transform(({ value }) => Object.fromEntries(value), {
    toPlainOnly: true,
  })
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

export async function validateAndCleanClassEntityBody(
  toConvert: unknown
): Promise<ClassEntityBody> {
  const converted = plainToInstance(ClassEntityTransformer, toConvert, {
    excludeExtraneousValues: true,
  })

  await validateOrReject(converted)

  /*
   * We want to do instanceToPlain because we want to return `seatingArrangement.occupants` back to a plain object.
   * We can't return it as-is since it's a map, and you can't access attributes from a map like an object (i.e. sampleObject.propertyA)
   */
  return instanceToPlain(converted) as ClassEntityBody
}
