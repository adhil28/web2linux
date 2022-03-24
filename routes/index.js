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


  nativefier.buildNativefierApp({
    name: data.name,
    platform: 'linux',
    '--arch x64': true,
    width: '1024',
    height: '768',
    tray: true,
    'disable-dev-tools': true,
    'single-instance': data.site
  }).then((path) => {
    console.log('App successfully created. ', 'Packing app');
    Zip.zip(path, `${data.name}.zip`).then(() => {
      console.log('packed successfully. ', 'sending file');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
      res.setHeader('Access-Control-Allow-Credentials', true);

      res.download(`${data.name}.zip`)

      setTimeout(() => {
        console.log('Deleting files')
        fs.unlinkSync(`${data.name}.zip`)
        fs.rmSync(path, { recursive: true, force: true });
      }, 1000 * 60 * 5)

    })
  }).catch((r) => {
    console.log(r);
  })
})

module.exports = router;
