define(["require","exports","vs/base/common/uri","vs/platform/configuration/common/configuration","vs/platform/contextview/browser/contextMenuService","vs/platform/contextview/browser/contextViewService","vs/platform/event/common/event","vs/platform/event/common/eventService","vs/platform/extensions/common/extensions","vs/platform/instantiation/common/instantiationService","vs/platform/instantiation/common/serviceCollection","vs/platform/commands/common/commands","vs/platform/commands/common/commandService","vs/platform/markers/common/markerService","vs/platform/markers/common/markers","vs/platform/message/common/message","vs/platform/storage/common/storage","vs/platform/telemetry/common/telemetry","vs/platform/workspace/common/baseWorkspaceContextService","vs/platform/workspace/common/workspace","vs/editor/common/services/codeEditorService","vs/editor/common/services/editorWorkerService","vs/editor/common/services/editorWorkerServiceImpl","vs/editor/common/services/modeService","vs/editor/common/services/modeServiceImpl","vs/editor/common/services/modelService","vs/editor/common/services/modelServiceImpl","vs/editor/browser/services/codeEditorServiceImpl","vs/editor/browser/standalone/simpleServices","vs/platform/actions/common/actions","vs/platform/actions/common/menuService","vs/editor/common/services/compatWorkerService","vs/editor/common/services/compatWorkerServiceMain"],function(e,r,o,i,c,t,n,v,m,s,a,S,l,d,p,f,u,w,k,g,I,x,y,M,C,W,E,b,h,O,T,V,P){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function j(e){var r={};if(e)for(var o=Object.keys(e),i=0,c=o.length;i<c;i++){var t=o[i];r[t]=e[t]}return r}function N(e){e=j(e);for(var r=B(e),o=Object.keys(r),i=0,c=o.length;i<c;i++){var t=o[i];e.hasOwnProperty(t)||(e[t]=r[t])}return e}function q(e,r){var o=[];if("undefined"==typeof r.keybindingService){var i=new h.StandaloneKeybindingService(r.commandService,r.configurationService,r.messageService,e);o.push(i),r.keybindingService=i}if("undefined"==typeof r.contextViewService){var n=new t.ContextViewService(e,r.telemetryService,r.messageService);o.push(n),r.contextViewService=n}if("undefined"==typeof r.contextMenuService){var v=new c.ContextMenuService(e,r.telemetryService,r.messageService,n);o.push(v),r.contextMenuService=v}return o}function B(e){if(D)return D;e=e||{};var r=new a.ServiceCollection,c=new s.InstantiationService(r,(!0)),t=e.contextService||new k.BaseWorkspaceContextService({resource:o["default"].from({scheme:"inmemory",authority:"model",path:"/"}),id:null,name:null,uid:null,mtime:null},{});r.set(g.IWorkspaceContextService,t);var j=e.telemetryService||w.NullTelemetryService;r.set(w.ITelemetryService,j);var N=e.eventService||new v.EventService;r.set(n.IEventService,N);var q=e.configurationService||new h.SimpleConfigurationService(t,N);r.set(i.IConfigurationService,q);var B=e.messageService||new h.SimpleMessageService;r.set(f.IMessageService,B);var K=e.extensionService||new h.SimpleExtensionService;r.set(m.IExtensionService,K);var z=e.commandService||new l.CommandService(c,K);r.set(S.ICommandService,z);var A=e.markerService||new d.MarkerService;r.set(p.IMarkerService,A);var F=e.modeService||new C.MainThreadModeServiceImpl(c,K,q);r.set(M.IModeService,F);var G=e.modelService||new E.ModelServiceImpl(A,q,B);r.set(W.IModelService,G);var H=e.compatWorkerService||new P.MainThreadCompatWorkerService(G);r.set(V.ICompatWorkerService,H);var J=e.editorWorkerService||new y.EditorWorkerServiceImpl(G);r.set(x.IEditorWorkerService,J);var L=e.codeEditorService||new b.CodeEditorServiceImpl;r.set(I.ICodeEditorService,L);var Q=e.menuService||new T.MenuService(K,z);return r.set(O.IMenuService,Q),D={configurationService:q,extensionService:K,commandService:z,compatWorkerService:H,modeService:F,markerService:A,menuService:Q,contextService:t,telemetryService:j,messageService:B,modelService:G,codeEditorService:L,editorWorkerService:J,eventService:N,storageService:e.storageService||u.NullStorageService,instantiationService:c}}r.ensureStaticPlatformServices=N,r.ensureDynamicPlatformServices=q;var D=null;r.getOrCreateStaticServices=B});