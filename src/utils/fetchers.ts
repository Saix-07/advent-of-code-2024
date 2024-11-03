import env from "$utils/env.ts";

const headers = {
  Cookie: `session=${env.SESSION}`,
} as const;

type FetcherArgs = {
  day: number | string;
  year?: number | string;
};

export const getInput = async ({ day, year = 2024 }: FetcherArgs) => {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const resp = await fetch(url, {
    headers,
  });

  return resp.text();
};

type PosterArgs = FetcherArgs & {
  part: 1 | 2;
  answer: string;
};

export const postAnswer = async ({
  day,
  year = 2024,
  part,
  answer,
}: PosterArgs) => {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      level: part,
      answer,
    }),
  });

  const text = await resp.text();

  if (text.includes("Congratulations!")) {
    return true;
  }

  // Could be more specific here but...eh.
  return false;
};
