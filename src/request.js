const xhr = new XMLHttpRequest();

xhr.open("get", "http://127.0.0.1:3000/");
xhr.send(null);

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    }
  }
};

// 上面代码中，p1和p2都是 Promise 的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

// 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

/**
 *
 * promis/A+ 标准
 *
 */

//  首先
// 1.  promise 接受一个函数作为参数 ， 函数拥有 resolve 、 reject 两个参数，这两个参数均为两个函数，resolve 用于将 promise 的状态改变为 fulfilled ，而 reject 则会将promise的状态改变为 rejected

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function MyPromise(exector) {
  this.status = PENDING;
  this.value = value;
  this.reason = reason;
  this.onFulfilledCallback = [];
  this.onRejectedCallback = [];
  function resolve(value) {
    //   只有当 promsie 的状态为 pending 时才可以转为 fulfilled 状态 ，reject 中同理
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED; // 执行过resolve 后要将 promise的状态转为 fulfilled
      this.onFulfilledCallback.forEach((cb) => {
        cb && cb(this.value);
      });
    }
  }
  function reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
      this.onRejectedCallback.forEach((cb) => {
        cb && cb(this.reason);
      });
    }
  }

  // 当 exector 函数执行出错的时候，也需要捕获他的错误，通过reject 传递出去
  try {
    exector(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
