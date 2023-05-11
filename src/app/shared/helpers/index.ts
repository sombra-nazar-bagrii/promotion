

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || isUndefined(value);
}

export function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function deepFind(obj: any, path: any) {
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

export const getLastChildRoute = (activatedRoute) => {
  let route = activatedRoute.firstChild;
  while (route.firstChild) {
    route = route.firstChild;
  }
  return route;
};

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
