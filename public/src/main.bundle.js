!function(t){function e(e){for(var r,s,c=e[0],i=e[1],u=e[2],d=0,f=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);for(l&&l(e);f.length;)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var i=n[c];0!==o[i]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={0:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=i;a.push([1,6,2,1,3,4,5,8,7,9,10,11]),n()}({1:function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"updateImage",(function(){return j})),n.d(e,"clusterCount",(function(){return v})),n.d(e,"appendLabels",(function(){return A})),n.d(e,"hexOf",(function(){return k})),n.d(e,"onlyShowResult",(function(){return C}));n(137);var r,o=n(3),a=n(2),s=n(5),c=n.n(s),i=(n(143),new Image),u=document.getElementById("image-canvas"),l=document.getElementById("original-canvas");function d(){var e=i.height,n=i.width,r=Math.floor(t("#image").width()*w),o=Math.floor(r/n*e);l.width=r,l.height=o,u.width=r,u.height=o,t(u).css("height",t(l).height());var a=u.getContext("2d");return a.drawImage(i,0,0,n,e,0,0,r,o),(a=l.getContext("2d")).drawImage(i,0,0,n,e,0,0,r,o),a}i.onload=function(){var e=d();r=e.getImageData(0,0,l.width,l.height),Object(o.a)(r),f?f=!1:location.href="#b2",t(".r-massage").show()};var f=!0;i.src="./assets/images/screen-3.jpg";var h=t(window).width();function j(t){for(var e=0,n=0;n<r.width;n++)for(var o=0;o<r.height;o++){var s=a.a[t[e].cluster].pos;e++;var c=4*(o*r.width+n);r.data[c]=s.x+127,r.data[c+1]=s.y+127,r.data[c+2]=s.z+127,r.data[c+3]=255}u.getContext("2d").putImageData(r,0,0)}t(window).on("resize",(function(){if(t(window).width()!=h){h=t(window).width();var e=d();r=e.getImageData(0,0,l.width,l.height),Object(o.a)(r),t(".r-massage").show()}}));var p=new FileReader;p.addEventListener("load",(function(t){i.src=t.target.result})),t(".drop_zone").on("click",(function(){t("#file-input").trigger("click")})),t("#file-input").on("change",(function(t){var e=t.target.files[0];p.readAsDataURL(e)})),t(".drop_zone").on("drop",(function(t){var e;t.preventDefault(),t.dataTransfer=t.originalEvent.dataTransfer,e=t.dataTransfer.items?t.dataTransfer.items[0].getAsFile():t.dataTransfer.files[0].name,p.readAsDataURL(e)})),t(".drop_zone").on("dragover",(function(t){t.preventDefault()}));var g=0;t(".drop_zone").on("dragenter",(function(e){return g++,t(".drop_zone").css("background-color","#f7f7f7"),e.stopPropagation(),e.preventDefault(),!1})),t(".drop_zone").on("dragleave dragexit",(function(e){return 0===--g&&t(".drop_zone").css("background-color","#fff"),e.stopPropagation(),e.preventDefault(),!1}));var v=9,m=t("#clusters");t("#cluster-slider").on("input",(function(t){v=t.target.value,m.html(v)})),t("#cluster-slider").on("change",(function(){t(".r-massage").show(),Object(a.c)()}));var w=.5,b=t("#scale");function A(e){var n=t(".colors");n.text(""),e.forEach((function(t){n.append(t.label)}))}function k(t){var e=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);delete e[0];for(var n=1;n<=3;++n)e[n]=parseInt(e[n]).toString(16),1==e[n].length&&(e[n]="0"+e[n]);return"#"+e.join("")}t("#slider-scale").on("input",(function(t){w=t.target.value,b.html(w)})),t("#slider-scale").on("change",(function(){var e=d();r=e.getImageData(0,0,l.width,l.height),Object(o.a)(r),t(".r-massage").show()})),t("#crisp").click((function(){t(this).is(":checked")&&t(".img-canvas").removeClass("pixelate")})),t("#pixelated").click((function(){t(this).is(":checked")&&t(".img-canvas").addClass("pixelate")})),t(".toast").toast({delay:3e3}),t(".colors").on("click",".color",(function(e){var n=t(e.target).text();c()(n),t(".toast").toast("show")})),t(".run").on("click",(function(e){e.preventDefault(),t(".r-massage").hide(),Object(o.b)()}));var y=t(".slider-btn"),x=t(".img-overly"),O=!1;t("#image").on("mousedown touchstart",(function(){O=!0,t(this).css("cursor","e-resize")})),t("#image").on("mouseup touchend",(function(){O=!1,t(this).css("cursor","default")})),t("#image").on("mousemove touchmove",(function(e){if(0!=O){var n=(e.pageX||e.changedTouches[0].pageX)-t(this).offset().left;n<t(this).width()&&n>0&&(y.css("left",n),x.css("width",n))}}));var C=!0;t("#customCheck2").change((function(){C=t(this).prop("checked")})),t("#submit").click((function(){var e=t("#url").val();i.crossOrigin="Anonymous",i.src=e}))}.call(this,n(4))},137:function(t,e,n){},141:function(t,e,n){var r={"./af":8,"./af.js":8,"./ar":9,"./ar-dz":10,"./ar-dz.js":10,"./ar-kw":11,"./ar-kw.js":11,"./ar-ly":12,"./ar-ly.js":12,"./ar-ma":13,"./ar-ma.js":13,"./ar-sa":14,"./ar-sa.js":14,"./ar-tn":15,"./ar-tn.js":15,"./ar.js":9,"./az":16,"./az.js":16,"./be":17,"./be.js":17,"./bg":18,"./bg.js":18,"./bm":19,"./bm.js":19,"./bn":20,"./bn.js":20,"./bo":21,"./bo.js":21,"./br":22,"./br.js":22,"./bs":23,"./bs.js":23,"./ca":24,"./ca.js":24,"./cs":25,"./cs.js":25,"./cv":26,"./cv.js":26,"./cy":27,"./cy.js":27,"./da":28,"./da.js":28,"./de":29,"./de-at":30,"./de-at.js":30,"./de-ch":31,"./de-ch.js":31,"./de.js":29,"./dv":32,"./dv.js":32,"./el":33,"./el.js":33,"./en-SG":34,"./en-SG.js":34,"./en-au":35,"./en-au.js":35,"./en-ca":36,"./en-ca.js":36,"./en-gb":37,"./en-gb.js":37,"./en-ie":38,"./en-ie.js":38,"./en-il":39,"./en-il.js":39,"./en-nz":40,"./en-nz.js":40,"./eo":41,"./eo.js":41,"./es":42,"./es-do":43,"./es-do.js":43,"./es-us":44,"./es-us.js":44,"./es.js":42,"./et":45,"./et.js":45,"./eu":46,"./eu.js":46,"./fa":47,"./fa.js":47,"./fi":48,"./fi.js":48,"./fo":49,"./fo.js":49,"./fr":50,"./fr-ca":51,"./fr-ca.js":51,"./fr-ch":52,"./fr-ch.js":52,"./fr.js":50,"./fy":53,"./fy.js":53,"./ga":54,"./ga.js":54,"./gd":55,"./gd.js":55,"./gl":56,"./gl.js":56,"./gom-latn":57,"./gom-latn.js":57,"./gu":58,"./gu.js":58,"./he":59,"./he.js":59,"./hi":60,"./hi.js":60,"./hr":61,"./hr.js":61,"./hu":62,"./hu.js":62,"./hy-am":63,"./hy-am.js":63,"./id":64,"./id.js":64,"./is":65,"./is.js":65,"./it":66,"./it-ch":67,"./it-ch.js":67,"./it.js":66,"./ja":68,"./ja.js":68,"./jv":69,"./jv.js":69,"./ka":70,"./ka.js":70,"./kk":71,"./kk.js":71,"./km":72,"./km.js":72,"./kn":73,"./kn.js":73,"./ko":74,"./ko.js":74,"./ku":75,"./ku.js":75,"./ky":76,"./ky.js":76,"./lb":77,"./lb.js":77,"./lo":78,"./lo.js":78,"./lt":79,"./lt.js":79,"./lv":80,"./lv.js":80,"./me":81,"./me.js":81,"./mi":82,"./mi.js":82,"./mk":83,"./mk.js":83,"./ml":84,"./ml.js":84,"./mn":85,"./mn.js":85,"./mr":86,"./mr.js":86,"./ms":87,"./ms-my":88,"./ms-my.js":88,"./ms.js":87,"./mt":89,"./mt.js":89,"./my":90,"./my.js":90,"./nb":91,"./nb.js":91,"./ne":92,"./ne.js":92,"./nl":93,"./nl-be":94,"./nl-be.js":94,"./nl.js":93,"./nn":95,"./nn.js":95,"./pa-in":96,"./pa-in.js":96,"./pl":97,"./pl.js":97,"./pt":98,"./pt-br":99,"./pt-br.js":99,"./pt.js":98,"./ro":100,"./ro.js":100,"./ru":101,"./ru.js":101,"./sd":102,"./sd.js":102,"./se":103,"./se.js":103,"./si":104,"./si.js":104,"./sk":105,"./sk.js":105,"./sl":106,"./sl.js":106,"./sq":107,"./sq.js":107,"./sr":108,"./sr-cyrl":109,"./sr-cyrl.js":109,"./sr.js":108,"./ss":110,"./ss.js":110,"./sv":111,"./sv.js":111,"./sw":112,"./sw.js":112,"./ta":113,"./ta.js":113,"./te":114,"./te.js":114,"./tet":115,"./tet.js":115,"./tg":116,"./tg.js":116,"./th":117,"./th.js":117,"./tl-ph":118,"./tl-ph.js":118,"./tlh":119,"./tlh.js":119,"./tr":120,"./tr.js":120,"./tzl":121,"./tzl.js":121,"./tzm":122,"./tzm-latn":123,"./tzm-latn.js":123,"./tzm.js":122,"./ug-cn":124,"./ug-cn.js":124,"./uk":125,"./uk.js":125,"./ur":126,"./ur.js":126,"./uz":127,"./uz-latn":128,"./uz-latn.js":128,"./uz.js":127,"./vi":129,"./vi.js":129,"./x-pseudo":130,"./x-pseudo.js":130,"./yo":131,"./yo.js":131,"./zh-cn":132,"./zh-cn.js":132,"./zh-hk":133,"./zh-hk.js":133,"./zh-tw":134,"./zh-tw.js":134};function o(t){var e=a(t);return n(e)}function a(t){if(!n.o(r,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return r[t]}o.keys=function(){return Object.keys(r)},o.resolve=a,t.exports=o,o.id=141},2:function(t,e,n){"use strict";(function(t){n.d(e,"e",(function(){return s})),n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"d",(function(){return h}));var r=n(1),o=n(6),a=n(7),s=[],c=[],i=0,u=0;function l(e){var n=t('<div class="mr-2 rounded" style="background-color:'.concat(e,'"></div>')),o=t('<p class="mb-0 text-secondary">'.concat(Object(r.hexOf)(e),"</p>"));return{$color:n,$colorHex:o,label:t('<div class="color d-inline-flex align-items-center rounded shadow-sm m-2 p-2"></div>').append(n).append(o)}}function d(){c=[];for(var t=0;t<r.clusterCount;t++){var e=Math.floor(Math.random()*(s.length-1)),n=s[e].pos.x,i=s[e].pos.y,u=s[e].pos.z,d="rgb(".concat(n+127,",").concat(i+127,",").concat(u+127,")");c.push({pos:new a.Vector3(n,i,u),sum:new a.Vector3(0,0,0),vertexCount:0,label:l(d),color:d})}Object(r.appendLabels)(c.map((function(t){return t.label}))),Object(o.a)(c.map((function(t){return t.vertexCount+1})),c.map((function(t){return t.color})))}function f(t){!function(t){s=[];for(var e=0;e<t.width;e++)for(var n=0;n<t.height;n++){var r=4*(n*t.width+e),o=t.data[r],c=t.data[r+1],i=t.data[r+2];s.push({pos:new a.Vector3(o-127,c-127,i-127),color:"rgb("+o+","+c+","+i+")"})}}(t),d()}function h(t){var e=setInterval((function(){if(i-u<2)i++,function(){for(var t=0;t<s.length;t++){for(var e=c[0].pos.distanceTo(s[t].pos),n=0,o=1;o<r.clusterCount;o++){var a=c[o].pos.distanceTo(s[t].pos);a<e&&(e=a,n=o)}s[t].cluster!=n&&(u=i),s[t].cluster=n}}(),function(){var t;for(t=0;t<s.length;t++){var e=s[t].cluster;c[e].sum=c[e].sum.add(s[t].pos),c[e].vertexCount+=1}for(Object(o.a)(c.map((function(t){return t.vertexCount})),c.map((function(t){return t.color}))),t=0;t<r.clusterCount;t++){c[t].vertexCount&&(c[t].pos=c[t].sum.divideScalar(c[t].vertexCount)),c[t].sum=new a.Vector3(0,0,0),c[t].vertexCount=0;var n=Math.floor(c[t].pos.x)+127,i=Math.floor(c[t].pos.y)+127,u=Math.floor(c[t].pos.z)+127,l="rgb(".concat(n,",").concat(i,",").concat(u,")");c[t].color=l,r.onlyShowResult||(c[t].label.$color.css("background-color",l),c[t].label.$colorHex.text(Object(r.hexOf)(l)))}}(),r.onlyShowResult||t();else{if(r.onlyShowResult){for(var n=0;n<r.clusterCount;n++)c[n].label.$color.css("background-color",c[n].color),c[n].label.$colorHex.text(Object(r.hexOf)(c[n].color));t()}i=0,u=0,clearInterval(e)}}),0)}}).call(this,n(4))},3:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return C})),n.d(e,"b",(function(){return P}));var r=n(135),o=n.n(r),a=n(2),s=n(1);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}var i,u,l,d,f,h,j,p,g,v,m,w,b=n(138),A=n(7),k=n(139)(A);function y(t,e){if(b){for(var n=new A.Geometry,r=0;r<t.length;r++)n.vertices.push(t[r]),n.colors.push(new A.Color(e?e[r]:"white"));var o=new A.Points(n,w);return g||i.add(o),o}}function x(t,e,n){var r=new A.Geometry;r.vertices.push(t),r.vertices.push(e);var o=new A.LineBasicMaterial({color:n});i.add(new A.Line(r,o))}function O(t){if(b&&!g)for(var e=i.children.length-1;e>=t;e--)i.remove(i.children[e])}function C(t){Object(a.b)(t),function(){O(3);var t=a.e.map((function(t){return t.color}));h=y(a.e.map((function(t){return t.pos})),t),t=a.a.map((function(t){return t.color})),y(a.a.map((function(t){return t.pos})),t)}()}function z(){if(b&&!g){O(4);var t,e,n,r=a.a.map((function(t){return t.color}));y(a.a.map((function(t){return t.pos})),r);for(var o=0;o<a.e.length;o++)t=h,e=o,n=a.a[a.e[o].cluster].color,t.geometry.colors[e]=new A.Color(n);Object(s.updateImage)(a.e),h.geometry.colorsNeedUpdate=!0}}function P(){Object(a.d)(z)}function S(){v=requestAnimationFrame(S),p.update(),l.render(i,u)}t(window).on("resize load",(function(){b&&!g&&(l.setSize(d.width(),.625*d.width()),u.updateProjectionMatrix())})),b?((i=new A.Scene).background=new A.Color(16777215),(u=new A.PerspectiveCamera(75,1.6,.1,2e3)).position.set(200,200,200),u.lookAt(0,0,0),l=new A.WebGLRenderer({antialias:!0}),d=t("#chart-container"),l.setSize(d.width(),.625*d.width()),(f=d[0]).appendChild(l.domElement),(j=new Image).src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHDgwCEMBJZu0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABM5JREFUWMO1V0tPG2cUPZ4Hxh6DazIOrjFNqJs0FIMqWFgWQkatsmvVbtggKlSVRVf5AWz4AWz4AUSKEChll19QJYSXkECuhFxsHjEhxCYm+DWGMZ5HF72DJq4bAzFXurI0M/I5997v3u9cC65vTJVn2lX/xHINQOYSBLTLEuIuCWw4Z3IGAEvf6ASmVHjNzHCXBG4A0AjACsAOwEbO0nsFQBnAGYASAIl+ZRMR7SolMEdsByD09fV5R0ZGgg8ePPjW5/N1iqLYpuu6RZblciKR2I9Go69evnwZnZ+fjwI4IS8AKBIRzeQfJWCANwKwh0KhtrGxsYehUOin1tbW+zzP23ietzY2NnIAoGmaLsuyUiqVyvl8XtrY2NiamZn589mzZxsAUgCOAeQAnFI2tI+VxIjaAeDzoaGh7xYWFuZOTk6OZVk+12uYqqq6JEnn0Wg0OT4+/geAXwGEAdwDIFJQXC1wO4DWR48e/RCPxxclSSroVzRFUbSDg4P848ePFwH8DuAhkWih83TRQWxFOXgAwvDwcOfo6OhvXV1d39tsNtuVBwTDWBwOh1UUxVsMw1hXVlbSdCgNV43uYSvrHg6H24aHh38eHBz85TrgF9FYLHA4HLzH43FvbW2d7u/vG+dANp8FpqIlbd3d3V8Fg8EfBUFw4BONZVmL3+9vHhkZCQL4AoAHgJPK8G+yzC0XDofdoVAo5PP5vkadTBAEtr+/39ff3x8gAp/RPOEqx2qjx+NpvXv3bk9DQ0NDvQgwDIOWlhZrMBj8kgi0UJdxRgYMArzL5XJ7vd57qLPZ7Xamp6fnNgBXtQxcjFuHw+Hyer3t9SYgCAITCAScAJoBNNEY/08GOFVVrfVMv7kMNDntFD1vjIAPrlRN0xjckOm6biFQ3jwNPwDMZrOnqVTqfb3Bi8Wivru7W/VCYkwPlKOjo0IikXh7EwQikYgE4Nw0CfXKDCipVCoTj8df3QABbW1tLUc6oUgkFPMkVACUNjc337148eKvw8PDbJ2jP1taWkoCyNDVXDSECmNSK4qiKNLq6urW8+fPI/UicHx8rD59+jSVy+WOAKSJhKENwFItLtoxk8mwsixzHR0dHe3t7c5PAU+n09rs7OzJkydPYqVSaQfANoDXALIk31S2smU1TWMPDg7K5XKZ7+3t9TudTut1U7+wsFCcmJiIpdPpbQBxADsAknQWymYCOukBHYCuKApisdhpMpnURFEU79y503TVyKenpzOTk5M7e3t7MQKPV0Zv1gNm+awB0MvlshqLxfLb29uyJElWURSbXC4XXyvqxcXFs6mpqeTc3Nzu3t7e3wQcA7BPZ8Cov1pNlJplmQtAG8MwHV6v95tAINA5MDBwPxAIuLu6upr8fr/VAN3c3JQjkcjZ+vp6fnl5+d2bN29SuVzuNYAEpf01CdRChUL+X1VskHACuA3Ay3Fcu9vt7nA6nZ7m5uYWQRCaNE3jVVW15PP580KhIGUymWw2m00DOAJwSP4WwPtq4LX2Ao6USxNlQyS/RcQcdLGwlNIz6vEMAaZpNzCk2Pll94LK/cDYimxERiBwG10sxjgvEZBE0UpE6vxj+0Ct5bTaXthgEhRmja8QWNkkPGsuIpfdjpkK+cZUWTC0KredVmtD/gdlSl6EG4AMvQAAAABJRU5ErkJggg==",m=(new A.TextureLoader).load(j.src),w=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new A.PointsMaterial(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({size:10,sizeAttenuation:!1,map:m,alphaTest:.5,transparent:!0},t))}({vertexColors:A.VertexColors}),x(new A.Vector3(-700,0,0),new A.Vector3(700,0,0),13027014),x(new A.Vector3(0,-500,0),new A.Vector3(0,500,0),13027014),x(new A.Vector3(0,0,-700),new A.Vector3(0,0,700),13027014),(p=new k(u,f)).autoRotate=!0,p.autoRotateSpeed=.5,p.update(),g=!1,t("#customCheck1").change((function(){(g=t(this).prop("checked"))?(cancelAnimationFrame(v),t("#chart-container").hide(),t(".chart-guid").text("Chart is Disabled in image setting").removeClass("text-muted").addClass("text-warning")):(void 0!==a.e[0].cluster&&z(),S(),t("#chart-container").show(),t(".chart-guid").text("Click and drag to rotate the view").addClass("text-muted"))})),S()):(t("#customCheck1").attr("disabled",!0),t(".chart-guid").text("Sorry, your Device does not support WebGL").removeClass("text-muted").addClass("text-warning"))}).call(this,n(4))},6:function(t,e,n){"use strict";(function(t){n.d(e,"a",(function(){return u}));var r=n(136),o=n.n(r),a=n(1),s=n(5),c=n.n(s),i=new o.a(t("#myChart"),{type:"doughnut",data:{datasets:[{data:[1,1,1,1,1],backgroundColor:["#f35633","#29a69e","#f9e9bb","#c9dee0"]}]},options:{tooltips:{callbacks:{label:function(t,e){return Object(a.hexOf)(e.datasets[0].backgroundColor[t.index])},afterLabel:function(t,e){var n=e.datasets[0];return Math.round(n.data[t.index]/n._meta[0].total*100)+"%"}},displayColors:!1}}});function u(t,e){var n=i.data.datasets[0];n.data=t,n.backgroundColor=e,i.update()}t("#myChart").click((function(e){var n=i.getElementsAtEvent(e);if(0!==n.length){var r=n[0]._chart.data,o=n[0]._datasetIndex,s=r.datasets[o].backgroundColor[n[0]._index];c()(Object(a.hexOf)(s)),t(".toast").toast("show")}}))}).call(this,n(4))}});