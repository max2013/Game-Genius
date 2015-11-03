/* Resources CreateJS por Sergio Marreiro */

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


//============================================================
// IMAGENS, MOVIECLIPS E CONATAINERS
//============================================================

var lib = {
	Infos : function () {
		//var inf = [1,2,3,4,5,6,7,8,9,10,0];
		var inf = [1,2,3,4];
		var l = inf.length;
		var info = [];
		for (var i=0; i<l; i++) {
			var rand = Math.floor(Math.random()*(inf.length));
			info.push(inf[rand]);
			inf.splice(rand,1);
		}
		return info;
	},
	Chances : function () {
		var chances = 3;
		return chances;
	},
	TelaApresentacao : function () {
		var c = new cjs.Container();
		c.img = new cjs.Bitmap(images.apresentacao);
		c.addChild(c.img);
		return c;
	},
		TelaCadastro : function () {
		var c = new cjs.Container();
		c.img = new cjs.Bitmap(images.cadastro);
		c.addChild(c.img);
		return c;
	},
	TelaIntroducao : function () {
		var c = new cjs.Container();
		c.img = new cjs.Bitmap(images.introducao);
		c.addChild(c.img);
		return c;
	},
	Modal : function (str) {
		console.log("mostra modal", str);
		var c = new cjs.Container();
		c.img = images[str];
		c.modal = new cjs.Bitmap(c.img);


		c.addChild(c.modal);
		return c;
	},
	TelaErro : function (num) {
		var c = new cjs.Container();
		c.img = new cjs.Bitmap(images.tela_erro);
		c.texto = new cjs.Text("Ainda restam "+num+" chance"+(num>1 ? "s":""), "60px Impact", "#fff");
		c.texto.textAlign = "center";
		c.texto.setTransform(684, 414);
		c.addChild(c.img, c.texto);
		cjs.Sound.play("whoo");
		return c;
	},
	TelaFinal : function (pontos, tempo) {
		var c = new cjs.Container();
		c.img = new cjs.Bitmap(images.tela_final);
 
		c.pontos = new cjs.Text(pontos, "60px Impact", "#fff");
		c.pontos.textAlign = "center";
		c.pontos.setTransform(684, 488);

		c.tempo = new cjs.Text(tempo, "60px Impact", "#fff");
		c.tempo.textAlign = "center";
		c.tempo.setTransform(684, 650);


		c.addChild(c.img, c.pontos, c.tempo);
		return c;
	},





	//============================================================================================
	//
	//		Tela Jogo
	//	 	Objeto: Turbo -> Genius
	//		por sergiocmarreiro@gmail.com
	//		v 0.1
	//============================================================================================

	TelaJogo : function () {
		var c = new cjs.Container();
		c.fundo = new cjs.Bitmap(images.play_bg);
		c.logo = new lib.LogoTurbo();


		//variaveis de jogo
		c.MAX = 10; //numero maximo da seuqencia
		c.current = 0; //tocando item da sequencia atual
		c.turno = 0;//turno, current<=turno, 
		c.player = false;//verificador de "vez do jogador"
		c.sequence = new lib.Sequece(c.MAX);//gerador da sequencia
		c.speed = 500;//velocidade do toque da sequencia
		c.interval = 2; //intervalo em que mostra infos
		c.pontos = 0;
		c.pontosAcerto = 15;
		c.pontosErro = -7;



		c.placar = new lib.Placar();
		c.tempo = new lib.Tempo();

		c.roda_botoes = new lib.RodaBotoes();
		c.tela_erro_alpha = new cjs.Bitmap(images.tela_erro_alpha);
		c.tela_erro_alpha.alpha = 0;
		c.tela_erro_alpha.mouseEnabled = false;


		c.feedbackErro = function () {
			this.tela_erro_alpha.alpha = 1;
			Tween.get(this.tela_erro_alpha).wait(1000).to({alpha:0}, 1000);
		}

		//======================================
		//	Logica do Jogo
		//======================================
		c.sequencia = function () {
			//mostra sequencia
			var nm = "botao"+this.sequence[this.current];
			console.log(nm);
			this.roda_botoes[nm].lighUp(this.speed*1);
			if (this.current<this.turno) {
				Tween.get(this).wait(this.speed*1.1).call(this.sequencia);
				this.current++;
			} else {
				this.vezJogador();
				this.current=0;
			}
		}
		c.vezJogador = function () {
			//console.log("vezJogador");
			this.player = true;//verificador para liberar acesso aos botoes
		}
		c.verificaSequencia = function (bt) {
			var num = bt.num;
			if (num == this.sequence[this.current]) {
				bt.lighUp(500);
				console.log("correto");
				this.pontos += this.pontosAcerto;
				this.current++;
				if (this.current>this.turno) {
					this.current = 0;
					this.player = false;
					if (this.turno+1<this.MAX) {
						this.turno++;
						if (this.turno%this.interval==0) {
							var evt = new cjs.Event("mostraInfo", true);
							this.dispatchEvent(evt);
						} else {
							Tween.get(this).wait(1000).call(this.sequencia);
						}
					} else {
						var evt = new cjs.Event("fimSequencia", true);
						this.dispatchEvent(evt);
					}
				}
			} else {
				//console.log("errado");
				this.pontos += this.pontosErro;
				if (this.pontos<0) this.pontos = 0;
				this.current = 0;
				cjs.Sound.play("whoo");

				this.player = false;
				var evt = new cjs.Event("errou", true);
				evt.bt = bt;
				this.dispatchEvent(evt);
			}

			this.placar.atualiza(this.pontos);
		}


		c.addChild(c.fundo, c.logo, c.placar, c.tempo, c.roda_botoes, c.tela_erro_alpha);
		return c;
	},
	//============================================================================================






	RodaBotoes : function () {
		var c = new cjs.Container();
		c.img = images.play_botoes;
		c.roda = new cjs.Bitmap(c.img);
		c.roda.setTransform(0,0,1,1,0,0,0,c.img.width/2,c.img.height/2);


		c.setTransform(682,511);
		c.addChild(c.roda);


		for (var n=0; n<4; n++) {
			var nm = "botao"+n;
			var bt = c[nm] = new lib.BotaoHit(n);
			bt.name = nm;
			bt.rotation =-90*n;
			//bt.y = 0;
			c.addChild(bt);
		}
	//	c.nomes = new cjs.Bitmap(images.play_botoes_nomes);
	//	c.nomes.setTransform(0,0,1,1,0,0,0,321,270);
		//c.nomes.mouseEnabled = false;

		//c.calota = new cjs.Bitmap(images.play_botoes_calota);
		//c.calota.setTransform(0,0,1,1,0,0,0,166,166);
		//c.addChild(c.calota, c.nomes);
		return c;
	},
	LogoTurbo : function () {
		var c = new cjs.Container();
		c.logo = new cjs.Bitmap(images.logo_turbo);		
		c.setTransform(0,902);

		c.addChild(c.logo);
		return c;
	},
	Placar : function () {
		var c = new cjs.Container();
		c.pontos = new cjs.Bitmap(images.pontos);

		c.texto = new cjs.Text("0", "Bold 50px "+FONTE_PLACAR, "#cedeec")
		c.texto.textAlign = "right";
		c.texto.setTransform(150,30);

		c.atualiza = function (num) {
			if (num<0) num = 0;
			c.texto.text = num;
		}

		c.setTransform(0,0);
		c.addChild(c.pontos, c.texto);
		return c;
	},
	Tempo : function () {
		var c = new cjs.Container();
		c.tempo = new cjs.Bitmap(images.tempo);
		c.getTempo = function () {
			return this.texto.text;
		}

		c.tempoAtual = -1;//3 * 60;
		c.countdown = false;

		c.atualiza = function () {
			var min = Math.floor(this.tempoAtual/60);
			var sec = this.tempoAtual%60;
			if (sec<10) sec = "0"+sec;
			this.texto.text = min+":"+sec;
		}
		c.tickingOn = true;

		c.ticking = function () {
			if (this.tickingOn) {
				Tween.get(this).wait(1000).call(this.ticking);
				if (this.countdown) {
					this.tempoAtual--;
					if (this.tempoAtual<=0) {
						this.tickingOn = false;
						var evt = new cjs.Event("timeUp", true);
						this.dispatchEvent(evt);
					}
				} else {
					this.tempoAtual++;
				}
			}
			this.atualiza();
			//console.log("ticking", this.tempoAtual);
		}
		c.pause = function(bool) {
			this.tickingOn = !bool;
			if (this.tickingOn) {
				this.ticking();
			}
		}

		c.texto = new cjs.Text("00:00", "Bold 50px "+FONTE_PLACAR, "#cedeec")
		c.texto.textAlign = "left";
		c.texto.setTransform(90,30);

		c.setTransform(1095,0);
		c.addChild(c.tempo, c.texto);
		c.ticking();	
		return c;
	},
	BotaoHit : function (n) {
		var c = new cjs.Container();
		c.num = n;
		c.gph = new cjs.Graphics();
		c.shp = new cjs.Shape(c.gph);
		c.gph.f("009900").arc(0, 0, 429, 0, Math.PI*.20).lt(0,0);
		//c.luz = new cjs.Bitmap(images.luz);
		c.luz = new cjs.Bitmap(images["luz_"+n]);
		c.addChild(c.luz);
		c.luz.alpha = 0;
		c.luz.setTransform(-70,-20);
		//c.addChild(c.shp);
        c.shp.rotation=30;
		
		c.lighUp = function (speed) {
			var luz = this.luz;
			luz.alpha = 1;
			Tween.get(luz).to({alpha:0}, speed);
			var sound = "fx_"+this.num;
			cjs.Sound.play(sound);
		}

		c.hitArea = c.shp;
		c.addEventListener("click", function (e) {
			var bt = e.currentTarget;
			var instance = bt.parent.parent;
			//Tween.removeAllTweens(bt.luz);
			//console.log("BotaoHit - click", bt.name);
			//bt.lighUp(500);
			if (instance.player){
				instance.verificaSequencia(bt);
			}
		})
		return c;
	},
	Sequece : function (max) {
		var seq = [];
		for (n=0; n<max; n++) {
			var rand = Math.random()*4;
			rand = Math.floor(rand);
			seq.push(rand);
		}
		return seq;
	},
}

