/* Init CreateJS por Sergio Marreiro */

//============================================================
//
//	WebSolucoes 
// 	Objeto AVM "Turbo"
//	
//	Desenvolvimento: sergiocmarreiro@gmail.com
//	
//	v0.1
//
//============================================================

var canvas, context, stage, images, sounds, videos, loader;
var Tween = createjs.Tween;
var cjs = createjs;
var FRAME_RATE = 30;

var FONTE_PLACAR = "Dodger Condensed";



function init () {
     if (!createjs.Sound.initializeDefaultPlugins()) {
            document.getElementById("error").style.display = "block";
            document.getElementById("content").style.display = "none";
            return;
        } 

      /*  var assetsPath = "../_assets/audio/";
		var sounds = [
			 
	        {src: "Game-Break.ogg", id: "fx_0"},
			{src: "Game-Spawn.ogg", id: "fx_1"},
			{src: "Game-Shot.ogg", id: "fx_2"},

			{src: "GU-StealDaisy.ogg", id: "fx_3"},
			{src: "Humm.ogg", id: "fx_4"},
			{src: "R-Damage.ogg", id: "fx_5"},

			{src: "Thunder1.ogg", id: "fx_6"},
			{src: "S-Damage.ogg", id: "fx_7"},
			{src: "U-CabinBoy3.ogg", id: "fx_8"},

			{src: "ToneWobble.ogg", id: "fx_9"},
			{src: "Game-Death.ogg", id: "whoo"}
 
		];*/

		 var assetsPath = "../_assets/audio/";
		var sounds = [
		{ src:"fx_0_01.ogg", id:"fx_0" },
		{ src:"fx_8_01.ogg", id:"fx_1" },
		{ src:"fx_2_01.ogg", id:"fx_2" },
		{ src:"fx_3_01.ogg", id:"fx_3" },
		{ src:"fx_4_01.ogg", id:"fx_4" },
		{ src:"fx_5_01.ogg", id:"fx_5" },
		{ src:"fx_6_01.ogg", id:"fx_6" },
		{ src:"fx_7_01.ogg", id:"fx_7" },
		{ src:"fx_8_01.ogg", id:"fx_8" },
		{ src:"fx_9_01.ogg", id:"fx_9" },
		{ src:"whoo_01.ogg", id:"whoo" }  //OJR would prefer a new sound rather than a copy
		];

		

		var assetsPath = "_assets/audio/";
	    createjs.Sound.alternateExtensions = ["mp3"];   // add other extensions to try loading if the src file extension is not supported
        createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
        createjs.Sound.registerSounds(sounds, assetsPath);


	//manifest -- preload
	images = images||{};
	//sounds = sounds||{};
	var manifest = [

		{ src:"images/apresentacao.jpg", id:"apresentacao" },
		{ src:"images/tela_cadastro.jpg", id:"cadastro" },
		//{ src:"images/info_0.png", id:"info_0" },
	//	{ src:"images/info_1.png", id:"info_1" },
	//	{ src:"images/info_2.png", id:"info_2" },
	//	{ src:"images/info_3.png", id:"info_3" },
	//	{ src:"images/info_4.png", id:"info_4" },
	//	{ src:"images/info_5.png", id:"info_5" },
	//	{ src:"images/info_6.png", id:"info_6" },
	//	{ src:"images/info_7.png", id:"info_7" },
	//	{ src:"images/info_8.png", id:"info_8" },
	//	{ src:"images/info_9.png", id:"info_9" },
	//	{ src:"images/info_10.png", id:"info_10" },
		{ src:"images/introducao.jpg", id:"introducao" },
		{ src:"images/logo_turbo.png", id:"logo_turbo" },
		{ src:"images/luz_pe.png", id:"luz_0" },
		{ src:"images/luz_pe.png", id:"luz_1" },
		{ src:"images/luz_pe.png", id:"luz_2" },
		{ src:"images/luz_pe.png", id:"luz_3" },
	//	{ src:"images/luz_4.png", id:"luz_4" },
	//	{ src:"images/luz_5.png", id:"luz_5" },
	//	{ src:"images/luz_6.png", id:"luz_6" },
	//	{ src:"images/luz_7.png", id:"luz_7" },
	//	{ src:"images/luz_8.png", id:"luz_8" },
		//{ src:"images/luz_9.png", id:"luz_9" },
	//	{ src:"images/luz.png", id:"luz" },
		{ src:"images/play_bg.jpg", id:"play_bg" },
	//	{ src:"images/play_botoes_calota.png", id:"play_botoes_calota" },
	//	{ src:"images/play_botoes_nomes.png", id:"play_botoes_nomes" },
		{ src:"images/play_botoes.png", id:"play_botoes" },
		{ src:"images/pontos.png", id:"pontos" },
		{ src:"images/tela_erro_alpha.png", id:"tela_erro_alpha" },
		{ src:"images/tela_erro.jpg", id:"tela_erro" },
		{ src:"images/tela_final.jpg", id:"tela_final" },
		{ src:"images/tempo.png", id:"tempo" }
 
	];
         

	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);


	
}

function soundLoaded(event) {
        //examples.hideDistractor();
        console.log("sound " + event.id);
        //var div = document.getElementById(event.id);
        //div.style.backgroundImage = "url('_assets/art/audioButtonSheet.png')";
      //  var instance = createjs.Sound.play(event.id);
    }

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	if (evt.item.type == "sound") { sounds[evt.item.id] = evt.result; 
     
        //console.log(evt.item.id)
	}

	//console.log(evt.item.type);
}

