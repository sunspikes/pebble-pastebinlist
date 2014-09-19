// Load libraries
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Settings = require('settings');

// Settings
var listLength = 300;
var noteId = 'KvFwULR6';
var URL = 'http://pastebin.com/raw.php?i=' + noteId;
var myList = Settings.data('myList') || "Press 'select' to load the list.";

// Create the splash window and card
var splashWindow = new UI.Window();
var card = new UI.Card();
card.setTitle('Pastebin List');
card.setBody(myList);
card.show();

// When clicked select, load the list
card.on('click', 'select', function(e) {
  loadList();
});

function showSplash() {
  // Show splash screen while waiting for data
  splashWindow.setBackgroundColor('white');
    
  // Text element to inform user
  var text = new UI.Text({
    position: new Vector2(0, 30),
    size: new Vector2(144, 40),
    text:'Downloading the list...',
    font:'GOTHIC_28_BOLD',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center'
  });
    
  // Add to splashWindow and show
  splashWindow.add(text);
  splashWindow.show();  
}

function loadList() {
  showSplash();
  
  // Make the request
  ajax(
    {
      url: URL
    },
    function(data) {
      // Success!
      console.log("Successfully fetched list from pastebin!");
  
      // Truncate the data
      myList = String.substr(data, 0, listLength);
      Settings.data('myList', myList);
      
      splashWindow.hide();
      
      // Show the list
      card.setBody(myList);      
      
      // Notify the user
      Vibe.vibrate('short');    
    },
    function(error) {
      // Failure!
      console.log('Failed fetching list: ' + error);
      
      var card = new UI.Card({
        title:'My List',
        body: 'Error: cannot fetch '+ noteId + ' from pastebin.com'
      });
      
      card.show();
    }
  );

}