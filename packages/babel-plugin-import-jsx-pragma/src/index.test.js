import { transformSync } from '@babel/core';

import plugin from '../index';

const getTransformedCode = (source, options = {}) => {
  const { code } = transformSync(source, {
    configFile: false,
    plugins: [[plugin, options], '@babel/plugin-syntax-jsx'],
  });

  return code;
};

describe('babel-plugin-import-jsx-pragma', () => {
  it('does nothing if there is no jsx', () => {
    const original = 'let foo;';
    const string = getTransformedCode(original);

    expect(string).toBe(original);
  });

  it('does nothing if there scope variable already imported', () => {
    const original = 'import React from "react";\nlet foo = <bar />;';
    const string = getTransformedCode(original);

    expect(string).toBe(original);
  });

  it('does nothing if the scope variable is already defined', () => {
    const original = 'const React = require("react");\n\nlet foo = <bar />;';
    const string = getTransformedCode(original);

    expect(string).toBe(original);
  });

  it('adds import for scope variable', () => {
    const original = 'let foo = <bar />;';
    const string = getTransformedCode(original);

    expect(string).toBe('import React from "react";\n' + original);
  });

  it('adds import for scope variable with custom import', () => {
    const original = 'let foo = <bar />;';
    const string = getTransformedCode(original, {
      scopeVariable: 'domVariable',
      source: 'dom',
    });

    expect(string).toBe('import domVariable from "dom";\nlet foo = <bar />;');
  });
});
