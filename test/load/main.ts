import * as minimist from 'minimist';

import { makeApiCalls } from './make-api-calls';
import { getAverage } from './utils/get-average';
import { convertMilisecondsDurationInSeconds } from './utils/convert-durations';

const API_ENDPOINT = 'http://127.0.0.1:3000/api/v1/data';

const DEFAULT_REQUESTS_COUNT = 10_000;
const DEFAULT_TIMELIMIT_SECONDS = 3;
const DEFAULT_NEW_USERS_PERCENT = 50;
const ACCETABLE_MEAN_RESPONSE_TIME_SECONDS = 3;

const argv = minimist(process.argv.slice(1));

const REQUESTS_COUNT = argv.number ?? DEFAULT_REQUESTS_COUNT;
const TIME_LIMIT = argv.timelimit ?? DEFAULT_TIMELIMIT_SECONDS;
const NEW_USERS_PERCENT = Math.min(
  Math.max(argv.new_users_percent ?? DEFAULT_NEW_USERS_PERCENT, 1),
  100,
);

const SUCCESS_COLOR = '\x1b[42m';
const UNSUCCESS_COLOR = '\x1b[41m';

const processChargeTest = async (
  count: number,
  concurrency: number,
  newUsersPercent: number,
) => {
  const unique = (count * newUsersPercent) / 100;
  const items = Array.from([...Array(count).keys()], (n) => n % unique);

  const start = Date.now();
  const responseTimes: number[] = await makeApiCalls(
    API_ENDPOINT,
    items,
    concurrency,
  );
  const end = Date.now();

  const average = getAverage(responseTimes);

  const resultColor =
    average < ACCETABLE_MEAN_RESPONSE_TIME_SECONDS
      ? SUCCESS_COLOR
      : UNSUCCESS_COLOR;

  console.log(`\n\n\n`);
  console.log(`Concurrency Level:     ${concurrency} [s]`);
  console.log(
    `Time taken for tests:  ${convertMilisecondsDurationInSeconds(
      start,
      end,
    ).toFixed(2)} [s]`,
  );
  console.log(`Complete requests:     ${count}`);
  console.log(`Failed requests:       ${count - responseTimes.length}`);
  console.log(
    `New users:             ${new Set(items).size} (insert database)`,
  );
  console.log(
    `${resultColor}%s\x1b[0m`,
    `Time per request:      ${average.toFixed(4)} [s] (mean)`,
  );
  console.log(`\n`);
};

processChargeTest(REQUESTS_COUNT, TIME_LIMIT, NEW_USERS_PERCENT);
