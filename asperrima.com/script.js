$(document).ready( function() {
    initializeFlippyFloopFloopWords();
});
var globIdx = 0;
function initializeFlippyFloopFloopWords() {
    $("span.fliplink").each( function() {
        $(this).attr( 'id', globIdx );
        var cfl = $("#"+globIdx);
        cfl.mouseenter( function() {
            $(this).animate( { "color": hsvtorgb( (parseInt(cfl.attr('id'))*100+1)%360, 0.9, 0.9 ) }, 300 );
        } );
        cfl.mouseleave( function() {
            $(this).animate( { "color": "#333" }, 200 );
        } );

        cfl.click( function() {
            var url = $(this).attr( 'href' )+".html";
            $("#flipcontent").slideUp( 500,
                function() {
                    var clr = hsvtorgb( (parseInt(cfl.attr('id'))*100+1)%360, 0.9, 0.9 )
                    var declr = hsvtorgb( (parseInt(cfl.attr('id'))*100+1)%360, 0.15, 1 )
                    $("#flipcontent").css({border: "3px solid "+clr, backgroundColor: declr });
                    $("#flipcontent").load(url, function() {
                        $("#flipcontent").slideDown(500, prettyPrint);
                        
                        
                    });
                }
            );
        } );
        
        globIdx += 1;


    });
}

function rgbtohsv( r, g, b ) {
    //stolen from cs.rit.edu
    var minn = Math.min( r, g, b );
    var maxx = Math.max( r, g, b );
    var v = maxx;
    var s = 0;
    var delta = maxx-minn;
    if( maxx != 0 )
        s = delta/maxx;
    else {
        s = 0;
        h = -1;
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
    return [ h, s, v ];
}

function hsvtorgb( h, s, v ) {
    var i, f, p, q, t, r, g, b;
    if( s == 0 ) {
        r = g = b = v;
        return [ r, g, b ];
    }
    h /= 60.0;
    i = Math.floor(h);
    f = h - i;
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    
    switch( i ) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:
            r = v;
            g = p;
            b = q;
            break;
    }
    
    return "#"+Math.round(r*255).toString(16)+Math.round(g*255).toString(16)+Math.round(b*255).toString(16);
}
