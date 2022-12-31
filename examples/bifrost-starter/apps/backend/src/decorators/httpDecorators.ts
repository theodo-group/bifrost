import { Public } from '@auth/public.decorator';
import {
  applyDecorators,
  // This is where we define the custom decorators, we want to import the real ones here
  /* eslint-disable no-restricted-imports */
  Delete as NestJsCoreDelete,
  Get as NestJsCoreGet,
  Patch as NestJsCorePatch,
  Post as NestJsCorePost,
  Put as NestJsCorePut,
  /* eslint-enable no-restricted-imports */
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

interface Config {
  isPublic: boolean;
}

type ParamsWithPath = [string | undefined, Config | undefined] | [string | undefined] | [];
type ParamsWithoutPath = [Config | undefined];

type Params = ParamsWithPath | ParamsWithoutPath;

export const paramsHavePath = (params: Params): params is ParamsWithPath => {
  return params.length === 0 || params.length === 2 || typeof params[0] === 'string';
};

const generateConfigFromParam = (config?: Config) => ({
  isPublic: false,
  ...(config ?? {}),
});

const getPathAndConfigFromParams = (...params: Params) => {
  if (!paramsHavePath(params)) {
    return {
      config: generateConfigFromParam(params[0]),
    };
  }

  return {
    path: params[0],
    config: generateConfigFromParam(params[1]),
  };
};

const generateCustomHttpDecorator = (
  originalDecorator: (path?: string | string[] | undefined) => MethodDecorator,
  ...params: Params
): MethodDecorator => {
  const { path, config } = getPathAndConfigFromParams(...params);

  const decoratorsToApply = [originalDecorator(path)];

  if (config.isPublic) {
    decoratorsToApply.push(Public());
  } else {
    decoratorsToApply.push(ApiBearerAuth('access-token'));
  }

  return applyDecorators(...decoratorsToApply);
};

export const Get = (...params: Params): MethodDecorator =>
  generateCustomHttpDecorator(NestJsCoreGet, ...params);

export const Post = (...params: Params): MethodDecorator =>
  generateCustomHttpDecorator(NestJsCorePost, ...params);

export const Put = (...params: Params): MethodDecorator =>
  generateCustomHttpDecorator(NestJsCorePut, ...params);

export const Patch = (...params: Params): MethodDecorator =>
  generateCustomHttpDecorator(NestJsCorePatch, ...params);

export const Delete = (...params: Params): MethodDecorator =>
  generateCustomHttpDecorator(NestJsCoreDelete, ...params);
