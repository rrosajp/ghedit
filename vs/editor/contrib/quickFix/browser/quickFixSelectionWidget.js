/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)};define(["require","exports","vs/nls","vs/base/common/errors","vs/base/common/winjs.base","vs/base/browser/dom","vs/base/parts/tree/browser/treeDefaults","vs/base/parts/tree/browser/treeImpl","vs/editor/browser/editorBrowser","vs/base/browser/ui/aria/aria","vs/base/common/scrollable","vs/base/common/lifecycle","vs/css!./quickFix"],function(e,t,i,o,s,n,r,a,l,u,c,d){"use strict";function h(e){return e&&"object"==typeof e.command&&"string"==typeof e.command.title}function p(e){return i.localize("ariaCurrentFix","{0}, quick fix suggestion",e.command.title)}function m(e,t){return 19}var f=n.emmet,g=function(){function e(e,t){this.parent=e,this.message=t}return e}();t.Message=g;var y=function(){function e(e){this.child=new g(this,e)}return e}();t.MessageRoot=y;var v=function(){function e(){this.root=null}return e.prototype.isRoot=function(e){return e instanceof y||!(e instanceof g)&&(!!Array.isArray(e)&&(this.root=e,!0))},e.prototype.getId=function(e,t){if(t instanceof y)return"messageroot";if(t instanceof g)return"message"+t.message;if(Array.isArray(t))return"root";if(h(t))return t.id;throw o.illegalArgument("element")},e.prototype.getParent=function(e,t){return t instanceof y?s.TPromise.as(null):t instanceof g?s.TPromise.as(t.parent):s.TPromise.as(this.isRoot(t)?null:this.root)},e.prototype.getChildren=function(e,t){return t instanceof y?s.TPromise.as([t.child]):t instanceof g?s.TPromise.as([]):s.TPromise.as(this.isRoot(t)?t:[])},e.prototype.hasChildren=function(e,t){return this.isRoot(t)},e}(),A=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.onLeftClick=function(e,t,i){return i.preventDefault(),i.stopPropagation(),t instanceof g||e.setSelection([t],{origin:"mouse"}),!0},t}(r.DefaultController),L=function(){function e(){}return e.prototype.getAriaLabel=function(e,t){if(h(t))return p(t)},e}();t.AccessibilityProvider=L;var S=function(){function e(){}return e.prototype.getHeight=function(e,t){return m(e,t)},e.prototype.getTemplateId=function(e,t){return t instanceof g?"message":"default"},e.prototype.renderTemplate=function(e,t,i){if("message"===t){var o=n.append(i,f("span"));return o.style.opacity="0.7",o.style.paddingLeft="12px",{element:o}}var s={},r=n.append(i,f(".text"));s.main=n.append(r,f(".main"));var a=n.append(r,f(".docs"));return s.documentationLabel=n.append(a,f("span.docs-label")),s},e.prototype.renderElement=function(e,t,i,o){if("message"===i)return void(o.element.textContent=t.message);var s=t;o.main.textContent=s.command.title,o.documentationLabel.textContent=""},e.prototype.disposeTemplate=function(e,t,i){},e}(),b=function(){function e(t,s,n,r){var l=this;this.allowEditorOverflow=!0,this.editor=t,this._onShown=n,this._onHidden=r,this.shouldShowEmptyList=!0,this.isActive=!1,this.isLoading=!1,this.isAuto=!1,this.modelListenersToRemove=[],this.model=null,this.telemetryData=Object.create(null),this.telemetryService=s,this.listenersToRemove=[],this.domnode=f(".editor-widget.quickfix-widget.monaco-editor-background.no-icons"),this.domnode.style.width=e.WIDTH+"px",this.tree=new a.Tree(this.domnode,{dataSource:new v,renderer:new S,controller:new A,accessibilityProvider:new L},{twistiePixels:0,alwaysFocused:!0,verticalScrollMode:c.ScrollbarVisibility.Visible,useShadows:!1,ariaLabel:i.localize("treeAriaLabel","Quick Fix")}),this.listenersToRemove.push(this.tree.addListener2("selection",function(e){if(e.selection&&e.selection.length>0){var t=e.selection[0];!h(t)||t instanceof y||t instanceof g||(l.telemetryData.selectedIndex=l.tree.getInput().indexOf(t),l.telemetryData.wasCancelled=!1,l.submitTelemetryData(),u.alert(i.localize("quickFixAriaAccepted","{0}, accepted",t.command.title)),l.model.accept(t,l.range),l.editor.focus())}}));var d=null;this.listenersToRemove.push(this.tree.addListener2("focus",function(e){var t=e.focus,i=e.payload;if(t!==d){var s=[];d&&s.push(d),t&&(s.push(t),h(t)&&l._ariaAlert(p(t))),d=t,l.tree.refreshAll(s).done(function(){if(l.updateWidgetHeight(),t)return l.tree.reveal(t,i&&i.firstSuggestion?0:null)},o.onUnexpectedError)}})),this.editor.addContentWidget(this),this.listenersToRemove.push(this.editor.onDidChangeCursorSelection(function(e){l.isActive&&l.editor.layoutContentWidget(l)})),this.hide()}return e.prototype._ariaAlert=function(e){this._lastAriaAlertLabel!==e&&(this._lastAriaAlertLabel=e,this._lastAriaAlertLabel&&u.alert(this._lastAriaAlertLabel))},e.prototype.setModel=function(t){var i=this;this.releaseModel(),this.model=t;var s,r=null;this.modelListenersToRemove.push(this.model.addListener2("loading",function(t){i.isActive||(r=i.telemetryService.timedPublicLog("QuickFixSelectionWidgetLoadingTime"),i.isLoading=!0,i.isAuto=!!t.auto,i.isAuto||(s=setTimeout(function(){n.removeClass(i.domnode,"empty"),i.tree.setInput(e.LOADING_MESSAGE).done(null,o.onUnexpectedError),i.updateWidgetHeight(),i.show()},50)),t.retrigger||(i.telemetryData={wasAutomaticallyTriggered:t.characterTriggered}))})),this.modelListenersToRemove.push(this.model.addListener2("suggest",function(e){i.isLoading=!1,"undefined"!=typeof s&&(clearTimeout(s),s=void 0);for(var t=e.fixes,a=-1,l=t[0],u=-1,c=0,d=t.length;c<d;c++){var h=t[c],p=h.score;p>u&&(u=p,l=h,a=c)}n.removeClass(i.domnode,"empty"),i.tree.setInput(t).done(null,o.onUnexpectedError),i.tree.setFocus(l,{firstSuggestion:!0}),i.updateWidgetHeight(),i.range=e.range,i.show(),i.telemetryData=i.telemetryData||{},i.telemetryData.suggestionCount=t.length,i.telemetryData.suggestedIndex=a,r&&(r.data={reason:"results"},r.stop(),r=null)})),this.modelListenersToRemove.push(this.model.addListener2("empty",function(t){var a=i.isLoading;i.isLoading=!1,"undefined"!=typeof s&&(clearTimeout(s),s=void 0),t.auto?i.hide():a?i.shouldShowEmptyList?(n.removeClass(i.domnode,"empty"),i.tree.setInput(e.NO_SUGGESTIONS_MESSAGE).done(null,o.onUnexpectedError),i.updateWidgetHeight(),i.show()):i.hide():n.addClass(i.domnode,"empty"),r&&(r.data={reason:"empty"},r.stop(),r=null)})),this.modelListenersToRemove.push(this.model.addListener2("cancel",function(e){i.isLoading=!1,"undefined"!=typeof s&&(clearTimeout(s),s=void 0),e.retrigger||(i.hide(),i.telemetryData&&(i.telemetryData.selectedIndex=-1,i.telemetryData.wasCancelled=!0,i.submitTelemetryData())),r&&(r.data={reason:"cancel"},r.stop(),r=null)}))},e.prototype.selectNextPage=function(){return this.isLoading?!this.isAuto:!!this.isActive&&(this.tree.focusNextPage(),!0)},e.prototype.selectNext=function(){if(this.isLoading)return!this.isAuto;if(this.isActive){var e=this.tree.getFocus();return this.tree.focusNext(1),e===this.tree.getFocus()&&this.tree.focusFirst(),!0}return!1},e.prototype.selectPreviousPage=function(){return this.isLoading?!this.isAuto:!!this.isActive&&(this.tree.focusPreviousPage(),!0)},e.prototype.selectPrevious=function(){if(this.isLoading)return!this.isAuto;if(this.isActive){var e=this.tree.getFocus();return this.tree.focusPrevious(1),e===this.tree.getFocus()&&this.tree.focusLast(),!0}return!1},e.prototype.acceptSelectedSuggestion=function(){if(this.isLoading)return!this.isAuto;if(this.isActive){var e=this.tree.getFocus();return e?this.tree.setSelection([e]):this.model.cancelDialog(),!0}return!1},e.prototype.releaseModel=function(){this.modelListenersToRemove=d.dispose(this.modelListenersToRemove),this.model=null},e.prototype.show=function(){this.isActive=!0,this.tree.layout(),this.editor.layoutContentWidget(this),this._onShown()},e.prototype.hide=function(){this._onHidden(),this.isActive=!1,this.editor.layoutContentWidget(this)},e.prototype.getPosition=function(){return this.isActive?{position:this.editor.getPosition(),preference:[l.ContentWidgetPositionPreference.BELOW,l.ContentWidgetPositionPreference.ABOVE]}:null},e.prototype.getDomNode=function(){return this.domnode},e.prototype.getId=function(){return e.ID},e.prototype.submitTelemetryData=function(){this.telemetryService.publicLog("QuickFixSelectionWidget",this.telemetryData),this.telemetryData=Object.create(null)},e.prototype.updateWidgetHeight=function(){var t,i=this.tree.getInput();if(i===e.LOADING_MESSAGE||i===e.NO_SUGGESTIONS_MESSAGE)t=19;else{var o=i;t=19*Math.min(o.length-1,11);var s=this.tree.getFocus();t+=s?m(this.tree,s):19}this.domnode.style.height=t+"px",this.tree.layout(t),this.editor.layoutContentWidget(this)},e.prototype.destroy=function(){this.releaseModel(),this.domnode=null,this.tree.dispose(),this.tree=null,this.listenersToRemove=d.dispose(this.listenersToRemove)},e.ID="editor.widget.QuickFixSelectionWidget",e.WIDTH=360,e.LOADING_MESSAGE=new y(i.localize("QuickFixSelectionWidget.loading","Loading...")),e.NO_SUGGESTIONS_MESSAGE=new y(i.localize("QuickFixSelectionWidget.noSuggestions","No fix suggestions.")),e}();t.QuickFixSelectionWidget=b});