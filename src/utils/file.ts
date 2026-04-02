/**
 * @file utils/file.ts
 * @author leon.wang
 */

/**
 * Format file size in bytes to a human-readable string
 * @example formatFileSize(1536) => '1.5 KB'
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[i]}`;
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']);
const PDF_EXTENSIONS = new Set(['.pdf']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.avi', '.mkv', '.webm']);
const AUDIO_EXTENSIONS = new Set(['.mp3', '.wav', '.ogg', '.aac', '.flac']);

const getExt = (filename: string) => filename.slice(filename.lastIndexOf('.')).toLowerCase();

/** Check if the filename is an image file */
export const isImageFile = (filename: string): boolean => IMAGE_EXTENSIONS.has(getExt(filename));

/** Check if the filename is a PDF file */
export const isPdfFile = (filename: string): boolean => PDF_EXTENSIONS.has(getExt(filename));

/** Check if the filename is a video file */
export const isVideoFile = (filename: string): boolean => VIDEO_EXTENSIONS.has(getExt(filename));

/** Check if the filename is an audio file */
export const isAudioFile = (filename: string): boolean => AUDIO_EXTENSIONS.has(getExt(filename));

/**
 * Trigger a browser download from a Blob or File object
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Trigger a browser download from a URL (cross-origin compatible via fetch + blob)
 */
export const downloadUrl = async (url: string, filename: string): Promise<void> => {
  const response = await fetch(url);
  const blob = await response.blob();
  downloadBlob(blob, filename);
};

/**
 * Export an array of objects to a CSV file and trigger download.
 * Automatically handles values containing commas or quotes.
 * @param data - Array of row objects
 * @param filename - Output filename (without extension)
 * @param headers - Optional custom column headers; defaults to object keys
 */
export const exportToCsv = <T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  headers?: Partial<Record<keyof T, string>>
): void => {
  if (!data.length) return;

  const keys = Object.keys(data[0]) as (keyof T)[];
  const headerRow = keys.map((k) => (headers?.[k] ?? String(k)));

  const escapeCell = (value: unknown): string => {
    const str = value === null || value === undefined ? '' : String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = data.map((row) => keys.map((k) => escapeCell(row[k])).join(','));
  const csv = [headerRow.join(','), ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
};

/**
 * Read a File object as text
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

/**
 * Read a File object as a base64 data URL
 */
export const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

/**
 * Get the MIME type from a file extension
 * @example getMimeType('report.pdf') => 'application/pdf'
 */
export const getMimeType = (filename: string): string => {
  const ext = getExt(filename);
  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.csv': 'text/csv',
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xls': 'application/vnd.ms-excel',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.zip': 'application/zip',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
  };
  return mimeMap[ext] ?? 'application/octet-stream';
};
