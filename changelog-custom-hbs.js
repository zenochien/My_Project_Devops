module.exports = function (Handlebars) {
  Handlebars.registerHelper('custom-commit-list', (merges, commits, options) => {
    if ((!merges || merges.length === 0) && (!commits || commits.length === 0)) {
      return '';
    }

    const allCommits = [];
    commits.forEach((c) => {
      allCommits.push({
        brief: c.subject,
        refId: c.shorthash,
        ...c,
      });
    });

    merges.forEach((m) => {
      allCommits.push({
        brief: m.message,
        refId: `#${m.id}`,
        ...m,
      });
    });

    const list = allCommits
      .filter((item) => {
        const commit = item.commit || item;
        // If specified, exclude all commits with pattern '[skipclog]' at the end of line.
        // This only matches the first line.
        if (options.hash.skipclog === 'enable' && /\[skipclog\]$/i.test(item.brief)) {
          return false;
        }

        if (options.hash.exclude) {
          const pattern = new RegExp(options.hash.exclude, 'm');
          if (pattern.test(commit.message)) {
            return false;
          }
        }
        if (options.hash.message) {
          const pattern = new RegExp(options.hash.message, 'm');
          return pattern.test(commit.message);
        }
        if (options.hash.subject) {
          const pattern = new RegExp(options.hash.subject);
          return pattern.test(commit.subject);
        }
        return true;
      })
      .sort((a, b) => a.brief.localeCompare(b.brief)) // sort `brief` alphabetically
      .map((item) => options.fn(item))
      .join('');

    if (!list) {
      return '';
    }

    return `${options.hash.heading}\n\n${list}`;
  });
};
