export const normalizeAnimationType = (type?: string): string => {
  if (!type) return 'fade';

  return type.trim().toLowerCase();
};
