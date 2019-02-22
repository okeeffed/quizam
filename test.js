const test = require('ava');
const execa = require('execa');

test('should return help text', async t => {
    const {stdout} = await execa('./cli.js', ['help']);
    t.regex(stdout, /Quiz yourself using yaml files/gm);
});

test('should return help when no valid argument pass', async t => {
    const {stdout} = await execa('./cli.js', ['howdy']);
    t.regex(stdout, /Quiz yourself using yaml files/gm);
});
