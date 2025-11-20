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
var sections=document.querySelectorAll('d-section, d-subsection');
var n_section=0;
var n_subsection=0;
for (var i=0;i<sections.length;i++){
    if (sections[i].tagName == "D-SECTION"){
        n_section++;
        n_subsection=0;
        sections[i].setAttribute("number",n_section);
        var h2 = sections[i].querySelector('h2');
        if(h2) h2.innerHTML = n_section + " " + h2.innerHTML;
    }
    if (sections[i].tagName == "D-SUBSECTION"){
        n_subsection++;
        sections[i].setAttribute("number",n_section+"."+n_subsection);
        var h3 = sections[i].querySelector('h3');
        if(h3) h3.innerHTML = n_section + "." + n_subsection + " " + h3.innerHTML;
    }

}

class Equation extends HTMLElement {
    connectedCallback() {
        this.setAttribute("class","equation");
        // Numbering handled in DOMContentLoaded
    };
}
customElements.define('d-equation', Equation);


//this code manages the references
class Ref extends HTMLElement {
    connectedCallback() {
        var key=this.getAttribute("key");
        var element=document.getElementById(key)
        if (!element) return; // Safety check
        var number= element.getAttribute('number');
        
        if (element.getAttribute('class')=="equation"){ //this part is only valid if it is an equation
            var equation=element;
            for(i=0;i<10;i++){ //find the element with katex inside
                if (equation.firstElementChild && equation.firstElementChild.getAttribute('class')=="katex") {break;}
                if (equation.firstElementChild) equation=equation.firstElementChild;
            }

            var hover_box=document.createElement("d-hover-box"); //create the hover box
            hover_box.innerHTML=equation.innerHTML; //put the equation inside
            if(hover_box.firstElementChild) hover_box.firstElementChild.style.padding="10px"; //and add some padding

            this.after(hover_box);
            this.onmouseover=function(){hover_box.style.display="block";}
            this.onmouseout=function(){hover_box.style.display="none";}
        }
        this.appendChild(createCustomLink(number,"#"+key));

    };
}


//this code manages the equations,
document.addEventListener("DOMContentLoaded", function() {
    // Equations
    var equations=document.querySelectorAll('d-equation');
    for (var i=0;i<equations.length;i++) {
        var num = i+1;
        equations[i].setAttribute("number", num);
        // Add visual number
        var numSpan = document.createElement('span');
        numSpan.style.float = 'right';
        numSpan.style.lineHeight = '200%';
        numSpan.textContent = '(' + num + ')';
        
        // Try to append to the katex display if possible, otherwise just append to the element
        var katexDisplay = equations[i].querySelector('.katex-display > .katex > .katex-html');
        if (katexDisplay) {
            katexDisplay.appendChild(numSpan);
        } else {
             // Fallback if katex structure isn't exactly as expected or not yet rendered
            equations[i].appendChild(numSpan);
        }
    }

    // Figures
    var figures = document.querySelectorAll('figure, d-figure');
    var n_figure = 0;
    for (var i = 0; i < figures.length; i++) {
        var caption = figures[i].querySelector('figcaption');
        if (caption) {
            n_figure++;
            figures[i].setAttribute("number", n_figure); // For referencing if needed
            caption.innerHTML = "<b>Figure " + n_figure + ": </b>" + caption.innerHTML;
        }
    }
    
    customElements.define('d-reference', Ref); //this line calls the reference manager

});
