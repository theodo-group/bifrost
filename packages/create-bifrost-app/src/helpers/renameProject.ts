import { execSync } from 'child_process';

export const renameProject = (appName: string, root: string): void => {
  execSync(`mv bifrost-starter.code-workspace ${appName}.code-workspace`, {
    stdio: 'ignore',
    cwd: root,
  });
  execSync(
    `grep -rl 'bifrost-starter'|xargs perl -i -pe's/bifrost-starter/${appName}/g'`,
    { stdio: 'ignore', cwd: root },
  );
};
