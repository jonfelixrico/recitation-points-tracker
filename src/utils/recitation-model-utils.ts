import { Expose, instanceToPlain, plainToInstance } from 'class-transformer'
import { IsNotEmpty, validateOrReject } from 'class-validator'
import { RecitationEntity } from 'src/models/entities'

type RecitationBody = Omit<RecitationEntity, 'id'>

class RecitationEntityTransformer implements RecitationBody {
  @IsNotEmpty()
  @Expose()
  classId!: string

  @IsNotEmpty()
  @Expose()
  name!: string

  @IsNotEmpty()
  @Expose()
  tags!: string[]
}

export async function validateAndConvertRecitation(data: RecitationBody) {
  const converted = plainToInstance(RecitationEntityTransformer, data)
  await validateOrReject(converted)
  return instanceToPlain(converted, {
    excludeExtraneousValues: true,
  })
}
