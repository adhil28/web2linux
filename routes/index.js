var express = require('express');
var router = express.Router();
let fs = require('fs')
const { exec } = require('child_process');
var Zip = require('zip-a-folder');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/gen', (req, res) => {
  let data = req.body

  data.name = data.name + Math.floor((Math.random() * 1000000) + 1);
  data.site = data.site.replace('https://', '')
  res.setHeader('Access-Control-Allow-Origin', '*')

  createLinuxApp(data, res)
})


function createLinuxApp(data, res) {
  exec(`nativefier ${data.site}`, (e, r) => {
    let path = r.split('App built to ')[1].split(', move to wherever it')[0]
    console.log(e, r);
    console.log('App successfully created. ', 'Packing app');
    Zip.zip(path, `${data.name}.zip`).then(() => {
      console.log('packed successfully. ', 'sending file');
      res.download(`${data.name}.zip`)

      setTimeout(() => {
        console.log('Deleting files')
        fs.unlinkSync(`${data.name}.zip`)
        fs.rmSync(path, { recursive: true, force: true });
      }, 1000 * 60 * 2)

    })

  })
}

module.exports = router;
