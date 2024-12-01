/**
 * Port of Python's DefaultDict. Ends up being useful in a lot of situations
 * involving trees.
 *
 * The ergonomics of this class are fairly similar to something like useState
 * from React land, though this utilizes key-value pairs.
 *
 * Example:
 * > const ddict = new DefaultDict<number, number>(() => 0);
 * undefined
 * > ddict.get(0);
 * 0
 * > ddict.update(0, (curr) => curr - 5);
 * -5
 */
export default class DefaultDict<T1, T2> {
  private constructorFn: () => T2;
  private internalMap = new Map<T1, T2>();

  constructor(constructorFn: () => T2) {
    this.constructorFn = constructorFn;
  }

  get(key: T1): T2 {
    const possibleVal = this.internalMap.get(key);

    if (possibleVal) {
      return possibleVal;
    } else {
      return this.set(key, this.constructorFn());
    }
  }

  set(key: T1, val: T2) {
    this.internalMap.set(key, val);
    return val;
  }

  update(key: T1, updateFn: ((currVal: T2) => T2) | undefined) {
    const val = this.get(key);
    if (updateFn !== undefined) {
      return this.set(key, updateFn(val));
    } else {
      return this.set(key, val);
    }
  }

  keys() {
    return this.internalMap.keys();
  }
}
