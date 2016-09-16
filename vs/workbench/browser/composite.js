/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)},__decorate=this&&this.__decorate||function(t,e,o,i){var r,n=arguments.length,s=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(s=(n<3?r(s):n>3?r(e,o,s):r(e,o))||s);return n>3&&s&&Object.defineProperty(e,o,s),s},__param=this&&this.__param||function(t,e){return function(o,i){e(o,i,t)}};define(["require","exports","vs/base/common/winjs.base","vs/base/common/actions","vs/workbench/common/component","vs/workbench/common/events","vs/platform/telemetry/common/telemetry","vs/platform/instantiation/common/descriptors"],function(t,e,o,i,r,n,s,c){"use strict";e.EventType={INTERNAL_COMPOSITE_TITLE_AREA_UPDATE:"internalCompositeTitleAreaUpdate"};var p=function(t){function r(e,o){t.call(this,e),this._telemetryService=o,this._telemetryData={},this.visible=!1}return __extends(r,t),r.prototype.getTitle=function(){return null},Object.defineProperty(r.prototype,"telemetryService",{get:function(){return this._telemetryService},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"telemetryData",{get:function(){return this._telemetryData},enumerable:!0,configurable:!0}),r.prototype.create=function(t){return this.parent=t,o.TPromise.as(null)},r.prototype.getContainer=function(){return this.parent},r.prototype.setVisible=function(t){if(this.visible=t,t){if(this._telemetryData={},this._telemetryData.startTime=new Date,this._telemetryService&&this._telemetryService.publicLog){var e="compositeOpen";this._telemetryService.publicLog(e,{composite:this.getId()})}}else if(this._telemetryData.timeSpent=(Date.now()-this._telemetryData.startTime)/1e3,delete this._telemetryData.startTime,this._telemetryService&&this._telemetryService.publicLog){var e="compositeShown";this._telemetryData.composite=this.getId(),this._telemetryService.publicLog(e,this._telemetryData)}return o.TPromise.as(null)},r.prototype.focus=function(){},r.prototype.getActions=function(){return[]},r.prototype.getSecondaryActions=function(){return[]},r.prototype.getActionItem=function(t){return null},r.prototype.getActionRunner=function(){return this.actionRunner||(this.actionRunner=new i.ActionRunner),this.actionRunner},r.prototype.updateTitleArea=function(){this.emit(e.EventType.INTERNAL_COMPOSITE_TITLE_AREA_UPDATE,new n.CompositeEvent(this.getId()))},r.prototype.isVisible=function(){return this.visible},r.prototype.getControl=function(){return null},r=__decorate([__param(1,s.ITelemetryService)],r)}(r.WorkbenchComponent);e.Composite=p;var u=function(t){function e(e,o,i,r,n,s){t.call(this,e,o),this.id=i,this.name=r,this.cssClass=n,this.order=s}return __extends(e,t),e}(c.AsyncDescriptor);e.CompositeDescriptor=u;var a=function(){function t(){this.composits=[]}return t.prototype.registerComposite=function(t){null===this.compositeById(t.id)&&this.composits.push(t)},t.prototype.getComposite=function(t){return this.compositeById(t)},t.prototype.getComposits=function(){return this.composits.slice(0)},t.prototype.setComposits=function(t){this.composits=t},t.prototype.compositeById=function(t){for(var e=0;e<this.composits.length;e++)if(this.composits[e].id===t)return this.composits[e];return null},t}();e.CompositeRegistry=a});