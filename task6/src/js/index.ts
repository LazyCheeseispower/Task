import "./../css/base.scss"
import "./../css/index.scss"
interface IList {
    index: string;
    name: string;
    url: string;
}

interface IData {
    total: number;
    list: IList[];

}
interface IAllData {
    code: number;
    message: string;
    data: IData;
}

export class NewSwiper {
    btn: HTMLElement;
    all: NodeListOf<HTMLDivElement>;
    w: HTMLElement;
    arrowLeft: HTMLElement;
    arrowRight: HTMLElement;
    focus: HTMLElement;
    focusWidth: number;
    ul: HTMLElement;
    ol: HTMLElement;
    flag: boolean;
    num: number;
    circle: number;
    timer: number;
    constructor(el: HTMLElement) {
        this.init()
        this.btn = el;
        this.all = document.querySelectorAll('div');
        this.w = this.all[this.all.length - 3];
        //console.log(this.all)
        //console.log(this.w)
        this.arrowLeft = <HTMLElement>this.w.querySelector('.arrowLeft');
        this.arrowRight = <HTMLElement>this.w.querySelector('.arrowRight');
        this.focus = <HTMLElement>this.w.querySelector('.focus');
        this.focusWidth = this.focus.offsetWidth;
        this.ul = <HTMLElement>this.focus.querySelector('ul');
        this.ol = <HTMLElement>this.focus.querySelector('.circle');
        this.flag = true;
        this.num = 0;
        this.circle = 0;
        this.timer = 0;
        this.do()
    }
    create() {
        const div = document.createElement('div');
        div.className = ".w";//创建 w 盒子
        document.body.appendChild(div)

        const div1 = document.createElement("div");
        div1.className = "main"; //创建 main 盒子
        div.appendChild(div1);

        const div2 = document.createElement("div");
        div2.className = "focus"; //创建 focus 盒子
        div1.appendChild(div2);

        const a1 = document.createElement('a')
        a1.className = "arrowLeft"; //给创建的a设置class；
        a1.setAttribute('href', 'javascript:;');
        a1.innerHTML = "&lt";
        div2.appendChild(a1);

        const a2 = document.createElement("a");
        a2.className = "arrowRight"; //给创建的a设置class；
        a2.setAttribute('href', 'javascript:;');
        a2.innerHTML = "&gt";
        div2.appendChild(a2);

        const ul1 = document.createElement("ul");
        ul1.className = "uls";
        div2.appendChild(ul1);
        for (let i = 0; i < 4; i++) {
            const li = document.createElement("li");
            li.className = "list";
            ul1.appendChild(li);
        }
        const ol1 = document.createElement("ol");
        ol1.className = "circle";
        div2.appendChild(ol1);

    }
    get() {
        this.getImageList(function (list) {
            //console.log(list);
            const ul = document.querySelectorAll("ul");
            //let ul1 = ul[ul.length - 1];
            //console.log(ul);
            //console.log(ul1);
            for (let j = 0; j < ul.length; j++) {
                const ul1 = ul[ul.length - j - 1];
                if (ul1.getAttribute('id') !== 'completed') {
                    for (let i = 0; i < list.length; i++) {
                        const result = list[i];
                        (ul1.childNodes[i] as HTMLElement).innerHTML = '<a href="#"><img src=" ' + result.url + '" alt=""></a>';
                    }
                    // 6. 克隆第一张图片(li)放到ul 最后面
                    const first = ul1.children[0].cloneNode(true);
                    ul1.appendChild(first);
                    ul1.setAttribute('id', 'completed');
                }

            }
        })
    }


