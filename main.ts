#!/usr/bin/env -S deno run --allow-env

let homework: [number, number][] = [];
let summative: [number, number][] = [];

function repl() {
  let running = true;

  while (running) {
    const input = prompt(">");
    let a = run_input(input ? input : "");
    if (a[0] === 1) console.log(a[1]); 
  }
}

function run_input(input: string): [number, string] {
  input = input.trim();

  if (input == "") return [-1, ""];

  const args = input.toLowerCase().split(' ');

  const command = args[0];

  switch (command) {
    case 'add':
      if (args.length != 3) return [1, "USAGE: add [s|h] [grade]"];
      let grade: [number, number] = [0, 0];

      const nums = args[2].split('/');
      const numerator = parseFloat(nums[0]);
      const denominator = parseFloat(nums[1]);

      if (isNaN(numerator) || isNaN(denominator)) return [1, "CANT PARSE NUMBERS"];

      grade[0] = numerator;
      grade[1] = denominator;

      if (args[1] == 'h') {
        homework.push(grade);
      } else if (args[1] == 's') {
        summative.push(grade);
      }

      break;
    case 'list':
      if (homework.length > 0) {
        let n = 0;
        let d = 0;
        homework.forEach((element) => { n += element[0]; d += element[1] });
        console.log(`Homework: ${n}/${d}, ${(n/d)*100}%`);
      }

      if (summative.length > 0) {
        let n = 0;
        let d = 0;

        summative.forEach((element) => { n += element[0]; d += element[1] });
        console.log(`Summative: ${n}/${d}, ${(n/d)*100}%`);
      }
      break;
    case 'grade':
      let s_grade = 0;
      let h_grade = 0;

      if (summative.length > 0) {
        let n = 0;
        let d = 0;
        summative.forEach((element) => { n += element[0]; d += element[1] });

        s_grade = n/d;
      }

      if (homework.length > 0) {
        let n = 0;
        let d = 0;

        homework.forEach((element) => { n += element[0]; d += element[1] })
        h_grade = n/d;
      }

      console.log(`${((0.9 * s_grade) + (0.1 * h_grade)) * 100}%`);
      break;
    default:
      return [1, "?"];
  }

  return [0, ""]; 
}

repl();
