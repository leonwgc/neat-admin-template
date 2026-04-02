/**
 * @file src/components/ImageUpload/ImageUpload.tsx
 * @author leon.wang
 */

import React, { useState, useRef, useCallback } from 'react';
import { message, Button, Progress, Space } from '@derbysoft/neat-design';
import {
  InboxOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import TaskExecutor from './TaskExecutor';
import { uploadImage } from './api';
import './ImageUpload.scss';

/**
 * Uploaded image info
 */
export interface UploadedImage {
  id: string;
  url: string;
  status: 'uploading' | 'done' | 'error';
  percent: number;
}

/**
 * ImageUpload component props
 */
export interface ImageUploadProps {
  /**
   * Maximum number of images
   */
  maxCount?: number;
  /**
   * Maximum file size in MB
   */
  maxSize?: number;
  /**
   * Accepted file types
   */
  accept?: string;
  /**
   * Current image list
   */
  value?: UploadedImage[];
  /**
   * On change callback
   */
  onChange?: (images: UploadedImage[]) => void;
  /**
   * Upload mode: 'dragger' | 'button'
   */
  mode?: 'dragger' | 'button';
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom upload function
   */
  customUpload?: (file: File) => Promise<string>;
  /**
   * Callback when upload starts
   */
  onUploadStart?: () => void;
  /**
   * Callback when upload ends
   */
  onUploadEnd?: () => void;
  /**
   * Maximum number of concurrent uploads
   */
  concurrentLimit?: number;
  /**
   * Whether to show progress bar
   */
  showProgress?: boolean;
}

/**
 * ImageUpload component - Support drag and drop upload
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  maxCount = 5,
  maxSize = 5,
  accept = '.jpg,.jpeg,.png',
  value = [],
  onChange,
  mode = 'dragger',
  disabled = false,
  customUpload,
  onUploadStart,
  onUploadEnd,
  concurrentLimit = 3,
  showProgress = false,
}) => {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const beforeUploadCheck = useCallback(
    (file: File) => {
      const isAccepted = accept
        .split(',')
        .some((type) => file.type.includes(type.replace('.', '')));
      if (!isAccepted) {
        message.error('Only JPG/PNG files are allowed');
        return false;
      }
      const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtMaxSize) {
        message.error('File size must be less than 5MB');
        return false;
      }

      return true;
    },
    [accept, maxSize]
  );
  const handleChange = useCallback(
    (files: FileList) => {
      if (!files || files.length === 0) return;

      // For dragger mode, allow replacement (will replace existing image)
      if (mode === 'dragger') {
        if (files.length > 1) {
          message.error(`dragger 模式只能上传 1 张图片`);
          return;
        }
      } else {
        // For button mode, check total count
        if (value.length + files.length > maxCount) {
          message.error(`最多只能上传 ${maxCount} 张图片`);
          return;
        }
      }

      const validFiles = Array.from(files).filter(beforeUploadCheck);
      if (validFiles.length === 0) return;

      onUploadStart?.();
      const taskExcutor = new TaskExecutor(concurrentLimit);
      let finished = 0;
      // For dragger mode, replace existing image; for button mode, append
      const __images = mode === 'dragger' ? [] : [...value];

      validFiles.map((file) => {
        // Read file as data URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string;

          // Add uploading placeholder with preview image
          const uploadingImage = {
            url: previewUrl,
            status: 'uploading' as const,
            percent: 0,
            id: `${Date.now()}-${Math.random()}`,
          };
          __images.push(uploadingImage);
          onChange?.([...__images]);

          taskExcutor.addTask(() => {
            // Simulate progress with non-linear growth
            let progress = 0;
            let isCancelled = false;

            const updateProgress = () => {
              if (isCancelled || progress >= 90) return;

              // Non-linear: fast → slow
              const step =
                progress < 30
                  ? Math.random() * 8 + 5
                  : progress < 60
                  ? Math.random() * 5 + 3
                  : Math.random() * 3 + 1;

              progress = Math.min(90, progress + step);
              const index = __images.findIndex(
                (img) => img.id === uploadingImage.id
              );
              if (index !== -1) {
                __images[index] = {
                  ...uploadingImage,
                  percent: Math.floor(progress),
                };
                onChange?.([...__images]);
              }

              setTimeout(updateProgress, 100);
            };

            // Only run progress simulation if showProgress is true
            if (showProgress) {
              updateProgress();
            }

            const upload = customUpload
              ? customUpload(file)
              : uploadImage(file);

            return upload
              .then((imageUrl) => {
                isCancelled = true;
                const index = __images.findIndex(
                  (img) => img.id === uploadingImage.id
                );
                if (index !== -1) {
                  __images[index] = {
                    url: imageUrl,
                    status: 'done',
                    percent: 100,
                    id: imageUrl,
                  };
                  onChange?.([...__images]);
                }
              })
              .catch(() => {
                isCancelled = true;
                const index = __images.findIndex(
                  (img) => img.id === uploadingImage.id
                );
                if (index !== -1) {
                  __images[index] = {
                    url: previewUrl,
                    status: 'error',
                    percent: 0,
                    id: uploadingImage.id,
                  };
                  onChange?.([...__images]);
                }
              })
              .finally(() => {
                finished += 1;

                if (finished === validFiles.length) {
                  onUploadEnd?.();
                }
              });
          });
        };
        reader.readAsDataURL(file);
      });
    },
    [
      mode,
      beforeUploadCheck,
      onUploadStart,
      concurrentLimit,
      value,
      maxCount,
      onChange,
      customUpload,
      onUploadEnd,
      showProgress,
    ]
  );

  /**
   * Handle drag over
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handle drop
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    handleChange(e.dataTransfer.files);
  };

  /**
   * Handle delete image
   */
  const handleDelete = (url: string) => {
    const newList = value.filter((img) => img.url !== url);
    onChange?.(newList);
    message.success('删除成功');
  };

  /**
   * Handle preview image
   */
  const handlePreview = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  /**
   * Trigger file input click
   */
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const canUpload = value.length < maxCount && !disabled;

  return (
    <div className="image-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={mode !== 'dragger'}
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e.target.files)}
        disabled={disabled}
      />

      {mode === 'dragger' && (
        <div className="image-upload__dragger-container">
          {value.length === 0 ? (
            <div
              className="image-upload__dragger"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerUpload}
            >
              <p className="image-upload__dragger-icon">
                <InboxOutlined />
              </p>
              <p className="image-upload__dragger-text">
                点击或拖拽文件到此区域上传
              </p>
              <p className="image-upload__dragger-hint">
                支持上传 {accept} 格式的图片，单个文件不超过 {maxSize}MB
              </p>
            </div>
          ) : (
            <div className="image-upload__dragger-preview">
              {value[0].status === 'uploading' && (
                <>
                  <img
                    src={value[0].url}
                    className="image-upload__dragger-image image-upload__dragger-image--uploading"
                  />
                  {showProgress && (
                    <>
                      <div className="image-upload__dragger-progress">
                        <Progress
                          percent={value[0].percent || 0}
                          size="small"
                          status="active"
                          showInfo={false}
                        />
                      </div>
                      <div className="image-upload__dragger-progress-text">
                        {value[0].percent || 0}%
                      </div>
                    </>
                  )}
                </>
              )}
              {value[0].status === 'done' && (
                <>
                  <img
                    src={value[0].url}
                    className="image-upload__dragger-image"
                  />
                  <div className="image-upload__dragger-actions">
                    <Space>
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(value[0].url)}
                      >
                        预览
                      </Button>
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(value[0].url)}
                      >
                        删除
                      </Button>
                      <Button
                        type="link"
                        icon={<PlusOutlined />}
                        onClick={triggerUpload}
                      >
                        重新上传
                      </Button>
                    </Space>
                  </div>
                </>
              )}
              {value[0].status === 'error' && (
                <div className="image-upload__dragger-error">
                  <p>上传失败</p>
                  <Button onClick={triggerUpload}>重新上传</Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {mode === 'button' && canUpload && (
        <div className="image-upload__button-wrapper">
          <Button
            icon={<PlusOutlined />}
            onClick={triggerUpload}
            disabled={disabled}
          >
            上传图片
          </Button>
          <span className="image-upload__hint">
            （最多 {maxCount} 张，单张不超过 {maxSize}MB）
          </span>
        </div>
      )}

      {mode === 'button' && value.length > 0 && (
        <div className="image-upload__list">
          {value.map((image) => (
            <div key={image.id || image.url} className="image-upload__item">
              {image.status === 'uploading' && (
                <div className="image-upload__item-uploading">
                  <img
                    src={image.url}
                    className="image-upload__item-image image-upload__item-image--uploading"
                  />
                  {showProgress && (
                    <>
                      <div className="image-upload__item-progress">
                        <Progress
                          percent={image.percent || 0}
                          size="small"
                          status="active"
                          showInfo={false}
                        />
                      </div>
                      <div className="image-upload__item-progress-text">
                        {image.percent || 0}%
                      </div>
                    </>
                  )}
                </div>
              )}

              {image.status === 'done' && (
                <>
                  <div className="image-upload__item-thumbnail">
                    <img src={image.url} />
                    <div className="image-upload__item-actions">
                      <Space>
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => handlePreview(image.url)}
                          size="small"
                        />
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(image.url)}
                          size="small"
                        />
                      </Space>
                    </div>
                  </div>
                </>
              )}

              {image.status === 'error' && (
                <div className="image-upload__item-error">
                  <span className="image-upload__item-error-text">
                    上传失败
                  </span>
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(image.url)}
                    size="small"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {previewVisible && (
        <div
          className="image-upload__preview"
          onClick={() => setPreviewVisible(false)}
        >
          <CloseOutlined className="image-upload__preview-close" />
          <div
            className="image-upload__preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={previewImage} alt="Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
