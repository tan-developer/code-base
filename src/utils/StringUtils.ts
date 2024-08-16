export const snakeToCamel = (str: string) => 
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));


    
export function parseStringToNumber(str : String | string) {
  const number = +str;
  return isNaN(number) ? str : number;
}

export const stringNullOrEmpty = (string : String | string) => {
  if (
      string === undefined ||
      string === null ||
      string === 'null'||
      string === '' ||
      string instanceof String && string.trim() === ''
  )
      return true;
  return false;
};
