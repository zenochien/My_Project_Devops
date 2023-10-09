module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', ['sentence-case']], // Override @commitlint/config-conventional
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
    'header-max-length': [0, 'always', 255],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(feat|fix|perf|refactor|chore|docs|revert|style|test|build|ci)(\(\w.+\))?:\s(HRL-\d{1,5}\s)+(.*)$/,
      headerCorrespondence: ['type', 'scope', 'issue', 'subject'],
    },
  },
};
