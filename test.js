const { exec } = require('child_process');

exec('nativefier www.hotstar.com',(e,r)=>{
    r= r.split('App built to ')[1].split(', move to wherever it')[0]
    console.log(r);
})