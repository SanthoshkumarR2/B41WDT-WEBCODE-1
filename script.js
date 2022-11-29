let ulist=document.querySelector(".ulist");
let dropDownList=document.getElementById("dropDown");

//Brands that are used for Search!!!

let brands=['Choose Your brand here','Almay','Annabelle','Benefit','Cargo Cosmetics','Clinique','Covergirl','E.l.f.',"L'oreal",'Maybelline','Nyx','Smashbox','Revlon'];
brands.forEach((brand,index)=>{
    let option=document.createElement("option");
    option.setAttribute("value",index);
    option.innerText=brand;
    dropDownList.append(option)
});
// First Preference Brand!!
let brandName="l'oreal";
let url=(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`);//Fetching link from the Api Using Async and Await Function!!
let initialPage=0;
dropDownList.addEventListener("click",async()=>{
    let index=dropDownList.selectedIndex;
     if(index>0){
        brandName="";
        brandName+=brands[index];
        url=(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brandName}`)//Fetching link from the Api
     }
     try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(initialPage,initialPage+9)
            ulist.innerHTML=ThreeCard(filteredArray);
        } catch (error) {
            
    }

})

let getData = async ()=>{  // Fetching JSON Data from the Api Using Async and Await Function!!
  try {
      let res = await fetch(url);
      res=await res.json();
      return res
  } catch (error) {
      console.log(error);
  }
}

addEventListener("DOMContentLoaded",async ()=>{
    try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(initialPage,initialPage+9)
            ulist.innerHTML=ThreeCard(filteredArray);
        } catch (error) {
            console.log(error);        
    }
})

let cardDetails=(product)=>{    // This are display in the card sessions Display!!
    let dump=`
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div class="card h-100" >
                <div class="card-header">${product.name}</div>
                <div class="card-body">
                    <img class="flag1"f src="${product.image_link}" alt="">
                    <div class=align>
                        <p class="card-text"><b>Brand:</b>${product.brand}</p>
                        <p class="card-text"><b>Price :</b>$ ${(+product.price)}</p>
                        <p class="card-text"><b>Description :</b> ${(product.description)}</p>
                        <a class="card-text" href="${product.product_link}"><b>Click here to Buy>> </b></a>
                    </div>
                </div>
            </div>
    </div>
                    `;        
                     
        return dump
}


let ThreeCard=(data)=>{      

    let mainAdd="";
    let tempAdd="";
    for(let i=0;i<data.length;i=i+3){
        let c="";
        for(let j=i;j<i+3;j++){
            c+=cardDetails(data[j])
        }
        tempAdd=`<li style="list-style:none;"><div class="row">${c}</div></li>`;
        mainAdd+=tempAdd;
    }
    return mainAdd
}
