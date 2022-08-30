// console.log("请输入一个要求和的整数，以0结束输入");

// process.stdin.setEncoding('utf8');

// let sum = 0;

// process.stdin.on('readable', ()=>{
//     const chunk = process.stdin.read(); // 获取当前输入的字符，包含回车
//     const n = Number(chunk.slice(0,-1));
//     sum += n;
//     if(n === 0) process.stdin.emit('end');
//     process.stdin.read();
// });

// process.stdin.on('end', () => {
//     console.log(`求和结果是：${sum}`);
// })

import readline from 'readline';

function question(rl, {text, value}) {
    const q = `${text}(${value})\n`;
    return new Promise((resolve) => {
        rl.question(q, (answer) => {
            resolve(answer || value);
        })
    });
}

export async function interact(questions) {
    // questions 是一个数组 内容如{text,value}

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answers = [];
    for(let i =0; i< questions.length; i++) {
        const q = questions[i];
        const answer = await question(rl , q); // 等待问题输入
        answers.push(answer);
    }

    rl.close();
    return answers;
}