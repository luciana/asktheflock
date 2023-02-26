import { ModelInit, MutableModel, __modelMeta__, OptionallyManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly locale: string;
  readonly email: string;
  readonly name?: string | null;
  readonly userTag?: string | null;
  readonly birthdate?: string | null;
  readonly gender?: string | null;
  readonly address?: string | null;
  readonly votes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly locale: string;
  readonly email: string;
  readonly name?: string | null;
  readonly userTag?: string | null;
  readonly birthdate?: string | null;
  readonly gender?: string | null;
  readonly address?: string | null;
  readonly votes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerQuestion = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly userID: string;
  readonly userName?: string | null;
  readonly voteEndAt?: string | null;
  readonly sentiment?: string | null;
  readonly parentID?: string | null;
  readonly questionTag?: string | null;
  readonly options?: string | null;
  readonly stats?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestion = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Question, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text: string;
  readonly userID: string;
  readonly userName?: string | null;
  readonly voteEndAt?: string | null;
  readonly sentiment?: string | null;
  readonly parentID?: string | null;
  readonly questionTag?: string | null;
  readonly options?: string | null;
  readonly stats?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Question = LazyLoading extends LazyLoadingDisabled ? EagerQuestion : LazyQuestion

export declare const Question: (new (init: ModelInit<Question>) => Question) & {
  copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}