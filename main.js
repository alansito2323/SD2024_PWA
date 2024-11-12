//Service worker

if('serviceWorker' in navigator){
    console.log('SW');

    navigator.serviceWorker.register('./sw.js')
                    .then(res => console.log('serviceworker cargado '))
                    .catch(err => console.log('Serviceworker no cargado'))
    
}else{
    console.log('No se puedo');
    
}