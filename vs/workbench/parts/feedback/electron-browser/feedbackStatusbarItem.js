/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(t,e,n,r){var i,o=arguments.length,c=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(c=(o<3?i(c):o>3?i(e,n,c):i(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},__param=this&&this.__param||function(t,e){return function(n,r){e(n,r,t)}};define(["require","exports","vs/workbench/parts/feedback/browser/feedback","vs/platform/contextview/browser/contextView","vs/platform/instantiation/common/instantiation","vs/platform/workspace/common/workspace","electron"],function(t,e,n,r,i,o,c){"use strict";var a=function(){function t(){}return t.prototype.combineHashTagsAsString=function(){return t.HASHTAGS.join(",")},t.prototype.submitFeedback=function(e){var n="?"+(1===e.sentiment?"hashtags="+this.combineHashTagsAsString()+"&":null)+"ref_src=twsrc%5Etfw&related=twitterapi%2Ctwitter&text="+e.feedback+"&tw_p=tweetbutton&via="+t.VIA_NAME,r=t.TWITTER_URL+n;c.shell.openExternal(r)},t.prototype.getCharacterLimit=function(e){var n=0;return 1===e&&t.HASHTAGS.forEach(function(t){n+=t.length+2}),t.VIA_NAME&&(n+=(" via @"+t.VIA_NAME).length),140-n},t.TWITTER_URL="https://twitter.com/intent/tweet",t.VIA_NAME="code",t.HASHTAGS=["HappyCoding"],t}(),s=function(){function t(t,e,n){this.instantiationService=t,this.contextViewService=e,this.contextService=n}return t.prototype.render=function(t){if(this.contextService.getConfiguration().env.sendASmile)return this.instantiationService.createInstance(n.FeedbackDropdown,t,{contextViewProvider:this.contextViewService,feedbackService:this.instantiationService.createInstance(a)})},t=__decorate([__param(0,i.IInstantiationService),__param(1,r.IContextViewService),__param(2,o.IWorkspaceContextService)],t)}();e.FeedbackStatusbarItem=s});