const test = require('ava');
const execa = require('execa');
const fs = require('fs');
const cwd = process.cwd();

test('should return help text', async t => {
    const {stdout} = await execa('./cli.js', ['help']);
    t.regex(stdout, /Quiz yourself using yaml files/gm);
});

test('should return help when no valid argument pass', async t => {
    const {stdout} = await execa('./cli.js', ['howdy']);
    t.regex(stdout, /Quiz yourself using yaml files/gm);
});

test('should generate base quizam.yaml file', async t => {
    await execa('./cli.js', ['init', '-y']);
    t.is(fs.existsSync(cwd + '/quizam.yaml'), true);
});

/**
 * Remove init files
 */
test.beforeEach(t => {
    cleanup();
});

/**
 * Remove base quizam.yaml file
 *
 */
const cleanup = async() => {
    if (fs.existsSync(cwd + '/quizam.yaml')) {
        fs.unlinkSync(cwd + '/quizam.yaml');
    }
}