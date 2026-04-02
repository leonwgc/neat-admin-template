/**
 * @file components/EChartsWrapper/EChartsWrapper.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

import './EChartsWrapper.scss';

export interface EChartsWrapperProps {
  /** ECharts 配置项 */
  option: EChartsOption;
  /** 图表高度 */
  height?: number | string;
  /** 自定义类名 */
  className?: string;
  /** 是否显示加载动画 */
  showLoading?: boolean;
  /** 加载选项 */
  loadingOption?: object;
  /** 图表主题 */
  theme?: string | object;
  /** 渲染器类型 */
  renderer?: 'canvas' | 'svg';
  /** 点击事件 */
  onChartClick?: (params: unknown) => void;
}

/**
 * ECharts 包装组件
 * 统一封装 ECharts 图表，提供标准化配置
 */
export const EChartsWrapper: FC<EChartsWrapperProps> = ({
  option,
  height = 400,
  className = '',
  showLoading = false,
  loadingOption,
  theme,
  renderer = 'canvas',
  onChartClick,
}) => {
  const onEvents = onChartClick
    ? {
        click: onChartClick,
      }
    : undefined;

  return (
    <div className={`echarts-wrapper ${className}`}>
      <ReactECharts
        option={option}
        style={{ height }}
        showLoading={showLoading}
        loadingOption={loadingOption}
        theme={theme}
        opts={{ renderer }}
        notMerge={true}
        lazyUpdate={true}
        onEvents={onEvents}
      />
    </div>
  );
};

export default EChartsWrapper;
