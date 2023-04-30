

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
