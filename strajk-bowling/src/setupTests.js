import { Response as FetchResponse, Request as FetchRequest, Headers as FetchHeaders } from 'node-fetch';
import nodeFetch from 'node-fetch';
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup as testingCleanup } from '@testing-library/react';
import { matchers as jestDomMatchers } from '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

global.Response = FetchResponse;
global.Request = FetchRequest;
global.Headers = FetchHeaders;
global.fetch = nodeFetch;

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  testingCleanup();
});

afterAll(() => server.close());

expect.extend(jestDomMatchers);
