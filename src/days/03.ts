import { testSample } from '$utils/tester.ts';

/** Part 1 - ezpz */
async function part01(lines: Iterable<string>) {
  const mulRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

  let total = 0;
  for await (const line of lines) {
    for (const [, a, b] of line.matchAll(mulRegex)) {
      total += +a! * +b!;
    }
  }

  return total;
}

/** Part 2 - more involved */
type State = 'do' | 'dont';
type Token = { type: 'mul'; a: number; b: number } | { type: 'do' } | {
  type: 'dont';
};

const parseTokens = (line: string): Token[] => {
  const tokens: Token[] = [];
  let buf: string[] = [];

  for (const char of line) {
    buf.push(char);

    if (bufIsDo(buf)) {
      tokens.push({ type: 'do' });
      buf = [];
    } else if (bufIsDont(buf)) {
      tokens.push({ type: 'dont' });
      buf = [];
    }

    const mulResult = bufIsMul(buf);
    if (mulResult) {
      tokens.push({ type: 'mul', a: mulResult[0], b: mulResult[1] });
      buf = [];
    }
  }

  return tokens;
};

const bufIsMul = (buf: string[]): false | [number, number] => {
  // Re-use the regex from part 1
  const mulRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/;
  const match = buf.join('').match(mulRegex);

  const [, a, b] = match ?? [];
  if (!a || !b) return false;

  return [+a, +b];
};

const bufIsDo = (buf: string[]) => {
  return /.*do\(\)/g.test(buf.join(''));
};

const bufIsDont = (buf: string[]) => {
  return /.*don't\(\)/g.test(buf.join(''));
};

async function part02(lines: Iterable<string>) {
  let total = 0;
  let currState: State = 'do';

  for await (const line of lines) {
    for (const token of parseTokens(line)) {
      switch (token.type) {
        case 'do':
          currState = 'do';
          break;
        case 'dont':
          currState = 'dont';
          break;
        case 'mul':
          if (currState === 'dont') break;
          total += token.a * token.b;
      }
    }
  }

  return total;
}

testSample(part01, {
  day: 3,
  part: 1,
  expected: '161',
});

testSample(part02, {
  day: 3,
  part: 2,
  expected: '48',
  customFile: './src/inputs/03.sample-2.input',
});

if (import.meta.main) {
  const decoder = new TextDecoder();
  const file = Deno.readFileSync('./src/inputs/03.input');
  const lines = decoder.decode(file).split('\n');
  console.log(await part01(lines));
  console.log(await part02(lines));
}
