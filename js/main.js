$(function () {

    var nw = require('nw.gui');

    var win = nw.Window.get();

    win.isMaximized = false;

    var filePath='/resource';

    var files;

	//Doc content data of body.innerHTML
    var content = null;
   
    //The iframe's document 
    var doc = editor.window.document|| editor.contentDocument || editor.contentWindow.document;
    
    console.log(doc);
	//enable the iframe editor
    doc.designMode = "on";

    var fs = require('fs'),
            xml2js = require("./node_modules/xml2js/lib/xml2js");

    doc.open();
    doc.write('<head><style type="text/css">body{ font-family:arial; font-size:13px;}</style></head>');
    doc.close(); 

    readFiles();
///////////////////////////////////////////////////////////F5刷新窗口
                                                             //F5刷新窗口
//listen to document keydown
    document.onkeydown=kdf;
    
    //keydown callback function
    function kdf(e){
       //press F5 fresh page to test code   
       if(e.keyCode==116){
          location.reload(true);
       }else{
         //alert("keydown");
       }
    }

///////////////////////////////////////////////////////////window bar click
                                                             //窗口栏
    $("#min").click(function(){
        win.minimize();
    });                                                        
    
    $("#max").click(function(){
        if (win.isMaximized){
            win.unmaximize();
        }else{
            win.maximize();
        }
    });
    
    $("#close").click(function(){
        win.close();
    });

    
    win.on('maximize',function(){
        win.isMaximized = true;
    });

    win.on('unmaximize',function(){
        win.isMaximized = false;
    })

    ///////////////////////////////////////////////////////////tool bar click
                                                             //工具栏
    $("#bold").click(function(){	
    	bold();
    });

    $("#save").click(function(){	
    	
        var fileName=$("#title").val()+".xml";
        fs.readdir(process.cwd()+filePath,function(err,files){

           if(err){
             throw err;
             console.log("use node.js read files err:"+err);
            }

            console.log(files);
            if($.inArray(fileName,files)==-1){
                fs.writeFile('./resource/'+fileName, $(doc).find("body").html(), function (err) {
                  if (err) throw err;
                 console.log('It\'s saved!');
                });

            }else{
                var r=confirm("文件已存在，是否覆盖?");
                if(r){
                   fs.writeFile('./resource/'+fileName, $(doc).find("body").html(), function (err) {
                     if (err) throw err;
                     console.log('It\'s saved!');
                   });
               

                 }
            }
          

        });

        
    });

    $("#show").click(function(){    
        var parser = new xml2js.Parser();

        fs.readFile('./foo.xml', function(err, data) {
            parser.parseString(data, function (err, result) {
                console.log(result);

                
                console.log('Done');
            });
            console.log(data.toString());

            $(doc).find("body").html(data.toString());
        });


    });

    $("#getHtml").click(function(){	

        content=$(doc).find("body").html();
    	console.log($(doc).find("body").html());

    });
    
   

    // $(document).click(function(event){
        
    //     console.log(event.target.nodeName);
    
    // });

    function bold(){
    	var sel=doc.getSelection();
    	var range= sel.getRangeAt(0);
    	alert(range.commonAncestorContainer);
    	fontEdit('bold');
    }
    function fontEdit(x,y)
    {
        doc.execCommand(x,"",y);
        console.log(".............");
        editor.focus();
    }

    function readFiles(){
        fs.readdir(process.cwd()+filePath,function(err,files){

           if(err){
             throw err;
             console.log("use node.js read files err:"+err);
            }

            console.log(files);

            this.files=files;
            
            list_source_file($("#file_ul"),files,"file");
            
             $(".file_name").click(function(event){

                readFileContent($(this).html());
                
            });
            return files;
        });
    }

    function list_source_file(target,source,sourceType){
              target.html("");
              for(var index in source){
                 //console.log(index);
                 var li = document.createElement('li');  
                  li.innerHTML = "<div class='file_name' id='"+sourceType+"'>"+delXmlExtension(source[index])+"</div> <div class='delete'>删除</div>";  
                  target.append(li);  
              }
           
              
    }

    function readFileContent(fileName){
       fs.readFile('./resource/'+fileName+".xml", function(err, data) {
            
            console.log(data.toString());

            $(doc).find("body").html(data.toString());
             
            $("#title").val(delXmlExtension(fileName));
        });
    }
    //delete the xml file extension
    function delXmlExtension(str){
        var reg= /\.xml$/; 
        return str.replace(reg,'');
    }
    window.doc=doc;

});

function fontEdit(x,y)
    {
        doc.execCommand(x,"",y);
        console.log(".............");
        editor.focus();
    }

