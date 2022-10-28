/* eslint-disable import/namespace */
/* eslint-disable guard-for-in */
import * as secondary from ".";

const ehooks: {
  [key: string]: unknown;
} = {};

for (const key in secondary) {
  ehooks[key] = (
    secondary as {
      [key: string]: unknown;
    }
  )[key] as unknown;
}

export default ehooks;
