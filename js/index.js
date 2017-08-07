/* code © 2017 - Jose Chirinos */
/* Pollyfill for ie*/
var common = {
    getChildren: function(element) {
        var childNodes = element.childNodes,
            children = [],
            i = childNodes.length;

        while (i--) {
            if (childNodes[i].nodeType == 1) {
                children.unshift(childNodes[i]);
            }
        }

        return children;
    }
};
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
        [].forEach.call(this.ulElem.children,function(i){
            var a = i.children[0];
            if(typeof i.children[1]!== 'undefined'){
                i.children[1].style.left = a.offsetLeft+'px';
            }
        });
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
    initMenu: function(){
        var on = document.querySelector('.on').children[0];
        this.bar.style.width = on.offsetWidth+'px';
        this.bar.style.transform = "translate3d("+ (on.offsetLeft - 15) +'px,'+' 0px, 0px)';
    },
    isTop:true,
};
(function(){
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
})(window);
(function(){
    /*functions for maps by Jose Chirinos*/
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
                console.log('entra');
                this.setAttribute('class','');
                document.querySelector('.ch').setAttribute('class','land ch');
            }
            this.elem.onmouseleave = function(e){
                e.preventDefault();
                console.log('sale');
                this.setAttribute('class','dep-def');
                document.querySelector('.ch').setAttribute('class','land ch dhover');
            }
        }
    };
    def.on();
})(window);
(function(env){
    /*functions for menu navigation by Jose Chirinos*/
    env.onload = function(){
        menuCommon.init();
        menuCommon.initMenu();
    }
})(window);
(function(env){
    /*event scroll by Jose Chirinos*/
    var header = document.querySelector('.header').offsetTop - 50;
    var sa = document.querySelector('.sNa').offsetTop - 50;
    var sb = document.querySelector('.sNb').offsetTop - 50;
    var sc = document.querySelector('.sNb').offsetTop - 50;
    var sd = document.querySelector('.sNd').offsetTop - 50;
    var menu = document.querySelector('.menu');

    /*var for animate pack*/
    var packHeader = document.querySelector('.pack-fancesa-top');
    var pack = document.querySelector('.pack-fancesa');
    /*end*/

    env.onscroll = function(){
        if(window.scrollY>header && window.scrollY<sa){
            var sh = 50 - window.scrollY*0.5;
            /*console.log(sh);*/
            packHeader.style.top = sh+'px';          
        }
        if(window.scrollY > sa-100){
            if(menuCommon.isTop){
                menu.style.position = 'fixed';
                menu.children[0].style.display = 'none';
                menu.querySelector('#logo-nav').style.display = 'inline-block';
                menu.style.background = 'rgba(0, 0, 0, 0.9)';
                [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                    i.style.color = '#fff';
                });
                //document.querySelector('.bar').style.background = '#fff';
                menuCommon.initMenu();
                menuCommon.isTop = false;
            }
        }
        else{
            if(!menuCommon.isTop){
                menu.style.position = 'absolute';
                menu.children[0].style.display = 'block';
                menu.querySelector('#logo-nav').style.display = 'none';
                menu.style.background = 'transparent';
                [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                    i.style.color = '#FFFFFF';
                });
                //document.querySelector('.bar').style.background = '#be0411';
                menuCommon.initMenu();
                menuCommon.isTop = true;
            }
        }
        if(window.scrollY > (sb -500) && window.scrollY < (sd)){
                var sss = 50 - (window.scrollY - sb)*0.4;
                /*
                if(sss>=0 || sss<-100){
                    if(sss<-100){
                        pack.style.top = sss+100+'px';
                    }
                    else{
                        pack.style.top = sss+'px';
                    }
                }
                */
                if(sss>=0){
                    pack.style.top = sss+'px';
                }
                else{
                    pack.style.right = 100 - sss*0.2 + 'px';
                }
        }
        
    }

})(window);