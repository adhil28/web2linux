var express = require('express');
var router = express.Router();
let fs = require('fs')
const { exec } = require('child_process');
var Zip = require('zip-a-folder');

let nativefier = require('nativefier')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/gen', (req, res) => {


  let data = req.body

  console.log(data);
  data.name = data.name + Math.floor((Math.random() * 1000000) + 1);
  data.site = data.site.replace('https://', '')

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (data.logo == null) {
    data.logo = 'https://logopond.com/logos/764befce2161b53b5895108e1e8597d7.png'
  }
  exec('nativefier '+data.site,(e,r)=>{
    let path = r.split('App built to ')[1].split(', move to wherever it')[0]
    console.log(e,path);
    console.log('App successfully created. ', 'Packing app');
    Zip.zip(path, `${data.name}.zip`).then(() => {
      console.log('packed successfully. ', 'sending file');
      res.download(`${data.name}.zip`)

      setTimeout(() => {
        console.log('Deleting files')
        fs.unlinkSync(`${data.name}.zip`)
        fs.rmSync(path, { recursive: true, force: true });
      }, 1000 * 60 * 5)

    })

  })

})

module.exports = router;
