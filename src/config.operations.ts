/**
 * @file src/config.operations.ts
 * @author leon.wang
 */

const operations = {
  formRead: 'formRead',
  formWrite: 'formWrite',
  tableRead: 'tableRead',
  tableWrite: 'tableWrite',
  imageUploadRead: 'imageUploadRead',
  imageUploadWrite: 'imageUploadWrite',
  imageCropRead: 'imageCropRead',
  imageCropWrite: 'imageCropWrite',
};

export type Operation = (typeof operations)[keyof typeof operations];

export const allOperations = Object.values(operations);

export default operations;
