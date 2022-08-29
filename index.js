import {existsSync, readFileSync, writeFileSync} from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import {generate} from './lib/generator.js';
import { createRandomPick, randomInt } from './lib/random.js';
import commandLineArgs from 'command-line-args';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(__dirname, src);
    const data = readFileSync(path, {encoding: 'utf8'});
    return JSON.parse(data);
}

const corpus = loadCorpus('corpus/data.json');
const optionDefinitions = [
    {name: 'title', type: String},
    {name: 'min', type: Number},
    {name: 'max', type: Number},
];
const options = commandLineArgs(optionDefinitions);
// const options = parseOptions();
const title = options.title || createRandomPick(corpus.title)();
const article = generate(title, {corpus, ...options});
const output = saveCorpus(title, article);
console.log(`生成成功，文章保存于 ${output}`);

function saveCorpus(title, article) {
    const outputDir = resolve(__dirname, 'output');
    // const time = moment().format('|YYYY-MM-DD|HH:mm:ss');
    const num = randomInt(1, 100);
    const outputFile = resolve(outputDir, `${title}${num}.txt`);

    // 检查outputDir是否存在 ，没有就创建一个
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }

    const text = `${title}\n\n    ${article.join('\n    ')}`;
    writeFileSync(outputFile, text);

    return outputFile;
}

function parseOptions(options = {}) {
    const argv = process.argv;
    for (let i = 2; i < argv.length; i++) {
        const cmd = argv[i-1];
        const value = argv[i];
        
        if(cmd == '--title') {
            options.title = value;
        } else if(cmd == '--min') {
            options.min = Number(value);
        } else if(cmd == '--max') {
            options.max = Number(value);
        }
    }
    return options;
}