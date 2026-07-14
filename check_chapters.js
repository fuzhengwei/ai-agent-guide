const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

const chaptersDir = 'chapters';
const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.html')).sort();

let problemCount = 0;
files.forEach(file => {
  const html = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const tags = ['strong','em','b','i','u','p','div','span','a','li','ul','ol','code','pre','table','tbody','thead','tr','td','th','h1','h2','h3','h4','h5','h6'];
  const unbalanced = [];
  tags.forEach(tag => {
    const open = (html.match(new RegExp('<' + tag + '\\b[^>]*>', 'gi')) || []).length;
    const close = (html.match(new RegExp('</' + tag + '>', 'gi')) || []).length;
    if (open !== close) unbalanced.push(tag + ': ' + open + '/' + close);
  });

  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>');
  const doc = dom.window.document;
  const root = doc.getElementById('root');
  root.innerHTML = '<div class="page-transition">' + html + '</div>';
  const pageDiv = root.querySelector('.page-transition');

  const summaryBox = root.querySelector('.summary-box');
  const quizArea = root.querySelector('#quizArea');
  const summaryOK = !summaryBox || Array.from(pageDiv.children).includes(summaryBox);
  const quizOK = !quizArea || Array.from(pageDiv.children).includes(quizArea);

  if (unbalanced.length > 0 || !summaryOK || !quizOK) {
    problemCount++;
    console.log('\n' + file);
    if (unbalanced.length > 0) console.log('  标签不平衡:', unbalanced.join(', '));
    if (!summaryOK) console.log('  summary-box 嵌套异常');
    if (!quizOK) console.log('  quizArea 嵌套异常');
  }
});
console.log('\n总问题章节数:', problemCount);
