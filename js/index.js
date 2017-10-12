/* code © 2017 - Jose Chirinos */
/* var global */
var consulta = window.matchMedia('(max-width: 768px)');
function scrollToTop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
/* Pollyfill for ie*/
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this == null) {
        throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
        T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

        var kValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[k];

            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
        }
        // 8. return undefined
    };
}
/* Menu Bar */
var menuCommon = {
    inside: null,
    bar: null,
    ulElem: null,
    sizeUL: null,
    init: function(){
        this.inside = document.querySelector('.inside');
        this.bar = document.querySelector('.bar');
        this.ulElem = this.inside.children[0];
        var sizeUL = this.ulElem.clientWidth;
        /* add event hover */
        var self = this;
        /* order sub-menus */
        this.reOrderSub();
        [].forEach.call(this.ulElem.children,function(i){
            i.onmouseenter = function() {
                var a = i.children[0];
                self.bar.style.width = a.offsetWidth+'px';
                self.bar.style.transform = "translate3d("+ (a.offsetLeft - 15) +'px,'+' 0px, 0px)';
            }
        });
        this.ulElem.onmouseleave = function(){
            self.initMenu();
        };
    },
    reOrderSub: function(){
        console.log(typeof this.ulElem.children);
        [].forEach.call(this.ulElem.children,function(i){
            var a = i.children[0];
            if(typeof i.children[1]!== 'undefined'){
                i.children[1].style.left = a.offsetLeft+'px';
            }
        });
    },
    initMenu: function(){
        var on = document.querySelector('.on').children[0];
        if(this.bar!==null){
            this.bar.style.width = on.offsetWidth+'px';
            this.bar.style.transform = "translate3d("+ (on.offsetLeft - 15) +'px,'+' 0px, 0px)';
        }
    },
    isTop:true,
};
/*functions for maps by Jose Chirinos*/
(function(){
    var deps = document.querySelector('#deps');
    var urls = [];
    /* valores generales */
    [].forEach.call(deps.children,function(i){
        var nameClass = i.getAttribute('id');
        i.onmouseover = function(){
            document.querySelector('.'+nameClass).setAttribute('class','land '+nameClass+' dhover');
            this.setAttribute('class','on-dep');
        }
        i.onmouseout = function(){
            document.querySelector('.'+nameClass).setAttribute('class','land '+nameClass);
            this.setAttribute('class','');
        }
    });
    window.link = function(url){
        window.location.href = url;
    }
    /* valor por defecto */
    var def = {
        elem: document.querySelector('#deps'),
        on: function(){
            this.elem.onmouseenter = function(e){
                e.preventDefault();
                /*console.log('entra');*/
                this.setAttribute('class','');
                document.querySelector('.ch').setAttribute('class','land ch');
            }
            this.elem.onmouseleave = function(e){
                e.preventDefault();
                /*console.log('sale');*/
                this.setAttribute('class','dep-def');
                document.querySelector('.ch').setAttribute('class','land ch dhover');
            }
            document.querySelector('.ch').setAttribute('class','land ch dhover');
        }
    };
    def.on();
})(window);
/*event scroll by Jose Chirinos*/
(function(env){
    /* iniciar menu */
    menuCommon.init();
    menuCommon.initMenu();

    var header = document.querySelector('.header').offsetTop - 50;
    var sa = document.querySelector('.sNa').offsetTop - 50;
    var sb = document.querySelector('.sNb').offsetTop - 50;
    var sc = document.querySelector('.sNb').offsetTop - 50;
    var sd = document.querySelector('.sNd').offsetTop - 50;
    var menu = document.querySelector('.menu');
    var burger = document.querySelector('#menu-icon-wrapper');
    var top = document.querySelector('.upbottom');

    /*var for animate pack*/
    var packHeader = document.querySelector('.pack-fancesa-top');
    /*end*/

    env.onscroll = function(){
        if(window.scrollY>header && window.scrollY<sa){
            var sh = 50 - window.scrollY*0.5;
            /*console.log(sh);*/
            /*console.log(packHeader.children[0]);*/
            packHeader.children[0].style.transform = 'translateY('+sh+'px)';
        }
        if(window.scrollY > sa-100){
            if(menuCommon.isTop){
                top.style.display = 'block';
                top.setAttribute('class','upbottom animated rotateIn');
                menu.style.position = 'fixed';
                if(!consulta.matches){
                    menu.children[0].style.display = 'none';
                }
                else{
                    burger.style.position = 'fixed';
                }
                menu.querySelector('#logo-nav').style.display = 'inline-block';
                menu.style.background = 'rgba(0, 0, 0, 0.9)';
                [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                    i.style.color = '#fff';
                });
                //document.querySelector('.bar').style.background = '#fff';
                menuCommon.reOrderSub();
                menuCommon.initMenu();
                menuCommon.isTop = false;
            }
        }
        else{
            if(!menuCommon.isTop){
                top.setAttribute('class','upbottom animated bounceOut');
                menu.style.position = 'absolute';
                menu.children[0].style.display = 'block';
                if(consulta.matches){
                    burger.style.position = 'absolute';
                }
                menu.querySelector('#logo-nav').style.display = 'none';
                menu.style.background = 'transparent';
                [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                    i.style.color = '#FFFFFF';
                });
                //document.querySelector('.bar').style.background = '#be0411';
                menuCommon.reOrderSub();
                menuCommon.initMenu();
                menuCommon.isTop = true;
            }
        }
        
    }

})(window);