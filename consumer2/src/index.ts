import { entrypoint } from './consumer';

(async (): Promise<void> => {
  await entrypoint();
})();
