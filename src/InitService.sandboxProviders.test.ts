import { describe, expect, it } from "vitest";
import { listSandboxProviders, getSandboxProvider } from "./InitService.js";

describe("Sandbox provider registry", () => {
  it("listSandboxProviders returns all built-in providers", () => {
    expect(listSandboxProviders().map((provider) => provider.name)).toEqual([
      "docker",
      "podman",
      "no-sandbox",
    ]);
  });

  it("getSandboxProvider returns docker entry", () => {
    const provider = getSandboxProvider("docker");
    expect(provider).toBeDefined();
    expect(provider!.importSubpath).toBe("docker");
    expect(provider!.image).toEqual({
      containerfileName: "Dockerfile",
      cliNamespace: "docker",
    });
  });

  it("getSandboxProvider returns podman entry", () => {
    const provider = getSandboxProvider("podman");
    expect(provider).toBeDefined();
    expect(provider!.importSubpath).toBe("podman");
    expect(provider!.image).toEqual({
      containerfileName: "Containerfile",
      cliNamespace: "podman",
    });
  });

  it("getSandboxProvider returns no-sandbox entry without image metadata", () => {
    const provider = getSandboxProvider("no-sandbox");
    expect(provider).toBeDefined();
    expect(provider!.importSubpath).toBe("no-sandbox");
    expect(provider!.factoryImport).toBe("noSandbox");
    expect(provider!.image).toBeUndefined();
  });

  it("getSandboxProvider returns undefined for unknown provider", () => {
    expect(getSandboxProvider("nonexistent")).toBeUndefined();
  });
});
