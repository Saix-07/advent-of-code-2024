import { getInput } from '$utils/fetchers.ts';
import * as path from '@std/path';
import { Ask } from '@sallai/ask';

const ask = new Ask();

const { day, year } = await ask.prompt(
  [
    {
      name: 'day',
      type: 'number',
      message: 'Day:',
    },
    {
      name: 'year',
      type: 'number',
      message: 'Year:',
      default: 2024,
    },
  ] as const,
);

const input = await getInput({ day, year });

const fileName = `${day.toString().padStart(2, '0')}.input`;
await Deno.writeTextFile(
  path.join(import.meta.dirname!, '../inputs', fileName),
  input,
  {
    create: true,
  },
);

console.log(`Wrote file to ${fileName}!`);