    getImageList(callback: (arg0: IList[]) => void) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://tuzkiss-1257228966.cos.ap-shanghai.myqcloud.com/data')
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    //console.log(xhr.responseText);
                    const alldata: IAllData = JSON.parse(xhr.responseText);//这里设置 data 为 any 类型是因为往往后端数据不确定，接口不方便定义               
                    const list = alldata.data.list;
                    callback(list);
                } else {
                    alert("Request was unsuccessful: " + xhr.status);
                }
            }
        };
    }
    // getImageListNew() {
    //     const p: Promise<string> = new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest()
    //         xhr.open('GET', 'https://tuzkiss-1257228966.cos.ap-shanghai.myqcloud.com/data')
    //         xhr.send();
    //         xhr.onreadystatechange = function () {
    //             if (xhr.readyState === 4) {
    //                 if ((xhr.status >= 20 && xhr.status < 300) || xhr.status == 304) {
    //                     resolve(xhr.responseText);
    //                 } else {
    //                     reject(xhr.status);
    //                 }
    //             }
    //         }
    //     }
    //     )
    //     return p.then((value: string) => {
    //         const alldata: IAllData = JSON.parse(value);//这里设置 data 为 any 类型是因为往往后端数据不确定，接口不方便定义               
    //         const list: IList[] = alldata.data.list;
    //     },
    //         reason => {
    //             alert("Request was unsuccessful: " + reason);
    //         }

    //     )

    // }
    circleChange() {
        // 先清除其余小圆圈的current类名
        for (let i = 0; i < this.ol.children.length; i++) {
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
            this.animate(this.ul, -this.num * this.focusWidth, function () {
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
    }

    leftClick() {
        if (this.flag) {
            this.flag = false;
            if (this.num == 0) {
                this.num = this.ul.children.length - 1;
                this.ul.style.left = -this.num * this.focusWidth + 'px';
            }
            this.num--;
            this.animate(this.ul, -this.num * this.focusWidth,);
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
    }
    do() {
        this.arrowLeft.onclick = this.leftClick.bind(this);
        this.arrowRight.onclick = this.rightClick.bind(this);

        const scTimer = setInterval(() => {
            //手动调用点击事件
            this.arrowRight.click();
        }, 2000);

        this.focus.addEventListener('mouseenter', () => {
            this.arrowLeft.style.display = 'block';
            this.arrowRight.style.display = 'block';

            clearInterval(scTimer);
            //scTimer = null; // 清除定时器变量
        });

        this.focus.addEventListener('mouseleave', () => {
            this.arrowLeft.style.display = 'none';
            this.arrowRight.style.display = 'none';
            scTimer
        });



        // console.log(ul.children.length);

        for (let i = 0; i < this.ul.children.length; i++) {
            // 创建一个小li
            const li = document.createElement('li');
            // 记录当前小圆圈的索引号 通过自定义属性来做
            li.setAttribute('index', i + '');
            // 把小li插入到ol 里面
            this.ol.appendChild(li);
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', () => {
                // 干掉所有人 把所有的小li 清除 current 类名
                for (let i = 0; i < this.ol.children.length; i++) {
                    this.ol.children[i].className = '';
                }
                // 留下我自己  当前的小li 设置current 类名
                li.className = 'current';
                // 5. 点击小圆圈，移动图片 当然移动的是 ul
                // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
                // 当我们点击了某个小li 就拿到当前小li 的索引号
                const index = Number(li.getAttribute('index'));
                // 当我们点击了某个小li 就要把这个li 的索引号给 this.num
                this.num = index;
                // 当我们点击了某个小li 就要把这个li 的索引号给 this.circle
                this.circle = index;
                // this.num = this.circle = index;
                //console.log(that.focusWidth);
                //console.log(index);

                this.animate(this.ul, -index * this.focusWidth);
                this.circleChange();
            })
        }
        this.ol.children[0].className = 'current';


    }
    destory() {
        //this.w.remove()
        //console.log(this.w);
        const all = document.querySelectorAll('div');
        const w = all[all.length - 3];
        w.remove()

    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    animate(obj: HTMLElement, target: number, callback?: Function) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()
        // 先清除以前的定时器，只保留当前的一个定时器执行
        // obj.setAttribute("timer", "");
        clearInterval(this.timer);
        this.timer = window.setInterval(() => {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                // 停止动画 本质是停止定时器
                clearInterval(this.timer);
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
    init() {
        this.create();
    }
}
