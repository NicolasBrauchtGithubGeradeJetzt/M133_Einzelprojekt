const [diagnostic, emit] = await Deno.bundle("./frontend/fileManager.ts");

await Deno.writeTextFile("./frontend/build.app.js", emit);