var ctx;
var canvas;
var img;
//many parts stolen from http://tutorialzine.com/2010/09/html5-canvas-slideshow-jquery/
var mode = "hue", threshold = 0, binary = false;
function initCanvas() {
    canvas = document.getElementById("stlDraw");
    ctx = canvas.getContext("2d");
    canvas = $(canvas);
}

function updateCanvasSource( response ) {
//    $("#imgpreview").remove();
//    $("div#preview").append( "<img id=\"imgpreview\" src=\""+response+"\"/>" );
//    $("#imgpreview").load( function() {
    img = new Image();
    img.onload = function() {
        console.log( "drawing" );
        canvas.attr( "width", img.width );
        canvas.attr( "height", img.height );

        updateOptions();
    };
    img.src = response;
    
}

function createUploader() {
    var uploader = new qq.FileUploader({
        element: document.getElementById( 'file-upload' ),
        action: "/fileupload/upload.php",
        onComplete: function ( id, filename, response ) {
            console.log( filename );
            console.log( response );
            
            //$('img#thumb').attr( 'src', "/fileupload/uploads/"+filename );
            
            updateCanvasSource( "/fileupload/uploads/"+filename );
            
        }
    });
}
function rgbtohsb( r, g, b ) {
    var minn = Math.min( r, g, b );
    var maxx = Math.max( r, g, b );
    var v = maxx;
    var s = 0;
    var delta = maxx-minn;
    if( maxx != 0 )
        s = delta/maxx;
    else {
        s = 0;
        h = 0;
        return [ h, s, v ];
    }

    if( r == maxx ) {
        h = ( g - b ) / delta;
    } else if( g == maxx ) {
        h = 2 + ( b - r ) /delta;
    } else if( b == maxx ) {
        h = 4 + ( r - g ) / delta;
    }
    h = h * 60;
    if( h < 0 )
        h += 360;
    if( h == NaN ) h = 0;
    return [ h, s*255, v ];
}
function updateOptions() {
    ctx.drawImage( img, 0, 0 );
    var imageData = ctx.getImageData(0,0,canvas.width(), canvas.height());
    var data = imageData.data;
    for( var i = 0, z = data.length; i < z; i += 4 ) {
        var val = 0;
        if( mode == "hue" ) {
            val = rgbtohsb( data[i], data[i+1], data[i+2] )[0];
        } else if( mode == "sat" ) {
            val = rgbtohsb( data[i], data[i+1], data[i+2] )[1];
        } else if( mode =="value" ) {
            val = rgbtohsb( data[i], data[i+1], data[i+2] )[2];
        } else if( mode == "red" ) {
            val = data[i];
        } else if( mode == "green" ) {
            val = data[i+1];
        } else if( mode == "blue" ) {
            val = data[i+2];
        } else {
            console.log( "uh oh: "+mode );
        }
        if( binary ) val = val > threshold ? 255 : 0;
        else val = (val < 0 ? 0 : val) > 255 ? 255 : val;
        data[i] = data[i+1] = data[i+2] = Math.floor(val);
    }
    ctx.putImageData( imageData, 0, 0, 0, 0, imageData.width, imageData.height);
}
function onThresholdChange() {
    var threshBox = $("#threshold");
    var newThreshold = parseInt( threshBox.val() );
    if( newThreshold == NaN ) {
        threshBox.addClass("error");
        return;
    }
    threshBox.removeClass("error");
    threshold = newThreshold;
    updateOptions();
}
function onModeSelect() {
    mode = $("#mode").val();
    updateOptions();
}
function onBinaryCheck() {
    binary = $("#binary").is(':checked');
    updateOptions();
}
function initOptionsForm() {
    $("#threshold").change( onThresholdChange );
    $("#mode").change( onModeSelect );
    $("#binary").change( onBinaryCheck );
}
$(document).ready( function() {
    createUploader();
    initCanvas();
    initOptionsForm();
    $("#download").mousedown( function() {
        var t = $(this).html();
        $(this).html("Preparing STL");
        makeSTL();
        $(this).html(t);
    });
});


var i;
function makeSTL() {
    var imageData = ctx.getImageData(0,0,canvas.width(),canvas.height());
    var data = imageData.data;
    var width = imageData.width;
    var height = imageData.height;
    var stl = new Array(width*height*4+width*2+height*2+2);
    stl[0] = "solid Default\n";
    i = 1;
    var k = -1;
    var x, y;
    
    for( x = 0; x < width-1; x++ ) {
        for( y = 0; y < height-1; y++ ) {
            face( stl,
                x,  y,  data[(x+y*width)*4]/32,
                x+1,y,  data[(x+1+y*width)*4]/32,
                x+1,y+1,data[(x+1+y*width+width)*4]/32
            );
            face( stl,
                x+1,y+1,data[(x+1+y*width+width)*4]/32,
                x,  y+1,data[(x+y*width+width)*4]/32,
                x,  y,  data[(x+y*width)*4]/32
            );
            face( stl,
                x, y, k,
                x, y+1, k,
                x+1, y+1, k
            );
            face( stl,
                x+1, y+1, k,
                x+1, y, k,
                x, y, k
            );
        }
    }
    
    for( x = 0; x < width-1; x++ ) {
        y = 0;
        face( stl,
            x, y, data[(x+y*width)*4]/32,
            x+1, y, data[(x+1+y*width)*4]/32,
            x+1, y, k );
        face( stl,
            x+1, y, k,
            x, y, k,
            x, y, data[(x+y*width)*4]/32 );

        y = height-1;
        face( stl,
            x, y, data[(x+y*width)*4]/32,
            x, y, k,
            x+1, y, k );
        face( stl,
            x+1, y, k,
            x+1, y, data[(x+1+y*width)*4]/32,
            x, y, data[(x+y*width)*4]/32 );
    }
    for( y = 0; y < height-1; y++ ) {
        x = 0;
        face( stl,
            x, y, data[(x+y*width)*4]/32,
            x, y+1, data[(x+y*width+width)*4]/32,
            x, y+1, k );
        face( stl,
            x, y+1, k,
            x, y, k,
            x, y, data[(x+y*width)*4]/32 );
        x = width-1;
        face( stl,
            x, y, data[(x+y*width)*4]/32,
            x, y, k,
            x, y+1, k );
        face( stl,
            x, y+1, k,
            x, y+1, data[(x+y*width+width)*4]/32,
            x, y, data[(x+y*width)*4]/32 );
    }

    stl[i++] = "endsolid Default\n";

    stl = stl.join("");
    var zip = new JSZip();
    zip.add( "model.stl", stl );
    
    $("#downloadlink").html( "<a href=\"data:application/zip;base64,"+zip.generate()+"\">STL file" );
}
function face( stl, ax, ay, az, bx, by, bz, cx, cy, cz ) {
    var nx, ny, nz;
    var dx, dy, dz, ex, ey, ez;
    dx = ax-bx; dy = ay-by; dz = az-bz;
    ex = bx-cx; ey = by-cy; ez = bz-cz;
    nx = dy*ez - dz*ey;
    ny = dz*ex - dx*ez;
    nz = dx*ey - dy*ex;

    dz = Math.sqrt(nx*nx + ny*ny + nz*nz);
    nx /= dz;
    ny /= dz;
    nz /= dz;

    stl[i++] = ["  facet normal "+nx+" "+ny+" "+nz+"\n    outer loop\n      vertex "+ax+" "+ay+" "+az+
            "\n      vertex "+bx+" "+by+" "+bz+"\n      vertex "+cx+" "+cy+" "+cz+"\n    endloop\n  endfacet\n"].join("");
}

