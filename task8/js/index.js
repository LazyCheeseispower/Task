window.addEventListener('load', function () {
    var search = document.getElementById("search");
    var input = document.getElementById("search-input");
    var focus = document.querySelector('.swiper');
    
    input.onfocus = function () {
        search.className = "search-focus";
    }
    input.onblur = function () {
        search.className = "search";
    }

    var top = document.querySelector('.top');
    var mainSection = document.querySelector('.main-section');
    var cards = document.querySelectorAll('.card');
     console.log(cards);
    function watchWindowSize() {
        var w = document.documentElement.clientWidth;
        height = w / 1688 * 160;
        height = height > 155 ? height : 155;
        height = height.toFixed(3);
        //console.log(height);
        top.style.height = height + "px";
        console.log(mainSection);
        if (w > 2277) {
            height = w / 2277 * 502

            console.log(w);
        } else if (w > 1550) {
            height = w / 1899 * 476;
            console.log(w);
        }
        else {
            height = w / 1391 * 470.225;
            console.log(w);
        }
        console.log(height);
        mainSection.style.height = height;
        focusWidth = focus.offsetWidth;
    }



    window.addEventListener("resize", watchWindowSize);
    watchWindowSize();


    var section = document.querySelector("#shortcut");
    window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop;
        console.log(scrollTop);
        if (scrollTop > 0) {
            shortcut.className = "shortcut-scroll";
        }
        else { shortcut.className = "shortcut"; }
    }

    var arrowLeft = document.querySelector('.arrowLeft');
    var arrowRight = document.querySelector('.arrowRight');


    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = 0;
    });
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrowRight.click();
        }, 3000);
    });


    var ul = document.querySelector('.swiper-ul');
    var ol = document.querySelector('.swiper-ol');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrowRight.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = "0";
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    arrowLeft.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }


    var timer = setInterval(function () {
        arrowRight.click();
    }, 3000);

    var roll_btn = document.querySelector(".roll-btn");

    var number = 0;

    var cards = document.querySelectorAll(".card")
    var cards_pics = document.querySelectorAll(".card-picture")
    //console.log(cards_pics[0]);
    var alldata = [];
    sendAJAX('https://tuzkiss-1257228966.cos.ap-shanghai.myqcloud.com/api/rcmd.json')
        .then((value) => {
            alldata = JSON.parse(value);
            console.log(alldata);
            roll_btn.onclick();
        }, (reason) => {
            console.log("错误-1!");
        })
    roll_btn.onclick = function () {

        var data = alldata.data;
        var item = data.item;

        var arr0 = [];
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i <= 9; i++) {
            arr0[i] = item[i];
        }
        // for (var i = 6; i <= 11; i++) {
        //     arr1[i - 6] = item[i];
        // }
        // for (var i = 12; i <= 17; i++) {
        //     arr2[i - 12] = item[i];
        // }
        // for (var i = 18; i <= 23; i++) {
        //     arr3[i - 18] = item[i];
        // }

        var arr = [arr0, arr1, arr2, arr3];

        // if (number == 4) {
        //     number = 0;
        // }

        //console.log(arr[number][0].pic);

        for (var i = 0; i < arr[number].length; i++) {
            var html = "";
            html = "<a href='" + arr[number][i].uri + "' target='_blank'><div class='card-picture'><img src='" + arr[number][i].pic + "'></div><h3 class='card-title'>" + arr[number][i].title + "</h3></a><div class='card-information'>" + arr[number][i].owner.name + "</div>"
            cards[i].innerHTML = html;
        }

        //console.log(cards[0]);




        // number++;




    }



})



function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 20 && xhr.status < 300) || xhr.status == 304) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        }
    })

}


function animate(obj, target, callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        } obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);

}