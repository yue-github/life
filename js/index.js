//主线程js部分;
function Yue_public(){
	this.repaintj=$("#life_over > .uptoyou_l > .uptoyou_repaint");
	this.money=$("#life_game > .money > span:eq(0)");
	this.uptoyou_l=$("#life_over > .uptoyou_l");
	this.can=document.getElementsByClassName("uptoyou_can")[0];
	this.amazing=document.getElementsByClassName("uptoyou_amazing")[0];
	this.canvasAma=this.amazing.getContext("2d");
	this.imgArray=['view1.jpg','view2.jpg','view3.jpg','view4.jpg','view5.jpg'];
	this.imgPort=function(){
			this.imgArray.sort(function(){return Math.random()-0.5});
			this.can.style.background='url(img/'+this.imgArray[2]+')';
			this.can.style.backgroundRepeat='no-repeat';
			this.can.style.backgroundSize='100% 100%';
		};
};

+function($){
		// alert($)
	var yue_lifeGame={
		// 全局调用函数
		duRandomArray:[1,2,3,4,5,6],
		global_fun:function(){
			this.reset();
			this.lifeStart();
			this.go_duchang();
			this.gameStart();
			this.uptoyou_fun();
		},
		//初始化变量函数；
		reset:function(){
			this.startTimer=null;
			this.now=new Date();
			this.wordFir=$("#life_game > .imgM > .wordFir");
			this.duM=$("#life_game > .imgM >.duM");
			this.back=$("#life_game > .imgM > .duM > .duRoom > .back");
			this.duLi=$("#life_game > .navB > ul > li:eq(5)");
			this.input_firDu=$("#life_game > .imgM > .duM > .duRoom > .inputM > p > .fir");
			this.lifeTime=$("#life_game > .lifeTime > span:eq(0)");
			this.lifeOver=$("#life_over");
			this.inputOK=$("#life_game > .imgM > .duM > .duRoom > .inputM > p > .sec");
			this.duTEnd=$("#life_game > .imgM > .duM > .duRoom > .time > span:eq(1)");
			this.person=$("#life_game > .imgM > .duM > .duRoom > .personM >.person");
			this.personSibling=$("#life_game > .imgM > .duM > .duRoom > .personM > ul");
			this.inputOKIstrue=false;
			this.openT=$("#life_game > .imgM > .duM > .duRoom > .openT");
			this.openTTop=this.openT.children(".top");
			this.openTBottom=this.openT.children(".bottom");
			//敬请期待部分
			this.openTSpan=this.openT.children("span");
			this.intervalTrue=true;
			this.inputWarn=this.inputOK.parent().find(".warn");
			this.yaZhuMoney=null;
			this.isCanClick=false;
			this.inputMChoS=$("#life_game > .imgM > .duM > .duRoom > .inputM > .choose > span");
			this.windowS=$("#windowS");
			this.winH3=$("#windowS > .content > h3");
			this.window_inHTML=$("#windowS > .content > span");
			//最终输入的金额；
			this.correctYaZhuMoney=null;
			// 最终输入的押注类型值
			this.isHowPush=null;
			// 开奖过程中阻断流变量
			this.endProgress=true;
			this.timeoutFir=null;
			this.timeoutSec=null;
			this.timeoutThi=null;
			this.theEndGirl=$("#life_game > .imgM > .duM > .duRoom > .personM > .theEnd");
			this.theOpenOne=null;
			this.theOpenTwo=null;
			this.theOpenThree=null;
			this.historyIndex=0;
			this.timeEndShow=$("#life_game > .imgM > .duM > .duRoom > .end");
			this.getHowMoney=$("#life_game > .imgM > .duM > .duRoom > .getM");
			this.reDo=$("#reDo");
			this.reDoH=$("#reDo > .content > h1");
			this.reDoS=$("#reDo > .content > span");
			// 结束时用于停止点击操作
			this.reDoIsFalse=true;
			// 余额数字部分
			this.reDoPSF=$("#reDo > .content > p > span:eq(0)");
			this.dragLi=$("#life_game > .imgM > .duM > .duRoom > .historyOpen > ul > li");
			this.$dragLiP=parseInt(this.dragLi.parent().height());
			// 弹窗闪烁定时器
			this.timerKu=null;
			// 用于改变赌场弹窗周围的幻光
			this.duRoomColor=$("#life_game > .imgM > .duM > .duRoom");
			// 音频pirate
			this.audioP=$("#audio");
			this.audioLP=$("#lifeProgress");
			// 临时储存音频url
			this.audioBGI="audio/child.mp3";
			// 判断此时赌场是不是在开的
			this.audioDu=false;
			this.lifeOverGet=$("#life_over > .OverGet");
			this.lifeOverLife=$("#life_over > .overLife");
			this.audio_button=$("#audio_button");
			this.audio_buttonI=true;
			this.uptoyou=$("#life_game > .uptoyou span");
			Yue_public.call(this);
			this.repaintL=$("#life_over > .uptoyou_l > .uptoyou_repaintL")
		},
		//绑定的赌场入口事件函数；
		go_duchang:function(){
			this.wordFir.on("click",$.proxy(this.go_duchang_enter,this));
			this.back.on("click",$.proxy(this.go_duchang_enter,this));
			this.duLi.on("click",$.proxy(this.go_duchang_enter,this));
			this.inputOK.on("click",$.proxy(this.inputOK_fun,this));
			this.inputMChoS.on("click",$.proxy(this.inputM_fun,this));
			this.winH3.on("click",$.proxy(this.windowS_fun,this));
			this.reDoH.on("click",$.proxy(this.reDo_fun,this));
			this.dragLi.on("mousedown",$.proxy(this.dragLi_fun,this));
			this.audio_button.on("click",$.proxy(this.audio_button_fun,this));
			this.repaintL.on("click",$.proxy(this.repaintL_fun,this))
		},
		//绑定的赌场入口事件函数子函数
		go_duchang_enter:function(){
			if(this.duM.css("display")=="none"){
				this.audioBGI=this.audioLP.attr("src");
				this.audioLP.attr("src","");
				this.audioP.attr("src","audio/jia.mp3");
				this.duM.css({"width":"0","display":"block","left":"50%"});
				this.duM.animate({"width":"100%","left":"0"},2000);
				this.audioDu=true;
			}else{
				this.audioP.attr("src","");
				this.audioLP.attr("src",this.audioBGI);
				this.duM.stop(true).hide(1000);
				this.audioDu=false;
			}
			this.input_firDu[0].focus();
		},

		//寿命倒计时函数；及game over的相关操作；
		lifeStart:function(){
			var me=this;
			var audioii=true;
			me.timer=setInterval(function(){
				var lifeI=parseInt(me.lifeTime.html()),
				moneyI=parseInt(me.money.html());
				moneyI=moneyI-parseInt(moneyI*(Math.random()*0.9))-2000;
				lifeI--;
				me.lifeTime.html(lifeI);
				me.money.html(moneyI);
				// 青少年
				if(lifeI<85&&lifeI>70){
						if(me.audioLP[0].volume!=0){me.audioLP[0].volume=0.15};
						audioii=!audioii;
						if(audioii==false){
							me.audioDu==false?me.audioLP.attr("src","audio/girl.mp3"):me.audioBGI="audio/girl.mp3";
						}else{
							me.audioDu==false?me.audioLP.attr("src","audio/boy.mp3"):me.audioBGI="audio/boy.mp3";
						};
				};
				// 中年后
				if(lifeI==70){
					if(me.audioLP[0].volume!=0){me.audioLP[0].volume=0.1};
					me.audioDu==false?me.audioLP.attr("src","audio/life.mp3"):me.audioBGI="audio/life.mp3";
				}
						
				if(lifeI==50){
					me.lifeTime.css("color","yellow");
				};
				if(lifeI==20){
					me.lifeTime.css("color","red");
				}
				if(moneyI<=0||lifeI<=0){
					clearInterval(me.uptoyou_timer);
					me.audioP.attr("src","");
					me.audioLP.attr("src","");
					me.lifeOver.children("span").css("opacity","1");
					me.uptoyou_l.css("display","none");
					me.uptoyou.parent().css("display","none");
					me.lifeOver.children(".start").css("display","none");
					me.lifeOver.children("p").html("历时:"+parseInt((new Date()-me.now)/1000)+"秒");
					me.lifeOverGet.children("span").html("钱包:&nbsp;"+me.money.html()*50+"&nbsp;元");
					me.lifeOverGet.css("display","block");
					me.lifeOverLife.css("display","block");
					me.lifeOver.css({"display":"block","opacity":"0"});
					me.lifeOver.animate({"opacity":"1"},8000);
					if(lifeI<=0){
						me.lifeOver.children("span").html("人生用钱做了这么多有意义的事，知足了");
					}else{
						me.lifeOver.children("span").html("没钱的人生，谈人生是多么的无力");
					}
					// 
					clearInterval(me.timer);
				};
			},100000);
		},
		//确定押注摁下那一刻发生的事情函数；
		inputOK_fun:function(e){
				
				this.yaZhuMoney=this.input_firDu.val();
				var firReg=this.yaZhuMoney.match(/^[1-9]\d*$/);
				this.mainMoney=parseInt(this.money.html());
		//各种情况判断一下；
				if(this.reDoIsFalse==false){
					return false;
				}
				if(this.endProgress==false){
					this.window_inHTML.html("亲！正在开奖中，已经不能更改了，请想好下一注");
					this.windowS.css("display","block");
					return false;
				};

				if(this.isCanClick==false){
					this.window_inHTML.html("亲！您必须选择要押注的类型，例如大、小、豹子");
					this.windowS.css("display","block")
					return false;
				};

				if(firReg==null){
					this.window_inHTML.html("亲！您输入的金额须全是阿拉伯数字，且大于0,无空,不0开头");
					this.windowS.css("display","block");
					return false;
				};


				if(this.mainMoney<this.yaZhuMoney){
					this.window_inHTML.html("亲! 您押注的钱多于您的钱包余额，多赚点钱，也多孝敬父母");
					this.windowS.css("display","block")
					return false;
				};


			
			this.inputOKIstrue=!this.inputOKIstrue;
			//确定押注时做的事情
			if(this.inputOKIstrue){
				this.inputOK.css("background","green");
				this.inputOK.attr("value","更改押注");
				var ok=this;
				ok.person.css("display","block");
				ok.personSibling.css("display","none");
				ok.openTTop.css("display","none");
				ok.openTBottom.css("display","none");
				ok.openTSpan.css("display","block");
				ok.input_firDu.css("display","none");

				//押注完后，提示押注的金额;
				ok.inputWarn.find("span").html(ok.yaZhuMoney);
				ok.inputWarn.css("display","block");
				this.correctYaZhuMoney=this.yaZhuMoney;
				if(ok.intervalTrue==false){
					return false;
				}

				ok.intervalTrue=false;
				ok.duTEnd.html("8");
				// 闪烁变
				ok.shadowI=0;
				ok.timerKu=setInterval(function(){
					ok.shadowI++;
					ok.shadowI=ok.shadowI%2;
					ok.shadowI==1?ok.shadowBig(ok.duRoomColor):ok.shadowSmall(ok.duRoomColor);
				},300);
				
				ok.timerOK=setInterval(function(){
					var timeI=parseInt(ok.duTEnd.html());
					timeI--;
					ok.duTEnd.html(timeI);
					if(timeI<=0){
						clearInterval(ok.timerOK);
						// 倒计时结束时
						clearInterval(ok.timerKu);
						ok.timeOS=setTimeout(function(){
							ok.duRoomColor.css({"box-shadow":"0px 0px 50px 1px green"});
						},310)
						
					   
						ok.duTEnd.html("...");
						ok.endProgress=false;
						// 开奖时对盅1进行开奖;
						ok.randomONE=ok.random();
						ok.openTBottom.children("span:eq(0)").html(ok.randomONE);
						ok.openTSpan.css("display","none");
						ok.openTBottom.children("span").css("display","none");
						ok.openTBottom.css("display","block");
						ok.openTTop.children("img").css("display","none");
						ok.openTTop.css("display","block");
						// 中间部分骰子图片展示
						ok.openTTop.children("img:eq(0)").attr("src","img/"+ok.randomONE+".png");
						ok.openTTop.children("img:eq(0)").slideDown(5000);
						ok.openTBottom.children("span:eq(0)").css({"opacity":"0","display":"block"})
						ok.openTBottom.children("span:eq(0)").animate({"opacity":"1"},5000);
						// 第一个定时器对盅2进行开奖
						ok.timeoutFir=setTimeout(function(){
						ok.timeOS=null;
						ok.randomTwo=ok.random();
						ok.openTBottom.children("span:eq(1)").html(ok.randomTwo);
						ok.openTBottom.children("span:eq(1)").css({"opacity":"0","display":"block"})
						ok.openTBottom.children("span:eq(1)").animate({"opacity":"1"},10000);
						ok.openTTop.children("img:eq(1)").attr("src","img/"+ok.randomTwo+".png");
						ok.openTTop.children("img:eq(1)").css({"width":"0","display":"block","left":"100%"});
						ok.openTTop.children("img:eq(1)").animate({"width":"25%","left":"38%"},10000);
						},5000);
						// 第二个定时器对盅3进行开奖
						ok.timeoutSec=setTimeout(function(){
						ok.randomThree=ok.random();
						ok.openTBottom.children("span:eq(2)").html(ok.randomThree);
						ok.openTBottom.children("span:eq(2)").css({"opacity":"0","display":"block"})
						ok.openTBottom.children("span:eq(2)").animate({"opacity":"1"},5000);
						ok.openTTop.children("img:eq(2)").attr("src","img/"+ok.randomThree+".png");
						ok.openTTop.children("img:eq(2)").css({"width":"0","display":"block","left":"1%"});
						ok.openTTop.children("img:eq(2)").animate({"width":"25%","left":"70%"},5000);
						// 所有盅开完后执行的第三个延时器
						ok.timeoutThi=setTimeout(function(){
						ok.theOpen=ok.randomONE+ok.randomTwo+ok.randomThree;
						ok.person.css("display","none");
						ok.theEndGirl.css("display","block");
						if(ok.randomONE==ok.randomTwo&&ok.randomTwo==ok.randomThree){
							ok.theOpenOne="豹子";
							ok.theOpenMain="豹子";
							ok.theEndGirl.children("span").html(ok.theOpenOne);
							var moneyNow=parseInt(ok.money.html());

							// 豹子中奖区域
							if(ok.theOpenOne==ok.isHowPush){
								ok.money.html(moneyNow+parseInt(ok.correctYaZhuMoney)*23);
								ok.timeEndShow.html("恭喜您中奖啦！");
								ok.timeEndShow.css("display","block");
								ok.getHowMoney.find("span:eq(0)").html(parseInt(ok.correctYaZhuMoney)*23);
								ok.getHowMoney.css("display","block");
								ok.reDoS.children("span:eq(0)").html("恭喜您赢了");
								ok.reDoS.children("span:eq(0)").css("color","yellow");
								ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney)*23);

							}else{
								ok.money.html(moneyNow-parseInt(ok.correctYaZhuMoney));
								ok.timeEndShow.html("很遗憾没中奖！");
								ok.timeEndShow.css("display","block");
								ok.reDoS.children("span:eq(0)").html("很遗憾输了");
								ok.reDoS.children("span:eq(0)").css("color","red");
								ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney));
							}
							
							// 大小中奖区域
						}else{
							if(ok.theOpen<11){
								ok.theOpenTwo="小";
								ok.theOpenMain="小";
								ok.theEndGirl.children("span").html(ok.theOpenTwo);
								var moneyNow=parseInt(ok.money.html());
								if(ok.theOpenTwo==ok.isHowPush){
									ok.money.html(moneyNow+parseInt(ok.correctYaZhuMoney));
									ok.timeEndShow.html("恭喜您中奖啦！");
									ok.timeEndShow.css("display","block");
									ok.getHowMoney.find("span:eq(0)").html(ok.correctYaZhuMoney);
									ok.getHowMoney.css("display","block");
									ok.reDoS.children("span:eq(0)").html("恭喜您赢了");
									ok.reDoS.children("span:eq(0)").css("color","yellow");
									ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney));

								}else{
									ok.money.html(moneyNow-parseInt(ok.correctYaZhuMoney));
									ok.timeEndShow.html("很遗憾没中奖！");
									ok.timeEndShow.css("display","block");
									ok.reDoS.children("span:eq(0)").html("很遗憾输了");
									ok.reDoS.children("span:eq(0)").css("color","red");
									ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney));
								}

							}else{
								ok.theOpenThree="大";
								ok.theOpenMain="大";
								ok.theEndGirl.children("span").html(ok.theOpenThree);
								var moneyNow=parseInt(ok.money.html());
								if(ok.theOpenThree==ok.isHowPush){
									ok.money.html(moneyNow+parseInt(ok.correctYaZhuMoney));
									ok.timeEndShow.html("恭喜您中奖啦！");
									ok.timeEndShow.css("display","block");
									ok.getHowMoney.find("span:eq(0)").html(ok.correctYaZhuMoney);
									ok.getHowMoney.css("display","block");
									ok.reDoS.children("span:eq(0)").html("恭喜您赢了");
									ok.reDoS.children("span:eq(0)").css("color","yellow");
									ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney));
								}else{
									ok.money.html(moneyNow-parseInt(ok.correctYaZhuMoney));
									ok.timeEndShow.html("很遗憾没中奖！");
									ok.timeEndShow.css("display","block");
									ok.reDoS.children("span:eq(0)").html("很遗憾输了");
									ok.reDoS.children("span:eq(0)").css("color","red");
									ok.reDoS.children("span:eq(1)").html(parseInt(ok.correctYaZhuMoney));
								}
							};

						};
						//开奖历史次数
						ok.historyIndex++;
						var $span=$("<span>");
						if(ok.theOpenMain=="豹子"){
							$span.css({"color":"yellow","opacity":"0"});
						}else{
							$span.css({"color":"red","opacity":"0"});
						};
						$span.html("第"+ok.historyIndex+"期:"+ok.theOpenMain+"<br>");
						$span.animate({"opacity":"1"},1500);
						ok.dragLi[0].appendChild($span[0]);
						ok.liH=parseInt(ok.dragLi.height())-ok.$dragLiP-197;
						console.log(ok.liH)
						if(ok.liH>0){
							ok.dragLi.animate({"top":-ok.liH+"px"},500);
						};
						ok.reDoIsFalse=false;
						ok.reDo.stop().show(5000);
						ok.duTEnd.html("?");
						ok.intervalTrue=true;
						
						ok.reDoPSF.html(ok.money.html());
						},5100)
						

						


						},10000);

						
					}
				},1000);
				//更改押注时做的事情；
			}else{
				this.inputOK.css("background","red");
				this.inputOK.attr("value","确定押注");
				this.openTTop.css("display","block");
				this.openTBottom.css("display","block");
				this.openTSpan.css("display","none");
				this.input_firDu.css("display","block");
				this.inputWarn.css("display","none");
				this.input_firDu[0].focus();

			};
			


		},
		// 点击大小或者豹子时触发的事件
		inputM_fun:function(e){
			// 开奖时阻止选择押注类型
			if(this.endProgress==false){
				this.window_inHTML.html("亲！正在开奖中，已经不能更改了，请耐心等待！");
				this.windowS.css("display","block");

				return false;
			}
			this.inputMChoS.each(function(x,y){
				$(y).removeClass("addClassInputM")
			});
			$(e.target).addClass("addClassInputM");
			this.input_firDu[0].focus();
			this.isCanClick=true;
			this.isHowPush=$(e.target).html();
		},

		// 押注时弹窗提示函数
		windowS_fun:function(){
			this.windowS.css("display")=="block"?this.windowS.css("display","none"):this.windowS.css("display","block");
		},

		random:function(){
			this.duRandomArray.sort(function(){
				return Math.random()-0.5;
			});

			return this.duRandomArray[Math.floor(Math.random()*6)]

		},
		// 结束弹窗
		reDo_fun:function(e){
			// 开奖过程中阻断流变量
			this.endProgress=true;
			// 赌场中间部分的最上面开奖结果附带美女黑色背景
			this.theEndGirl.css("display","none");
			// 赌场底部提示押注了多少金额部分
			this.inputWarn.css("display","none");


			this.timeoutFir=null;
			this.timeoutSec=null;
			this.timeoutThi=null;


			// 出现的部分
			this.personSibling.css("display","block");
			// 确定押注按钮那一面将变量做些更改
			if(this.inputOK.css("background")=="green"){
				this.inputOKIstrue=false;
			}
			this.inputOK.css("background","red");
			this.inputOK.attr("value","确定押注");
			// 输入金额的input框
			this.input_firDu.css("display","block");
			this.input_firDu[0].focus();

			// 告诉输赢不可见
			this.timeEndShow.css("display","none");
			// 赌场左侧提示赢输多少钱模块改为不可见
			this.getHowMoney.css("display","none");
			var index=$(e.target).index();
			
			// 消除大小\豹子光亮效果
			this.inputMChoS.each(function(x,y){
				$(y).removeClass("addClassInputM")
			});
			// 阻止过押注类型的判断
			this.isCanClick=false;
			this.reDoIsFalse=true;
			this.inputOKIstrue=false;
			// 判断点击了redo弹窗哪个按钮
			if(index==4){
				this.audioDu=false;
				this.reDo.css("display","none");
				this.duM.hide(1000);
				this.audioP.attr("src","");
				// 判断赌场界面消失而提示是否再战的界面还存在时怎么对全局音乐进行赋值
				var audioBGIj=Boolean(this.audioLP.attr("src"))==false?this.audioBGI:this.audioLP.attr("src");
				this.audioLP.attr("src",audioBGIj);
			}else{
				this.audioDu=true;
				this.reDo.css("display","none");
				this.duM.css({"display":"block"});
				// 防止储存的临时url制空
				if(this.audioLP.attr("src")!=""){
					this.audioBGI=this.audioLP.attr("src");
				}
				this.audioLP.attr("src","");
				this.audioP.attr("src","audio/jia.mp3");
			}
		},
		dragLi_fun:function(e){
			var liOffset=this.dragLi.offset().top;
			this.startTop=parseInt(this.dragLi.css("top"))||0;
			this.scrolLY=e.clientY;
			
			this.liH=parseInt(this.dragLi.height())-this.$dragLiP-197;
			$(document).bind("mousemove",$.proxy(this.dragDom_fun,this));
			$(document).bind("mouseup",$.proxy(this.dragDomU_fun,this));
			return false;
		},
		// 文档检测鼠标移动
		dragDom_fun:function(e){

			var ms=e.clientY-this.scrolLY;
			this.dragLi.css("top",this.startTop+ms+"px");

			return false;

		},
		// 解绑
		dragDomU_fun:function(){
			$(document).unbind();
			if(parseInt(this.dragLi.css("top"))<-this.liH){
				if(-this.liH>0){
					this.dragLi.stop(true).animate({"top":"0px"},1000);
				}else{
					this.dragLi.stop(true).animate({"top":-this.liH+"px"},1000);
				}
				
			};
			if(parseInt(this.dragLi.css("top"))>0){
				this.dragLi.stop(true).animate({"top":"0"},1000);
			}
			return false;
		},

		//shadow渐变厚封装函数；
		shadowBig:function(obj){
			var nowTime=new Date();
			var yes=this;
			yes.timerKuF=setInterval(function(){
				n=(new Date()-nowTime)/300;
					if(n>=1){
						n=1;
						clearInterval(yes.timerKuF);
						
					};
					n=30*n+"px";
					obj.css({"box-shadow":"0px 0px 50px "+n+" red"});
					// ok.duRoomColor.css({"box-shadow":"0px 0px "+n*0.1+" 5px purple"});
			},1000/60)
			
		},
		//shadow渐变薄封装函数；
		shadowSmall:function(obj){
			var nowTime=new Date();
			var no=this;
			no.timerKuS=setInterval(function(){
				n=1-(new Date()-nowTime)/300;
					if(n<=0){
						n=0;
						clearInterval(no.timerKuS);
					};
					n=30*n+"px";
					// ok.duRoomColor.css({"box-shadow":"0px 0px "+n*0.1+" 5px purple"});
					obj.css({"box-shadow":"0px 0px 50px "+n+" red"});
			},1000/60)
			
		},
		// 游戏开始时的界面
		
		gameStart:function(){
			this.audioLP[0].volume=0.05;
			this.audioP[0].volume=0.1;
			var index=0;
			var the=this;
			the.startTimer=setInterval(function(){
				index++;
				switch(index){
					case 1:
					the.lifeOver.children("span").html("人生");
					the.lifeOver.children("span").css("opacity","0");
					the.lifeOver.children("span").animate({"opacity":"1"},2000,function(){
					the.lifeOver.children("span").animate({"opacity":"0"},2000)});
					break;

					case 2:
					the.lifeOver.children("span").html("是一场与感觉的较量");
					the.lifeOver.children("span").animate({"opacity":"1"},2000,function(){
					the.lifeOver.children("span").animate({"opacity":"0"},2000)});
					break;

					case 3:
					the.lifeOver.children("span").html("人生游戏一旦开始无法暂停");
					the.lifeOver.children("span").animate({"opacity":"1"},2000,function(){
					the.lifeOver.children("span").animate({"opacity":"0"},2000)});
					break;
					default:
					the.lifeOver.children(".start").css({"opacity":"0","display":"block"});
					the.lifeOver.children(".start").animate({"opacity":"1"},2000,function(){
					the.lifeOver.animate({"opacity":"0"},2000,function(){
					the.lifeOver.css({"display":"none"})
					});
					clearInterval(the.startTimer);
					the.uptoyou.parent().css("display","block");
					the.lifeOver.children(".start").css("display","none");
					})

				}
				
			},4000);

		},
		//声音控制
		audio_button_fun:function(){
			this.audio_buttonI=!this.audio_buttonI;
			if(this.audio_buttonI==false){

				this.audioLP[0].volume=0;
				this.audioP[0].volume=0;
				this.audio_button.html("音开");
			}else{
				var lh=this.lifeTime.html();
				if(lh<85&&lh>70){
					this.audioLP[0].volume=0.15;
				}else if(lh<=70){
					this.audioLP[0].volume=0.1;
				}else{
					this.audioLP[0].volume=0.05;
				}
				
				this.audioP[0].volume=0.1;
				this.audio_button.html("音关");
			}
		},
		uptoyou_fun:function(){
			var index=100;
			var she=this;
			she.uptoyou_timer=setInterval(function(){
				index--;
				she.uptoyou.html(index);
				if(index==0){
					index=101;
					she.repaintj.data("bool",1);
					she.repaintj.css({"background":"red","color":"#fff"});
					she.repaintj.html("领取奖卡")
					she.lifeOver.css({"opacity":"1"});
					she.lifeOver.css({"width":"0","height":"0","display":"block"});
					she.uptoyou_l.css({"display":"block"});
					she.lifeOver.animate({"width":"100%","height":"100%"},2000,
						function(){
							$(she.can).css({"opacity":"0","display":"block","box-shadow":"0px 0px 50px 10px yellow"})
							var w=parseInt($(she.can).width())+50;
							var h=parseInt($(she.can).height())+50;
							$(she.can).animate({"opacity":"1"},3000)
							she.canvasAma.fillRect(0,0,w,h);
							she.imgPort();
						});

				}
			},1000)
		},
		// 退出刮奖时封装函数
		repaintL_fun:function(){
			var i=this;
			$(i.can).css({"display":"none","box-shadow":"none"});
			i.lifeOver.animate({"opacity":"0"},3000,function(){
				i.lifeOver.css({"display":"none","opacity":"1"})
			})
		}









	};
	yue_lifeGame.global_fun();
}(jQuery);
// 抽奖卡随机事件

