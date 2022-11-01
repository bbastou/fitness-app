import { randomUUID } from 'crypto';
import { setTimeout } from 'timers/promises';

import { randomIntFromInterval } from './utils/random-number';
import { convertMilisecondsDurationInSeconds } from './utils/convert-durations';

const ERROR_CODE = -1;

export const makeApiCalls = async (
  endpoint: string,
  items: number[],
  concurrency: number,
): Promise<number[]> => {
  const randomIdentifierForVendor = randomUUID();
  const asyncProcessing = async (item: number) => {
    await setTimeout(randomIntFromInterval(1, concurrency * 1_000));

    const requestOptions = {
      headers: {
        'identifier-for-vendor': `${randomIdentifierForVendor}${item}`,
      },
    };

    try {
      const start = Date.now();
      await fetch(endpoint, requestOptions);
      const end = Date.now();

      return convertMilisecondsDurationInSeconds(start, end);
    } catch (error) {
      return ERROR_CODE;
    }
  };

  const promises = items.map(asyncProcessing);

  const responsesTime = await Promise.all(promises);

  return responsesTime.filter((e) => e !== ERROR_CODE);
};