function handleComplete() {
	// Inicio padrao
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
	stage = new createjs.Stage(canvas);
	stage.update();
	createjs.Ticker.setFPS(FRAME_RATE);
	createjs.Ticker.addEventListener("tick", stage);
	
	jogo = new Main();
	jogo.init();
	

	createjs.Touch.enable(stage);
	stage.addChild(jogo);
}



var Main = function () {
	var c = new cjs.Container();
	c.name = "Main Application "+Math.random();


	//variaveis do sistema
	c.infos = new lib.Infos();
	c.chances = lib.Chances();

	c.init = function () {
		this.montaTela("apresentacao");
	//	this.montaTela("jogo");
	c.resize();
	}
	c.montaTela  =  function (tela, dados) {
		var innertext = document.getElementById("texto");
		this.texto = new createjs.DOMElement(innertext);
		this.texto.htmlElement.style.display = "none";
		this.texto.htmlElement.value = "";

		if(this.area!=null) {
			this.removeChild(this.area);
			this.area = null;
		}
		if (this.ajuda!=null) {
			this.removeChild(this.ajuda);
		}

		switch (tela) {
			case "apresentacao":
				this.area = this.TelaApresentacao();
			break;
			case "introducao":
				this.area = this.TelaIntroducao();
			break;
			case "jogo":
				this.area = this.TelaJogo();
			break;
			case "cadastro":
				this.area = this.TelaCadastro();
				break;
			case "final":
				this.area = this.TelaFinal(dados);
			break;
		}
		this.area.alpha = 0;
		Tween.get(this.area).wait(100).to({alpha:1}, 300);
		this.addChild(this.area);
	}
	c.TelaIntroducao = function () {
		var c = new lib.TelaIntroducao();
		c.addEventListener("click", function (e) {
			var instance = e.currentTarget.parent;
			instance.montaTela("jogo");
		})
		return c;
	}
	c.TelaApresentacao = function () {
		var c = new lib.TelaApresentacao();
		c.addEventListener("click", function (e) {
			var instance = e.currentTarget.parent;
			instance.montaTela("cadastro");
		});
		return c;
	}

c.TelaCadastro = function () {
		var c = new lib.TelaCadastro();
		c.addEventListener("click", function (e) {
			var instance = e.currentTarget.parent;
			instance.montaTela("introducao");
		});
		return c;
	}

	c.TelaJogo = function () {
		var c = new lib.TelaJogo();
		Tween.get(c).wait(1000).call(c.sequencia);


		c.addEventListener("errou", function (e){
			var instance = e.currentTarget.parent;
			instance.area.tempo.pause(true);
			instance.area.feedbackErro();
			instance.chances--;


			if (instance.chances>0) {
				var modal = new lib.TelaErro(instance.chances);
				modal.addEventListener("click",function (e) {
					instance.retomaJogada();
				});
				Tween.get(instance).wait(2000).call(instance.mostraModal,[modal]);
				e.bt.lighUp(500);
				//instance.mostraModal(modal);
			} else {
				Tween.get(instance).wait(2000).call(instance.montaTela,["final", {pontos:e.currentTarget.pontos, tempo:e.currentTarget.tempo.getTempo()}]);
				e.bt.lighUp(500);
			}
		});

		c.addEventListener("mostraInfo", function (e) {
		/*	console.log("mostraInfo");
			e.currentTarget.tempo.pause(true);
			var instance = e.currentTarget.parent;
			var modal = new lib.Modal("info_"+instance.infos.shift());
			var modal2 = new lib.Modal("info_"+instance.infos.shift());

			modal.addEventListener("click",function (e) {
				instance.mostraModal(modal2);
				modal2.addEventListener("click",function (e) {
					var instance = e.currentTarget.parent;
					instance.retomaJogada();
				});
			});

			instance.mostraModal(modal);*/
			        var instance = e.currentTarget.parent;
					Tween.get(instance).wait(2000).call(instance.retomaJogada());


	

		});

		c.addEventListener("fimSequencia", function (e) {
			var instance = e.currentTarget.parent;
			instance.montaTela("final", {pontos:e.currentTarget.pontos, tempo:e.currentTarget.tempo.getTempo()});
		})


		// c.tempo.addEventListener("timeUp", function(e) {
		// 	console.log("timeUp");
		// });
		return c;
	}
	c.retomaJogada = function () {
		this.removeModal();
		//this.infoAtual++;
		Tween.get(this.area).wait(1000).call(this.area.sequencia);
		this.area.tempo.pause(false);
	}
	c.mostraModal = function (modal) {
		if (this.modal!=null) {
			this.removeChild(this.modal);
			this.modal=null;
		}
		this.modal = modal;
		modal.setTransform(384,682,.9,.9,0,0,0,384,682);
		modal.alpha = 0;
		Tween.get(modal).to({alpha:1, scaleX:1, scaleY:1}, 500, cjs.Ease.backOut);
		this.addChild(modal);
	}
	c.removeModal = function () {
		if (this.modal!=null) {
			this.removeChild(this.modal);
			this.modal=null;
		}
	}
	c.TelaFinal = function (dados) {
		var c = new lib.TelaFinal(dados.pontos, dados.tempo);
		c.addEventListener("click", function (e){
			console.log("reiniciar");
			e.currentTarget.parent.reiniciar();
		})
		return c;
	},
 
	c.reiniciar = function () {
		this.infos = new lib.Infos();
		this.chances = lib.Chances();
		this.montaTela("apresentacao");
	}
	c.resize = function(){
		var _d = document.getElementsByTagName('html')[0],
		_h = window.innerHeight,
		_w = window.innerWidth,
		_z = Math.min(1,_h/966,_w/924);
		_d.style['-webkit-transform'] = 'scale('+_z+')';
		_d.style['transform'] = 'scale('+_z+')';
		window._zoomScale = _z;
	}
	return c;
}





