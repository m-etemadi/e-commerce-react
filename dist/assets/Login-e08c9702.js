import{a as r,r as o,j as e,B as d,b as u,c as h}from"./index-405a4665.js";function m(){const{login:n}=r(),[s,i]=o.useState("john@ecommerce.com"),[a,c]=o.useState("John1234");function l(t){t.preventDefault(),s&&a&&n(s,a)}return e.jsxs("form",{onSubmit:l,children:[e.jsx("div",{children:e.jsx("input",{type:"email",id:"email",placeholder:"Email Address",value:s,onChange:t=>i(t.target.value)})}),e.jsx("div",{children:e.jsx("input",{type:"password",id:"password",placeholder:"Password",value:a,onChange:t=>c(t.target.value)})}),e.jsx(d,{className:"btn",children:"Login"})]})}function g(){const{isAuthenticated:n}=r(),s=u(),[i]=h(),a=i.get("destination");return o.useEffect(function(){n&&(a?s("/order/checkout",{replace:!0}):s("/",{replace:!0}))},[n,s,a]),e.jsx("section",{className:"p-5",children:e.jsxs("div",{className:"container",children:[e.jsx("h2",{className:"page-title",children:"Login"}),e.jsx("div",{className:"login",children:e.jsx(m,{})})]})})}export{g as default};
