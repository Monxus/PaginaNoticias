var jsonNoticia=1;
var scrollable=true;
var puntoCarga=40;

$(document).ready(function(){
    $("#cargar-menu").click(function(){
        if(scrollable){
            $("#cargar-menu").html("Cargar noticias al pulsar un botón");
            $("#cargarBoton").hide();
            $(window).scroll(function(){
                if ($(window).scrollTop() + $(window).height() > $(document).height() - puntoCarga && jsonNoticia<3) { 
                cargarNoticias();
                }
            })

            scrollable=false;
        }else{
            $("#cargar-menu").html("Cargar noticias con scroll");
            if(jsonNoticia<3){
                $("#cargarBoton").show();
            }
            scrollable=true;
        }
    })
    $("#cargarBoton").click(function(){
            cargarNoticias();       
    })
    $("#bottwit").click(function(){
        compartirTwit();
    })
    $("#botface").click(function(){
        compartirFace();
    })
});

function cargarNoticias(){

    $.getJSON("data/"+jsonNoticia+".json", function( jsonObject ) {
        crearNoticias( jsonObject );
    });
    jsonNoticia++;
    if(jsonNoticia>2){
        $("#cargarBoton").hide();
    }
}

function crearNoticias(json){
   $.each(json, function(i,noticia){
        $("#noticias").append("<div class='well'><h2>"+noticia.titulo+"</h2><p class='text-muted'>"+noticia.datatime+"</p> \
                            <div class='row'><div class='col-sm-3'><img class='img-rounded img-responsive' \
                            src="+noticia.imgmid+" alt='noticia'></div><div class='col-sm-9'><p class='text-justify'>"+noticia.desc+"</p></div></div></div>"
        );
    })
}

function compartirFace(){
    var linkMal = window.location.href;
    var link = encodeURIComponent(linkMal);
    window.open("https://www.facebook.com/sharer/sharer.php?u="+link);

}

function compartirTwit(){
    var linkMal = window.location.href;
    var link = encodeURIComponent(linkMal);
    window.open("https://twitter.com/home?status="+$('title').text()+" - "+link);
}
