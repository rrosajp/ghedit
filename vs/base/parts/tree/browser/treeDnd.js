define(["require","exports"],function(t,e){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var n=function(){function t(t){this.elements=t}return t.prototype.update=function(t){},t.prototype.getData=function(){return this.elements},t}();e.ElementsDragAndDropData=n;var r=function(){function t(t){this.elements=t}return t.prototype.update=function(t){},t.prototype.getData=function(){return this.elements},t}();e.ExternalElementsDragAndDropData=r;var s=function(){function t(){this.types=[],this.files=[]}return t.prototype.update=function(t){t.dataTransfer.types&&(this.types=[],Array.prototype.push.apply(this.types,t.dataTransfer.types)),t.dataTransfer.files&&(this.files=[],Array.prototype.push.apply(this.files,t.dataTransfer.files),this.files=this.files.filter(function(t){return t.size||t.type}))},t.prototype.getData=function(){return{types:this.types,files:this.files}},t}();e.DesktopDragAndDropData=s});