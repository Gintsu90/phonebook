(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t.n(c),o=t(15),a=t.n(o),u=(t(20),t(6)),i=t(3),s=t(0),l=function(e){var n=e.person,t=e.number,c=e.deletePerson;return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("li",{children:[n.name," ",t," ",Object(s.jsx)("button",{onClick:c,children:"delete"})]})})},b=function(e){var n=e.numbers,t=e.deletePerson;return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("ul",{children:n.map((function(e,n){return Object(s.jsx)(l,{deletePerson:function(){return t(e.id)},person:e,number:e.number},n)}))})})},d=function(e){var n=e.filterNames;return Object(s.jsxs)(s.Fragment,{children:["Filter shown with ",Object(s.jsx)("input",{onChange:n})]})},j=function(e){var n=e.addName,t=e.handleNameChange,c=e.handleNumberChange,r=e.newNumber,o=e.newName;return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{onChange:t,value:o}),Object(s.jsx)("br",{}),"number: ",Object(s.jsx)("input",{onChange:c,value:r})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})})},m=t(4),h=t.n(m),f="api/persons",O=function(){return h.a.get(f).then((function(e){return e.data}))},g=function(e){return h.a.post(f,e).then((function(e){return e.data}))},x=function(e){return h.a.delete("".concat(f,"/").concat(e)).then((function(e){return e}))},v=function(e,n){return h.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message;return Object(s.jsx)(s.Fragment,{children:""!==n?Object(s.jsx)("div",{style:{color:"green",border:"solid",background:"lightgrey",fontSize:20,padding:5,marginBottom:10},children:Object(s.jsx)("p",{children:n})}):""})};var w=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(i.a)(o,2),l=a[0],m=a[1],h=Object(c.useState)(""),f=Object(i.a)(h,2),w=f[0],N=f[1],y=Object(c.useState)(""),C=Object(i.a)(y,2),S=C[0],k=C[1],F=Object(c.useState)(""),P=Object(i.a)(F,2),A=P[0],T=P[1],B=function(){O().then((function(e){console.log(e),r(e)})).catch((function(e){alert("ei l\xf6ydy")}))},E=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(c.useEffect)(B,[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(p,{message:A}),Object(s.jsx)(d,{filterNames:function(e){console.log(e.target.value),k(e.target.value)}}),Object(s.jsx)("h2",{children:"Add new"}),Object(s.jsx)(j,{addName:function(e){e.preventDefault();var n=t.some((function(e){return w===e.number})),c=t.some((function(e){return l===e.name})),o=t.find((function(e){return e.name===l})),a=Object(u.a)(Object(u.a)({},o),{},{number:w});console.log("####",a.id);var i={name:l,number:w};n||""===l||""===w?(r(t),alert("".concat(l," already exist"))):c?(console.log(a),v(a.id,a).then((function(e){console.log("new number",e),r(t.map((function(n){return n.id===a.id?e:n}))),m(""),N(""),T("Changed ".concat(a.name,"s number")),setTimeout((function(){T("")}),5e3)})).catch((function(e){console.log(e),T("Information of ".concat(a.name," has already been removed from server")),setTimeout((function(){B(),T("")}),5e3)}))):c||g(i).then((function(e){console.log(e),r(t.concat(e)),m(""),N(""),T("Added name: ".concat(e.name," number: ").concat(e.number)),setTimeout((function(){T("")}),5e3)})).catch((function(e){return console.log(e)}))},newName:l,newNumber:w,handleNameChange:function(e){console.log(e.target.value),m(e.target.value)},handleNumberChange:function(e){console.log(e.target.value),N(e.target.value)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(b,{deletePerson:function(e){window.confirm("Are you sure you want to delete this?")&&x(e).then((function(e){console.log("deleted successfully",e),B()}))},numbers:E})]})};a.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(w,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.0efe9ebc.chunk.js.map