require('dotenv').config();
const fs = require('fs');
const path = require('path');

// .env 파일에서 환경 변수 가져오기
const DIRECTORY_PATH = '/Users/hahmjuntae/Desktop/workspace/asset/icons';
const OLD_STRING = 'juntae'; // 수정 전 문자열
const NEW_STRING = ''; // 수정 후 문자열
const PREFIX_STRING = 'dayes '; // 접두어
const SUFFIX_STRING = ''; // 접미어

// #region 파일명 앞에 접두어 추가
function addPrefixToFileNames(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      addPrefixToFileNames(filePath);
    } else {
      const newFileName = PREFIX_STRING + file;
      const newFilePath = path.join(dir, newFileName);

      fs.renameSync(filePath, newFilePath);

      console.log('변경한 파일: ', newFilePath);
    }
  });
}
// #endregion

// #region 파일명 뒤에 접미어 추가
function addSuffixToFileNames(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      addSuffixToFileNames(filePath);
    } else {
      const fileExtension = path.extname(file);
      const baseName = path.basename(file, fileExtension);
      const newFileName = baseName + SUFFIX_STRING + fileExtension;
      const newFilePath = path.join(dir, newFileName);

      fs.renameSync(filePath, newFilePath);

      console.log('변경한 파일: ', newFilePath);
    }
  });
}
// #endregion

// #region 파일명에서 원하는 문자열을 변경
function changeStringToFileNames(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리인 경우, 재귀적으로 탐색
      changeStringToFileNames(filePath);
    } else {
      // 파일명이 수정 전 문자열을 포함하는 경우에만 처리
      if (file.includes(OLD_STRING)) {
        // 문자열을 제거 또는 변경
        const newFileName = file.replace(OLD_STRING, NEW_STRING);
        const newFilePath = path.join(dir, newFileName);

        // 파일명 변경
        fs.renameSync(filePath, newFilePath);

        console.log('변경한 파일: ', newFilePath);
      }
    }
  });
}
// #endregion

// #region 파일명에 특정 문자열이 있는 경우 파일 삭제
function deleteFilesToFileNames(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리인 경우, 재귀적으로 탐색
      deleteFilesToFileNames(filePath);
    } else {
      // 파일명이 수정 전 문자열을 포함하는 경우에만 처리
      if (file.includes(OLD_STRING)) {
        // 문자열을 제거 또는 변경
        const newFileName = file.replace(OLD_STRING, NEW_STRING);
        const newFilePath = path.join(dir, newFileName);

        // 파일 삭제
        fs.unlinkSync(filePath);

        console.log('삭제한 파일: ', newFilePath);
      }
    }
  });
}
// #endregion

// #region 파일 이름 뒤에서 특정 자리수 만큼 제거
function removeLastChars(dir, num) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeLastChars(filePath);
    } else {
      const fileExtension = path.extname(file);
      const baseName = path.basename(file, fileExtension);
      const newBaseName = baseName.slice(0, -num);
      const newFileName = newBaseName + fileExtension;
      const newFilePath = path.join(dir, newFileName);

      fs.renameSync(filePath, newFilePath);
      console.log(`변경한 파일: ${newFilePath}`);
    }
  });
}
// #endregion

// #region 파일 이름을 대문자 또는 소문자로 변경
function changeCase(dir, type = 'lower') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      changeCase(filePath, type);
    } else {
      const newFileName = type === 'lower' ? file.toLowerCase() : file.toUpperCase();
      const newFilePath = path.join(dir, newFileName);

      fs.renameSync(filePath, newFilePath);

      console.log('변경한 파일: ', newFilePath);
    }
  });
}
// #endregion

// #region Playground
// 접두어 추가
// addPrefixToFileNames(DIRECTORY_PATH);

// 접미어 추가
// addSuffixToFileNames(DIRECTORY_PATH);

// 파일명 특정 문자열 변경
// changeStringToFileNames(DIRECTORY_PATH);

// 특정 문자열 찾은 후 파일 삭제
// deleteFilesToFileNames(DIRECTORY_PATH);

// 파일 이름 뒤에서 특정 자리수 만큼 제거
// removeLastChars(DIRECTORY_PATH, 6);

// 파일 이름 대/소문자 변경
changeCase(DIRECTORY_PATH, 'lower');
// #endregion
