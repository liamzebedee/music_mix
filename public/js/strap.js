
THREE.Strap = function( container ) {

    var _this = this;

    if ( container == undefined ) return;

    // DEF

    this.container  = container;
    this.hfix       = 4;
    this.scene      = new THREE.Scene();
    this.camera     = new THREE.PerspectiveCamera( 60, window.innerWidth / ( window.innerHeight - this.hfix ), 1, 20000 );
    this.renderer   = new THREE.WebGLRenderer();
    this.mouse      = new THREE.Vector2();

    this._frame     = undefined;
    this._resize    = undefined;

    // INIT

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight-this.hfix );

    // API

    this.init = function() {

        _this.container.innerHTML = "";
        _this.container.appendChild( _this.renderer.domElement );

        frame();

    }

    frame = function() {

        if ( _this._frame && typeof( _this._frame ) === "function" ) _this._frame();

        _this.renderer.render( _this.scene, _this.camera );
        requestAnimationFrame( frame );

    }

    onResize = function() {

        if ( _this._resize && typeof( _this._resize ) === "function" ) _this._resize();

        _this.renderer.setSize( window.innerWidth, window.innerHeight-_this.hfix );
        _this.camera.aspect = window.innerWidth / ( window.innerHeight-_this.hfix );
        _this.camera.updateProjectionMatrix();

    }

    onMouse = function() {

        _this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        _this.mouse.y = - ( event.clientY / ( window.innerHeight-_this.hfix ) ) * 2 + 1;

    }

    window.addEventListener( "resize", onResize, false );
    window.addEventListener( "mousemove", onMouse, false );

}

