let styleGallery =  {display:"flex",flexWrap: "wrap", justifyContent: "space-around"}

let Users = function (vnodes)  {
  let users = []
  let request = `https://randomuser.me/api/?results=${vnodes.attrs.count}`
  return {
  init: m.request(request).then((d) => {
     users = d.results
  }),
  
  view: (vnodes) => [
    m("div",{style:styleGallery}, 
      users.map((u) =>  m("div",  [      
      m("img", {src:u.picture.large}),
      m("div.name", {style:{textAlign:"center"}}, u.name.first + " " + u.name.last)
    ])))
  ]
}}


class ListUsers extends HTMLElement {
  constructor() {
    super(); 
    this.count = 100
  }

  connectedCallback() {
   m.mount(this,  {view: () => m(Users, {count: (this.getAttribute('count') || this.count) })})
  }
}

// This registers your new tag and associates it with your class
window.customElements.define('random-users', ListUsers);

