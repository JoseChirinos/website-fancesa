/* code © 2017 - Jose Chirinos */

(function(env){
    /*iniciar al cargar*/
    env.onload = function(){
            init();
    }
    /* Variables */
    var consulta = window.matchMedia('(max-width: 885px)');
    var phone = window.matchMedia('(max-width: 768px)');
    var toggle = document.querySelector('#menu-icon-trigger');
    var btnScroll = document.querySelector('#btn-scroll');
    var header = document.querySelector('.header').offsetTop - 50;
    var sa = document.querySelector('.sNa').offsetTop - 50;
    var menu = document.querySelector('.menu');
    var top = document.querySelector('.upbottom');
    var packHeader = document.querySelector('.pack-fancesa');
    /*menu*/
    var menuBotton = document.querySelector('.menu-bottom');
    var menuTop = document.querySelector('.menu-top');

    /* Menu Bar */
    var menuCommon = {
        responsive:false,
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
                    console.warn('OffsetWidth: ',a.offsetWidth);
                    self.bar.style.transform = "translate3d("+ (a.offsetLeft - 15) +'px,'+' 0px, 0px)';
                    console.warn('OffsetWidth: ',a.offsetLeft);
                }
            });
            this.ulElem.onmouseleave = function(){
                self.initMenu();
            };
        },
        reOrderSub: function(){
            //console.log(typeof this.ulElem.children);
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
    function onEvents(){
        btnScroll.onclick = function(){
            scrollToTop(700);
        }
    }
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
    function onResponsive(){
        document.body.onresize = function(){
            if(consulta.matches){
                if(!menuCommon.responsive){
                    console.log('tamaño pequeño: ',menuCommon.responsive);
                    if(window.scrollY>document.querySelector('.sNa').offsetTop - 150){
                    menuTop.style.display = 'block';                        
                    }
                    if(toggle.getAttribute('data-toggle') === 'open'){
                        menuBotton.style.display = "block";
                        document.body.style.overflow = "hidden";
                    }else{
                        menuBotton.style.display = "none";
                    }
                    menuCommon.responsive = true;
                    document.querySelector('#logo-nav').style.display = 'inline-block';
                }
            }
            else{
                if(menuCommon.responsive){
                    console.log('tamaño grande: ',menuCommon.responsive);
                    if(window.scrollY>document.querySelector('.sNa').offsetTop - 150){
                        document.querySelector('#logo-nav').style.display = 'inline-block';
                        menuTop.style.display = 'none';
                    }
                    else{
                        document.querySelector('#logo-nav').style.display = 'none';   
                    }
                    menuBotton.style.display="block";
                    menuBotton.className = menuBotton.className.split('animated fadeOut')[0];
                    document.body.style.overflow = "auto";
                    menuCommon.responsive = false;
                }
                menuCommon.reOrderSub();
                menuCommon.initMenu();
            }
        }
    }
    function onSupportIE(){
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
    }
    function onMap(){
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

        /* user experience in the map  */
        document.querySelector('#map').onmouseenter = function(){
            document.querySelector('.ch').setAttribute('class','land ch');
        }
        document.querySelector('#map').onmouseleave = function(){
            document.querySelector('.ch').setAttribute('class','land ch dhover');
            document.getElementById('deps').style.display = "block";
        }
        /*
        /*functions
        var paths = document.querySelector('#paths');
        [].forEach.call(paths.children,function(i){
           i.onmouseover = function(){
            var nameid = i.getAttribute('class').split(' ')[1];
            var txt = document.getElementById(nameid).textContent;
            document.getElementById('depbig').children[0].textContent = txt;
            document.getElementById('deps').style.display = "none";
            document.getElementById('depbig').children[0].style.display = "block";
           }
        });
        */

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
    }
    function onScroll(){
        env.onscroll = function(){
            if(window.scrollY>header && window.scrollY<sa){
                var sh = 50 - window.scrollY*0.3;
                packHeader.children[0].style.transform = 'translateY('+sh+'px)';
            }
            if(window.scrollY > sa-100){
                if(menuCommon.isTop){
                    top.style.display = 'block';
                    top.setAttribute('class','upbottom animated rotateIn');
                    menu.style.position = 'fixed';
                    if(consulta.matches){
                        menu.querySelector('#logo-nav').style.display = 'inline-block';
                    }
                    else{
                        menu.children[0].style.display = 'none';
                        menu.querySelector('#logo-nav').style.display = 'inline-block';
                    }
                    menu.style.background = 'rgba(0, 0, 0, 0.9)';
                    [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                        i.style.color = '#fff';
                    });                
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
                        menu.querySelector('#logo-nav').style.display = 'inline-block';
                    }
                    else{
                        menu.querySelector('#logo-nav').style.display = 'none';
                    }
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
    }

    /* function initial */

    function init(){
        // Iniciar el menu
        onSupportIE();
        onResponsive();
        onEvents();
        menuCommon.init();
        menuCommon.initMenu();
        if(!phone.matches){
            // Desktop and Tablets
            onMap();
        }

        //onMap();
        onScroll();
    }
})(window);

