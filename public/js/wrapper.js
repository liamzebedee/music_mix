
var LH = {}

LH.Wrapper = function( o ) {

    if ( o == undefined ) return;

    // this.socket = io();

    // Renderer Configuration
    o.renderer.setClearColor( 0x111111 );
    
    // Camera Configuration
    o.camera.position.x = 300;
    o.camera.position.y = 500;
    o.camera.position.z = 500;
    o.camera.lookAt(o.scene.position);

    // Orbit Controller Configuration
    o.orbit = new THREE.OrbitControls( o.camera, o.container );
    o.orbit.noPan = true;
    o.orbit.autoRotate = true;
    o.orbit.autoRotateSpeed = 0.15;

    o.orbit.minDistance = 700;
    o.orbit.maxDistance = 1400;

    // Raycaster Module Add
    o.raycaster = new THREE.Raycaster();

    var earthRadius = 300;

    // Elementary Geometries
    var geometry = {
        star: new THREE.SphereGeometry( 25, 20, 20 ),
        earth: new THREE.SphereGeometry( earthRadius+22, 50, 50 ),
    }

    // Elementary Materials
    var material = {
        starWhite: new THREE.MeshBasicMaterial({
            color: 0xffffff, transparent: true, opacity: 0.7 }),
        starRed: new THREE.MeshBasicMaterial({
            color: 0xff0000, transparent: true, opacity: 0.7 }),
        starGreen: new THREE.MeshBasicMaterial({
            color: 0x00ff00, transparent: true, opacity: 0.7 }),
        earthWire: new THREE.MeshBasicMaterial({
            color: 0x181818, transparent: false, opacity: 0.3, wireframe: false}),
        earthTex:  new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture("earthmap2k.jpg") }),
    }

    // Wrapper Owned Selection Tracking
    var hover = null;
    var selected = null;
    var tweenCamera;

    // Scene
    // o.scene.fog = new THREE.FogExp2( 0x111111, 0.002 );

    var gridXZ = new THREE.GridHelper(10000, 10000);
        gridXZ.setColors(new THREE.Color(0x222222), new THREE.Color(0x222222))
    // o.scene.add(gridXZ);

    o.scene.add(new THREE.AmbientLight(0xffffff));

    var stars = new THREE.Object3D();
    o.scene.add( stars );

    pointSphere = function(r, t, f) {
        var x = r * Math.sin(t) * Math.cos(f),
            y = r * Math.sin(t) * Math.sin(f),
            z = r * Math.cos(t);
        return {x:x, y:y, z:z};
    }

    var colors = [
        0xAB4642,
        0xA1B56C,
        0xF7CA88,
        0x7CAFC2,
        0xBA8BAF,
        0x86C1B9,
    ]

    for ( var i = 0; i < 1600; i++ ) {
        var star = new THREE.Mesh( geometry.star, new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.5,
            color: colors[Math.floor((Math.random() * (colors.length-1)) + 1)],
        }) );
        var pos = pointSphere(
            earthRadius,
            Math.random() * (2*Math.PI),
            Math.random() * (2*Math.PI))
        star.position.x = pos.x;
        star.position.y = pos.y;
        star.position.z = pos.z;
        stars.add( star );
    }

    var earth = new THREE.Mesh( geometry.earth, material.earthTex );
    o.scene.add(earth)

    var selarr = [];

    // Callbacks

    o._frame = function() {

        o.orbit.update();

        // Selection Logic
        o.raycaster.setFromCamera( o.mouse, o.camera );
        var intersects = o.raycaster.intersectObjects( stars.children );

        if ( intersects.length > 0 ) {
            if ( hover != intersects[ 0 ].object ) {
                // Set Selection
                hover = intersects[ 0 ].object;
                selarr.push(hover);
            }
        }

        for (var i = 0; i < selarr.length; i++) {
            if (selarr[i] == hover) {
                selarr[i].scale.set( 2, 2, 2 );
                selarr[i].material.opacity = 1;
            } else {
                selarr[i].scale.set( 1, 1, 1 );
                selarr[i].material.opacity = 0.7
                // remove from array
                selarr.splice(i, 1)
            }
        };

    }

    o._resize = function() {}

    // this.socket.on('ent', function(msg){
    //     newEntity(type, x, y)
    //     // socket.emit('init', '');
    // });

}