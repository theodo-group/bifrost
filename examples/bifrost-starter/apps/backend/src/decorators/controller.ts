// This is where we define the custom decorator, we want to import the real one here
// eslint-disable-next-line no-restricted-imports
import { applyDecorators, Controller as NestJsCoreController } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import capitalize from 'lodash/capitalize';

const formatApiRouteName = (route: string) => route.split('-').map(capitalize).join(' ');

export const Controller = (route?: string): ReturnType<typeof NestJsCoreController> => {
  if (route === undefined) {
    return applyDecorators(NestJsCoreController());
  }

  return applyDecorators(ApiTags(formatApiRouteName(route)), NestJsCoreController(route));
};
