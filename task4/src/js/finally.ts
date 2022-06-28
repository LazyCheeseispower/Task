
class Swiper {
    el: any;
    arrowLeft: HTMLElement;
    arrowRight: HTMLElement;
    focus: HTMLElement;
    focusWidth: number;
    ul: any;
    ol: any;
    flag: boolean;
    num: number;
    circle: number;


    constructor(el: any) {
        this.el = el;
        this.arrowLeft = this.el.querySelector('.arrowLeft');
        this.arrowRight = this.el.querySelector('.arrowRight');
        this.focus = this.el.querySelector('.focus');
        this.focusWidth = this.focus.offsetWidth;
        this.ul = this.focus.querySelector('ul');
        this.ol = this.focus.querySelector('.circle');
        this.flag = true;
        // 7. 点击右侧按钮， 图片滚动一张
        this.num = 0;
        // circle 控制小圆圈的播放
        this.circle = 0;
        // this.flag 节流阀
        this.init();


    }

    circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < this.ol.children.length; i++) {
            this.ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        this.ol.children[this.circle].className = 'current';
    }


    rightClick() {
        if (this.flag) {
            this.flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (this.num == this.ul.children.length - 1) {
                this.ul.style.left = "0";
                this.num = 0;
            }
            this.num++;
            animate(this.ul, -this.num * this.focusWidth, function () {
                // 打开节流阀
            });
            this.flag = true;
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            this.circle++;
            // 如果this.circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (this.circle == this.ol.children.length) {
                this.circle = 0;
            }
            // 调用函数
            this.circleChange();
        }
    };
    leftClick() {
        if (this.flag) {
            this.flag = false;
            if (this.num == 0) {
                this.num = this.ul.children.length - 1;
                this.ul.style.left = -this.num * this.focusWidth + 'px';
            }
            this.num--;
            animate(this.ul, -this.num * this.focusWidth, function () {

            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            this.flag = true;
            this.circle--;
            // 如果this.circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (this.circle < 0) {
            //     this.circle = ol.children.length - 1;
            // }
            this.circle = this.circle < 0 ? this.ol.children.length - 1 : this.circle;
            // 调用函数
            this.circleChange();
        }
    };




    init() {
        const that = this;
        this.arrowLeft.onclick = this.leftClick.bind(this);
        this.arrowRight.onclick = this.rightClick.bind(this);

        var scTimer = window.setInterval(function () {
            //手动调用点击事件
            that.arrowRight.onclick;
        }, 2000);
        this.focus.addEventListener('mouseenter', function () {
            that.arrowLeft.style.display = 'block';
            that.arrowRight.style.display = 'block';

            clearInterval(scTimer);
            scTimer = 0; // 清除定时器变量
        });

        this.focus.addEventListener('mouseleave', function () {
            that.arrowLeft.style.display = 'none';
            that.arrowRight.style.display = 'none';
            scTimer = window.setInterval(function () {
                //手动调用点击事件
                that.arrowRight.click();
            }, 2000);
        });



        // console.log(ul.children.length);

        for (var i: number = 0; i < this.ul.children.length; i++) {
            // 创建一个小li
            var li = document.createElement('li');
            // 记录当前小圆圈的索引号 通过自定义属性来做
            li.setAttribute('index', i + '');
            // 把小li插入到ol 里面
            that.ol.appendChild(li);
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function () {
                // 干掉所有人 把所有的小li 清除 current 类名
                for (var i = 0; i < that.ol.children.length; i++) {
                    that.ol.children[i].className = '';
                }
                // 留下我自己  当前的小li 设置current 类名
                this.className = 'current';
                // 5. 点击小圆圈，移动图片 当然移动的是 ul
                // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
                // 当我们点击了某个小li 就拿到当前小li 的索引号
                var index: any = this.getAttribute('index');
                // 当我们点击了某个小li 就要把这个li 的索引号给 this.num
                that.num = index;
                // 当我们点击了某个小li 就要把这个li 的索引号给 this.circle
                that.circle = index;
                // this.num = this.circle = index;
                console.log(that.focusWidth);
                console.log(index);

                animate(that.ul, -index * that.focusWidth);
                that.circleChange();
            })
        }
        that.ol.children[0].className = 'current';

        // 6. 克隆第一张图片(li)放到ul 最后面
        var first = that.ul.children[0].cloneNode(true);
        that.ul.appendChild(first);

    }
}




function animate(obj: any, target: number, callback?: any) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.scTimer);
    obj.scTimer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.scTimer);
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
};