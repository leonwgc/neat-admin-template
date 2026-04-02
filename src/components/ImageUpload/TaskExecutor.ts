/**
 * Manages the execution of asynchronous tasks with a limit on the maximum number of concurrent tasks.
 *
 * @param maxConcurrent - The maximum number of tasks that can run concurrently.
 *
 * @example
 * const executor = new TaskExecutor(3);
 * // Add tasks to executor.queue and manage execution based on maxConcurrent.
 */
function TaskExecutor(maxConcurrent) {
  this.maxConcurrent = maxConcurrent;
  this.currentCount = 0;
  this.queue = [];
}
TaskExecutor.prototype.addTask = function (task) {
  return new Promise((resolve, reject) => {
    this.queue.push({ task, resolve, reject });
    this.processQueue();
  });
};
TaskExecutor.prototype.processQueue = function () {
  if (this.currentCount >= this.maxConcurrent || this.queue.length === 0) {
    return;
  }

  const { task, resolve, reject } = this.queue.shift();
  this.currentCount++;

  task()
    .then(resolve)
    .catch(reject)
    .finally(() => {
      this.currentCount--;
      this.processQueue();
    });
};

TaskExecutor.prototype.checkFinish = function () {
  return new Promise((resolve) => {
    const checkFinished = () => {
      if (this.currentCount === 0 && this.queue.length === 0) {
        resolve(true);
      } else {
        setTimeout(checkFinished, 100);
      }
    };
    checkFinished();
  });
};

export default TaskExecutor;
