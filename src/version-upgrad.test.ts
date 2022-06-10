import * as core from "@actions/core";

import mock from "mock-fs";
import versionUpgrad from "./version-upgrad";

jest.mock("@actions/core", () => ({
  info: jest.fn(),
  setOutput: jest.fn(),
}));

describe("versionUpgrad", () => {
  afterEach(() => {
    mock.restore();
  });

  describe(" when tag and version match", () => {
    const version = "0.0.0";
    beforeEach(() => {
      mock({
        "package.json": JSON.stringify({ version }),
      });
    });

    it("should not throw an error", () => {
      versionUpgrad(`refs/tags/${version}`);
    });

    it("should output the package version", () => {
      versionUpgrad(`refs/tags/${version}`);
      expect(core.setOutput).toHaveBeenCalledWith("PACKAGE_VERSION", version);
    });

    it("should output the tag version", () => {
      versionUpgrad(`refs/tags/${version}`);
      expect(core.setOutput).toHaveBeenCalledWith("TAG_VERSION", version);
    });
  });

  it("should throw an error when not on ref tag", () => {
    const version = "0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    expect(() => versionUpgrad("refs/heads/master")).toThrow(/not tagged/);
  });

  it("should throw an error there is no package.json present", () => {
    mock({});
    expect(() => versionUpgrad(`refs/tags/some-tag`)).toThrow(
      /no such file or directory/
    );
  });

  it("should throw an error when package.json is malformed", () => {
    mock({
      "package.json": "hello there",
    });
    expect(() => versionUpgrad(`refs/tags/some-tag`)).toThrow(
      /Unexpected token/
    );
  });

  it("should not throw error when versions match with provided prefix", () => {
    const prefix = "v";
    const version = "0.0.0";
    mock({
      "package.json": JSON.stringify({ version }),
    });

    versionUpgrad(`refs/tags/${prefix}${version}`, prefix);
  });
});
