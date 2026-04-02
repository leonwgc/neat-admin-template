/**
 * @file src/pages/Hooks/UseAHooksCountdown.tsx
 * @author leon.wang
 */

import React from 'react';
import { Button, Space, Card, Statistic, App } from '@derbysoft/neat-design';
import useCountdown from '../../hooks/useCountdown';
import './UseAHooksCountdown.scss';

/**
 * Example page for useAHooksCountdown hook
 */
const UseAHooksCountdown: React.FC = () => {
  const { message } = App.useApp();

  // Example 1: Basic countdown with 6 seconds
  const countdown1 = useCountdown({
    seconds: 6,
    onEnd: () => {
      message.success('Countdown 1 finished!');
    },
  });

  // Example 2: Short countdown with 10 seconds
  const countdown2 = useCountdown({
    seconds: 10,
    onEnd: () => {
      message.info('Countdown 2 finished!');
    },
  });

  // Example 3: Custom countdown with 30 seconds
  const countdown3 = useCountdown({
    seconds: 30,
    onEnd: () => {
      message.warning('Countdown 3 finished!');
    },
  });

  // Example 4: Multiple rounds tracking
  const countdown4 = useCountdown({
    seconds: 5,
    onEnd: () => {
      message.success(`Round ${countdown4.round + 1} completed!`);
    },
  });

  // Example 5: Dynamic countdown with setLeft
  const countdown5 = useCountdown({
    seconds: 60,
    onEnd: () => {
      message.success('Dynamic countdown finished!');
    },
  });

  return (
    <div className="use-ahooks-countdown">
      <h2 className="use-ahooks-countdown__title">useCountdown Hook Examples</h2>

      <div className="use-ahooks-countdown__section">
        <h3>Basic Usage - 6 Seconds Countdown</h3>
        <p>A standard countdown timer with 6 seconds duration</p>
        <Card className="use-ahooks-countdown__card">
          <div className="use-ahooks-countdown__demo">
            <Statistic
              title="Time Remaining"
              value={countdown1.sec}
              suffix="seconds"
              valueStyle={{ color: countdown1.isRunning ? '#3f8600' : '#cf1322' }}
            />
            <Space className="use-ahooks-countdown__actions">
              <Button type="primary" onClick={countdown1.start} disabled={countdown1.isRunning}>
                Start
              </Button>
              <Button onClick={countdown1.reset} disabled={!countdown1.isRunning}>
                Reset
              </Button>
            </Space>
            <div className="use-ahooks-countdown__status">
              Status: {countdown1.isRunning ? '🟢 Running' : '🔴 Stopped'}
            </div>
          </div>
        </Card>
        <div className="use-ahooks-countdown__code">
          {`const countdown = useAHooksCountdown({
  seconds: 60,
  onFinish: () => {
    message.success('Countdown finished!');
  },
});

<Button onClick={countdown.start}>Start</Button>
<Button onClick={countdown.reset}>Reset</Button>
<div>Time: {countdown.sec}s</div>`}
        </div>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Short Countdown - 10 Seconds</h3>
        <p>A quick countdown timer for short intervals</p>
        <Card className="use-ahooks-countdown__card">
          <div className="use-ahooks-countdown__demo">
            <Statistic
              title="Quick Timer"
              value={countdown2.sec}
              suffix="seconds"
              valueStyle={{ color: countdown2.isRunning ? '#1890ff' : '#999999' }}
            />
            <Space className="use-ahooks-countdown__actions">
              <Button type="primary" onClick={countdown2.start} disabled={countdown2.isRunning}>
                Start Quick Timer
              </Button>
              <Button onClick={countdown2.reset} disabled={!countdown2.isRunning}>
                Stop
              </Button>
            </Space>
          </div>
        </Card>
        <div className="use-ahooks-countdown__code">
          {`const countdown = useAHooksCountdown({
  seconds: 10,
  onFinish: () => {
    message.info('Quick timer finished!');
  },
});`}
        </div>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Custom Duration - 30 Seconds</h3>
        <p>Countdown with custom duration and styling</p>
        <Card className="use-ahooks-countdown__card">
          <div className="use-ahooks-countdown__demo">
            <div className="use-ahooks-countdown__display">
              <div className="use-ahooks-countdown__time">
                {countdown3.sec}
              </div>
              <div className="use-ahooks-countdown__label">Seconds Left</div>
            </div>
            <Space className="use-ahooks-countdown__actions">
              <Button type="primary" onClick={countdown3.start} disabled={countdown3.isRunning}>
                Start 30s Timer
              </Button>
              <Button onClick={countdown3.reset}>Reset</Button>
            </Space>
          </div>
        </Card>
        <div className="use-ahooks-countdown__code">
          {`const countdown = useAHooksCountdown({
  seconds: 30,
  onFinish: () => {
    message.warning('Timer finished!');
  },
});`}
        </div>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Round Tracking - 5 Seconds</h3>
        <p>Track how many times the countdown has completed</p>
        <Card className="use-ahooks-countdown__card">
          <div className="use-ahooks-countdown__demo">
            <div className="use-ahooks-countdown__stats">
              <Statistic title="Time Left" value={countdown4.sec} suffix="s" />
              <Statistic
                title="Rounds Completed"
                value={countdown4.round}
                valueStyle={{ color: '#faad14' }}
              />
            </div>
            <Space className="use-ahooks-countdown__actions">
              <Button type="primary" onClick={countdown4.start} disabled={countdown4.isRunning}>
                Start Round
              </Button>
              <Button onClick={countdown4.reset}>Stop</Button>
            </Space>
          </div>
        </Card>
        <div className="use-ahooks-countdown__code">
          {`const countdown = useAHooksCountdown({
  seconds: 5,
  onFinish: () => {
    message.success(\`Round \${countdown.round + 1} completed!\`);
  },
});

// Access round counter
console.log('Rounds completed:', countdown.round);`}
        </div>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Dynamic Countdown - setLeft Method</h3>
        <p>Dynamically set remaining seconds during countdown</p>
        <Card className="use-ahooks-countdown__card">
          <div className="use-ahooks-countdown__demo">
            <div className="use-ahooks-countdown__stats">
              <Statistic
                title="Time Left"
                value={countdown5.sec}
                suffix="s"
                valueStyle={{ color: countdown5.isRunning ? '#52c41a' : '#d9d9d9' }}
              />
            </div>
            <Space className="use-ahooks-countdown__actions" wrap>
              <Button type="primary" onClick={countdown5.start} disabled={countdown5.isRunning}>
                Start (60s)
              </Button>
              <Button onClick={countdown5.reset}>Reset</Button>
              <Button
                type="default"
                onClick={() => countdown5.setLeft(30)}
                disabled={!countdown5.isRunning}
              >
                Set to 30s
              </Button>
              <Button
                type="default"
                onClick={() => countdown5.setLeft(15)}
                disabled={!countdown5.isRunning}
              >
                Set to 15s
              </Button>
              <Button
                type="default"
                onClick={() => countdown5.setLeft(5)}
                disabled={!countdown5.isRunning}
              >
                Set to 5s
              </Button>
            </Space>
            <div className="use-ahooks-countdown__info">
              💡 Click "Set to Xs" buttons while countdown is running to dynamically change remaining time
            </div>
          </div>
        </Card>
        <div className="use-ahooks-countdown__code">
          {`const countdown = useCountdown({
  seconds: 60,
  onFinish: () => {
    message.success('Countdown finished!');
  },
});

// Dynamically set remaining seconds
<Button onClick={() => countdown.setLeft(30)}>
  Set to 30s
</Button>
<Button onClick={() => countdown.setLeft(15)}>
  Set to 15s
</Button>

// Use case: Extend or reduce countdown based on user actions
const handleUserAction = () => {
  if (userPremium) {
    countdown.setLeft(120); // Extend to 2 minutes for premium users
  } else {
    countdown.setLeft(30);  // Standard 30 seconds
  }
};`}
        </div>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Hook API</h3>
        <table className="use-ahooks-countdown__table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>seconds</td>
              <td>number</td>
              <td>Duration of countdown in seconds</td>
            </tr>
            <tr>
              <td>onFinish</td>
              <td>() =&gt; void</td>
              <td>Callback function when countdown finishes</td>
            </tr>
          </tbody>
        </table>

        <h4>Return Values</h4>
        <table className="use-ahooks-countdown__table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sec</td>
              <td>number</td>
              <td>Current seconds remaining</td>
            </tr>
            <tr>
              <td>start</td>
              <td>() =&gt; void</td>
              <td>Function to start the countdown</td>
            </tr>
            <tr>
              <td>reset</td>
              <td>() =&gt; void</td>
              <td>Function to reset/stop the countdown</td>
            </tr>
            <tr>
              <td>isRunning</td>
              <td>boolean</td>
              <td>Whether countdown is currently running</td>
            </tr>
            <tr>
              <td>round</td>
              <td>number</td>
              <td>Number of times countdown has completed</td>
            </tr>
            <tr>
              <td>setLeft</td>
              <td>(value: number) =&gt; void</td>
              <td>Dynamically set remaining seconds (only accepts positive values)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="use-ahooks-countdown__section">
        <h3>Usage Tips</h3>
        <ul className="use-ahooks-countdown__list">
          <li>Use for verification code resend buttons with countdown</li>
          <li>Implement timeout mechanisms for user actions</li>
          <li>Create timer-based games or challenges</li>
          <li>Track multiple rounds for repeated operations</li>
          <li>The countdown automatically stops when reaching 0</li>
          <li>Use `isRunning` to disable buttons during countdown</li>
          <li>Use `setLeft()` to dynamically adjust countdown time based on user actions or conditions</li>
          <li>`setLeft()` only accepts positive values; passing 0 or negative values will be ignored</li>
        </ul>
      </div>
    </div>
  );
};

export default UseAHooksCountdown;
