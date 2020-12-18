// changes strings from snake_case to Capital Space
export const SnakeToCapital = string => {
  const newStrings = string.split('_').map(s => {
    return s[0].toUpperCase() + s.slice(1, s.length).toLowerCase();
  });
  return newStrings.join(' ');
}
