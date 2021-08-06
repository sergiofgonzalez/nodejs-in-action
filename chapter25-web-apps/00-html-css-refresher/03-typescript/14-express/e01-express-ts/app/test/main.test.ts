import { app, server } from '../src/main';

describe('basic tests', () => {

  afterAll(() => {
    server.close();
  });

  test('Express app should exist', () => {
    expect(app).toBeTruthy();
  });
});


