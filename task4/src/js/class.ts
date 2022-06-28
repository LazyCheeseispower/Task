

class Action {
    el: any;
    arrowLeft: HTMLElement;
    arrowRight: HTMLElement;
    focus: HTMLElement;
    focusWidth: number;
    timer: number;


    constructor(el: any) {
        this.el = el;
        this.arrowLeft = <HTMLElement>this.el.querySelector('.arrowLeft');
        this.arrowRight = <HTMLElement>this.el.querySelector('.arrowRight');
        this.focus = <HTMLElement>this.el.querySelector('.focus');
        this.focusWidth = this.focus.offsetWidth;
        const that = this;
        this.timer = window.setInterval(function () {
            //手动调用点击事件
            that.arrowRight.click();
        }, 2000);


        this.focus.addEventListener('mouseenter', function () {
            that.arrowLeft.style.display = 'block';
            that.arrowRight.style.display = 'block';

            clearInterval(that.timer);
            that.timer = 0; // 清除定时器变量
        });
        this.focus.addEventListener('mouseleave', function () {
            that.arrowLeft.style.display = 'none';
            that.arrowRight.style.display = 'none';
            that.timer = window.setInterval(function () {
                //手动调用点击事件
                that.arrowRight.click();
            }, 2000);
        });
        var ul = that.focus.querySelector('ul')!;
        var ol = that.focus.querySelector('.circle')!;
        // console.log(ul.children.length);
        for (var i: any = 0; i < ul.children.length; i++) {
            // 创建一个小li 
            var li = document.createElement('li');
            // 记录当前小圆圈的索引号 通过自定义属性来做 
            li.setAttribute('index', i);
            // 把小li插入到ol 里面
            ol.appendChild(li);
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function () {
                // 干掉所有人 把所有的小li 清除 current 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                // 留下我自己  当前的小li 设置current 类名
                this.className = 'current';
                // 5. 点击小圆圈，移动图片 当然移动的是 ul 
                // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
                // 当我们点击了某个小li 就拿到当前小li 的索引号
                var index: any = this.getAttribute('index');
                // 当我们点击了某个小li 就要把这个li 的索引号给 num  
                num = index;
                // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
                circle = index;
                // num = circle = index;
                console.log(that.focusWidth);
                console.log(index);

                animate(ul, -index * that.focusWidth);
            })
        }
        ol.children[0].className = 'current';
        // 6. 克隆第一张图片(li)放到ul 最后面
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 7. 点击右侧按钮， 图片滚动一张
        var num = 0;
        // circle 控制小圆圈的播放
        var circle = 0;
        // flag 节流阀
        var flag = true;
        that.arrowRight.addEventListener('click', function () {
            if (flag) {
                flag = false; // 关闭节流阀
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
                if (num == ul.children.length - 1) {
                    ul.style.left = "0";
                    num = 0;
                }
                num++;
                animate(ul, -num * that.focusWidth, function () {
                    flag = true; // 打开节流阀
                });
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle++;
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 调用函数
                circleChange();
            }
        });
        function circleChange() {
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前的小圆圈的current类名
            ol.children[circle].className = 'current';
        }

        function animate(obj: any, target: any, callback?: any) {
            // console.log(callback);  callback = function() {}  调用的时候 callback()

            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 回调函数写到定时器结束里面
                    // if (callback) {
                    //     // 调用函数
                    //     callback();
                    // }
                    callback && callback();
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                obj.style.left = obj.offsetLeft + step + 'px';

            }, 15);
        }
    }
}