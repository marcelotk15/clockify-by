// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//   if(msg.icon) {
//     console.log({ icon })

//      chrome.tabs.query({ active:true, windowType:"normal", currentWindow: true }, function(d){
//         var tabId = d[0].id;

//         chrome.browserAction.setIcon({path: 'icons/logo@128.png', tabId: tabId});
//     })
//   }
// }