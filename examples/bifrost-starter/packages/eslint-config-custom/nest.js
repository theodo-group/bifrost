module.exports = {
  extends: ['custom/base'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@nestjs/common',
            importNames: [
              'Controller',
              'Get',
              'Post',
              'Put',
              'Patch',
              'Delete',
            ],
            message:
              'Please use our custom Http decorators. They are defined in decorators/controller.ts or decorators/httpDecorators.ts',
          },
        ],
      },
    ],
  },
};
