var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)};define(["require","exports","vs/base/common/event","vs/base/common/lifecycle","vs/base/browser/browser","vs/base/browser/dom","vs/base/browser/styleMutator","vs/editor/common/config/commonEditorConfig","vs/editor/common/controller/textAreaHandler","vs/editor/common/controller/textAreaState","vs/editor/common/core/range","vs/editor/common/editorCommon","vs/editor/common/viewModel/viewEventHandler","vs/editor/browser/config/configuration"],function(t,e,n,o,r,i,s,a,l,u,h,c,p,d){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var _=function(){function t(t){this._event=t}return t.prototype.canUseTextData=function(){return!!this._event.clipboardData||!!window.clipboardData},t.prototype.setTextData=function(t){if(this._event.clipboardData)return this._event.clipboardData.setData("text/plain",t),void this._event.preventDefault();if(window.clipboardData)return window.clipboardData.setData("Text",t),void this._event.preventDefault();throw new Error("ClipboardEventWrapper.setTextData: Cannot use text data!")},t.prototype.getTextData=function(){if(this._event.clipboardData)return this._event.preventDefault(),this._event.clipboardData.getData("text/plain");if(window.clipboardData)return this._event.preventDefault(),window.clipboardData.getData("Text");throw new Error("ClipboardEventWrapper.getTextData: Cannot use text data!")},t}(),f=function(){function t(t){this._actual=t}return t.prototype.equals=function(t){return this._actual.equals(t)},t.prototype.preventDefault=function(){this._actual.preventDefault()},t.prototype.isDefaultPrevented=function(){return!!this._actual.browserEvent&&this._actual.browserEvent.defaultPrevented},t}(),v=function(t){function e(e){var o=this;t.call(this),this._onKeyDown=this._register(new n.Emitter),this.onKeyDown=this._onKeyDown.event,this._onKeyUp=this._register(new n.Emitter),this.onKeyUp=this._onKeyUp.event,this._onKeyPress=this._register(new n.Emitter),this.onKeyPress=this._onKeyPress.event,this._onCompositionStart=this._register(new n.Emitter),this.onCompositionStart=this._onCompositionStart.event,this._onCompositionUpdate=this._register(new n.Emitter),this.onCompositionUpdate=this._onCompositionUpdate.event,this._onCompositionEnd=this._register(new n.Emitter),this.onCompositionEnd=this._onCompositionEnd.event,this._onInput=this._register(new n.Emitter),this.onInput=this._onInput.event,this._onCut=this._register(new n.Emitter),this.onCut=this._onCut.event,this._onCopy=this._register(new n.Emitter),this.onCopy=this._onCopy.event,this._onPaste=this._register(new n.Emitter),this.onPaste=this._onPaste.event,this._textArea=e,this._register(i.addStandardDisposableListener(this._textArea,"keydown",function(t){return o._onKeyDown.fire(new f(t))})),this._register(i.addStandardDisposableListener(this._textArea,"keyup",function(t){return o._onKeyUp.fire(new f(t))})),this._register(i.addStandardDisposableListener(this._textArea,"keypress",function(t){return o._onKeyPress.fire(new f(t))})),this._register(i.addDisposableListener(this._textArea,"compositionstart",function(t){return o._onCompositionStart.fire(t)})),this._register(i.addDisposableListener(this._textArea,"compositionupdate",function(t){return o._onCompositionUpdate.fire(t)})),this._register(i.addDisposableListener(this._textArea,"compositionend",function(t){return o._onCompositionEnd.fire(t)})),this._register(i.addDisposableListener(this._textArea,"input",function(t){return o._onInput.fire()})),this._register(i.addDisposableListener(this._textArea,"cut",function(t){return o._onCut.fire(new _(t))})),this._register(i.addDisposableListener(this._textArea,"copy",function(t){return o._onCopy.fire(new _(t))})),this._register(i.addDisposableListener(this._textArea,"paste",function(t){return o._onPaste.fire(new _(t))}))}return __extends(e,t),Object.defineProperty(e.prototype,"actual",{get:function(){return this._textArea},enumerable:!0,configurable:!0}),e.prototype.getValue=function(){return this._textArea.value},e.prototype.setValue=function(t,e){this._textArea.value=e},e.prototype.getSelectionStart=function(){return this._textArea.selectionStart},e.prototype.getSelectionEnd=function(){return this._textArea.selectionEnd},e.prototype.setSelectionRange=function(t,e){var n=document.activeElement;n===this._textArea?this._textArea.setSelectionRange(t,e):this._setSelectionRangeJumpy(t,e)},e.prototype._setSelectionRangeJumpy=function(t,e){try{var n=i.saveParentsScrollTop(this._textArea);this._textArea.focus(),this._textArea.setSelectionRange(t,e),i.restoreParentsScrollTop(this._textArea,n)}catch(o){console.log("an error has been thrown!")}},e.prototype.isInOverwriteMode=function(){return!(!r.isIE11orEarlier||!document.queryCommandValue("OverWrite"))},e}(o.Disposable),x=function(t){function e(e,n,o){var u=this;t.call(this),this._lastCursorSelectionChanged=null,this._context=e,this.viewController=n,this.textArea=new v(o.textArea),d.Configuration.applyFontInfoSlow(this.textArea.actual,this._context.configuration.editor.fontInfo),this.viewHelper=o,this.contentLeft=0,this.contentWidth=0,this.scrollLeft=0,this.textAreaHandler=new l.TextAreaHandler(r,this._getStrategy(),this.textArea,this._context.model,function(){return u.viewHelper.flushAnyAccumulatedEvents()}),this._toDispose=[],this._toDispose.push(this.textAreaHandler.onKeyDown(function(t){return u.viewController.emitKeyDown(t._actual)})),this._toDispose.push(this.textAreaHandler.onKeyUp(function(t){return u.viewController.emitKeyUp(t._actual)})),this._toDispose.push(this.textAreaHandler.onPaste(function(t){return u.viewController.paste("keyboard",t.text,t.pasteOnNewLine)})),this._toDispose.push(this.textAreaHandler.onCut(function(t){return u.viewController.cut("keyboard")})),this._toDispose.push(this.textAreaHandler.onType(function(t){t.replaceCharCnt?u.viewController.replacePreviousChar("keyboard",t.text,t.replaceCharCnt):u.viewController.type("keyboard",t.text)})),this._toDispose.push(this.textAreaHandler.onCompositionStart(function(t){var e=t.showAtLineNumber,n=t.showAtColumn,o={range:new h.Range(e,n,e,n),verticalType:c.VerticalRevealType.Simple,revealHorizontal:!0};u._context.privateViewEventBus.emit(c.ViewEventNames.RevealRangeEvent,o),u.visibleRange=u.viewHelper.visibleRangeForPositionRelativeToEditor(e,n),u.visibleRange&&(s.StyleMutator.setTop(u.textArea.actual,u.visibleRange.top),s.StyleMutator.setLeft(u.textArea.actual,u.contentLeft+u.visibleRange.left-u.scrollLeft)),r.isIE11orEarlier&&s.StyleMutator.setWidth(u.textArea.actual,u.contentWidth),s.StyleMutator.setHeight(u.textArea.actual,u._context.configuration.editor.lineHeight),i.addClass(u.viewHelper.viewDomNode,"ime-input"),u.viewController.compositionStart("keyboard")})),this._toDispose.push(this.textAreaHandler.onCompositionUpdate(function(t){var e=document.createElement("canvas"),n=e.getContext("2d");n.font=window.getComputedStyle(u.textArea.actual).font;var o=n.measureText(t.data);s.StyleMutator.setWidth(u.textArea.actual,o.width)})),this._toDispose.push(this.textAreaHandler.onCompositionEnd(function(t){u.textArea.actual.style.height="",u.textArea.actual.style.width="",s.StyleMutator.setLeft(u.textArea.actual,0),s.StyleMutator.setTop(u.textArea.actual,0),i.removeClass(u.viewHelper.viewDomNode,"ime-input"),u.visibleRange=null,u.viewController.compositionEnd("keyboard")})),this._toDispose.push(a.GlobalScreenReaderNVDA.onChange(function(t){u.textAreaHandler.setStrategy(u._getStrategy())})),this._context.addEventHandler(this)}return __extends(e,t),e.prototype.dispose=function(){this._context.removeEventHandler(this),this.textAreaHandler.dispose(),this.textArea.dispose(),this._toDispose=o.dispose(this._toDispose)},e.prototype._getStrategy=function(){return a.GlobalScreenReaderNVDA.getValue()?u.TextAreaStrategy.NVDA:this._context.configuration.editor.viewInfo.experimentalScreenReader?u.TextAreaStrategy.NVDA:u.TextAreaStrategy.IENarrator},e.prototype.focusTextArea=function(){this.textAreaHandler.writePlaceholderAndSelectTextAreaSync()},e.prototype.onConfigurationChanged=function(t){return t.fontInfo&&d.Configuration.applyFontInfoSlow(this.textArea.actual,this._context.configuration.editor.fontInfo),t.viewInfo.experimentalScreenReader&&this.textAreaHandler.setStrategy(this._getStrategy()),!1},e.prototype.onScrollChanged=function(t){return this.scrollLeft=t.scrollLeft,this.visibleRange&&(s.StyleMutator.setTop(this.textArea.actual,this.visibleRange.top),s.StyleMutator.setLeft(this.textArea.actual,this.contentLeft+this.visibleRange.left-this.scrollLeft)),!1},e.prototype.onViewFocusChanged=function(t){return this.textAreaHandler.setHasFocus(t),!1},e.prototype.onCursorSelectionChanged=function(t){return this._lastCursorSelectionChanged=t,!1},e.prototype.onCursorPositionChanged=function(t){return this.textAreaHandler.setCursorPosition(t.position),!1},e.prototype.onLayoutChanged=function(t){return this.contentLeft=t.contentLeft,this.contentWidth=t.contentWidth,!1},e.prototype.writeToTextArea=function(){if(this._lastCursorSelectionChanged){var t=this._lastCursorSelectionChanged;this._lastCursorSelectionChanged=null,this.textAreaHandler.setCursorSelections(t.selection,t.secondarySelections)}},e}(p.ViewEventHandler);e.KeyboardHandler=x});