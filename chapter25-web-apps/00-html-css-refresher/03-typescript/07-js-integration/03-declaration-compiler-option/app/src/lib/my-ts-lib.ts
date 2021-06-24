interface IFilterable {
  name?: string;
}

export function filterUndefined<T extends IFilterable>(input: Array<T>): Array<T> {
  const output: Array<T> = [];
  for (const item of input) {
    if (item.name?.length) {
      output.push(item);
    }
  }
  return output;
}