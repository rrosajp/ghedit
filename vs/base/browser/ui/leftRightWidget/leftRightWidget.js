/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/browser/builder","vs/css!./leftRightWidget"],function(e,t,i){"use strict";var s=function(){function e(e,t,s){this.$el=i.$(".monaco-left-right-widget").appendTo(e),this.toDispose=[s(i.$(".right").appendTo(this.$el).getHTMLElement()),t(i.$("span.left").appendTo(this.$el).getHTMLElement())].filter(function(e){return!!e})}return e.prototype.dispose=function(){this.$el&&(this.$el.destroy(),this.$el=null)},e}();t.LeftRightWidget=s});