// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Question } = initSchema(schema);

export {
  User,
  Question
};