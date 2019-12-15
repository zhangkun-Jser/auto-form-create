webpackJsonp([2],{570:function(e,l){e.exports=[{name:"head",fieldset:"GroupFieldset",panelTitle:"无线旅游样式——头部物料",fields:[{name:"title",control:"RedWordInput",label:"标题",rules:{required:!0,minBytesWithFilter:8,maxBytesWithFilter:24}},{name:"titleLink",control:"Input",label:"标题链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"logo",control:"ImageUpload",label:"Logo图",rules:{imageRequired:!0},tips:"图片尺寸：200x200，不超过20k，jpg、gif格式。",uploadRules:{size:20,types:["gif","jpg"],key:"318-head-logo"}},{name:"description",control:"TextArea",label:"文字描述",rules:{required:!0,minBytes:26,maxBytes:50}},{name:"descriptionLink",control:"Input",label:"描述链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"showUrl",control:"Input",label:"显示URL",rules:{required:!0,maxBytes:30}}],submit:!0},{name:"imageList",fieldset:"ListFieldset",panelTitle:"无线旅游样式——中部小图物料",numLabel:"小图数",length:[4,8,12],fields:[{name:"title",control:"Input",label:"小图文字",rules:{required:!0,maxBytes:6}},{name:"link",control:"Input",label:"小图链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"image",control:"ImageUpload",label:"小图",rules:{imageRequired:!0},tips:"图片尺寸：200x200，不超过20k，jpg、gif格式。",uploadRules:{size:20,types:["gif","jpg"],key:"318-imageList-image"}}],submit:!0},{name:"bottom",fieldset:"GroupFieldset",panelTitle:"无线旅游样式——查询链接与按钮",fields:[{name:"airwayUrl",control:"Input",label:"机票查询链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"hotelUrl",control:"Input",label:"酒店查询链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"trainUrl",control:"Input",label:"火车票查询链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"app",fieldset:"GroupFieldset",fields:[{name:"name",control:"Input",label:"App下载文字",rules:{required:!0,maxBytes:12}},{name:"androidDownloadLink",control:"Input",label:"android下载链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"iosDownloadLink",control:"Input",label:"ios下载链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}}]},{name:"call",fieldset:"GroupFieldset",fields:[{name:"number",control:"Input",label:"客服电话",rules:{required:!0,number:!0,maxBytes:12}}]}],submit:!0}]}});