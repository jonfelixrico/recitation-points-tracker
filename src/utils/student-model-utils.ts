import { Expose, instanceToPlain, plainToInstance } from 'class-transformer'
import { IsNotEmpty, validate } from 'class-validator'
import { StudentEntity } from 'src/models/entities'

type StudentEntityBody = Omit<StudentEntity, 'id'>

class StudentEntityBodyTransformer implements StudentEntityBody {
  @Expose()
  @IsNotEmpty()
  firstName!: string

  @Expose()
  @IsNotEmpty()
  lastName!: string
}

export async function validateAndCleanStudentEntityBody(
  value: unknown
): Promise<StudentEntityBody> {
  const converted = plainToInstance(StudentEntityBodyTransformer, value, {
    excludeExtraneousValues: true,
  })

  await validate(converted)

  return instanceToPlain(value) as StudentEntityBody
}
