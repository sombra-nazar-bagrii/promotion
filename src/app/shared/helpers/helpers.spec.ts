import {
  isUndefined,
  isNullOrUndefined,
  deepClone,
  deepFind,
  plainDeleteNullableValues,
  getEnumPropNameByValue
} from './index';

describe('Helpers', () => {
  describe('isUndefined', () => {
    it('should return true for undefined value', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false for defined value', () => {
      expect(isUndefined(10)).toBe(false);
      expect(isUndefined('test')).toBe(false);
      expect(isUndefined(true)).toBe(false);
    });
  });

  describe('isNullOrUndefined', () => {
    it('should return true for null or undefined value', () => {
      expect(isNullOrUndefined(null)).toBe(true);
      expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it('should return false for defined value', () => {
      expect(isNullOrUndefined(10)).toBe(false);
      expect(isNullOrUndefined('test')).toBe(false);
      expect(isNullOrUndefined(true)).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('should create a deep copy of an object', () => {
      const obj = { name: 'John', age: 25 };
      const clonedObj = deepClone(obj);
      expect(clonedObj).toEqual(obj);
      expect(clonedObj).not.toBe(obj);
    });
  });

  describe('deepFind', () => {
    it('should return the value at the specified deep path', () => {
      const obj = { person: { name: 'John', age: 25 } };
      expect(deepFind(obj, 'person.name')).toBe('John');
      expect(deepFind(obj, 'person.age')).toBe(25);
    });

    it('should return undefined if the path is not found', () => {
      const obj = { person: { name: 'John', age: 25 } };
      expect(deepFind(obj, 'person.address')).toBeUndefined();
      expect(deepFind(obj, 'person.salary')).toBeUndefined();
    });

    it('should return undefined if the object is undefined or null', () => {
      expect(deepFind(undefined, 'person.name')).toBeUndefined();
      expect(deepFind(null, 'person.name')).toBeUndefined();
    });
  });

  describe('plainDeleteNullableValues', () => {
    it('should delete properties with null or undefined values from the object', () => {
      const obj = { name: 'John', age: undefined, address: null };
      const result = plainDeleteNullableValues(obj);
      expect(result).toEqual({ name: 'John' });
    });

    it('should return the same object if there are no null or undefined values', () => {
      const obj = { name: 'John', age: 25, address: '123 Street' };
      const result = plainDeleteNullableValues(obj);
      expect(result).toEqual(obj);
    });
  });

  describe('getEnumPropNameByValue', () => {
    enum Status {
      Active = 1,
      Inactive = 2
    }

    it('should return the property name for a given enum value', () => {
      const result = getEnumPropNameByValue(2, Status);
      expect(result).toBe('Inactive');
    });

    it('should return undefined if the value is not found in the enum', () => {
      const result = getEnumPropNameByValue(3, Status);
      expect(result).toBeUndefined();
    });
  });
});
