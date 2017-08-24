var DURATION = 750;


function Language( id, date, wiki ) {
    this.id = id;
    this.date = date;
    this.parents = new Array();
    this.children = new Array();
    this.wiki = wiki;
}
Language.prototype.id = "none";
Language.prototype.date = "none";
Language.prototype.wiki = "none";

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
    var pie = new Language( 'Proto-Indo-European', '3700 BC', 'http://en.wikipedia.org/wiki/Proto-Indo-European_language' );

    var indoIranian = new Language( 'Indo-Iranian', '3000 BC', 'http://en.wikipedia.org/wiki/Indo-Iranian_languages' );
    var indic = new Language( 'Indic', '2500 BC', 'http://en.wikipedia.org/wiki/Indic_scripts' );
    var sanskrit = new Language( 'Sanskrit', '1500 BC', 'http://en.wikipedia.org/wiki/Sanskrit' );
    var bengali = new Language( 'Bengali', '1000 AD', 'http://en.wikipedia.org/wiki/Bengali_language' );
    var hindi = new Language( 'Hindi', '700 AD ', 'http://en.wikipedia.org/wiki/Hindi' );
    var urdu = new Language( 'Urdu', '700 AD', 'http://en.wikipedia.org/wiki/Urdu' );
    var gujurati = new Language( 'Gujurati', '1100 AD', 'http://en.wikipedia.org/wiki/Gujarati_language' );
    var iranian = new Language( 'Iranian', '2000 BC', 'http://en.wikipedia.org/wiki/Iranian_languages' );
    var avestan = new Language( 'Avestan', '2000 BC', 'http://en.wikipedia.org/wiki/Avestan' );
    var oldPersian = new Language( 'Old Persian', '600 BC', 'http://en.wikipedia.org/wiki/Old_Persian_language' );
    var middlePersian = new Language( 'Middle Persian', '224 AD', 'http://en.wikipedia.org/wiki/Middle_Persian' );
    var farsi = new Language( 'Farsi', '800 AD', 'http://en.wikipedia.org/wiki/Farsi' );
    var kurdish = new Language( 'Kurdish', '1300 AD', 'http://en.wikipedia.org/wiki/Kurdish_language' );

    var hellenic = new Language( 'Hellenic', '2000 BC', 'http://en.wikipedia.org/wiki/Hellenic_languages' );
    var greek = new Language( 'Greek', '1400 BC', 'http://en.wikipedia.org/wiki/Greek_language' );

    var celtic = new Language( 'Celtic', '1000 BC', 'http://en.wikipedia.org/wiki/Celtic_languages' );
    var manx = new Language( 'Manx', '400 AD', 'http://en.wikipedia.org/wiki/Manx_language' );
    var irish = new Language( 'Irish', '400 AD', 'http://en.wikipedia.org/wiki/Irish_language' );
    var scottish = new Language( 'Scottish', '1200 AD', 'http://en.wikipedia.org/wiki/Scottish_Gaelic' );
    var welsh = new Language( 'Welsh', '600 AD', 'http://en.wikipedia.org/wiki/Welsh_language' );

    var italic = new Language( 'Italic', '700 BC', 'http://en.wikipedia.org/wiki/Italic_languages' );
    var latin = new Language( 'Latin', '452 BC', 'http://en.wikipedia.org/wiki/Latin' );
    var french = new Language( 'French', '52 BC', 'http://en.wikipedia.org/wiki/French_language' );
    var spanish = new Language( 'Spanish', '400 AD', 'http://en.wikipedia.org/wiki/Spanish_language' );
    var romanian = new Language( 'Romanian', '1521 AD', 'http://en.wikipedia.org/wiki/Romanian_language' );
    var catalan = new Language( 'Catalan', '1000 AD', 'http://en.wikipedia.org/wiki/Catalan_language' );
    var portuguese = new Language( 'Portuguese', '500 AD', 'http://en.wikipedia.org/wiki/Portuguese_language' );
    var italian = new Language( 'Italian', '900 AD', 'http://en.wikipedia.org/wiki/Italian_language' );

    var baltoSlavic = new Language( 'Balto-Slavic', '1500 BC', 'http://en.wikipedia.org/wiki/Balto-Slavic_language' );
    var polish = new Language( 'Polish', '1000 AD', 'http://en.wikipedia.org/wiki/Polish_language' );
    var serboCroatian = new Language( 'Serbo-Croatian', '900 AD', 'http://en.wikipedia.org/wiki/Serbo-Croatian_language' );
    var russian = new Language( 'Russian', '1000 AD', 'http://en.wikipedia.org/wiki/Russian_language' );

    var germanic = new Language( 'Germanic', '200 BC', 'http://en.wikipedia.org/wiki/Germanic_languages' );
    var northGermanic = new Language( 'North Germanic', '200 AD', 'http://en.wikipedia.org/wiki/North_Germanic_languages' );
    var oldNorse = new Language( 'Old Norse', '700 AD', 'http://en.wikipedia.org/wiki/Old_Norse_language' );
    var swedish = new Language( 'Swedish', '1200 AD', 'http://en.wikipedia.org/wiki/Swedish_language' );
    var norwegian = new Language( 'Norwegian', '1030 AD', 'http://en.wikipedia.org/wiki/Norwegian_language' );
    var icelandic = new Language( 'Icelandic', '1100 AD', 'http://en.wikipedia.org/wiki/Icelandic_language' );
    var westGermanic = new Language( 'West Germanic', '100 BC', 'http://en.wikipedia.org/wiki/West_Germanic' );
    var angloFrisian = new Language( 'Anglo-Frisian', '100 BC', 'http://en.wikipedia.org/wiki/Anglo-Frisian_languages' );
    var oldEnglish = new Language( 'Old English', '450 AD', 'http://en.wikipedia.org/wiki/Old_English' );
    var middleEnglish = new Language( 'Middle English', '1200 AD', 'http://en.wikipedia.org/wiki/Middle_english' );
    var modernEnglish = new Language( 'Modern English', '1600 AD', 'http://en.wikipedia.org/wiki/English_language' );
    var oldFrisian = new Language( 'Old Frisian', '700 AD', 'http://en.wikipedia.org/wiki/Old_Frisian' );
    var frisian = new Language( 'Frisian', '1500 AD', 'http://en.wikipedia.org/wiki/Frisian_languages' );
    var oldDutch = new Language( 'Old Dutch', '500 AD', 'http://en.wikipedia.org/wiki/Old_Dutch' );
    var middleDutch = new Language( 'Middle Dutch', '1100 AD', 'http://en.wikipedia.org/wiki/Middle_Dutch' );
    var flemish = new Language( 'Flemish', '892 AD', 'http://en.wikipedia.org/wiki/Flemish_language' );
    var dutch = new Language( 'Dutch', '1500 AD', 'http://en.wikipedia.org/wiki/Dutch_language' );
    var afrikaans = new Language( 'Afrikaans', '1600 AD', 'http://en.wikipedia.org/wiki/Afrikaans' );
    var oldHighGerman = new Language( 'Old High German', '500 AD', 'http://en.wikipedia.org/wiki/Old_High_German' );
    var middleHighGerman = new Language( 'Middle High German', '1000 AD', 'http://en.wikipedia.org/wiki/Middle_High_German' );
    var german = new Language( 'German', '1650 AD', 'http://en.wikipedia.org/wiki/German_language' );
    var yiddish = new Language( 'Yiddish', '1272 AD', 'http://en.wikipedia.org/wiki/Yiddish' );
    
    
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
    if( newLanguage.id == currentLanguage.id ) {
      window.open( newLanguage.wiki );
      return;
    }
    notReallyClickedThing( newLanguage );
}
function notReallyClickedThing( newLanguage ) {
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
    //currentLanguage.id = "nope";
    notReallyClickedThing( currentLanguage );
    
    addTree( currentLanguage, $("#tree").width()/2, 160 );
    
});
   

