const fs = require('fs');
const {BrowserWindow, dialog} = require('electron').remote;

let inputArea = null;
let inputTxt = null;
let footerArea = null;
let currentPath = "";
let editor = null;

function onLoad() {
  inputArea = document.getElementById("input_area");
  inputTxt = document.getElementById("input_txt");
  footerArea = document.getElementById("file_name");

  editor = ace.edit("input_txt");
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.setTheme("ace/theme/monokai");


  document.ondragover = document.ondrop = function (e) {
    e.preventDefault(); 
    return false;
  };

  inputArea.ondragover = function () {
    return false;
  };

  inputArea.ondragleave = inputArea.ondragend = function () {
    return false;
  };

  inputArea.ondrop = function (e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    readFile(file.path);
    return false;
  };

};


function openLoadFile() {
  const win = BrowserWindow.getFocusedWindow();

  dialog.showOpenDialog(
    win, {properties: ['openFile'],},
    function (filenames) {
      if (filenames) {
        readFile(filenames[0]);
      }
    });
}


function readFile(path) {
  currentPath = path;

  fs.readFile(path, function (error, text) {
    if (error != null) {
      alert('Error : ' + error);
      return;
    }

    footerArea.innerHTML = path;
    editor.setValue(text.toString(), -1);
  });
}


function saveFile() {
  if (currentPath == "") {
    saveNewFile();
    return;
  }

  var data = editor.getValue();
  writeFile(currentPath, data);
}


function writeFile(path, data) {
  fs.writeFile(path, data, function (error) {
    if (error != null) {
      alert('Error : ' + error);
      return;
    }
  });
}


function saveNewFile() {
  const win = BrowserWindow.getFocusedWindow();

  dialog.showSaveDialog(
    win, {properties: ['openFile']},
    function (fileName) {
      if (fileName) {
        var data = editor.getValue();
        currentPath = fileName;
        writeFile(currentPath, data);
      }
    }
  );
}