import Joi from "joi";
import {
  Author,
  Post
} from "../entities";

export function createJobTableObject(author: Record<string, any>) {
  const jobTableSchema = Joi.object<Author>({
    name: Joi.string().required(),
  }).options({ stripUnknown: true });

  const validation = jobTableSchema.validate(Object.assign(new Author(), author));
  if (validation.error) throw validation.error;
  return validation.value;
}
