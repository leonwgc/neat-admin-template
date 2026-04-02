import { useState, useTransition } from 'react';
import { Card, Input, Button, Space, Spin, Tag } from '@derbysoft/neat-design';
import './UseTransition.scss';

/**
 * UseTransition 示例页面
 * 展示 React useTransition 的使用场景
 */
const UseTransition = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 生成大量数据的函数
  const generateList = (value: string) => {
    const newList: string[] = [];
    for (let i = 0; i < 2000000; i++) {
      newList.push(`${value} - ${i}`);
    }
    return newList;
  };

  // 使用 useTransition 处理输入
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // 将大量数据的更新标记为非紧急更新
    startTransition(() => {
      setList(generateList(value));
    });
  };

  // 不使用 useTransition 的对比函数
  const handleChangeWithoutTransition = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInput(value);
    setList(generateList(value));
  };

  // 重置
  const handleReset = () => {
    setInput('');
    setList([]);
  };

  return (
    <div className="use-transition">
      <Card title="React useTransition 示例" className="use-transition__card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className="use-transition__description">
            <p>
              <strong>useTransition</strong> 可以让你在不阻塞 UI
              的情况下更新状态。
            </p>
            <p>
              在下面的示例中，输入框会触发生成 20,000 条数据。使用 useTransition
              后， 输入框的响应速度不会受到影响。
            </p>
          </div>

          <Card title="使用 useTransition" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Input
                  placeholder="输入文字（使用 useTransition）"
                  value={input}
                  onChange={handleChange}
                  style={{ width: 300 }}
                />
                <Button onClick={handleReset} style={{ marginLeft: 8 }}>
                  重置
                </Button>
              </div>

              {isPending && (
                <div className="use-transition__pending">
                  <Spin size="small" />
                  <span style={{ marginLeft: 8 }}>正在处理数据...</span>
                </div>
              )}

              <div className="use-transition__info">
                <Tag color="blue">输入值: {input || '无'}</Tag>
                <Tag color="green">列表项数量: {list.length}</Tag>
                <Tag color={isPending ? 'orange' : 'purple'}>
                  状态: {isPending ? '更新中' : '已完成'}
                </Tag>
              </div>
            </Space>
          </Card>

          <Card title="不使用 useTransition（对比）" type="inner">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Input
                  placeholder="输入文字（不使用 useTransition）"
                  onChange={handleChangeWithoutTransition}
                  style={{ width: 300 }}
                />
              </div>
              <div className="use-transition__warning">
                ⚠️ 注意：快速输入时会感觉到明显的卡顿
              </div>
            </Space>
          </Card>

          {list.length > 0 && (
            <Card title="生成的列表（前 50 项预览）" type="inner">
              <div className="use-transition__list">
                {list.slice(0, 50).map((item, index) => (
                  <div key={index} className="use-transition__list-item">
                    {item}
                  </div>
                ))}
                {list.length > 50 && (
                  <div className="use-transition__list-more">
                    ...还有 {list.length - 50} 项
                  </div>
                )}
              </div>
            </Card>
          )}

          <Card title="使用说明" type="inner" className="use-transition__usage">
            <div className="use-transition__code">
              <pre>{`const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setInput(value); // 紧急更新：立即更新输入框

  // 非紧急更新：延迟更新列表
  startTransition(() => {
    setList(generateList(value));
  });
};`}</pre>
            </div>
            <div className="use-transition__tips">
              <h4>核心要点：</h4>
              <ul>
                <li>
                  <strong>isPending</strong>: 指示过渡是否处于活动状态
                </li>
                <li>
                  <strong>startTransition</strong>: 将状态更新标记为非阻塞的过渡
                </li>
                <li>紧急更新（如输入框）会立即执行</li>
                <li>非紧急更新（如列表渲染）会在浏览器空闲时执行</li>
                <li>可以保持 UI 的响应性，提升用户体验</li>
              </ul>
            </div>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default UseTransition;
