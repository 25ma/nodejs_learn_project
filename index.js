import {existsSync, readFileSync, writeFileSync} from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import {options} from './lib/cmd.js';
import {generate} from './lib/generator.js';
import { createRandomPick, randomInt } from './lib/random.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(__dirname, src);
    const data = readFileSync(path, {encoding: 'utf8'});
    return JSON.parse(data);
}

const corpus = loadCorpus('corpus/data.json');

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