
export const errorsTexts: Record<string, any> = {
  'required': 'This field is required',
  'maxLength': (maxLength: number) => `Max allowed length is ${maxLength}`,
  'minLength': (minLength: number) => `Min allowed length is ${minLength}`,
}
export const lengths: Record<string, number> = {
  'maxLength': 256,
  'minLength': 3
}