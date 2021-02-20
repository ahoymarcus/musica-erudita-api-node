const handlers = require('../handlers');


test('home page renders', () => {
  // um obj vazio porque a var req não está sendo testada aqui
  const req = {};
  // jest.fn() cria uma função genérica de mock
  const res = { render: jest.fn() };

  handlers.home(req, res);
  expect(res.render.mock.calls[0][0]).toBe('home');
});

test('about page renders with fortune', () => {
  // um obj vazio porque a var req não está sendo testada aqui
  const req = {};
  // jest.fn() cria uma função genérica de mock
  const res = { render: jest.fn() };

  handlers.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('about');
});

test('404 handler renders', () => {
  // um obj vazio porque a var req não está sendo testada aqui
  const req = {};
  // jest.fn() cria uma função genérica de mock
  const res = { render: jest.fn() };

  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 handler renders', () => {
  const err = new Error('some error');
  // um obj vazio porque a var req não está sendo testada aqui
  const req = {};
  // jest.fn() cria uma função genérica de mock
  const res = { render: jest.fn() };
  const next = jest.fn();

  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('500');
});
