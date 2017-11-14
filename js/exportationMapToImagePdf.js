//---------------------------------- Exportation to Image and to PDF---------------

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link);
}

function convertToImage() {
    var node = document.getElementById('map');
    domtoimage.toSvg(node)
        .then(function (dataUrl) {
            //var img = new Image();
            //img.src = dataUrl;
            //document.body.appendChild(img);

            var link = document.createElement('a');
            link.download = 'meu-mapa.png';
            link.href = dataUrl;
            link.click();
            cover.className = '';
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    // export to jpeg
    /*var node = document.getElementById('map');
    var h = node.height;
    var w = node.width;
    var options = {
        quality: 1.0,
        height: h,
        width:w
    };
    domtoimage.toJpeg(node, options)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });*/

    // export to blob
    /*var node = document.getElementById('map');

    domtoimage.toBlob(node).then(function (blob) {
        window.saveAs(blob, 'my-node.png');
    });*/
}

function convertToPdf() {
    var node = document.getElementById('map');
    domtoimage.toSvg(node)
        .then(function (dataUrl) {
            var pdf = new jsPDF('l', 'pt', 'a4');
            var img = new Image();
            img.src = dataUrl;
            img.onload = function() {
                //pdf.addImage(img, 'PNG', 10, 15);
                var dimensions = map.getSize();
                pdf.addImage(img, 'PNG', 10, 10, dimensions.x * 0.5, dimensions.y * 0.5);
                pdf.save('meu-mapa.pdf');
            };
            cover.className = '';

        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

}


/* Take out the carto logo */
function takeOutCartodbLogo() {
    // Check if Layers's legend. Remove if exists
    if ($("div.cartodb-logo").length){
        $('div.cartodb-logo').remove();
    }
}

function exportMapOK() {
    takeOutCartodbLogo();
    var optImagem = document.getElementById('optImagem');
    cover.className = 'active';
    if (optImagem.checked) {
        // exportar como imagem
        convertToImage();
    } else {
        // exportar como pdf
        convertToPdf();
    }
}

function exportMapToImagePDF() {
    takeOutCartodbLogo();

    var optImagem = document.getElementById('optImagem');
    html2canvas($("#map"), {
        logging: true,
        useCORS: true,
        onrendered: function(canvas) {
            img = Canvas2Image.saveAsJPEG(canvas, true);
            if (optImagem.checked) {
                // exportar como imagem
                downloadIMG(img.src, "ResolutionMap_" + (new Date()).getTime() + ".jpeg", 'image/jpeg');
            } else {
                // exportar como pdf
                downloadPDF(img.src, "ResolutionMap_" + (new Date()).getTime() + ".pdf", 'image/jpeg');
            }

        }
    });
}

downloadIMG = function (strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    //a.href = "data:" + strMimeType + "," + escape(strData);
    a.href = strData;


    if (window.MSBlobBuilder) {
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */

    if ('download' in a) {
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function () {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */
    ; //end if a[download]?



    //do iframe dataURL download:
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function () {
        D.body.removeChild(f);
    }, 333);
    return true;
}   /* end download() */

downloadPDF = function (strData, strFileName, strMimeType) {
    var pdf = new jsPDF('l', 'pt', 'a4');
    var dimensions = map.getSize();
    pdf.addImage(strData, strMimeType, 0, 0, dimensions.x * 0.43, dimensions.y * 0.43);
    pdf.save(strFileName);


}   /* end download() */