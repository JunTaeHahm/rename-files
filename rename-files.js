require('dotenv').config();
const fs = require('fs');
const path = require('path');

// .env 파일에서 환경 변수 가져오기
const directoryPath = process.env.DIRECTORY_PATH;
const oldString = process.env.OLD_STRING;
const newString = process.env.NEW_STRING || '';

// 디렉토리를 재귀적으로 탐색하는 함수
function listFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리인 경우, 재귀적으로 탐색
      listFiles(filePath);
    } else {
      // 파일명이 수정 전 문자열을 포함하는 경우에만 처리
      if (file.includes(oldString)) {
        // 문자열을 제거 또는 변경
        const newFileName = file.replace(oldString, newString);
        const newFilePath = path.join(dir, newFileName);

        // 파일명 변경
        fs.renameSync(filePath, newFilePath);

        console.log(newFilePath);
      }
    }
  });
}

// 디렉토리 탐색 시작
listFiles(directoryPath);
