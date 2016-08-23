const _ = require('lodash');

module.exports = env => {
  // Format JSON
  env.addFilter('prettify', str => JSON.stringify(str, null, 4));

  // Stringify JSON
  env.addFilter('stringify', str => JSON.stringify(str));

  // Filter Hook
  env.addFilter('filter', (list, match) => _.filter(list, match));

  // Format Registration Marks
  env.addFilter('regMark', str => str.replace(/®/ig, '<sup>&reg;</sup>'));

  // Strip HTML Tags
  env.addFilter('stripTags', data => data.replace(/(<([^>]+)>)/ig, ''));

  // Limit Numbers, Strings, Arrays
  env.addFilter('limit', (input, limit) => {
    if (typeof limit !== 'number') return input;
    if (typeof input === 'string') {
      if (limit >= 0) return input.substring(0, limit);
      return input.substr(limit);
    }
    if (Array.isArray(input)) {
      const arrayLimit = Math.min(limit, input.length);
      if (arrayLimit >= 0) return _.take(input, arrayLimit);
      return _.takeRight(input, Math.abs(arrayLimit));
    }
    return input;
  });

  return env;
};
