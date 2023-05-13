

export function isUndefined(value: string | number | boolean): boolean {
  return typeof value === 'undefined';
}

export function isNullOrUndefined(value: string | number | boolean): boolean {
  return value === null || isUndefined(value);
}

export function deepClone(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj));
}

export function deepFind(obj, path: string) {
  const paths = path?.split('.');
  let current = obj;

  if (paths) {
    for (const p of paths) {
      if (current[p] === undefined) {
        return undefined;
      } else {
        current = current[p];
      }
    }
  }
  return current;
}

export function plainDeleteNullableValues(obj: object) {
  Object.keys(obj).forEach((key) => {
    if (isNullOrUndefined(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
}

export function getEnumPropNameByValue(value: number, enumObj: any): string | undefined {
  const enumKeys = Object.keys(enumObj).filter(key => typeof enumObj[key] === "number");
  const enumValues = enumKeys.map(key => enumObj[key]);
  const index = enumValues.indexOf(value);
  if (index === -1) {
    return undefined;
  }
  return enumKeys[index];
}

export function isNil(value: any): value is null | undefined {
  return value === null || typeof value === 'undefined';
}
