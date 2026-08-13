(async () =>{
    const module = await import(chrome.runtime.getURL('content.js'));
    
    module.start();
})();