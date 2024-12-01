import { expect } from '@std/expect';

export const testSample = (
  callback: (
    lines: string[],
  ) => number | string | Promise<number> | Promise<string>,
  options: {
    day: number;
    part: 1 | 2;
    expected: string;
  },
) =>
  Deno.test(`Day ${options.day} (Part ${options.part}) Sample`, async () => {
    const decoder = new TextDecoder();
    const bytes = await Deno.readFile(
      `./src/inputs/${options.day.toString().padStart(2, '0')}.sample.input`,
    );
    const text = decoder.decode(bytes);

    expect((await callback(text.split('\n'))).toString()).toBe(
      options.expected,
    );
  });
