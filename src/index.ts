import * as core from "@actions/core";

import versionUpgrad from "./version-upgrad";

try {
  const prefix = process.env.INPUT_TAG_PREFIX
    ? process.env.INPUT_TAG_PREFIX
    : process.env.TAG_PREFIX;
  versionUpgrad(process.env.GITHUB_REF || "", prefix);
} catch (error) {
  core.error(error.message);
  process.exit(1);
}
