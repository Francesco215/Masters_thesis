

//for section

sections=document.getElementsByTagName("h2");

for(i=0;i<sections.length;i++){
    console.log(i)
    sections[i].setAttribute("number",i+1);
}