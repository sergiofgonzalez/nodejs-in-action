function resolveAfter(numSeconds: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done!');
    }, numSeconds * 1_000);
  });
}

test('pass: should resolve after 10 seconds', async () => {
  jest.setTimeout(30_000);
  const p: string = await resolveAfter(10);

  expect(p).toBe('done!');
});
