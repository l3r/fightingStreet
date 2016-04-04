////////////////////////////////////////////////////////////////////////////////////   BACKGROUND WALL

var Wall = function Wall(hero, logo){
    this.WALL = "000.png";
    this.hero = hero;
    this.logo = logo;
    this.lock = false;

    this.getSprite = function(){ return this.sprite; };
    this.setSprite = function(sprite){ this.sprite = sprite; };

    this.getAnimation = function(){ return this.animation; };
    this.setAnimation = function(animation){ this.animation = animation; };

    this.getLogo = function(){ return this.logo; };
};

Wall.prototype.constructor = Wall;

Wall.prototype = {
    setBanner : function (banner){
        this.banner = banner;
    },
    createSprite: function() {
        var sprite = game.add.sprite(0,0, ATLAS, this.WALL);
        sprite.scale.setTo(2.085,2.68);
        this.setSprite(sprite);
    },
    animations : function(){
        var animation = this.sprite.animations.add(WALL_ANIMATION,["000.png","001.png","002.png","003.png","004.png","005.png","006.png"],12, false);
        animation.onStart.add(this.wallAnimationStarted, this);
        animation.onComplete.add(this.wallAnimationCompleted, this);
        this.setAnimation(animation);
    },
    wallAnimationStarted : function(sprite, animation){
        var animation = this.hero.getAnimation();
        animation.play(HERO_ANIMATION);
    },
    wallAnimationCompleted : function(sprite, animation){
        setTimeout(function(args){

            var logo = args[0].getSprite();
            logo.position = new Phaser.Point(game.world.centerX+15,game.world.centerY+50);
            logo.scale.setTo(0.2);
            logo.visible = true;

            var animationBack = args[1].getAnimationBack();
            animationBack.play(HERO_ANIMATION_BACK);

        }, 1000, [this.logo,this.hero]);
    },
    create: function() {
        this.hero.create();
        this.createSprite();
        this.animations();
        this.logo.create();
    },
    update : function(){
        var promise = this.hero.getPromise();
        if(this.lock || promise == null )
            return;

        this.lock = true;
        var _this = this;

        promise.then(function(args){
            new Promise(function(resolved, rejected){

                _this.logo.animation(resolved);

            }).then(function(_args){

                setTimeout(function(_wall){
                    var hero  = _wall.hero.getSprite();
                    var walk = _wall.getSprite();
                    var logo = _wall.getLogo();
                    var banner = _wall.banner.getCredit();
                    hero.visible = false;
                    walk.visible = false;
                    logo.newScene();
                    banner.visible = true;
                }, 2300, _this);
            });

        });
    }
};
