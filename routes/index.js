var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');

/* GET home page. */
router.get('/',function(req,res){
 let files=[] 
 var data = fs.readdirSync('./uploads',{withFileTypes:true})

 data.forEach(function(dets){ 
  files.push({name:dets.name, isFolder:dets.isDirectory()}) 
 })
 res.render('index',{files:files,filename:""}) 
})

router.get('/createfile',function(req,res){
  fs.writeFile(`./uploads/${req.query.AddFile}`,"",function(err,data){
    res.redirect('/')
  })
})

router.get('/delete/:name',function(req,res){ 

  if(req.params.name.split('.')[1]){ 
    fs.unlink(`./uploads/${req.params.name}`,function(err){ 
      res.redirect('/')
     })
  }else{
    console.log('hey')
    fs.rmdir(`./uploads/${req.params.name}`,function(err){ 
      res.redirect('/')
    })
  }
})
router.get('/createFolder',function(req,res){ 
  fs.mkdir(`./uploads/${req.query.addNewFolder}`,function(err,data){
    res.redirect('/')
  })
})

router.get('/close',function(req,res){
  res.redirect('/')
})


//open file

router.get('/file/:openfile',function(req,res){
  var files=[]
  var data = fs.readdirSync("./uploads",{withFileTypes:true})
  data.forEach(function(dets){
    files.push({name:dets.name,isFolder:dets.isDirectory()})
  })
  fs.readFile(`./uploads/${req.params.openfile}`,"utf-8",function(err,data){
    if(err)throw err;
    res.render('index',{files:files,filedata:data,filename:req.params.openfile}) 
  })
})

//open output
router.get('/openfile/:filename', function(req, res){
  res.sendFile(path.join(__dirname , `../uploads/${req.params.filename}`));
})

//save file
router.post('/savefile/:namefile',function(req,res){
  fs.writeFile(`./uploads/${req.params.namefile}`,req.body.datafile,"utf-8",function(err,data){ 
    if(err)throw err;
    res.redirect(`/file/${req.params.namefile}`);
  })
})

module.exports = router