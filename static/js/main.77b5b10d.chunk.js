(this["webpackJsonpdns-mdm-generator"]=this["webpackJsonpdns-mdm-generator"]||[]).push([[0],{52:function(e,t,n){e.exports=n(62)},57:function(e,t,n){},58:function(e,t,n){},62:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),o=n.n(i),s=(n(57),n(37)),l=n(38),c=n(44),y=n(43),d=(n(58),n(99)),m=n(97),u=n(96),p=n(100),g=n(101),k=n(98),v=function(e){Object(c.a)(n,e);var t=Object(y.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={ips:[""],profileName:"",option:"TLS",serverName:""},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Encrypt DNS MDM Generator"),"Profile Name:",r.a.createElement(m.a,{multiline:!0,size:"small",value:this.state.profileName,onChange:function(t){e.setState({profileName:t.target.value})}}),r.a.createElement("br",null),"TLS"===this.state.option?"Server Name:":"Server URL",r.a.createElement(m.a,{multiline:!0,size:"small",value:this.state.serverName,onChange:function(t){e.setState({serverName:t.target.value})}}),r.a.createElement("br",null),"IP List:",r.a.createElement("br",null),this.state.ips.map((function(t,n){return[r.a.createElement(m.a,{multiline:!0,size:"small",key:n,value:e.state.ips[n],onChange:function(t){var a=e.state.ips;a[n]=t.target.value,e.setState({ips:a})}}),r.a.createElement(u.a,{style:{display:1===e.state.ips.length?"none":""},onClick:function(){if(1!==e.state.ips.length){var t=e.state.ips;t.splice(n,1),e.setState({ips:t})}}},"-"),r.a.createElement(u.a,{style:{display:e.state.ips.length===n+1?"":"none"},onClick:function(){var t=e.state.ips;t.push(""),e.setState({ips:t})}},"+"),r.a.createElement("br",null)]})),r.a.createElement(p.a,{value:this.state.option,row:!0,onChange:function(t,n){e.setState({option:n})}},r.a.createElement(g.a,{value:"TLS",control:r.a.createElement(k.a,null),label:"TLS"}),r.a.createElement(g.a,{value:"HTTPS",control:r.a.createElement(k.a,null),label:"HTTPS"})),r.a.createElement(u.a,{onClick:function(){return function(e,t){var n=document.createElement("a");n.setAttribute("href","data:xml/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}("encrypted-dns.mobileconfig",f(e.state.option,e.state.ips,e.state.profileName,e.state.serverName))}},"Download"))}}]),n}(a.Component);var f=function(e,t,n,a){return'<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n    <dict>\n        <key>PayloadContent</key>\n        <array>\n            <dict>\n                <key>DNSSettings</key>\n                <dict>\n                    <key>DNSProtocol</key>\n                    <string>'.concat(e,"</string>\n                    <key>ServerAddresses</key>\n                    <array>\n                        ").concat(t.map((function(e){return"<string>".concat(e,"</string>")})).join("\n                        "),"\n                    </array>\n                    <key>").concat("TLS"===e?"ServerName":"ServerURL","</key>\n                    <string>").concat(a,"</string>\n                </dict>\n                <key>PayloadDescription</key>\n                <string>Configures device to use encrypted DNS</string>\n                <key>PayloadDisplayName</key>\n                <string>").concat(n,"</string>\n                <key>PayloadIdentifier</key>\n                <string>com.apple.dnsSettings.managed.").concat(d.a(),"</string>\n                <key>PayloadType</key>\n                <string>com.apple.dnsSettings.managed</string>\n                <key>PayloadUUID</key>\n                <string>").concat(d.a(),"</string>\n                <key>PayloadVersion</key>\n                <integer>1</integer>\n                <key>ProhibitDisablement</key>\n                <false/>\n            </dict>\n        </array>\n        <key>PayloadDescription</key>\n        <string>Adds the encrypted DNS to Big Sur and iOS 14 based systems</string>\n        <key>PayloadDisplayName</key>\n        <string>").concat(n,"</string>\n        <key>PayloadIdentifier</key>\n        <string>com.github.earendil1412.dns-mdm-generator</string>\n        <key>PayloadRemovalDisallowed</key>\n        <false/>\n        <key>PayloadType</key>\n        <string>Configuration</string>\n        <key>PayloadUUID</key>\n        <string>").concat(d.a().toUpperCase(),"</string>\n        <key>PayloadVersion</key>\n        <integer>1</integer>\n    </dict>\n</plist>\n")},h=v;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[52,1,2]]]);
//# sourceMappingURL=main.77b5b10d.chunk.js.map