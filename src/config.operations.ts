/**
 * @file src/config.operations.ts
 * @author leon.wang
 */

const operations = {
  formRead: 'formRead',
  formWrite: 'formWrite',
  imageUploadRead: 'imageUploadRead',
  imageUploadWrite: 'imageUploadWrite',
  imageCropRead: 'imageCropRead',
  imageCropWrite: 'imageCropWrite',
};

export const allOperations = Object.values(operations);

export default operations;
