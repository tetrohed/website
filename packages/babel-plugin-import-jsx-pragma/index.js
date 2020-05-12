const DEFAULT_OPTIONS = {
  scopeVariable: 'React',
  source: 'react',
};
// TODO TYPESCRIPT the project
// use babel to transpile
/**
 * Babel transform plugin for automatically injecting an import to be used as
 * the pragma for the React JSX Transform plugin.
 *
 * @see http://babeljs.io/docs/en/babel-plugin-transform-react-jsx
 *
 * @param {Object} babel Babel instance.
 *
 * @return {Object} Babel transform plugin.
 */
module.exports = function (babel) {
  const { types: t } = babel;

  function getOptions(state) {
    if (!state._options) {
      state._options = Object.assign({}, DEFAULT_OPTIONS, state.opts);
    }

    return state._options;
  }

  return {
    visitor: {
      JSX(path, state) {
        if (state.hasUndeclaredScopeVariable) {
          return;
        }

        const { scopeVariable } = getOptions(state);
        // TODO should simply throw here instead of magically checking
        // for existence, use case should be clear
        state.hasUndeclaredScopeVariable = !path.scope.hasBinding(
          scopeVariable
        );
      },
      Program: {
        exit(path, state) {
          const { scopeVariable, source } = getOptions(state);

          let scopeVariableSpecifier;

          if (state.hasUndeclaredScopeVariable) {
            scopeVariableSpecifier = t.importDefaultSpecifier(
              t.identifier(scopeVariable)
            );
          }

          if (scopeVariableSpecifier) {
            const importDeclaration = t.importDeclaration(
              [scopeVariableSpecifier],
              t.stringLiteral(source)
            );

            path.unshiftContainer('body', importDeclaration);
          }
        },
      },
    },
  };
};
