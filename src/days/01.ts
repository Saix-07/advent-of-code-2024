import { zip } from '@std/collections';
import { sort } from '$utils/blah.ts';
import DefaultDict from '$utils/default-dict.ts';
import { testSample } from '$utils/tester.ts';

async function part01(lines: Iterable<string>) {
  const leftList: number[] = [];
  const rightList: number[] = [];

  for await (const line of lines) {
    const [left, right] = line.split(/\s/).filter((s) => s.length > 0);
    if (!left || !right) throw new Error(`Unexpected input: ${line}`);

    leftList.push(+left);
    rightList.push(+right);
  }

  let total = 0;
  for (const [pairLeft, pairRight] of zip(sort(leftList), sort(rightList))) {
    total += Math.abs(pairLeft - pairRight);
  }

  return total;
}

async function part02(lines: Iterable<string>) {
  const leftList: number[] = [];
  const freqMap = new DefaultDict<number, number>(() => 0);

  for await (const line of lines) {
    const [left, right] = line.split(/\s/).filter((s) => s.length > 0);
    if (!left || !right) throw new Error(`Unexpected input: ${line}`);

    leftList.push(+left);
    freqMap.update(+right, (curr) => curr + 1);
  }

  let total = 0;
  for (const id of leftList) {
    total += id * freqMap.get(id);
  }

  return total;
}

testSample(part01, {
  day: 1,
  part: 1,
  expected: '11',
});

testSample(part02, {
  day: 1,
  part: 2,
  expected: '31',
});
