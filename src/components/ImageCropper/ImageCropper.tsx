/**
 * @file components/ImageCropper/ImageCropper.tsx
 * @author leon.wang
 */
import React, { FC, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Modal, Slider, Space, Button, Radio } from '@derbysoft/neat-design';
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import type { Area, Point } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import './ImageCropper.scss';

export type AspectRatioOption = 'free' | '1:1' | '4:3' | '16:9';

const ASPECT_MAP: Record<string, number | undefined> = {
  free: undefined,
  '1:1': 1,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
};

/**
 * Use canvas to crop the image by pixel area
 */
const getCroppedImage = (imageSrc: string, pixelCrop: Area): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous'; // Must be set before src to avoid tainted canvas
    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    });
    image.addEventListener('error', reject);
    image.src = imageSrc;
  });
};

export interface ImageCropperProps {
  /** Whether the cropper modal is visible */
  open: boolean;
  /** Source image URL or base64 */
  imageSrc: string;
  /** Initial aspect ratio */
  defaultAspect?: AspectRatioOption;
  /** Modal title */
  title?: string;
  /** Called when the user confirms the cropped result */
  onCrop: (croppedDataUrl: string) => void;
  /** Called when the modal is closed/cancelled */
  onCancel: () => void;
}

/**
 * ImageCropper component
 * A modal-based image cropper with zoom, pan and aspect ratio controls.
 */
const ImageCropper: FC<ImageCropperProps> = ({
  open,
  imageSrc,
  defaultAspect = '1:1',
  title = '裁剪图片',
  onCrop,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<AspectRatioOption>(defaultAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [confirming, setConfirming] = useState(false);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setConfirming(true);
    try {
      const result = await getCroppedImage(imageSrc, croppedAreaPixels);
      onCrop(result);
    } finally {
      setConfirming(false);
    }
  };

  const handleAfterClose = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspect(defaultAspect);
    setCroppedAreaPixels(null);
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      afterClose={handleAfterClose}
      width={600}
      centered
      destroyOnClose
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" loading={confirming} onClick={handleConfirm}>
            确认裁剪
          </Button>
        </Space>
      }
    >
      <div className="image-cropper">
        {/* Crop area */}
        <div className="image-cropper__canvas">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={ASPECT_MAP[aspect]}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="image-cropper__controls">
          {/* Aspect ratio */}
          <div className="image-cropper__controls-row">
            <span className="image-cropper__controls-label">比例</span>
            <Radio.Group
              value={aspect}
              onChange={(e) => setAspect(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              size="small"
              options={[
                { label: '自由', value: 'free' },
                { label: '1:1', value: '1:1' },
                { label: '4:3', value: '4:3' },
                { label: '16:9', value: '16:9' },
              ]}
            />
          </div>

          {/* Zoom */}
          <div className="image-cropper__controls-row">
            <span className="image-cropper__controls-label">缩放</span>
            <ZoomOutOutlined className="image-cropper__zoom-icon" />
            <Slider
              className="image-cropper__zoom-slider"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(v) => setZoom(v as number)}
            />
            <ZoomInOutlined className="image-cropper__zoom-icon" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropper;
