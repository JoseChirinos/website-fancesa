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
    var paths = common.getChildren(document.querySelector('#paths'));
    var depbig = document.querySelector('#depbig h1');
    var deps = document.querySelector('#deps');
    var urls = [];
    [].forEach.call(paths,function(i){
        urls.push(i.getAttribute('data-url'));
        i.onmouseover = function(){
            var nameid = i.getAttribute('class').split(' ')[1];
            var txt = document.getElementById(nameid).children[0].textContent;
            depbig.textContent = txt;
            deps.style.display = "none";
            depbig.style.display = "block";
        }
        i.onclick = function(){
            link(i.getAttribute('data-url'));
        }
    });

    document.querySelector('.sNa-detail').onmouseenter = function(e){
        console.log('entra');
        depbig.style.display = "none";
        deps.style.display = "block";
    }
    window.link = function(url){
        window.location.href = url;
    }
    /* valor por defecto */
    var def = {
        elem: document.querySelector('#deps'),
        on: function(){
            this.elem.onmouseover = function(e){
                e.preventDefault();
                this.setAttribute('class','');
            }
            this.elem.onmouseout = function(e){
                e.preventDefault();
                this.setAttribute('class','dep-def');
            }
        }
    };
    def.on();
    /* valores generales */
    var deps = document.querySelector('#deps');
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
})(window);
(function(env){
    /*functions for menu navigation by Jose Chirinos*/
    env.onload = function(){
        var inside = document.querySelector('.inside');
        var bar = document.querySelector('.bar');    
        var ulElem = inside.children[0];
        var sizeUL = ulElem.clientWidth;
        
        [].forEach.call(ulElem.children,function(i){
            i.onmouseover = function() {
                var a = i.children[0];
                bar.style.width = a.offsetWidth+'px';
                bar.style.transform = "translate3d("+ (a.offsetLeft - 15) +'px,'+' 0px, 0px)';
            }
        })

        ulElem.onmouseout = function(){
            initMenu();
        }

        function initMenu(){
            var on = document.querySelector('.on').children[0];
            bar.style.width = on.offsetWidth+'px';
            bar.style.transform = "translate3d("+ (on.offsetLeft - 15) +'px,'+' 0px, 0px)';
        }
        initMenu();
    }
})(window);
(function(env){
    /*event scroll by Jose Chirinos*/
    var sa = document.querySelector('.sNa').offsetTop - 50;
    var sb = document.querySelector('.sNb').offsetTop - 50;
    var sc = document.querySelector('.sNb').offsetTop - 50;
    var sd = document.querySelector('.sNd').offsetTop - 50;
    var body = document.body;
    var menu = document.querySelector('.menu');

    /*var for animate pack*/
    var pack = document.querySelector('.pack-fancesa');
    /*end*/

    env.onscroll = function(){
        
        if(body.scrollTop > sa){
            menu.style.background = "#be0411";
            [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                i.style.color = '#FFFFFF';
            });
            document.querySelector('.bar').style.background = "#fff";
        }
        else{
            menu.style.background = "#000000";
            [].forEach.call(document.querySelectorAll('.menu a'),function(i){
                i.style.color = '#fff';
            });
            document.querySelector('.bar').style.background = "#be0411";
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
/* animations of header */
(function(){
    function chuqui(){            
        Velocity(
            document.getElementById('chuquiBox'),
            /* properties of animation */
            {
                opacity:0.5
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            bottom:'0px',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    left:'-400px',
                                    opacity:0.5
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(e){
                                        resetChuqui(e[0]);
                                    }
                                });
                                setTimeout(function(){
                                    santa();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }
    function santa(){
        Velocity(
            document.getElementById('santaBox'),
            /* properties of animation */
            {
                opacity:0.5
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            top:'100px',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    top:'500px',
                                    opacity:0.5
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(elements){
                                        resetSanta(elements[0]);
                                    }
                                });
                                setTimeout(function(){
                                    potosi();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }
    function potosi(){
        Velocity(
            document.getElementById('potosiBox'),
            /* properties of animation */
            {
                opacity:0.5
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            left:'0px',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    bottom:'-400px',
                                    opacity:0.5
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(elements){
                                        resetPotosi(elements[0]);
                                    }
                                });
                                setTimeout(function(){
                                    cocha();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }
    function cocha(){
        Velocity(
            document.getElementById('cochaBox'),
            /* properties of animation */
            {
                opacity:0.5
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            rotateY:'-360deg',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    left: '-700px',
                                    opacity:0
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(elements){
                                        Velocity(elements[0],
                                        {
                                            rotateY: '90deg',
                                        },{duration:0});
                                        resetCocha(elements[0]);
                                        
                                    }
                                });
                                setTimeout(function(){
                                    tarija();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }
    function tarija(){
        Velocity(
            document.getElementById('tarijaBox'),
            /* properties of animation */
            {
                opacity:0.5
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            bottom:'0px',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    rotateY: '90deg',
                                    opacity:0
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(elements){
                                        Velocity(elements[0],
                                        {
                                            rotateY: '360deg',
                                        },{duration:0});
                                        resetTarija(elements[0]);
                                    }
                                });
                                setTimeout(function(){
                                    oruro();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }
    function oruro(){
        Velocity(
            document.getElementById('oruroBox'),
            /* properties of animation */
            {
                opacity:0.5,
                rotateY:'0deg'
            },
            /* options of control */
            {
                duration:500,
                complete: function(elements){
                    Velocity(elements[0],
                        {
                            rotateY:'-360deg',
                            bottom:'0px',
                            opacity:1
                        },
                        {
                            duration:500,
                            easing:[.57,.21,.69,1.25],
                            complete: function(elements){
                                Velocity(elements[0],
                                {
                                    opacity:0
                                },
                                {
                                    easing: [.57,.21,.69,3.25],
                                    duration:1500,
                                    delay:4000,
                                    complete: function(elements){
                                        Velocity(elements[0],
                                        {
                                            rotateY: '360deg',
                                        },{duration:0});
                                        resetOruro(elements[0]);
                                    }
                                });
                                setTimeout(function(){
                                    chuqui();
                                },3800);
                            }
                        }
                    )
                }
            }
        );
    }

    /*Resets*/
    function resetChuqui(elem){
        elem.style.left = "100px";
        elem.style.bottom = "-400px";
        elem.style.opacity = "1";
    }
    function resetSanta(elem){
        elem.style.top = "-400px";
        elem.style.opacity = "0";
    }
    function resetPotosi(elem){
        elem.style.bottom = "0px";
        elem.style.opacity = "0";
        elem.style.left = "-100%";
    }
    function resetCocha(elem){
        elem.style.opacity = "0";
        elem.style.left = "100px";
    }
    function resetTarija(elem){
        elem.style.opacity = "0";
        elem.style.bottom = "-400px";
    }
    function resetOruro(elem){
        elem.style.opacity = "0";
        elem.style.bottom = "-400px";
    }
    chuqui();
})(window);