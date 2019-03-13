// const browser = /Chrome/.test(navigator.userAgent) ? chrome : browser;

// brow.runtime.onInstalled.addListener((details) => {
//   if (details.reason === 'update') {
//     return;
//   }

//   brow.tabs.create({
//     active: true,
//     url: 'https://github.com/constfun/create-react-WebExtension/blob/master/packages/react-scripts/template/README.md',
//   });
// });

function handleMessage(request, sender, sendResponse) {
  sendResponse(request.type + " YAA")
}

chrome.runtime.onMessage.addListener(handleMessage);
