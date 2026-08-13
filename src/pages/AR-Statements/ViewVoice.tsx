/**
 * @file src/pages/AR-Statements/ViewVoice.tsx
 * @author leon.wang
 */

import React from 'react';
import { App, Button, Drawer, Flex } from '@derbysoft/neat-design';
import DotStatus from '~/components/DotStatus';
import FileInputTrigger from '~/components/FileInputTrigger';
import { checkFileSize, checkFileType } from '~/helper';

export interface ViewVoiceProps {
  open: boolean;
  invoiceId?: string;
  imageUrl?: string;
  onClose?: () => void;
}

const acceptImageTypes = 'image/png,image/jpg,image/jpeg';

const ViewVoice: React.FC<ViewVoiceProps> = ({
  open,
  invoiceId = '1U7R9P3S',
  imageUrl,
  onClose,
}) => {
  const src = imageUrl;

  const [dataUrl, setDataUrl] = React.useState<string>();

  const { toast } = App.useApp();

  const handle = (files: FileList | File[]) => {
    if (!files?.length) {
      return;
    }
    const image = files[0];
    if (!checkFileType(image, acceptImageTypes)) {
      toast.error('错误的文件格式');
      return;
    }

    if (!checkFileSize(image, 5 * 1024 * 1024)) {
      toast.error('图片大小不能超过5M');
      return;
    }

    const objectURL = URL.createObjectURL(image);
    setDataUrl(objectURL);

    // TODO: Upload the image to the server and update the invoice image URL
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        <Flex align="center" gap={8} justify="space-between">
          <span>发票ID：{invoiceId}</span>
          <DotStatus text="已开票待确认" style={{ fontSize: 16 }} />
        </Flex>
      }
      width={960}
      placement="right"
      destroyOnHidden
      className="invoice-drawer"
      footer={
        <div className="invoice-drawer__footer">
          <Button type="tertiary">下载发票</Button>

          <FileInputTrigger accept={acceptImageTypes} onChange={handle}>
            <Button>重新上传发票</Button>
          </FileInputTrigger>
        </div>
      }
    >
      <div className="invoice-drawer__content">
        <img
          className="invoice-drawer__image"
          src={src || dataUrl}
          alt={`Invoice ${invoiceId}`}
        />
      </div>
    </Drawer>
  );
};

export default ViewVoice;
