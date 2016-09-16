/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)};define(["require","exports","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/base/common/errors","vs/base/common/keyCodes","vs/base/browser/dom","vs/nls","vs/base/parts/tree/browser/treeImpl","vs/base/parts/tree/browser/treeDefaults","vs/editor/browser/editorBrowser","vs/workbench/parts/debug/common/debugModel","vs/workbench/parts/debug/electron-browser/debugViewer"],function(e,t,i,o,n,r,s,a,u,h,l,d,c){"use strict";var p=s.emmet,g={indentPixels:6,twistiePixels:15,ariaLabel:a.localize("treeAriaLabel","Debug Hover")},f=18,v=4096,b=function(){function e(e,t,i){this.editor=e,this.debugService=t,this.instantiationService=i,this.allowEditorOverflow=!0,this.domNode=p(".debug-hover-widget monaco-editor-background"),this.complexValueContainer=s.append(this.domNode,p(".complex-value")),this.complexValueTitle=s.append(this.complexValueContainer,p(".title")),this.treeContainer=s.append(this.complexValueContainer,p(".debug-hover-tree")),this.treeContainer.setAttribute("role","tree"),this.tree=new u.Tree(this.treeContainer,{dataSource:new c.VariablesDataSource(this.debugService),renderer:this.instantiationService.createInstance(C),controller:new m(e)},g),this.toDispose=[],this.registerListeners(),this.valueContainer=s.append(this.domNode,p(".value")),this.valueContainer.tabIndex=0,this.valueContainer.setAttribute("role","tooltip"),this.isVisible=!1,this.showAtPosition=null,this.highlightDecorations=[],this.editor.addContentWidget(this),this.editor.applyFontInfo(this.domNode)}return e.prototype.registerListeners=function(){var e=this;this.toDispose.push(this.tree.addListener2("item:expanded",function(){e.layoutTree()})),this.toDispose.push(this.tree.addListener2("item:collapsed",function(){e.layoutTree()})),this.toDispose.push(s.addStandardDisposableListener(this.domNode,"keydown",function(t){t.equals(r.CommonKeybindings.ESCAPE)&&e.hide()})),this.toDispose.push(this.editor.onDidChangeConfiguration(function(t){t.fontInfo&&e.editor.applyFontInfo(e.domNode)}))},e.prototype.getId=function(){return e.ID},e.prototype.getDomNode=function(){return this.domNode},e.prototype.showAt=function(e,t,i){var o=this,n=e.getStartPosition(),r=this.editor.getModel(),s=this.debugService.getViewModel().getFocusedStackFrame();if(t&&s&&s.source.uri.toString()===r.uri.toString()){var a=r.getLineContent(n.lineNumber),u=a.substring(0,a.indexOf("."+t)).split(".").map(function(e){return e.trim()}).filter(function(e){return!!e});return u.push(t),u[0]=u[0].substring(u[0].lastIndexOf(" ")+1),this.getExpression(u).then(function(e){return e&&e.available?(o.highlightDecorations=o.editor.deltaDecorations(o.highlightDecorations,[{range:{startLineNumber:n.lineNumber,endLineNumber:n.lineNumber,startColumn:a.indexOf(t)+1,endColumn:a.indexOf(t)+1+t.length},options:{className:"hoverHighlight"}}]),o.doShow(n,e,i)):void o.hide()})}},e.prototype.getExpression=function(e){var t=this,i=this.debugService.getActiveSession(),r=this.debugService.getViewModel().getFocusedStackFrame();if(i.configuration.capabilities.supportsEvaluateForHovers)return d.evaluateExpression(i,r,new d.Expression(e.join("."),(!0)),"hover");var s=[];return r.getScopes(this.debugService).then(function(i){return i.reduce(function(e,t){return e.concat(t)},[]).filter(function(e){return!e.expensive}).map(function(i){return i.getChildren(t.debugService).done(function(i){for(var o=0;o<e.length&&i;o++){var n=i.filter(function(t){return"string"==typeof t.name&&(e[o]===t.name||e[o]===t.name.substr(t.name.lastIndexOf(" ")+1))});if(1!==n.length)break;o===e.length-1?s.push(n[0]):n[0].getChildren(t.debugService).done(function(e){return i=e},i=null)}},n.onUnexpectedError)})}).then(function(){return 1===s.length?o.TPromise.as(s[0]):o.TPromise.as(null)})},e.prototype.doShow=function(e,t,i,n){var r=this;return void 0===n&&(n=!1),this.showAtPosition=e,this.isVisible=!0,this.stoleFocus=i,0===t.reference||n?(this.complexValueContainer.hidden=!0,this.valueContainer.hidden=!1,c.renderExpressionValue(t,this.valueContainer,!1,v),this.valueContainer.title="",this.editor.layoutContentWidget(this),i&&(this.editor.render(),this.valueContainer.focus()),o.TPromise.as(null)):(this.valueContainer.hidden=!0,this.complexValueContainer.hidden=!1,this.tree.setInput(t).then(function(){r.complexValueTitle.textContent=t.value,r.complexValueTitle.title=t.value,r.layoutTree(),r.editor.layoutContentWidget(r),i&&(r.editor.render(),r.tree.DOMFocus())}))},e.prototype.layoutTree=function(){for(var e=this.tree.getNavigator(),t=0;e.next();)t++;if(0===t)this.doShow(this.showAtPosition,this.tree.getInput(),!1,!0);else{var i=18*Math.min(t,f);this.treeContainer.clientHeight!==i&&(this.treeContainer.style.height=i+"px",this.tree.layout())}},e.prototype.hide=function(){this.isVisible&&(this.isVisible=!1,this.editor.deltaDecorations(this.highlightDecorations,[]),this.highlightDecorations=[],this.editor.layoutContentWidget(this),this.stoleFocus&&this.editor.focus())},e.prototype.getPosition=function(){return this.isVisible?{position:this.showAtPosition,preference:[l.ContentWidgetPositionPreference.ABOVE,l.ContentWidgetPositionPreference.BELOW]}:null},e.prototype.dispose=function(){this.toDispose=i.dispose(this.toDispose)},e.ID="debug.hoverWidget",e}();t.DebugHoverWidget=b;var m=function(e){function t(t){e.call(this),this.editor=t}return __extends(t,e),t.prototype.onLeftClick=function(t,i,o,n){return void 0===n&&(n="mouse"),i.reference>0&&(e.prototype.onLeftClick.call(this,t,i,o,n),t.clearFocus(),t.deselect(i),this.editor.focus()),!0},t}(h.DefaultController),C=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getHeight=function(e,t){return 18},t}(c.VariablesRenderer)});