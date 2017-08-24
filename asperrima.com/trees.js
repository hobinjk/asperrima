var DURATION = 750;


function Language( id, date ) {
    this.id = id;
    this.date = date;
    this.parents = new Array();
    this.children = new Array();
}
Language.prototype.id = "none";
Language.prototype.date = "none";

Language.prototype.parents = new Array();
Language.prototype.children = new Array();

Language.prototype.addChild = function( child ) {
    this.children.push( child );
    child.parents.push( this );
    console.log("adding this to "+child.id);
}
Language.prototype.addChildren = function( children ) {
    this.children = this.children.concat( children );
    for( var i = 0; i < children.length; i++ ) {
        console.log("adding this to "+children[i].id);
        children[i].parents.push( this );
    }
}

var currentLanguage;
function initLanguages() {
    var pie = new Language( 'Proto-Indo-European', '3700 BC' );

    var indoIranian = new Language( 'Indo-Iranian', '3000 BC' );
    var indic = new Language( 'Indic', '2500 BC' );
    var sanskrit = new Language( 'Sanskrit', '1500 BC' );
    var bengali = new Language( 'Bengali', '1000 AD' );
    var hindi = new Language( 'Hindi', '700 AD ' );
    var urdu = new Language( 'Urdu', '700 AD' );
    var gujurati = new Language( 'Gujurati', '1100 AD' );
    var iranian = new Language( 'Iranian', '2000 BC' );
    var avestan = new Language( 'Avestan', '2000 BC' );
    var oldPersian = new Language( 'Old Persian', '600 BC' );
    var middlePersian = new Language( 'Middle Persian', '224 AD' );
    var farsi = new Language( 'Farsi', '800 AD' );
    var kurdish = new Language( 'Kurdish', '1300 AD' );

    var hellenic = new Language( 'Hellenic', '2000 BC' );
    var greek = new Language( 'Greek', '1400 BC' );

    var celtic = new Language( 'Celtic', '1000 BC' );
    var manx = new Language( 'Manx', '400 AD' );
    var irish = new Language( 'Irish', '400 AD' );
    var scottish = new Language( 'Scottish', '1200 AD' );
    var welsh = new Language( 'Welsh', '600 AD' );

    var italic = new Language( 'Italic', '700 BC' );
    var latin = new Language( 'Latin', '452 BC' );
    var french = new Language( 'French', '52 BC' );
    var spanish = new Language( 'Spanish', '400 AD' );
    var romanian = new Language( 'Romanian', '1521 AD' );
    var catalan = new Language( 'Catalan', '1000 AD' );
    var portuguese = new Language( 'Portuguese', '500 AD' );
    var italian = new Language( 'Italian', '900 AD' );

    var baltoSlavic = new Language( 'Balto-Slavic', '1500 BC' );
    var polish = new Language( 'Polish', '1000 AD' );
    var serboCroatian = new Language( 'Serbo-Croation', '900 AD' );
    var russian = new Language( 'Russian', '1000 AD' );

    var germanic = new Language( 'Germanic', '200 BC' );
    var northGermanic = new Language( 'North Germanic', '200 AD' );
    var oldNorse = new Language( 'Old Norse', '700 AD' );
    var swedish = new Language( 'Swedish', '1200 AD' );
    var norwegian = new Language( 'Norwegian', '1030 AD' );
    var icelandic = new Language( 'Icelandic', '1100 AD' );
    var westGermanic = new Language( 'West Germanic', '100 BC' );
    var angloFrisian = new Language( 'Anglo-Frisian', '100 BC' );
    var oldEnglish = new Language( 'Old English', '450 AD' );
    var middleEnglish = new Language( 'Middle English', '1200 AD' );
    var modernEnglish = new Language( 'Modern English', '1600 AD' );
    var oldFrisian = new Language( 'Old Frisian', '700 AD' );
    var frisian = new Language( 'Frisian', '1500 AD' );
    var oldDutch = new Language( 'Old Dutch', '500 AD' );
    var middleDutch = new Language( 'Middle Dutch', '1100 AD' );
    var flemish = new Language( 'Flemish', '892 AD' );
    var dutch = new Language( 'Dutch', '1500 AD' );
    var afrikaans = new Language( 'Afrikaans', '1600 AD' );
    var oldHighGerman = new Language( 'Old High German', '500 AD' );
    var middleHighGerman = new Language( 'Middle High German', '1000 AD' );
    var german = new Language( 'German', '1650 AD' );
    var yiddish = new Language( 'Yiddish', '1272 AD' );
    
    
    sanskrit.addChildren( [ bengali, urdu, hindi, gujurati ] );
    middlePersian.addChildren( [ farsi, kurdish ] );
    oldPersian.addChild( middlePersian );
    iranian.addChildren( [ avestan, oldPersian ] );
    indoIranian.addChildren( [ indic, iranian ] );
    indic.addChild( sanskrit );

    hellenic.addChild( greek );
    
    celtic.addChildren( [manx, irish, scottish, welsh] );
    
    latin.addChildren( [ french, spanish, romanian, catalan, portuguese, italian ] );
    french.addChild( modernEnglish );
    italic.addChild( latin );
            
    baltoSlavic.addChildren( [polish, serboCroatian, russian] );
        
    germanic.addChildren([ northGermanic, westGermanic ]);
    northGermanic.addChildren([ oldNorse, swedish ]);
    oldNorse.addChildren([ norwegian, icelandic ]);
    westGermanic.addChildren([ angloFrisian, oldDutch, oldHighGerman ]);
    angloFrisian.addChild( oldEnglish );
    oldEnglish.addChild( middleEnglish );
    middleEnglish.addChild( modernEnglish );
    angloFrisian.addChild( oldFrisian );
    oldFrisian.addChild( frisian );

    oldDutch.addChild( middleDutch );
    middleDutch.addChildren([ flemish, dutch, afrikaans ]);

    oldHighGerman.addChild( middleHighGerman );
    middleHighGerman.addChildren([ german, yiddish ]);    

    pie.addChildren([ indoIranian, hellenic, celtic, italic, baltoSlavic, germanic ]);

    currentLanguage = pie;
}

