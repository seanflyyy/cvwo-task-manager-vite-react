export const centerContainerWidth = window.innerWidth / 2.5;
export const databaseLink = 'http://localhost:3000';

const offsetUTC: number = new Date().getTimezoneOffset() / 60;
export const timezoneOffset: string =
  offsetUTC > 0 ?
    Math.abs(offsetUTC) > 10 ?
      '-' + Math.abs(offsetUTC).toString() + ':00' :
      '-0' + Math.abs(offsetUTC).toString() + ':00' :
    Math.abs(offsetUTC) > 10 ?
    '+' + Math.abs(offsetUTC).toString() + ':00' :
    '+0' + Math.abs(offsetUTC).toString() + ':00';
