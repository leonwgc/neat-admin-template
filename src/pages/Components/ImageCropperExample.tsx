/**
 * @file pages/Components/ImageCropperExample.tsx
 * @author leon.wang
 */
import React, { FC, useState } from 'react';
import { Card, Button, Space, Upload, Divider, Tag, message } from '@derbysoft/neat-design';
import { UploadOutlined, ScissorOutlined } from '@ant-design/icons';
import type { UploadProps } from '@derbysoft/neat-design';
import ImageCropper from '~/components/ImageCropper';
import type { AspectRatioOption } from '~/components/ImageCropper';
import './ImageCropperExample.scss';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800',
  'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?w=800',
];

interface DemoState {
  open: boolean;
  imageSrc: string;
  aspect: AspectRatioOption;
  result: string;
  label: string;
}

const initialState = (): DemoState => ({
  open: false,
  imageSrc: '',
  aspect: '1:1',
  result: '',
  label: '',
});

/**
 * ImageCropper component demo page
 */
const ImageCropperExample: FC = () => {
  const [avatarDemo, setAvatarDemo] = useState<DemoState>(initialState());
  const [bannerDemo, setBannerDemo] = useState<DemoState>(initialState());
  const [freeDemo, setFreeDemo] = useState<DemoState>(initialState());
  const [uploadDemo, setUploadDemo] = useState<DemoState>(initialState());

  /** Open a specific demo with preset image */
  const openPreset = (
    setter: React.Dispatch<React.SetStateAction<DemoState>>,
    src: string,
    aspect: AspectRatioOption,
    label: string
  ) => {
    setter({ open: true, imageSrc: src, aspect, result: '', label });
  };

  /** Handle file upload — read as data URL then open cropper */
  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadDemo({
        open: true,
        imageSrc: e.target?.result as string,
        aspect: '1:1',
        result: '',
        label: '本地上传',
      });
    };
    reader.readAsDataURL(file);
    return false; // prevent auto upload
  };

  const uploadProps: UploadProps = {
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('请选择图片文件');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('图片大小不能超过 5MB');
        return Upload.LIST_IGNORE;
      }
      return handleUploadFile(file);
    },
  };

  return (
    <div className="image-cropper-example">
      <h2 className="image-cropper-example__title">ImageCropper 图片裁剪</h2>
      <p className="image-cropper-example__desc">
        基于 <code>react-easy-crop</code> 封装，支持拖拽、缩放和多种比例裁剪，裁剪结果通过 Canvas 导出为 JPEG。
      </p>

      {/* ── 1:1 头像裁剪 ── */}
      <Card title="1:1 头像裁剪" className="image-cropper-example__card">
        <Space align="start" wrap>
          <div>
            <Button
              type="primary"
              icon={<ScissorOutlined />}
              onClick={() => openPreset(setAvatarDemo, PRESET_IMAGES[0], '1:1', '头像')}
            >
              打开裁剪器
            </Button>
            <p className="image-cropper-example__hint">固定 1:1 比例，适合头像场景</p>
          </div>
          {avatarDemo.result && (
            <div className="image-cropper-example__result">
              <img
                src={avatarDemo.result}
                className="image-cropper-example__avatar"
                alt="cropped avatar"
              />
              <Tag color="green">裁剪成功</Tag>
              </div>
          )}
        </Space>
      </Card>

      <Divider />

      {/* ── 16:9 Banner ── */}
      <Card title="16:9 Banner 裁剪" className="image-cropper-example__card">
        <Space align="start" wrap>
          <div>
            <Button
              icon={<ScissorOutlined />}
              onClick={() => openPreset(setBannerDemo, PRESET_IMAGES[1], '16:9', 'Banner')}
            >
              打开裁剪器
            </Button>
            <p className="image-cropper-example__hint">固定 16:9 比例，适合横幅/封面场景</p>
          </div>
          {bannerDemo.result && (
            <div className="image-cropper-example__result">
              <img
                src={bannerDemo.result}
                className="image-cropper-example__banner"
                alt="cropped banner"
              />
              <Tag color="green">裁剪成功</Tag>
              </div>
          )}
        </Space>
      </Card>

      <Divider />

      {/* ── 自由裁剪 ── */}
      <Card title="自由比例裁剪" className="image-cropper-example__card">
        <Space align="start" wrap>
          <div>
            <Button
              icon={<ScissorOutlined />}
              onClick={() => openPreset(setFreeDemo, PRESET_IMAGES[2], 'free', '自由')}
            >
              打开裁剪器
            </Button>
            <p className="image-cropper-example__hint">不锁定比例，可任意拖拽裁剪框大小</p>
          </div>
          {freeDemo.result && (
            <div className="image-cropper-example__result">
              <img
                src={freeDemo.result}
                className="image-cropper-example__free"
                alt="cropped free"
              />
              <Tag color="green">裁剪成功</Tag>
              </div>
          )}
        </Space>
      </Card>

      <Divider />

      {/* ── 本地上传裁剪 ── */}
      <Card title="本地图片上传裁剪" className="image-cropper-example__card">
        <Space align="start" wrap>
          <div>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>选择本地图片</Button>
            </Upload>
            <p className="image-cropper-example__hint">支持 JPG / PNG / WEBP，最大 5MB</p>
          </div>
          {uploadDemo.result && (
            <div className="image-cropper-example__result">
              <img
                src={uploadDemo.result}
                className="image-cropper-example__avatar"
                alt="cropped upload"
              />
              <Tag color="green">裁剪成功</Tag>
            </div>
          )}
        </Space>
      </Card>

      {/* Cropper modals */}
      {avatarDemo.open && (
        <ImageCropper
          open={avatarDemo.open}
          imageSrc={avatarDemo.imageSrc}
          defaultAspect={avatarDemo.aspect}
          title="裁剪头像"
          onCrop={(url) => setAvatarDemo((s) => ({ ...s, open: false, result: url }))}
          onCancel={() => setAvatarDemo((s) => ({ ...s, open: false }))}
        />
      )}
      {bannerDemo.open && (
        <ImageCropper
          open={bannerDemo.open}
          imageSrc={bannerDemo.imageSrc}
          defaultAspect={bannerDemo.aspect}
          title="裁剪 Banner"
          onCrop={(url) => setBannerDemo((s) => ({ ...s, open: false, result: url }))}
          onCancel={() => setBannerDemo((s) => ({ ...s, open: false }))}
        />
      )}
      {freeDemo.open && (
        <ImageCropper
          open={freeDemo.open}
          imageSrc={freeDemo.imageSrc}
          defaultAspect={freeDemo.aspect}
          title="自由裁剪"
          onCrop={(url) => setFreeDemo((s) => ({ ...s, open: false, result: url }))}
          onCancel={() => setFreeDemo((s) => ({ ...s, open: false }))}
        />
      )}
      {uploadDemo.open && (
        <ImageCropper
          open={uploadDemo.open}
          imageSrc={uploadDemo.imageSrc}
          defaultAspect={uploadDemo.aspect}
          title="裁剪上传图片"
          onCrop={(url) => setUploadDemo((s) => ({ ...s, open: false, result: url }))}
          onCancel={() => setUploadDemo((s) => ({ ...s, open: false }))}
        />
      )}
    </div>
  );
};

export default ImageCropperExample;
