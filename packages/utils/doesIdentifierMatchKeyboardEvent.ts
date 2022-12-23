export const doesIdentifierMatchKeyboardEvent = (
  event: KeyboardEvent,
  identifier: number | string
): boolean => {
  return event.key === identifier || event.code === identifier;
};
