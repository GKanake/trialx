(function(){
    var script = {
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
  "this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
  "this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Container_FA5159DE_E8D4_E7D5_41BA_BEC555FA1DEF",
  "this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
  "this.Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
  "this.Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
  "this.Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
  "this.Label_F0600070_E96D_64E8_41D3_8B3B01F40D51"
 ],
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_485BFF41_598E_3DB2_41A9_33F36E014467], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A].forEach(function(component) { component.set('visible', false); }) }",
 "horizontalAlign": "left",
 "layout": "absolute",
 "width": "100%",
 "scripts": {
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "registerKey": function(key, value){  window[key] = value; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "existsKey": function(key){  return key in window; },
  "getKey": function(key){  return window[key]; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } }
 },
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "downloadEnabled": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "paddingRight": 0,
 "minHeight": 20,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 20,
 "buttonToggleMute": "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "buttonCardboardView": "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "buttonToggleHotspots": "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "touchControlMode": "drag_rotation"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera",
 "automaticZoomSpeed": 10
},
{
 "to": "bottom",
 "id": "effect_5AA06BD7_5525_9D02_41C9_085D9BA714C6",
 "duration": 500,
 "easing": "linear",
 "class": "SlideOutEffect"
},
{
 "from": "bottom",
 "id": "effect_5AA07BD7_5525_9D02_41C1_AA2CD60C53FF",
 "duration": 500,
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "items": [
  {
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "id": "effect_45437E97_551D_9703_41C1_1740661A2FF4",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "id": "effect_4459B507_5524_B502_41BD_8FFC94E77638",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "items": [
  {
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist",
 "class": "PlayList"
},
{
 "id": "effect_440AC66E_556C_9702_41D0_4192FD6AA32A",
 "duration": 300,
 "easing": "linear",
 "class": "FadeOutEffect"
},
{
 "id": "effect_5AF0B877_5525_BB03_41CA_C72856CE1FD3",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "id": "effect_45025D8F_552D_9502_419D_6694005656DA",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "id": "effect_4447264F_5564_9702_4196_EEACC856A573",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "id": "effect_445F7330_5523_AD1D_41D2_6FCE76D0CD98",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "items": [
  {
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "class": "PlayList"
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Sitting Room",
 "id": "panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
 "thumbnailUrl": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/0/{row}_{column}.jpg",
      "rowCount": 7,
      "tags": "ondemand",
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "width": 3584,
      "height": 3584
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/1/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMax": 130,
 "hfov": 360
},
{
 "id": "effect_447B6705_5565_9506_41D4_EC87240E290E",
 "duration": 300,
 "easing": "linear",
 "class": "FadeOutEffect"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera",
 "automaticZoomSpeed": 10
},
{
 "id": "effect_448F2E38_5524_B70E_41CF_91F39F517197",
 "duration": 300,
 "easing": "linear",
 "class": "FadeOutEffect"
},
{
 "id": "effect_5AAA6DC6_552C_9502_41D2_C44CA652D949",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "Kitchen",
 "id": "panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
 "overlays": [
  "this.overlay_B5527DA9_A726_D992_41DD_5D980F3C681F",
  "this.overlay_B53CDB81_A72B_F992_41D5_16EB6E049B28"
 ],
 "vfov": 180,
 "class": "Panorama",
 "partial": false,
 "thumbnailUrl": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_t.jpg"
  }
 ],
 "pitch": 0,
 "hfovMin": "150%",
 "hfov": 360
},
{
 "id": "effect_4559EC8F_5523_9B02_41C3_9EB7B157A9A5",
 "duration": 300,
 "easing": "linear",
 "class": "FadeOutEffect"
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Guest BedRoom",
 "id": "panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
 "thumbnailUrl": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Master BedRoom",
 "id": "panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
 "thumbnailUrl": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F250F195_FF6F_1079_4181_04A0788D93A1_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "id": "effect_45AFC616_551D_9702_4197_DE17F8BFB338",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Guest Bedroom 2",
 "id": "panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
 "thumbnailUrl": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Guest Bedroom 3",
 "id": "panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
 "thumbnailUrl": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "id": "effect_45DB8DE7_5564_9502_41D0_7AA3C5AFD96F",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "id": "effect_45BC949E_551D_6B02_41CA_30DFB9F3C5B5",
 "duration": 300,
 "easing": "linear",
 "class": "FadeInEffect"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera",
 "automaticZoomSpeed": 10
},
{
 "id": "effect_446187E6_556D_F502_41B3_073334F88DEE",
 "duration": 300,
 "easing": "linear",
 "class": "FadeOutEffect"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera",
 "automaticZoomSpeed": 10
},
{
 "vfov": 180,
 "class": "Panorama",
 "label": "Home Office",
 "id": "panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
 "thumbnailUrl": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_t.jpg",
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "height": 2048
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "height": 1024
     },
     {
      "url": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_t.jpg"
  }
 ],
 "partial": false,
 "pitch": 0,
 "hfovMin": "135%",
 "hfovMax": 130,
 "hfov": 360
},
{
 "items": [
  {
   "media": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_camera"
  },
  {
   "media": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F33B5D56_FF69_F0FA_41E2_AD4A6F8944EB_camera"
  },
  {
   "media": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2DAC7D0_FF6E_FFF7_41E4_BAB2801107C4_camera"
  },
  {
   "media": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2128B04_FF6F_105F_41E9_CE1C982CD0A4_camera"
  },
  {
   "media": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera"
  },
  {
   "media": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F2285343_FF69_10D9_41DC_276219F9EEEC_camera"
  },
  {
   "media": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F250F195_FF6F_1079_4181_04A0788D93A1_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_F2D31F0F_FF69_1069_41E1_7AA911324101_camera",
 "automaticZoomSpeed": 10
},
{
 "toolTipFontSize": "12px",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "right": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "minHeight": 50,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 10,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 100,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingLeft": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 0,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "shadow": false
},
{
 "shadow": false,
 "paddingLeft": 0,
 "id": "Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94",
 "left": 64,
 "width": 153,
 "horizontalAlign": "left",
 "layout": "absolute",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "contentOpaque": false,
 "top": 101,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 55,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4",
 "width": 60,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 1,
 "horizontalAlign": "center",
 "right": 22,
 "contentOpaque": false,
 "scrollBarWidth": 5,
 "children": [
  "this.Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
  "this.Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
  "this.Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
  "this.Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
  "this.Button_485BFF41_598E_3DB2_41A9_33F36E014467"
 ],
 "layout": "vertical",
 "top": 70,
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "minWidth": 1,
 "borderRadius": 10,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0.02
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "gap": 0,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "id": "ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC",
 "width": 903.2,
 "horizontalAlign": "left",
 "right": "20.81%",
 "itemThumbnailShadowVerticalLength": 3,
 "itemLabelFontFamily": "Arial",
 "itemBorderRadius": 0,
 "minHeight": 20,
 "selectedItemLabelFontColor": "#79675E",
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "top",
 "height": 153.1,
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 20,
 "playList": "this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC_playlist",
 "itemThumbnailShadowSpread": 1,
 "minWidth": 20,
 "itemThumbnailBorderRadius": 50,
 "borderSize": 0,
 "propagateClick": false,
 "itemBackgroundColor": [
  "#000000",
  "#000000"
 ],
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [
  0.58,
  0.92
 ],
 "itemThumbnailShadowOpacity": 0,
 "rollOverItemBackgroundOpacity": 0,
 "itemVerticalAlign": "middle",
 "itemThumbnailShadow": true,
 "rollOverItemLabelFontWeight": "normal",
 "scrollBarMargin": 2,
 "paddingLeft": 20,
 "layout": "horizontal",
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "itemThumbnailHeight": 75,
 "itemThumbnailShadowBlurRadius": 8,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 14,
 "itemThumbnailScaleMode": "fit_outside",
 "bottom": "2.29%",
 "itemThumbnailWidth": 75,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "itemLabelGap": 9,
 "itemLabelFontColor": "#36454F",
 "scrollBarColor": "#FFFFFF",
 "click": "this.setComponentVisibility(this.Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1, true, 0, null, null, false)",
 "paddingTop": 10,
 "class": "ThumbnailList",
 "itemThumbnailShadowColor": "#000000",
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList35762"
 },
 "paddingBottom": 10,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "itemPaddingRight": 3,
 "itemLabelHorizontalAlign": "center",
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "rollOverItemLabelFontColor": "#C0C0C0",
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_4447264F_5564_9702_4196_EEACC856A573, 'showEffect', false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---INFO photo"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PANORAMA LIST"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---LOCATION"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---FLOORPLAN"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---PHOTOALBUM"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "paddingLeft": 0,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "right": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0.6,
 "paddingRight": 0,
 "minWidth": 1,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "---REALTOR"
 },
 "gap": 10,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_FA5159DE_E8D4_E7D5_41BA_BEC555FA1DEF",
 "left": "1.93%",
 "children": [
  "this.IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
  "this.IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
  "this.IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
  "this.IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
  "this.IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
  "this.IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
  "this.IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52"
 ],
 "horizontalAlign": "left",
 "layout": "absolute",
 "width": "3.378%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "top": "24.09%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "contentOpaque": false,
 "paddingRight": 0,
 "height": "51.207%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container14356"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "Container_0542AAAA_3AA3_A6F3_41B2_0E208ADBBBE1",
 "width": 210,
 "scrollBarMargin": 2,
 "horizontalAlign": "right",
 "right": "0.6%",
 "children": [
  "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
  "this.Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89"
 ],
 "scrollBarWidth": 10,
 "minHeight": 1,
 "borderColor": "#79675E",
 "contentOpaque": false,
 "layout": "horizontal",
 "top": "0.94%",
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "height": 55,
 "paddingRight": 15,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 3,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "class": "Container",
 "scrollBarOpacity": 0.7,
 "data": {
  "name": "-button set container"
 },
 "gap": 3,
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "fontFamily": "Maiandra GD",
 "paddingLeft": 0,
 "id": "Label_0E9CEE5D_36F3_E64E_419C_5A94FA5D3CA1",
 "left": "4.16%",
 "width": 224,
 "horizontalAlign": "left",
 "fontColor": "#FFFFFF",
 "text": "Nestopia VT.",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "bottom": "93.72%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "fontSize": 31,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textDecoration": "none",
 "data": {
  "name": "Label Company Name"
 },
 "paddingBottom": 0,
 "shadow": false,
 "fontWeight": "bold"
},
{
 "maxHeight": 30,
 "paddingLeft": 0,
 "id": "Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50",
 "left": "1.63%",
 "horizontalAlign": "center",
 "width": "2.413%",
 "maxWidth": 40,
 "url": "skin/Image_05314BAF_3AA1_A6F2_41CB_86A11240FA50.png",
 "minHeight": 1,
 "top": "1.15%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "bottom": "95.71%",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "class": "Image",
 "scaleMode": "fit_inside",
 "data": {
  "name": "logo"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "fontFamily": "Maiandra GD",
 "paddingLeft": 0,
 "id": "Label_0C5F23A8_3BA0_A6FF_419F_468451E37918",
 "left": 53,
 "width": 205,
 "horizontalAlign": "left",
 "textShadowColor": "#36454F",
 "fontColor": "#FFFFFF",
 "text": "Vision Apts.",
 "minHeight": 1,
 "textShadowVerticalLength": 0,
 "top": 78,
 "verticalAlign": "top",
 "height": 41,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "fontSize": "38px",
 "minWidth": 1,
 "textShadowBlurRadius": 30,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textShadowHorizontalLength": 3,
 "textShadowOpacity": 1,
 "textDecoration": "none",
 "data": {
  "name": "text 2"
 },
 "paddingBottom": 0,
 "shadow": false,
 "fontWeight": "bold"
},
{
 "fontFamily": "Maiandra GD",
 "paddingLeft": 0,
 "id": "Label_F0600070_E96D_64E8_41D3_8B3B01F40D51",
 "left": "6.04%",
 "width": 148.85,
 "horizontalAlign": "left",
 "textShadowColor": "#36454F",
 "fontColor": "#FFFFFF",
 "text": "Kahawa Wendani",
 "minHeight": 1,
 "textShadowVerticalLength": 0,
 "top": 123,
 "verticalAlign": "top",
 "height": 21,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "fontSize": 18,
 "minWidth": 1,
 "textShadowBlurRadius": 30,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "fontStyle": "normal",
 "class": "Label",
 "textShadowHorizontalLength": 3,
 "textShadowOpacity": 1,
 "textDecoration": "none",
 "data": {
  "name": "text 2"
 },
 "paddingBottom": 0,
 "shadow": false,
 "fontWeight": "normal"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A",
 "iconWidth": 30,
 "width": 60,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "shadowBlurRadius": 6,
 "pressedIconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A_pressed.png",
 "borderColor": "#000000",
 "iconHeight": 30,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 44,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "toggle",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "iconURL": "skin/Button_4CF1FD24_5A86_3DF2_41B3_7CDBA2E3D44A.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_4C5C0864_5A8E_C472_41C4_7C0748488A41",
 "iconWidth": 30,
 "width": 59,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "shadowBlurRadius": 6,
 "pressedIconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41_pressed.png",
 "borderColor": "#000000",
 "iconHeight": 30,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 65,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "toggle",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button Settings Mute"
 },
 "iconURL": "skin/Button_4C5C0864_5A8E_C472_41C4_7C0748488A41.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_485BFF41_598E_3DB2_41A9_33F36E014467",
 "iconWidth": 30,
 "width": 60,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "shadowBlurRadius": 6,
 "pressedIconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467_pressed.png",
 "borderColor": "#000000",
 "iconHeight": 30,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 54,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "toggle",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "rollOverIconWidth": 30,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "rollOverIconHeight": 30,
 "data": {
  "name": "Button Settings Gyro"
 },
 "iconURL": "skin/Button_485BFF41_598E_3DB2_41A9_33F36E014467.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0",
 "iconWidth": 30,
 "width": 60,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "fontFamily": "Arial",
 "pressedIconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0_pressed.png",
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "iconHeight": 30,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 52,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "push",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#79675E"
 ],
 "class": "Button",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button settings VR"
 },
 "iconURL": "skin/Button_4D1C404A_5A87_C3B6_41BC_63B811C40CD0.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA",
 "iconWidth": 30,
 "width": 56,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedIconHeight": 30,
 "fontFamily": "Arial",
 "pressedIconWidth": 30,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#36454F"
 ],
 "shadowBlurRadius": 6,
 "pressedIconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA_pressed.png",
 "borderColor": "#000000",
 "iconHeight": 30,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 59,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "toggle",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#666666"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "rollOverIconWidth": 30,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "rollOverIconHeight": 30,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button Settings HS"
 },
 "iconURL": "skin/Button_4DE935B8_5A86_4CD2_41A9_D487E3DF3FBA.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.19,
   "yaw": 22.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_2_0.png",
      "width": 40,
      "height": 40,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 7.19,
   "yaw": 22.66,
   "pitch": -2.82
  }
 ],
 "id": "overlay_B5527DA9_A726_D992_41DD_5D980F3C681F",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 7.18,
   "yaw": -65.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.09,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F14D4E75_FF5F_659D_41D7_B21CD36C532A_0_HS_3_0.png",
      "width": 40,
      "height": 40,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "hfov": 7.18,
   "yaw": -65.26,
   "pitch": -4.09
  }
 ],
 "id": "overlay_B53CDB81_A72B_F992_41D5_16EB6E049B28",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "15%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "horizontal",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "15%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "horizontalAlign": "right",
 "right": "15%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "vertical",
 "top": "10%",
 "verticalAlign": "top",
 "bottom": "80%",
 "creationPolicy": "inAdvance",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "absolute",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "horizontal",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "horizontalAlign": "right",
 "right": "15%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "vertical",
 "top": "10%",
 "verticalAlign": "top",
 "bottom": "80%",
 "creationPolicy": "inAdvance",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "absolute",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "vertical",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "shadowHorizontalLength": 0,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "15%",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "15%",
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "minHeight": 1,
 "shadowSpread": 1,
 "layout": "horizontal",
 "top": "10%",
 "scrollBarWidth": 10,
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "verticalAlign": "top",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "10%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "gap": 0,
 "data": {
  "name": "Global"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": true,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "79.28%",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "horizontalAlign": "right",
 "right": "15.36%",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "layout": "vertical",
 "top": "9.97%",
 "verticalAlign": "top",
 "bottom": "81.78%",
 "creationPolicy": "inAdvance",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8",
 "left": "11.27%",
 "width": 44,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_pressed.png",
 "maxWidth": 101,
 "minHeight": 1,
 "top": "3.38%",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_4559EC8F_5523_9B02_41C3_9EB7B157A9A5, 'hideEffect', false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, this.effect_45025D8F_552D_9502_419D_6694005656DA, 'showEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Realtor"
 },
 "shadow": false,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B201C51_3AA0_A251_41CD_5CC0A59F2DE8.png",
 "cursor": "hand"
},
{
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0",
 "left": "11.27%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "top": "15.46%",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, this.effect_4459B507_5524_B502_41BD_8FFC94E77638, 'showEffect', false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_448F2E38_5524_B70E_41CF_91F39F517197, 'hideEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Location"
 },
 "shadow": false,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B21CC51_3AA0_A251_41C9_1ABF5F74EDA0.png",
 "cursor": "hand"
},
{
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B",
 "left": "12.68%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "top": "37.1%",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, this.effect_45AFC616_551D_9702_4197_DE17F8BFB338, 'showEffect', false); this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_446187E6_556D_F502_41B3_073334F88DEE, 'hideEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Floorplan"
 },
 "shadow": false,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B206C51_3AA0_A251_41A3_B3DB657BC52B.png",
 "cursor": "hand"
},
{
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA",
 "left": "11.27%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "top": "26.68%",
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, this.effect_445F7330_5523_AD1D_41D2_6FCE76D0CD98, 'showEffect', false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_440AC66E_556C_9702_41D0_4192FD6AA32A, 'hideEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "shadow": false,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B21FC51_3AA0_A251_41CC_46CDE74591EA.png",
 "cursor": "hand"
},
{
 "shadow": false,
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8",
 "left": "11.27%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "bottom": "43.46%",
 "rollOverIconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "if(!this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC.get('visible')){ this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_5AA07BD7_5525_9D02_41C1_AA2CD60C53FF, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_5AA06BD7_5525_9D02_41C9_085D9BA714C6, 'hideEffect', false) }; this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Thumblist"
 },
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B21DC51_3AA0_A251_41B1_CEAABC2475F8.png",
 "cursor": "hand"
},
{
 "shadow": false,
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93",
 "left": "11.27%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "bottom": "33.43%",
 "rollOverIconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Video"
 },
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B200C51_3AA0_A251_41CC_7E57609B3C93.png",
 "cursor": "hand"
},
{
 "shadow": false,
 "maxHeight": 101,
 "paddingLeft": 0,
 "id": "IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52",
 "left": "12.68%",
 "width": 44,
 "horizontalAlign": "center",
 "maxWidth": 101,
 "minHeight": 1,
 "verticalAlign": "middle",
 "height": 44,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "bottom": "22.99%",
 "rollOverIconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, this.effect_45DB8DE7_5564_9502_41D0_7AA3C5AFD96F, 'showEffect', false); this.setComponentVisibility(this.Container_0C5F33A8_3BA0_A6FF_41C3_2A6652E2CE94, false, 0, null, null, false); this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false); this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, false, 0, this.effect_447B6705_5565_9506_41D4_EC87240E290E, 'hideEffect', false)",
 "propagateClick": false,
 "paddingTop": 0,
 "class": "IconButton",
 "transparencyActive": true,
 "data": {
  "name": "IconButton Info"
 },
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_7B212C50_3AA0_A1AF_41C5_F659ED22BD52.png",
 "cursor": "hand"
},
{
 "fontFamily": "Montserrat",
 "paddingLeft": 15,
 "id": "DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312",
 "width": 128,
 "fontColor": "#FFFFFF",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "popUpPaddingTop": 10,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#36454F"
 ],
 "popUpBackgroundOpacity": 1,
 "popUpFontColor": "#FFFFFF",
 "popUpShadowBlurRadius": 6,
 "popUpShadow": false,
 "popUpShadowOpacity": 0,
 "popUpShadowColor": "#000000",
 "popUpBorderRadius": 5,
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 15,
 "minHeight": 1,
 "height": "72.917%",
 "playList": "this.DropDown_05789A1B_3AA3_A1D2_41CC_002739F0C312_playlist",
 "arrowColor": "#FFFFFF",
 "minWidth": 1,
 "fontSize": 12,
 "rollOverPopUpBackgroundColor": "#666666",
 "label": "ROOMS",
 "borderRadius": 5,
 "popUpShadowSpread": 1,
 "borderSize": 0,
 "arrowBeforeLabel": false,
 "propagateClick": false,
 "paddingTop": 0,
 "selectedPopUpBackgroundColor": "#36454F",
 "backgroundColorRatios": [
  0
 ],
 "class": "DropDown",
 "popUpPaddingLeft": 15,
 "popUpGap": 2,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 0,
 "textDecoration": "none",
 "data": {
  "name": "DropDown 2"
 },
 "popUpBackgroundColor": "#79675E",
 "shadow": false,
 "popUpPaddingBottom": 10,
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89",
 "iconWidth": 17,
 "width": 54,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#666666"
 ],
 "fontFamily": "Arial",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "pressedIconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89_pressed.png",
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "iconHeight": 17,
 "layout": "horizontal",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 47,
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "mode": "toggle",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "pressedRollOverBackgroundColor": [
  "#36454F"
 ],
 "fontSize": 12,
 "borderRadius": 10,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "if(!this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4.get('visible')){ this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_0A760F11_3BA1_BFAE_41CD_32268FCAF8B4, false, 0, null, null, false) }",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Button",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button Settings"
 },
 "iconURL": "skin/Button_4CC5476E_5ABB_CC4E_41D1_A04ABE17DA89.png",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "layout": "absolute",
 "width": "85%",
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_26D3A42C_3F86_BA30_419B_2C6BE84D2718",
 "width": 8,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "dark sandy beige line"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 50,
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "vertical",
 "width": "50%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#F5DEB3",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 50,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 460,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "class": "Container",
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "overflow": "visible",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "maxHeight": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "paddingLeft": 0,
 "maxWidth": 60,
 "horizontalAlign": "center",
 "width": "25%",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "absolute",
 "width": "100%",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 140,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "itemMaxWidth": 1000,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "horizontalAlign": "center",
 "width": "100%",
 "itemLabelFontFamily": "Montserrat",
 "itemBorderRadius": 0,
 "itemMaxHeight": 1000,
 "minHeight": 1,
 "selectedItemLabelFontColor": "#F7931E",
 "itemHorizontalAlign": "center",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelPosition": "bottom",
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "height": "92%",
 "backgroundOpacity": 0,
 "itemPaddingLeft": 3,
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "minWidth": 1,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "itemWidth": 220,
 "itemBackgroundColor": [],
 "propagateClick": false,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "paddingLeft": 70,
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "itemMinWidth": 50,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 160,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 13,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "bottom": -0.2,
 "itemThumbnailWidth": 220,
 "borderRadius": 5,
 "itemBackgroundColorDirection": "vertical",
 "scrollBarColor": "#F7931E",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "paddingTop": 10,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingBottom": 3,
 "gap": 26,
 "class": "ThumbnailGrid",
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "paddingBottom": 70,
 "itemLabelGap": 7,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "rollOverItemLabelFontColor": "#F7931E",
 "itemLabelHorizontalAlign": "center",
 "shadow": false,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "scrollBarVisible": "rollOver"
},
{
 "paddingLeft": 0,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "insetBorder": false,
 "width": "100%",
 "scrollEnabled": true,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "class": "WebFrame",
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "WebFrame48191"
 },
 "paddingBottom": 0,
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "maxHeight": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "paddingLeft": 0,
 "maxWidth": 60,
 "horizontalAlign": "center",
 "width": "25%",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_5AF0B877_5525_BB03_41CA_C72856CE1FD3, 'showEffect', false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "toolTipFontSize": "12px",
 "toolTipOpacity": 1,
 "id": "MapViewer",
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingLeft": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Floor Plan"
 },
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "horizontalAlign": "left",
 "layout": "absolute",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "absolute",
 "width": "100%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container photo"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "layout": "absolute",
 "width": "55%",
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_27875147_3F82_7A70_41CC_C0FFBB32BEFD",
 "width": 10,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "absolute",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#79675E"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "orange line"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 60,
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "vertical",
 "width": "45%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 1,
 "paddingRight": 60,
 "minHeight": 1,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 460,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "class": "Container",
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "overflow": "visible",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "shadow": false,
 "maxHeight": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "paddingLeft": 0,
 "maxWidth": 60,
 "horizontalAlign": "center",
 "width": "25%",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "minHeight": 50,
 "verticalAlign": "middle",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_5AAA6DC6_552C_9502_41D2_C44CA652D949, 'showEffect', false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxHeight": 1000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "paddingLeft": 0,
 "maxWidth": 2000,
 "horizontalAlign": "center",
 "width": "100%",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "middle",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "class": "Image",
 "scaleMode": "fit_outside",
 "data": {
  "name": "photo"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 60,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "vertical",
 "width": "100%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 520,
 "height": "100%",
 "contentOpaque": false,
 "minWidth": 100,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  0.88
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "horizontal"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 40,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "maxHeight": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "right": 20,
 "width": "100%",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxWidth": 60,
 "maxHeight": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "right": 20,
 "width": "100%",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_45437E97_551D_9703_41C1_1740661A2FF4, 'showEffect', false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "toolTipFontSize": "12px",
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#36454F",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingLeft": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipBorderSize": 0,
 "top": "0%",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 5,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingRight": 5,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 2,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "class": "ViewerArea",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "shadow": false
},
{
 "cursor": "hand",
 "maxHeight": 60,
 "paddingLeft": 0,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "horizontalAlign": "center",
 "width": "14.22%",
 "maxWidth": 60,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "minHeight": 50,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "cursor": "hand",
 "maxHeight": 60,
 "paddingLeft": 0,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "horizontalAlign": "center",
 "right": 10,
 "width": "14.22%",
 "maxWidth": 60,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minHeight": 50,
 "top": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "maxWidth": 60,
 "maxHeight": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "paddingLeft": 0,
 "horizontalAlign": "right",
 "right": 20,
 "width": "10%",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "height": "10%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false); this.setComponentVisibility(this.ThumbnailList_EEE70D6E_FD92_F1AE_41E9_12E7045C66AC, true, 0, this.effect_45BC949E_551D_6B02_41CA_30DFB9F3C5B5, 'showEffect', false)",
 "paddingTop": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.png",
 "class": "IconButton",
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "maxHeight": 1000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "paddingLeft": 0,
 "maxWidth": 2000,
 "horizontalAlign": "center",
 "width": "100%",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "top": "0%",
 "verticalAlign": "bottom",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "class": "Image",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "right",
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "height": 60,
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "vertical",
 "width": "100%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 520,
 "height": "91.713%",
 "contentOpaque": false,
 "minWidth": 100,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 10,
 "shadowHorizontalLength": 3,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": "100%",
 "shadowSpread": 1,
 "paddingRight": 10,
 "shadowVerticalLength": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "shadowOpacity": 0,
 "borderRadius": 40,
 "borderColor": "#FFFFFF",
 "borderSize": 20,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "class": "HTMLText",
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:7.17vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Montserrat';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Montserrat';\"><B>DOLOR SIT AMET</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:0.99vh;font-family:'Montserrat';\"><B>CONSECTETUR ADIPISCING ELIT. MORBI BIBENDUM PHARETRA LOREM, ACCUMSAN SAN NULLA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.99vh;font-family:'Montserrat';\"><B>DONEC FEUGIAT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.88vh;\"> </SPAN>\u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.99vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.99vh;font-family:'Montserrat';\"><B>LOREM IPSUM:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:1.87vh;font-family:'Oswald';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": true,
 "scrollBarVisible": "rollOver"
},
{
 "shadow": false,
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "paddingLeft": 0,
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "iconWidth": 32,
 "width": 180,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#79675E"
 ],
 "fontFamily": "Montserrat",
 "shadowBlurRadius": 6,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "iconHeight": 32,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "height": 50,
 "backgroundOpacity": 0.8,
 "paddingRight": 0,
 "mode": "push",
 "minHeight": 1,
 "backgroundColor": [
  "#79675E"
 ],
 "minWidth": 1,
 "fontSize": "1.96vh",
 "label": "LOREM IPSUM",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#36454F"
 ],
 "class": "Button",
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textDecoration": "none",
 "data": {
  "name": "Button Lorem Ipsum"
 },
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "18.612%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "class": "HTMLText",
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:3.42vh;font-family:'Maiandra GD';\"><U>REALTOR</U></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.87vh;font-family:'Maiandra GD';\"><B>VISION APARTMENTS</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:center;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.87vh;font-family:'Maiandra GD';\"><B>Kahawa Wendani</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.87vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "layout": "horizontal",
 "width": "100%",
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "minHeight": 1,
 "height": "48.795%",
 "contentOpaque": false,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "- content"
 },
 "paddingBottom": 0,
 "overflow": "scroll",
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "maxHeight": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "paddingLeft": 0,
 "maxWidth": 200,
 "horizontalAlign": "left",
 "width": "22.864%",
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "minHeight": 1,
 "verticalAlign": "top",
 "height": "56.958%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "class": "Image",
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "paddingLeft": 10,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "74.623%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "height": "93.77%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#F7931E",
 "paddingTop": 0,
 "propagateClick": false,
 "class": "HTMLText",
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#79675e;font-size:1.21vh;font-family:'Montserrat';\"><B>KELVIN MURIITHI</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;font-family:'Montserrat';\">LICENCED SURVEYOR</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.99vh;font-family:'Montserrat';\"><B>Tel: 0741581776</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.99vh;font-family:'Montserrat';\"><B>Email: geokevsurveys@gmail.com</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:0.99vh;font-family:'Montserrat';\"><B>Web: www.nestopiagroup.co.ke</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.33vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;font-family:'Maiandra GD';\">Experience luxury living at Vision Apartments in Kahawa Wendani. Our contemporary residences offer unparalleled comfort and style. Enjoy spacious interiors, modern amenities, and stunning views. Immerse yourself in a vibrant community with convenient access to shopping, dining, and entertainment. Elevate your lifestyle at Vision Apartments \u2013 where vision meets reality.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "paddingBottom": 0,
 "overflow": "visible",
 "shadow": false,
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
