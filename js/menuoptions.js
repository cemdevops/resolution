var Scripts = {   
    /* Responsavel pela inicializacao das funcoes */
    _init: function() {       
        this._click();                  // Functions click
    },

    _click: function() {
        //about Resolution
        $('#about-resolution').click(function(){
            var x = document.getElementById('main-container-about');
            if (x.style.display === 'none') {
                x.style.display = 'block';
            } else {
                x.style.display = 'none';
            }
            return false;
        });
        //facebook
        $('#facebook').click(function(){
            var title         = $('meta[property="og:title"]').attr('content'),
                texto         = $('meta[property="og:description"]').attr('content'),
                url           = $('meta[property="og:url"]').attr('content');
               
            Scripts._share(encodeURIComponent(title),texto,url,'facebook');
            return false;
        });
        
        //twitter
        $('#twitter').click(function(){
            var title         = $('meta[property="og:title"]').attr('content'),
                texto         = $('meta[property="og:description"]').attr('content'),
                url           = $('meta[property="og:url"]').attr('content');
               
            Scripts._share(encodeURIComponent(title),texto,url,'twitter');
            return false;
            
        });

        //email
        $('#email').click(function(){
            var title         = $('meta[property="og:title"]').attr('content'),
                texto         = $('meta[property="og:description"]').attr('content'),
                url           = $('meta[property="og:url"]').attr('content');
               
            Scripts._share(encodeURIComponent(title),texto,url,'email');
            return false;
            
        });

         //linkedIn
        $('#linkedin').click(function(){
            var title         = $('meta[property="og:title"]').attr('content'),
                texto         = $('meta[property="og:description"]').attr('content'),
                url           = $('meta[property="og:url"]').attr('content');
               
            Scripts._share(encodeURIComponent(title),texto,url,'linkedin');
            return false;
            
        });
    },    

    _share: function(titulo,texto,cUrl,tipo) {
    /* Utilizado para todas as redes sociais, para abrir em um popup */
        var basePage;
        if (tipo === 'twitter') {
            basePage = 'http://twitter.com/share?url=' + cUrl + '&text=' + titulo;
            window.open(basePage,'_blank', 'top=200, width=600,height=400');
        } else if (tipo === 'facebook') {
            basePage = "http://www.facebook.com/sharer.php?u=" + cUrl;
            window.open(basePage,'_blank', 'top=200, width=600,height=400');
        } else if (tipo === 'email') {
            var email = "contato@centrodametropole.org.br";
            location.href = 'mailto:'+ email +'?Subject='+ titulo + '&body=' + encodeURIComponent(texto+"\n"+cUrl);
        } else if (tipo === 'linkedin') {
            basePage = "http://www.linkedin.com/shareArticle?mini=true&url="+ encodeURIComponent(cUrl) + "&title="+ titulo + "&summary="+ texto;
            window.open(basePage,'_blank', 'top=200, width=600,height=400');
        }
        
        return false;
    }
}    
$(function () {
    Scripts._init();
});
