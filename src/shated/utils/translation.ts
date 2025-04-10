// function getTranslated<T>(key: string): T {
//   const { rt, tm } = useI18n();
//
//   function translateRecursively(value: any): any {
//     if (Array.isArray(value)) {
//       return value.map(translateRecursively);
//     } else if (value !== null && typeof value === 'object') {
//       // если это объект от rt() — вытаскиваем static
//       if ('body' in value && typeof value.body === 'object' && 'static' in value.body) {
//         return value.body.static;
//       }
//
//       const result: Record<string, any> = {};
//       for (const prop in value) {
//         result[prop] = translateRecursively(value[prop]);
//       }
//       return result;
//     } else {
//       const translated = rt(value);
//       return translated?.body?.static ?? translated;
//     }
//   }
//
//   const raw = tm(key);
//   return translateRecursively(raw) as T;
// }
//
// export { getTranslated };
