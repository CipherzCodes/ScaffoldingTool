export function setValueAtPath(
  obj: any,
  path: string[],
  value: any
) {
  const copy = structuredClone(obj ?? {}); // 👈 SAFETY
  let current = copy;

  path.slice(0, -1).forEach((key) => {
    if (typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  });

  current[path[path.length - 1]] = value;
  return copy;
}
