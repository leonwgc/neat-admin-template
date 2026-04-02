/**
 * @file src/pages/Components/ImageUploadExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Card,
  Space,
  Button,
  Divider,
  message,
  Tag,
} from '@derbysoft/neat-design';
import ImageUpload, { UploadedImage } from '~/components/ImageUpload';
import './ImageUploadExample.scss';

/**
 * ImageUploadExample component
 */
const ImageUploadExample: React.FC = () => {
  const [draggerImages, setDraggerImages] = useState<UploadedImage[]>([]);
  const [buttonImages, setButtonImages] = useState<UploadedImage[]>([]);
  const [customImages, setCustomImages] = useState<UploadedImage[]>([]);
  const [singleImage, setSingleImage] = useState<UploadedImage[]>([]);
  const [errorImages, setErrorImages] = useState<UploadedImage[]>([]);
  const [image, setImage] = useState<UploadedImage[]>([]);
  const [disabledImages, setDisabledImages] = useState<UploadedImage[]>([
    {
      id: 'demo-1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      status: 'done',
      percent: 100,
    },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);

  /**
   * Custom upload function (simulate API call)
   */
  const customUpload = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simulate API upload with delay
      setTimeout(() => {
        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.onerror = () => {
          reject(new Error('Upload failed'));
        };
        reader.readAsDataURL(file);
      }, 2000);
    });
  };

  /**
   * Upload function with random failure (simulate error scenario)
   */
  const uploadWithError = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 50% chance of failure
        if (Math.random() > 0.5) {
          reject(new Error('Upload failed'));
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      }, 1500);
    });
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    message.success(`提交成功！共 ${draggerImages.length} 张图片`);
  };

  /**
   * Handle clear
   */
  const handleClear = () => {
    setDraggerImages([]);
    message.info('已清空');
  };

  return (
    <div className="image-upload-example">
      <h2 className="image-upload-example__title">
        ImageUpload - 图片上传组件示例
      </h2>

      <div className="image-upload-example__section">
        <Card title="基础用法 - 拖拽上传（单图模式）">
          <p className="image-upload-example__desc">
            dragger
            模式下只能上传一张图片，上传完成后替换上传区域，支持预览、删除和重新上传
          </p>
          <ImageUpload
            mode="dragger"
            value={singleImage}
            onChange={setSingleImage}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
          />
          {singleImage.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Tag color="green">已上传图片</Tag>
              <Button
                type="link"
                onClick={() => message.info(`图片 URL: ${singleImage[0]?.url}`)}
              >
                查看数据
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="按钮模式 - 多图上传">
          <p className="image-upload-example__desc">
            使用按钮触发上传，支持多张图片，适合表单场景，可设置最大上传数量
          </p>
          <ImageUpload
            mode="button"
            value={buttonImages}
            onChange={setButtonImages}
            maxCount={3}
            maxSize={2}
            accept=".jpg,.jpeg,.png"
          />
          {buttonImages.length > 0 && (
            <Space style={{ marginTop: 16 }}>
              <Tag color="blue">已上传 {buttonImages.length} 张</Tag>
              <Button type="link" onClick={() => setButtonImages([])}>
                清空全部
              </Button>
            </Space>
          )}
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="进度条展示">
          <p className="image-upload-example__desc">
            上传过程中显示真实的进度条动画，模拟实际上传进度，非线性增长更加逼真
          </p>
          <ImageUpload
            mode="button"
            value={draggerImages}
            onChange={setDraggerImages}
            maxCount={5}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
            showProgress
          />
          <Space style={{ marginTop: 16 }}>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={draggerImages.length === 0}
            >
              提交 ({draggerImages.length})
            </Button>
            <Button onClick={handleClear} disabled={draggerImages.length === 0}>
              清空
            </Button>
          </Space>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="自定义上传函数">
          <p className="image-upload-example__desc">
            自定义上传逻辑，可以对接真实的后端接口，上传时间较长（2秒）以观察进度条效果
          </p>
          <ImageUpload
            mode="button"
            value={customImages}
            onChange={setCustomImages}
            maxCount={3}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
            customUpload={customUpload}
          />
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="上传失败处理">
          <p className="image-upload-example__desc">
            模拟上传失败场景（50%
            失败率），失败的图片会显示错误状态，可以删除后重试
          </p>
          <ImageUpload
            mode="button"
            value={errorImages}
            onChange={setErrorImages}
            maxCount={5}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
            customUpload={uploadWithError}
          />
          {errorImages.some((img) => img.status === 'error') && (
            <div style={{ marginTop: 16 }}>
              <Tag color="red">
                有 {errorImages.filter((img) => img.status === 'error').length}{' '}
                张图片上传失败
              </Tag>
              <Button
                type="link"
                danger
                onClick={() =>
                  setErrorImages(
                    errorImages.filter((img) => img.status !== 'error')
                  )
                }
              >
                清除失败项
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="禁用状态">
          <p className="image-upload-example__desc">
            禁用状态下无法上传、删除图片，仅可预览。适用于只读或审核场景
          </p>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Button onClick={() => setIsDisabled(!isDisabled)}>
                {isDisabled ? '启用上传' : '禁用上传'}
              </Button>
              <Tag color={isDisabled ? 'red' : 'green'}>
                当前状态: {isDisabled ? '禁用' : '启用'}
              </Tag>
            </Space>
            <ImageUpload
              mode="button"
              value={disabledImages}
              onChange={setDisabledImages}
              maxCount={3}
              maxSize={5}
              accept=".jpg,.jpeg,.png"
              disabled={isDisabled}
            />
          </Space>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="隐藏进度条">
          <p className="image-upload-example__desc">
            设置 showProgress=false
            可以隐藏上传进度条，适用于不需要展示上传进度的场景
          </p>
          <ImageUpload
            mode="button"
            value={image}
            onChange={setImage}
            maxCount={5}
            maxSize={5}
            accept=".jpg,.jpeg,.png"
            showProgress={false}
          />
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="组件 API">
          <h3>Props</h3>
          <table className="image-upload-example__table">
            <thead>
              <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>maxCount</td>
                <td>最大上传数量</td>
                <td>number</td>
                <td>5</td>
              </tr>
              <tr>
                <td>maxSize</td>
                <td>单个文件最大大小（MB）</td>
                <td>number</td>
                <td>5</td>
              </tr>
              <tr>
                <td>accept</td>
                <td>接受的文件类型</td>
                <td>string</td>
                <td>'.jpg,.jpeg,.png'</td>
              </tr>
              <tr>
                <td>value</td>
                <td>已上传的图片列表</td>
                <td>UploadedImage[]</td>
                <td>[]</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>图片列表变化时的回调</td>
                <td>(images: UploadedImage[]) =&gt; void</td>
                <td>-</td>
              </tr>
              <tr>
                <td>mode</td>
                <td>上传模式（dragger 模式仅支持单图）</td>
                <td>'dragger' | 'button'</td>
                <td>'dragger'</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>是否禁用</td>
                <td>boolean</td>
                <td>false</td>
              </tr>
              <tr>
                <td>customUpload</td>
                <td>自定义上传函数</td>
                <td>(file: File) =&gt; Promise&lt;string&gt;</td>
                <td>-</td>
              </tr>
              <tr>
                <td>onUploadStart</td>
                <td>上传开始回调</td>
                <td>() =&gt; void</td>
                <td>-</td>
              </tr>
              <tr>
                <td>onUploadEnd</td>
                <td>上传结束回调</td>
                <td>() =&gt; void</td>
                <td>-</td>
              </tr>
              <tr>
                <td>concurrentLimit</td>
                <td>并发上传数量限制</td>
                <td>number</td>
                <td>3</td>
              </tr>
              <tr>
                <td>showProgress</td>
                <td>是否显示进度条</td>
                <td>boolean</td>
                <td>true</td>
              </tr>
            </tbody>
          </table>

          <Divider />

          <h3>UploadedImage 类型</h3>
          <table className="image-upload-example__table">
            <thead>
              <tr>
                <th>字段</th>
                <th>说明</th>
                <th>类型</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>唯一标识</td>
                <td>string</td>
              </tr>
              <tr>
                <td>url</td>
                <td>图片地址</td>
                <td>string</td>
              </tr>
              <tr>
                <td>status</td>
                <td>上传状态</td>
                <td>'uploading' | 'done' | 'error'</td>
              </tr>
              <tr>
                <td>percent</td>
                <td>上传进度（0-100）</td>
                <td>number</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="功能特性">
          <ul className="image-upload-example__features">
            <li>
              <Tag color="blue">单图模式</Tag>
              dragger 模式支持单图上传，上传完成后替换显示
            </li>
            <li>
              <Tag color="green">多图上传</Tag>
              button 模式支持多图上传，网格布局展示
            </li>
            <li>
              <Tag color="orange">拖拽上传</Tag>
              支持拖拽文件到指定区域上传
            </li>
            <li>
              <Tag color="purple">逼真进度</Tag>
              非线性进度条模拟，快→慢过渡更逼真
            </li>
            <li>
              <Tag color="cyan">图片预览</Tag>
              点击预览大图，右上角关闭按钮
            </li>
            <li>
              <Tag color="red">删除/重传</Tag>
              支持删除和重新上传图片
            </li>
            <li>
              <Tag color="blue">文件校验</Tag>
              自动校验文件类型、大小和数量
            </li>
            <li>
              <Tag color="red">错误处理</Tag>
              上传失败显示错误状态，支持重试
            </li>
            <li>
              <Tag color="orange">禁用状态</Tag>
              支持禁用上传，适用于只读场景
            </li>
            <li>
              <Tag color="red">自定义上传</Tag>
              支持自定义上传逻辑，对接真实 API
            </li>
            <li>
              <Tag color="orange">并发控制</Tag>
              支持设置并发上传数量限制
            </li>
            <li>
              <Tag color="green">响应式设计</Tag>
              适配移动端和桌面端
            </li>
          </ul>
        </Card>
      </div>

      <div className="image-upload-example__section">
        <Card title="使用示例">
          <div className="image-upload-example__code">
            {`import ImageUpload, { UploadedImage } from '~/components/ImageUpload';

// 示例 1: dragger 模式（单图）
const SingleImageUpload = () => {
  const [image, setImage] = useState<UploadedImage[]>([]);

  return (
    <ImageUpload
      mode="dragger"
      value={image}
      onChange={setImage}
      maxSize={5}
      accept=".jpg,.jpeg,.png"
    />
  );
};

// 示例 2: button 模式（多图）
const MultipleImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);

  return (
    <ImageUpload
      mode="button"
      value={images}
      onChange={setImages}
      maxCount={5}
      maxSize={5}
      accept=".jpg,.jpeg,.png"
    />
  );
};

// 示例 3: 自定义上传
const customUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data.url;
};

<ImageUpload
  mode="button"
  value={images}
  onChange={setImages}
  customUpload={customUpload}
  onUploadStart={() => console.log('Upload started')}
  onUploadEnd={() => console.log('Upload completed')}
  concurrentLimit={2}
/>

// 示例 4: 处理上传失败
const uploadWithRetry = async (file: File): Promise<string> => {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: file,
    });
    if (!response.ok) throw new Error('Upload failed');
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// 示例 5: 禁用状态（只读模式）
<ImageUpload
  mode="button"
  value={images}
  onChange={setImages}
  disabled={true}
/>`}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageUploadExample;
