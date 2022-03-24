a.buildNativefierApp({
    name: 'whatsapp',
    platform: 'linux',
    '--arch x64': true,
    width: '1024',
    height: '768',
    tray: true,
    'disable-dev-tools': true,
    'single-instance': 'web.whatsapp.com'
}).then((r) => {
    console.log('done');
}).catch((r) => {
    console.log(r);
})