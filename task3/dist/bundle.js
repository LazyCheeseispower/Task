/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/1.js":
/*!*********************!*\
  !*** ./src/js/1.js ***!
  \*********************/
/***/ (() => {

        eval("window.addEventListener('load', function () {\r\n    // 1. 获取元素\r\n    var arrowLeft = document.querySelector('.arrowLeft');\r\n    var arrowRight = document.querySelector('.arrowRight');\r\n    var focus = document.querySelector('.focus');\r\n    var focusWidth = focus.offsetWidth;\r\n    // 2. 鼠标经过focus 就显示隐藏左右按钮\r\n    focus.addEventListener('mouseenter', function () {\r\n        arrowLeft.style.display = 'block';\r\n        arrowRight.style.display = 'block';\r\n        clearInterval(timer);\r\n        timer = 0; // 清除定时器变量\r\n    });\r\n    focus.addEventListener('mouseleave', function () {\r\n        arrowLeft.style.display = 'none';\r\n        arrowRight.style.display = 'none';\r\n        timer = setInterval(function () {\r\n            //手动调用点击事件\r\n            arrowRight.click();\r\n        }, 2000);\r\n    });\r\n    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈\r\n    var ul = focus.querySelector('ul');\r\n    var ol = focus.querySelector('.circle');\r\n    // console.log(ul.children.length);\r\n    for (var i = 0; i < ul.children.length; i++) {\r\n        // 创建一个小li \r\n        var li = document.createElement('li');\r\n        // 记录当前小圆圈的索引号 通过自定义属性来做 \r\n        li.setAttribute('index', i);\r\n        // 把小li插入到ol 里面\r\n        ol.appendChild(li);\r\n        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件\r\n        li.addEventListener('click', function () {\r\n            // 干掉所有人 把所有的小li 清除 current 类名\r\n            for (var i = 0; i < ol.children.length; i++) {\r\n                ol.children[i].className = '';\r\n            }\r\n            // 留下我自己  当前的小li 设置current 类名\r\n            this.className = 'current';\r\n            // 5. 点击小圆圈，移动图片 当然移动的是 ul \r\n            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值\r\n            // 当我们点击了某个小li 就拿到当前小li 的索引号\r\n            var index = this.getAttribute('index');\r\n            // 当我们点击了某个小li 就要把这个li 的索引号给 num  \r\n            num = index;\r\n            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  \r\n            circle = index;\r\n            // num = circle = index;\r\n            console.log(focusWidth);\r\n            console.log(index);\r\n            animate(ul, -index * focusWidth);\r\n        });\r\n    }\r\n    // 把ol里面的第一个小li设置类名为 current\r\n    ol.children[0].className = 'current';\r\n    // 6. 克隆第一张图片(li)放到ul 最后面\r\n    var first = ul.children[0].cloneNode(true);\r\n    ul.appendChild(first);\r\n    // 7. 点击右侧按钮， 图片滚动一张\r\n    var num = 0;\r\n    // circle 控制小圆圈的播放\r\n    var circle = 0;\r\n    // flag 节流阀\r\n    var flag = true;\r\n    arrowRight.addEventListener('click', function () {\r\n        if (flag) {\r\n            flag = false; // 关闭节流阀\r\n            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0\r\n            if (num == ul.children.length - 1) {\r\n                ul.style.left = \"0\";\r\n                num = 0;\r\n            }\r\n            num++;\r\n            animate(ul, -num * focusWidth, function () {\r\n                flag = true; // 打开节流阀\r\n            });\r\n            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放\r\n            circle++;\r\n            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原\r\n            if (circle == ol.children.length) {\r\n                circle = 0;\r\n            }\r\n            // 调用函数\r\n            circleChange();\r\n        }\r\n    });\r\n    // 9. 左侧按钮做法\r\n    arrowLeft.addEventListener('click', function () {\r\n        if (flag) {\r\n            flag = false;\r\n            if (num == 0) {\r\n                num = ul.children.length - 1;\r\n                ul.style.left = -num * focusWidth + 'px';\r\n            }\r\n            num--;\r\n            animate(ul, -num * focusWidth, function () {\r\n                flag = true;\r\n            });\r\n            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放\r\n            circle--;\r\n            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）\r\n            // if (circle < 0) {\r\n            //     circle = ol.children.length - 1;\r\n            // }\r\n            circle = circle < 0 ? ol.children.length - 1 : circle;\r\n            // 调用函数\r\n            circleChange();\r\n        }\r\n    });\r\n    function circleChange() {\r\n        // 先清除其余小圆圈的current类名\r\n        for (var i = 0; i < ol.children.length; i++) {\r\n            ol.children[i].className = '';\r\n        }\r\n        // 留下当前的小圆圈的current类名\r\n        ol.children[circle].className = 'current';\r\n    }\r\n    // 10. 自动播放轮播图\r\n    var timer = setInterval(function () {\r\n        //手动调用点击事件\r\n        arrowRight.click();\r\n    }, 2000);\r\n});\r\nfunction animate(obj, target, callback) {\r\n    // console.log(callback);  callback = function() {}  调用的时候 callback()\r\n    // 先清除以前的定时器，只保留当前的一个定时器执行\r\n    clearInterval(obj.timer);\r\n    obj.timer = setInterval(function () {\r\n        // 步长值写到定时器的里面\r\n        // 把我们步长值改为整数 不要出现小数的问题\r\n        // var step = Math.ceil((target - obj.offsetLeft) / 10);\r\n        var step = (target - obj.offsetLeft) / 10;\r\n        step = step > 0 ? Math.ceil(step) : Math.floor(step);\r\n        if (obj.offsetLeft == target) {\r\n            // 停止动画 本质是停止定时器\r\n            clearInterval(obj.timer);\r\n            // 回调函数写到定时器结束里面\r\n            // if (callback) {\r\n            //     // 调用函数\r\n            //     callback();\r\n            // }\r\n            callback && callback();\r\n        }\r\n        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10\r\n        obj.style.left = obj.offsetLeft + step + 'px';\r\n    }, 15);\r\n}\r\n\n\n//# sourceURL=webpack://task2/./src/js/1.js?");

        /***/
      })

    /******/
  });
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/1.js"]();
  /******/
  /******/
})()
  ;