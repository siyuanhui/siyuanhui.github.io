/** Column spans that fill every 12-column row. */
export function packSpans(count: number) {
  const patterns = [
    [4, 4, 4],
    [5, 4, 3],
    [7, 5],
    [3, 5, 4],
    [6, 6],
    [8, 4],
  ];
  const spans: number[] = [];
  let index = 0;
  let pattern = 0;
  while (index < count) {
    const left = count - index;
    let row = patterns[pattern % patterns.length];
    if (left < row.length) {
      row = left === 1 ? [12] : left === 2 ? [7, 5] : [4, 4, 4];
    }
    spans.push(...row);
    index += row.length;
    pattern += 1;
  }
  return spans.slice(0, count);
}
