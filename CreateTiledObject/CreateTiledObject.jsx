﻿ /* * CreateTiledObject.jsx * * Copyright (c) more_more_for. * * This software is released under the MIT License. * http://opensource.org/licenses/mit-license.php * */preferences.rulerUnits = Units.PIXELS;var openDoc = activeDocument;openDoc.suspendHistory('CreateTiledObject', 'main()')function handle_key (event) {  var step;  ScriptUI.environment.keyboardState['shiftKey'] ? step = 10 : step = 1;  if(event.keyName == 'LeftBracket'){    this.text = Number(this.text)-step;    event.preventDefault();  }  if(event.keyName == 'RightBracket'){    this.text = Number(this.text)+step;    event.preventDefault();  }}function createDialog() {        var dlg = new Window('dialog', 'Move Objects', [100, 100, 250, 280]);        dlg.countX = dlg.add('edittext', [40, 10, 140, 30]);        dlg.labelX = dlg.add('statictext',[10, 10, 30, 30] ,"X:",{multiline:true});        dlg.countY = dlg.add('edittext', [40, 60, 140, 80]);        dlg.labelY = dlg.add('statictext',[10, 60, 30, 80], "Y:",{multiline:true});        dlg.cancelButton = dlg.add('button', [10, 120, 100, 160], 'cancel');        dlg.okButton = dlg.add('button', [110, 120, 140, 160], 'OK');        dlg.countX.addEventListener ("keydown", handle_key );        dlg.countY.addEventListener ("keydown",  handle_key );        dlg.countX.text = 0;        dlg.countY.text = 0;        dlg.countX.active = true;        return dlg;}function initializeDialog(w) {  w.okButton.onClick = w.okButton.onClick = function() {      var moveLayer = openDoc.activeLayer;      var _x = w.countX.text * 1.0;      var _y = w.countY.text * 1.0;      var xx;      var yy;      if(_x == null){        xx = 0;      }else {        xx = _x;      }      if (_y == null) {        yy = 0;      }else {        yy = _y;      }      CreateTiledObject(openDoc, xx, yy);      w.close();  }}function main() {  var win = createDialog();  initializeDialog(win);  win.show();}function CreateTiledObject(doc, xx, yy) {  var _activeLayer = doc.activeLayer;  var duplicateLayer = doc.activeLayer.duplicate();  doc.activeLayer = duplicateLayer;  duplicateLayer.merge();  var imgInfo = getImageInfo(doc.activeLayer);  var tileW = imgInfo.imageW;  var tileH = imgInfo.imageH;  doc.activeLayer.remove();  doc.activeLayer = _activeLayer;  var tileLayer = doc.activeLayer;  var layerSetRef = doc.layerSets.add()  layerSetRef.name = "Tiled Y: 0";  var allLayerSetRef = doc.layerSets.add()  allLayerSetRef.name = "All Tiled"  // GET Index.  var layerSetRefIdx = getLayerIndex(layerSetRef);  var allLayerSetRefIdx = getLayerIndex(allLayerSetRef);  if (xx == 0) {    doc.activeLayer = tileLayer;    tileLayer.name = "Tiled";    moveLayerToIndex(layerSetRefIdx-1);    doc.activeLayer = layerSetRef;  } else {    for(var i=0; i < xx; i++) {      if(i == 0) {        doc.activeLayer = tileLayer;        tileLayer.name = "Tiled X: " + i;        moveLayerToIndex(layerSetRefIdx-1);      }      var duplicateLayer = doc.activeLayer.duplicate();      duplicateLayer.translate(tileW, 0);      duplicateLayer.name = "Tiled X: " + (i + 1);      if(i == (xx-1)) {        doc.activeLayer = layerSetRef;      } else {        doc.activeLayer = duplicateLayer;      }    }  }    allLayerSetRefIdx = getLayerIndex(allLayerSetRef);  moveLayerToIndex(allLayerSetRefIdx-1);  for(var j=0; j < yy; j++) {    var duplicateLayerSet = doc.activeLayer.duplicate();    duplicateLayerSet.translate(0, tileH);    duplicateLayerSet.name = "Tiled Y: " + (j + 1);    doc.activeLayer = duplicateLayerSet;  }}function getImageInfo(layer) {  var layObj = layer.bounds;  var infoX = parseInt(layObj[0]);  var infoY = parseInt(layObj[1]);  var infoW = parseInt(layObj[2] - layObj[0]);  var infoH = parseInt(layObj[3] - layObj[1]);  var centerX = infoX + infoW/2;  var centerY = infoY + infoH/2;  var imageInfoArr = {"imageX":infoX, "imageY":infoY, "imageW":infoW, "imageH":infoH, "centerX":centerX, "centerY":centerY };  return imageInfoArr;}function convertSmartObject() {  var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );  executeAction( idnewPlacedLayer, undefined, DialogModes.NO );}function duplicateActiveLayer() {  var idDplc = charIDToTypeID( "Dplc" );    var desc218 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref215 = new ActionReference();        var idLyr = charIDToTypeID( "Lyr " );        var idOrdn = charIDToTypeID( "Ordn" );        var idTrgt = charIDToTypeID( "Trgt" );        ref215.putEnumerated( idLyr, idOrdn, idTrgt );    desc218.putReference( idnull, ref215 );    var idNm = charIDToTypeID( "Nm  " );    desc218.putString( idNm, """Tiled""" );  executeAction( idDplc, desc218, DialogModes.NO );}function moveLayerToIndex(idx) {  var idmove = charIDToTypeID( "move" );      var desc11 = new ActionDescriptor();      var idnull = charIDToTypeID( "null" );          var ref5 = new ActionReference();          var idLyr = charIDToTypeID( "Lyr " );          var idOrdn = charIDToTypeID( "Ordn" );          var idTrgt = charIDToTypeID( "Trgt" );          ref5.putEnumerated( idLyr, idOrdn, idTrgt );      desc11.putReference( idnull, ref5 );      var idT = charIDToTypeID( "T   " );          var ref6 = new ActionReference();          var idLyr = charIDToTypeID( "Lyr " );          ref6.putIndex( idLyr, idx );      desc11.putReference( idT, ref6 );  executeAction( idmove, desc11, DialogModes.NO );}function getLayerIndex(layerRef) {  _layerRef = app.activeDocument.activeLayer;  app.activeDocument.activeLayer = layerRef;  var arr = getSelectedLayersIdx();  app.activeDocument.activeLayer = _layerRef;  return arr[0];}function getSelectedLayersIdx(){       var selectedLayers = new Array;       var ref = new ActionReference();       ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );       var desc = executeActionGet(ref);       if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){          desc = desc.getList( stringIDToTypeID( 'targetLayers' ));           var c = desc.count           var selectedLayers = new Array();           for(var i=0;i<c;i++){             try{                activeDocument.backgroundLayer;                selectedLayers.push(  desc.getReference( i ).getIndex() );             }catch(e){                selectedLayers.push(  desc.getReference( i ).getIndex()+1 );             }           }        }else{          var ref = new ActionReference();          ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));          ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );          try{             activeDocument.backgroundLayer;             selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);          }catch(e){             selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));          }      var vis = app.activeDocument.activeLayer.visible;        if(vis == true) app.activeDocument.activeLayer.visible = false;        var desc9 = new ActionDescriptor();    var list9 = new ActionList();    var ref9 = new ActionReference();    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );    list9.putReference( ref9 );    desc9.putList( charIDToTypeID('null'), list9 );    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();        app.activeDocument.activeLayer.visible = vis;      }       return selectedLayers; };