-function($){
	function Yue_canvas(){
		this.repaint=document.getElementsByClassName('uptoyou_repaint')[0];
		Yue_public.call(this);

	}
	Yue_canvas.prototype={
		clearR:function(e){
			
			var offsetLC=this.offsetLeft;
			var offsetTC=this.offsetTop;
			var offsetSL=e.clientX-offsetLC-YueOC.uptoyou_l[0].offsetLeft;
			var offsetST=e.clientY-offsetTC-YueOC.uptoyou_l[0].offsetTop;
			//点击去除图层
			YueOC.canvasAma.clearRect(offsetSL,offsetST,20,20);

			document.onmousemove=function(e){

				var offsetML=e.clientX-offsetLC-YueOC.uptoyou_l[0].offsetLeft;
				var offsetMT=e.clientY-offsetTC-YueOC.uptoyou_l[0].offsetTop;
				YueOC.canvasAma.clearRect(offsetML,offsetMT,20,20);
				return false;
			}
			
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				return false
			}
			return false;
		},

		again:function(e){
			e.stopPropagation();
			if($(this).data("bool")==2){
				return false;
			};
			$(this).css({"background":"#ccc","color":"yellow"});
			$(this).html("已领金卡")
			var indexU=parseInt(YueOC.can.style.background.match(/(?<=w)\d/g)[0]);
			if(indexU==5){
				YueOC.money.html(YueOC.money.html()*10);
			}else{
				YueOC.money.html(YueOC.money.html()*(indexU+1));
			};
			$(this).data("bool",2);
		},

	};
	var YueOC=new Yue_canvas();
	YueOC.canvasAma.fillStyle="pink";
	// YueOC.canvasAma.fillRect(0,0,300,100);
	YueOC.can.addEventListener("mousedown",YueOC.clearR);
	YueOC.repaint.addEventListener("click",YueOC.again);
}(jQuery);
	

