/*!
 * lazyImg v1.10.1
 * author zebing
 * Copyright 2017,
 * Date: 2017-08-30T21:49Z
 */
(function(window,document) {
	var win = window,
		doc = document,
		height,obj;
	var lazyImg = function(initial) {
		return new lazyImg.prototype.init(initial);
	}
	lazyImg.prototype = {
		constructor: lazyImg,
		length: 0,
		splice: [].splice,
		init: function(initial) {
			this.placeholder = ''; //提前占位图片
			this.effect = 'show';  //图片加载显示效果
			this.threshold = 10;   //提前加载
			this.event = 'scroll'; //加载触发事件 
			this.container = 'document'; //指定加载容器id
			this.selector = ''; //加载指定class图片

			if (typeof initial == 'object') {

				//提前占位图片
				if (typeof initial.placeholder !== "undefined") {
					this.placeholder = initial.placeholder;
					this.init_placeholder();
				}

				//图片加载显示效果
				if (typeof initial.effect !== "undefined") {
					this.effect = initial.effect;
				}

				//提前加载
				if (typeof initial.threshold !== "undefined") {
					this.threshold = initial.threshold;
				}

				//触发事件
				if (typeof initial.event !== "undefined") {
					this.event = initial.event;
				}

				//加载容器
				if (typeof initial.container !== "undefined") {
					this.container = initial.container;
				}

				//加载类
				if (typeof initial.selector !== "undefined") {
					this.selector = initial.selector;
				}
			}

			if (this.event === 'scroll') {
				this.loadImg();
			}
			this.addEvent();
		},

		//占位符
		init_placeholder: function() {
			var images = this.getImgs();
			for (var i =0; i < images.length; i++) {
				images[i].src = this.placeholder;
			}
		},

		//所有懒加载图片节点
		getImgs: function() {
			var selector = this.selector,
			    container = this.container,
			    images = [];

			//指定加载类为空
			if (selector !== '') {
				if (container !== 'document') {
					images = document.getElementById(container).getElementsByClassName(selector);
				} else {
					images = document.getElementsByClassName(selector);
				}
			} else {
				if (container !== 'document') {
					images = document.getElementById(container).getElementsByTagName('img');
				} else {
					images = document.getElementsByTagName('img');
				}
			}
			return images;
		},

		//加载可视区图片
		loadImg: function() {
            var images = this.getImgs();

            for (var i = 0; i < images.length; i++) {
                if (this.loaded(images[i])) {
                    if (!images[i].getAttribute('data-load')) {
                        this.addShow(images[i]);
                    }
                    
                } else {
                    return;
                }
            }
        },

        //是否继续加载
        loaded: function(ele) {
            height = height ? height : (window.innerHeight || document.documentElement.clientHeight);
            var sh = document.body.scrollTop || document.documentElement.scrollTop; 
            var et = ele.offsetTop; 
            var ch = et - sh - this.threshold;

            if (ch <= height) {
                return true; // 继续加载
            } else {
                return false; //停止加载
            }
        },

        //触发加载事件函数
        addEvent: function() {
        	var ev = this.event,
        		th = this,
        		element;

        	//滑动加载
        	if (ev === 'scroll') {
	    		obj = this;
	    		window.addEventListener('scroll',th.scroll,false);
        	
	    	//点击加载
        	} else {
        		if (this.container !== 'document') {
        			element = document.getElementById(this.container);
        		} else {
        			element = document;
        		}

        		element.addEventListener('click',function() {
        			var event = window.event || event,
        				target = event.target || event.srcElement;
    				
    				if (target.nodeName.toLocaleLowerCase() === 'img') {
    					if (!target.getAttribute('data-load')) {
	                        th.addShow(target);
	                    }
    				}
        		});
        	}
        },

        //滑动事件稀释
        scroll: function() {
	        window.removeEventListener('scroll',obj.scroll,false);
	    	setTimeout(function() {
	    		obj.loadImg();
        		window.addEventListener('scroll',obj.scroll,false);
	    	},600);
        },
        addShow: function(element) {
        	var show = new ShowImg(),
        		src = element.getAttribute('data-src');
        		
        	if (this.effect == 'fadeIn') {
        		show.fadeIn(element, src);
        	} else if (this.effect == 'slideDown') {
        		show.slideDown(element, src);
        	} else if (this.effect == 'scale') {
        		show.scale(element, src);
        	} else {
        		show.show(element,src);
        	}

        	element.setAttribute('data-load', 'true')
        }
	}
	lazyImg.prototype.init.prototype = lazyImg.prototype;

	//显示对象
	function ShowImg(){}
	ShowImg.prototype = {

		//直接显示
		show: function(element, src) {
			element.src = src;
		},

		//渐变
		fadeIn: function(element, src) {
			var timer = null,
				i = 0,
				move = function() {
					if (i == 1000) {
						element.style.opacity = 1;
						clearTimeout(timer);
					} else {
						element.style.opacity = i/1000;
						i += 10;
						timer = setTimeout(move, 17);
					}
				};
				
			element.style.opacity = 0;
			element.src = src;

			//图片下载完毕才开始展示
			element.onload = function() {
				timer = setTimeout(move, 20);
			}
		},

		//下拉
		slideDown: function(element, src) {
			element.src = src;
    		element.style.transform = 'translateY(-100%)';
			element.style.transition = 'transform 0s ease-in';
			element.style.opacity = 0;

			//图片下载完毕才开始展示
			element.onload = function() {
				this.style.transitionProperty = 'transform,opacity';
				this.style.transitionDuration = '.6s';
				this.style.transitionTimingFunction = 'ease-out';
				this.style.transform = 'translateY(0%)';
				element.style.opacity = 1;
			}
		},

		//放大
		scale: function(element, src) {
			element.src = src;
			element.style.transform = 'scale(0,0)';
			element.style.transition = 'transform 0s ease-out';

			//图片下载完毕才开始展示
			element.onload = function() {
				this.style.transition = 'transform .6s ease-out'
				this.style.transform = 'scale(1,1)';
			}
		}
	}
	window.lazyImg = lazyImg;
})(window,document);