import { IsUUID, IsDateString, IsNumber} from 'class-validator'
import { Field, ID, InputType, ObjectType, } from 'type-graphql'


@ObjectType()
export class Community {
  @Field(type => ID)
  id!: string;

  @Field(type => String)
  name!: string;

  @Field(type => String)
  @IsDateString()
  created_at!: string;

  @Field(type => String)
  created_by!: string;

  @Field(type => String)
  description!: string;
}

