import { testSample } from '$utils/tester.ts';
import { arrayEquals, sort } from '$utils/blah.ts';

/** Validators */
function allIncreasing(report: number[]): boolean {
  return arrayEquals(sort(report), report);
}

function allDescreasing(report: number[]): boolean {
  return arrayEquals(sort(report).toReversed(), report);
}

function stepsWithinRange(report: number[]): boolean {
  // Haven't written one of these in a while...
  for (let i = 0; i < report.length - 1; i++) {
    const difference = Math.abs(report[i]! - report[i + 1]!);
    if (difference < 1) return false;
    if (difference > 3) return false;
  }

  return true;
}

/** Parts */
async function part01(lines: Iterable<string>) {
  let safeLevelCount = 0;

  for await (const report of lines) {
    const parsedReport = report.split(' ').map((level) => +level);
    if (
      (allIncreasing(parsedReport) || allDescreasing(parsedReport)) &&
      stepsWithinRange(parsedReport)
    ) {
      safeLevelCount += 1;
    }
  }

  return safeLevelCount;
}

async function part02(lines: Iterable<string>) {
  let safeLevelCount = 0;

  const safeReport = (report: number[]) =>
    (allIncreasing(report) || allDescreasing(report)) &&
    stepsWithinRange(report);

  /**
   * For an array of length `n`, returns a generator of all combinations of length `n-1`
   */
  function* possibleReports(report: number[]) {
    for (let i = 0; i < report.length; i++) {
      yield [...report.slice(0, i), ...report.slice(i + 1, report.length)];
    }
  }

  for await (const report of lines) {
    const parsedReport = report.split(' ').map((level) => +level);
    if (
      safeReport(parsedReport) ||
      [...possibleReports(parsedReport)].some((report) => safeReport(report))
    ) {
      safeLevelCount += 1;
    }
  }

  return safeLevelCount;
}

testSample(part01, {
  day: 2,
  part: 1,
  expected: '2',
});

testSample(part02, {
  day: 2,
  part: 2,
  expected: '4',
});

if (import.meta.main) {
  const decoder = new TextDecoder();
  const file = Deno.readFileSync('./src/inputs/02.input');
  const lines = decoder.decode(file).split('\n');
  console.log(await part01(lines));
  console.log(await part02(lines));
}
