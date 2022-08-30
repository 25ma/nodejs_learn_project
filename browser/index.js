import {generate} from '../lib/generator.js';
import { createRandomPick } from '../lib/random.js';

const defaultCorpus = require('../corpus/data.json');

async function loadCorpus(corpuspath) {
    if(corpuspath) {
        const corpus = await (await fetch(corpuspath)).json();
        return corpus;
    }
    return defaultCorpus;
}

export {generate, createRandomPick, loadCorpus};