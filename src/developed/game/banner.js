////////////////////////////////////////////////////////////////////////////////////   VIEW BACKGROUND BANNER

var Banner = function Banner( utils ){
    this.RESET = 15;
    this.timer = null;
    this.FROMNEC = "FromNec.png";
    this.VICBOMA = "credits2.png";
    this.PUSHBUTTON = "pushButton.png";
    this.CREDIT = "credit.png";
    this.utils = utils;

    this.getVicboma = function(){ return this.vicboma; };
    this.setVicboma = function(vicboma){ this.vicboma = vicboma; };

    this.getPushButton = function(){ return this.pushButton; };
    this.setPushButton = function(pushButton){ this.pushButton = pushButton; };

    this.getFromNec = function(){ return this.fromNec; };
    this.setFromNec = function(fromNec){ this.fromNec = fromNec; };

    this.getCredit = function(){ return this.credit; };
    this.setCredit = function(credit){ this.credit = credit; };
};

Banner.prototype.constructor = Banner;

Banner.prototype = {
    create: function() {
        this.createVicboma();
        this.createPushButton();
        this.createFromNec();
        this.createCredit();
    },
     createFromNec : function() {
        var fromNec = game.add.sprite(game.world.centerX-80, game.world.centerY+90, ATLAS, this.FROMNEC);
        fromNec.scale.setTo(0.8,0.9);
        this.setFromNec(fromNec);
    },
    createVicboma : function() {
        var vicboma = game.add.button(game.world.centerX-10, game.world.height - 55, ATLAS, this.utils.link, this, this.VICBOMA,this.VICBOMA,this.VICBOMA,this.VICBOMA);
        vicboma.anchor.set(0.5,1);
        vicboma.scale.setTo(0.7,0.7);
        this.setVicboma(vicboma);
    },
    createPushButton : function() {
        var pushButton = game.add.button(game.world.centerX -20, game.world.height - 125, ATLAS, this.utils.gitLink, this, this.PUSHBUTTON,this.PUSHBUTTON,this.PUSHBUTTON,this.PUSHBUTTON);
        pushButton.scale.setTo(0.8,0.9);
        pushButton.visible = false;
        pushButton.anchor.set(0.5,1);
        this.setPushButton(pushButton);
    },
    createCredit : function() {
        var credit = game.add.sprite(game.world.width - 120, game.world.height - 62, ATLAS, this.CREDIT);
        credit.scale.setTo(0.7,0.7);
        credit.visible = false;
        credit.anchor.set(0.5,1);
        this.setCredit(credit);
    },
    animationStarted : function(sprite, _animation){
        this.setPromise(new Promise(function(resolved,rejected){ resolved(sprite); }) );
    },
    update : function () {

        if(this.timer != null)
            return;

        var loops = 0;
        this.timer = game.time.create(false);
        this.timer.loop(1200, function(args) {

            if(loops == this.RESET ){
                this.timer.stop();
                game.state.start(INTRO);
            }

            this.utils.toBlink(args);
            loops++;

        }, this, this.getPushButton());

        this.timer.start();

    }

};