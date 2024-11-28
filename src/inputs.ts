import { getBooleanInput, getInput } from "@actions/core";

interface Inputs {
  version: string;
  cache: boolean;
}

export function getInputs(): Inputs {
  return {
    version: '4.5.3',
    cache: getBooleanInput("cache"),
  };
}
