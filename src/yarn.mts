import { exec, getExecOutput } from "@actions/exec";

async function disableGlobalCache(): Promise<void> {
  await exec("corepack", [
    "yarn",
    "config",
    "set",
    "enableGlobalCache",
    "false",
  ]);
}

async function enable(): Promise<void> {
  await exec("corepack", ["enable", "yarn"]);
}

async function getConfig(name: string): Promise<string> {
  const prom = await getExecOutput(
    "corepack",
    ["yarn", "config", name, "--json"],
    {
      silent: true,
    },
  );
  const jsonData = (await prom).stdout;
  return JSON.parse(jsonData).effective;
}

async function install(): Promise<void> {
  const env = process.env as { [key: string]: string };

  // Prevent `yarn install` from outputting group log messages.
  env["GITHUB_ACTIONS"] = "";
  env["FORCE_COLOR"] = "true";

  // Prevent no lock file causing errors.
  env["CI"] = "";

  await exec("corepack", ["yarn", "install"], { env });
}

async function version() {
  const res = await getExecOutput("corepack", ["yarn", "--version"]);
  return res.stdout.trim();
}

export default { disableGlobalCache, enable, getConfig, install, version };