function divId( lang ) {
    return new String(lang.id).replace(" ", "-").replace(" ", "-").toLowerCase();
}


function hideAllExcept( lang ) {
    for( var i = 0; i < currentLanguage.parents.length; i++ ) {
        var l = currentLanguage.parents[i];
        if( l.id == lang.id ) continue;
        $("#"+divId( l )).fadeOut(DURATION, function() { $(this).remove(); } );
    }
    for( var i = 0; i < currentLanguage.children.length; i++ ) {
        var l = currentLanguage.children[i];
        if( l.id == lang.id ) continue;
        $("#"+divId( l )).fadeOut(DURATION, function() { $(this).remove(); });
    }
    var elem = $("#"+divId( currentLanguage ));
    elem.attr('id','');
    elem.fadeOut(DURATION, function() { $(this).remove(); });
} 

function clickCallback( evt ) {
    clickedThing( evt.data.lang );
}
function addTree( language, x, y ) {
    
    $( "#tree" ).append( "<div class='language' id='"+divId(language)+"'><h2>"+language.id+"</h2><p>"+language.date+"</p></div>" );
    var elem = $("#"+divId(language))
    var eWidth = elem.width()
    elem.hide();
    elem.css({ top: y+"px", left: (x-eWidth/2)+"px" });
    //console.log("width: "+Math.round(wStep*(i+0.5))+":"+i);
    elem.fadeIn(DURATION);
    elem.bind( 'click', { lang:language }, clickCallback );
}

function clickedThing( newLanguage ) {
    hideAllExcept( newLanguage );
    var fWidth = $("#tree").width();
    console.log("starting");
    for( var i = 0; i < newLanguage.parents.length; i++ ) {
        var parent = newLanguage.parents[i];
        var wStep = fWidth/(newLanguage.parents.length + 1);
        var x = (i-newLanguage.parents.length/2.0+0.5)*wStep+fWidth/2;
        var y = 20;
        addTree( parent, x, y );
        var wStep = fWidth/(newLanguage.parents.length + 1);
    }
    console.log("ending");

    var tw = $("#"+divId( newLanguage )).width();
    $("#"+divId( newLanguage )).animate( {top: "160px", left: (fWidth/2-tw/2)+"px" });
    
    //append( "<div class='main' id='"+divId(newLanguage)+"'><h2>"+newLanguage.id+"</h2><p>+"newLanguage.date+"</p></div>" );
    for( var i = 0; i < newLanguage.children.length; i++ ) {
        var child = newLanguage.children[i];
        var wStep = fWidth/(newLanguage.children.length + 1);
        var curPos = (i-newLanguage.children.length/2.0+0.5)*wStep+fWidth/2;
        addTree( child, curPos, 300 );
    }
    currentLanguage = newLanguage;
}
$("document").ready( function() {
    initLanguages();
    clickedThing( currentLanguage );
    addTree( currentLanguage, $("#tree").width()/2, 160 );
    
});
   

