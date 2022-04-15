function createCustomLink(anchorText, anchorLink){
    var aTag = document.createElement("a");
    aTag.href = anchorLink;
    aTag.innerHTML = anchorText;

    return aTag ;
}

function createCustomText(anchorText, type="h2"){
    var Class;
    if (type=="h2") Class = "section";
    if (type=="h3") Class = "subsection";

    var tag = document.createElement(type);
    tag.innerHTML = anchorText;
    tag.setAttribute("class", Class);

    return tag ;
}

//this code defines and manages the sections
class Sec extends HTMLElement {
    connectedCallback() {
        var text=this.textContent;
        this.textContent="";
        this.appendChild(createCustomText(text,"h2"));

    };
}
customElements.define('d-section', Sec);


//this code defines and manages the sub-sections
class SubSec extends HTMLElement {
    connectedCallback() {
        var text=this.textContent;
        this.textContent="";
        this.appendChild(createCustomText(text,"h3"));

    };
}
customElements.define('d-subsection', SubSec);





// this is to assign the numbers to the sections
var sections=document.querySelectorAll('.section,.subsection');
var n_section=0;
var n_subsection=0;
for (var i=0;i<sections.length;i++){
    var parent=sections[i].parentElement;
    if (sections[i].className == "section"){
        n_section++;
        n_subsection=0;
        parent.setAttribute("number",n_section);
    }
    if (sections[i].className=="subsection"){
        n_subsection++;
        parent.setAttribute("number",n_section+"."+n_subsection);
    }

}

class Equation extends HTMLElement {
    connectedCallback() {
        this.setAttribute("class","equation");

    };
}
customElements.define('d-equation', Equation);


//this code manages the references
class Ref extends HTMLElement {
    connectedCallback() {
        var key=this.getAttribute("key");
        var number= document.getElementById(key).getAttribute('number');
        this.appendChild(createCustomLink(number,"#"+key));
    };
}


//this code manages the equations,
document.addEventListener("DOMContentLoaded", function() {
    var equations=document.querySelectorAll('.katex-display');
    for (var i=0;i<equations.length;i++){
    var parent=equations[i].parentElement.parentElement;
    if (parent.className=="equation"){
        parent.setAttribute("number",i+1);
        }
    }
    customElements.define('d-reference', Ref); //this line calls the reference manager

});
