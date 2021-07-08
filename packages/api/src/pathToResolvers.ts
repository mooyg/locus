import { NonEmptyArray } from 'type-graphql';

export const pathsToResolvers = [
  __dirname + '/modules/**/*.resolver.js',
  __dirname + '/modules/**/*.resolver.ts',
] as NonEmptyArray<string>;
