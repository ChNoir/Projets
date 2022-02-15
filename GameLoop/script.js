
// Variable globale 

var uploadData ;
var downloadData = {} ;

// Game //
window.onload = () => {
   
    document.getElementById('uploadJSON').addEventListener('change', onChange);
    
    addButton();
    addtacheloop(0);
   
    
    // Game loop
    setInterval(()=>{
        worktache ();
        UpdateSkiles();
        UpdateUI();
        displayButton ()

        if(GameData.Energie <= 0 || GameData.p_tache == GameData.taches.length) {            
            ReloadLoop();
        }

        
    }, ( 1000 * DeltaFrameRate() ) )



    // Set Tooltip class and event
    var Const_px = 5 ; 
    var Toolltip_class = document.getElementsByClassName("conteneur-tooltip");    
    var padding_to_px = 15;
    var conteneur
    for (let i = 0; i < Toolltip_class.length; i++) {
        
        conteneur = Toolltip_class.item(i);
        conteneur.addEventListener("mousemove", function( event ) {
            
            conteneur = Toolltip_class.item(i);
            var toolltip = conteneur.getElementsByClassName("tooltip").item(0);
            let box = conteneur.querySelector('.tooltip');
            let width = box.offsetWidth;
            let height = box.offsetHeight;
            var top = event.y  
            var left = event.x + padding_to_px
            
            if ( (top + height + Const_px) > window.innerHeight ) {
                top -=  ( height + padding_to_px )  
            }
            if ( ( left + width + Const_px ) > window.innerWidth ) {
                left -=  ( width + (padding_to_px *1.5)) 
            }

            toolltip.setAttribute("style",`top:${top}px ; left:${left}px ;`)
        })
    
    }
 
}

// Pour evite de quitte la page sans avoir save 

window.onbeforeunload = function(event) {
    return "";
}



///
/// Function 
///

// Recupere un fichie.json et stocage dans uploadData

function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    
}

function onReaderLoad(event){
    uploadData = JSON.parse(event.target.result);
    document.getElementById('uploadJSON').value = "";
    //console.log(uploadData);
    GameData = uploadData ;
    addButton(true);
    ReloadLoop();

}

// Lanche le telecharge d'un fichie.json a chaque fois qua la fuction est apple

function downloadFileJSON( Data = { test: "ok" } , namefile = "test" ) {

    //
    // il faut rajoute <a id = "downloadAnchorElem" style = "display : none;"></a> 
    // pour que la Function marche !!! 1 sufit pour tout 
    //
    var date = new Date;

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Data));
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", ( `${namefile}-${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}.json`  ));
    // simule un click sur l'element pour lanche le telecharge a chaque fois qua la fuction est apple
    dlAnchorElem.click();
}

function UpdateSkiles() {

    var consten = 100 ; 

    for (let i = 0; i < GameData.Skills.length; i++) {
        var skill = GameData.Skills[i];
        if (skill.Loop.Exp >= consten * ( 1 + (skill.Loop.Lvl * 0.5)) ) {
            skill.Loop.Exp -= consten * ( 1 + (skill.Loop.Lvl * 0.5))
            skill.Loop.Lvl++;
            if (skill.name == "constitution") {
                GameData.Stats[0].stats_max += 10
                GameData.Stats[0].stats += 10
            }
    
            if (skill.name == "volonte") {
                GameData.Energie += 100
                GameData.Energie_max += 100
            }
        } 
        if (skill.Game.Exp >= consten * ( 1 + (skill.Game.Lvl * 0.5) ) ) {
            skill.Game.Exp -= consten * ( 1 + (skill.Game.Lvl * 0.5) )
            skill.Game.Lvl++;

            if (skill.name == "constitution") {
                GameData.Stats[0].stats_max += 10
                GameData.Stats[0].stats += 10
            }
    
            if (skill.name == "volonte") {
                GameData.Energie += 100
                GameData.Energie_max += 100
            }
        } 
       

    }
}



function ReloadLoop() {

    // remet à zéro les skill 
    for (let i = 0; i < GameData.Skills.length; i++) {
        var skill = GameData.Skills[i];
            skill.Loop.Exp = 0
            skill.Loop.Lvl = 0;
    }

    // remet à zéro les PV

    
    GameData.Stats[0].stats = GameRestart.Stats[0].stats;
    GameData.Stats[0].stats_max = GameRestart.Stats[0].stats_max;

    
    // remet à zéro l'energie
    
    GameData.Energie = GameRestart.Energie;
    GameData.Energie_max = GameRestart.Energie_max;

   
    // remouve le html des taches 
    var html_tache = document.getElementsByClassName("scrollbar-make action" ).item(0)
                             .getElementsByClassName("conteneur-tache")

    
    for ( let i = 0 ; i <  GameData.taches.length; i++) {

        html_tache.item(0).remove()
    }

   
    // remet a zero les taches

    GameData.taches = [];
    GameData.p_tache = 0 ;

    for (let i = 0; i < GameData.loop.length; i++) {

        for(let j = 0; j <taches.length ; j++ ) {
            if (GameData.loop[i].name  == taches[j].name) {
                addtache(GameData.loop[i].name,GameData.loop[i].nombre, taches[j].icon);
            }
        }        
    } 
    
}



  
function UpdateUI() {

    
    // update skills

    var consten = 100 ;    

    for (let i = 0; i < GameData.Skills.length; i++) {
        var skill = GameData.Skills[i];
        var HtmlElement = document.getElementsByClassName(skill.name).item(0);

        HtmlElement.getElementsByClassName("loop-states").item(0).innerHTML = skill.Loop.Lvl
        HtmlElement.getElementsByClassName("game-states").item(0).innerHTML = skill.Game.Lvl

        HtmlElement.getElementsByClassName("conteneur-bar").item(0)
                   .getElementsByTagName("div").item(0)
                   .setAttribute("style",` width: ${ ((skill.Loop.Exp / (consten *( 1 + (skill.Loop.Lvl * 0.5)))  ) * 100).toFixed(2) }%;`);

        HtmlElement.getElementsByClassName("conteneur-bar-2").item(0)
                   .getElementsByTagName("div").item(0)
                   .setAttribute("style",` width: ${ ((skill.Game.Exp / (consten * ( 1 + (skill.Game.Lvl * 0.5))) ) * 100).toFixed(2) }%;`);
    }

    // update states

    document.getElementsByClassName("energy-bar").item(0)
            .getElementsByTagName("div").item(0)
            .setAttribute("style",` width: ${ ((GameData.Energie / GameData.Energie_max ) * 100).toFixed(2)  }%;`);

    document.getElementsByClassName("info-energy-bar").item(0)
            .getElementsByTagName("div").item(0)
            .getElementsByTagName("p").item(1).innerHTML = Math.round( GameData.Energie) ;

    document.getElementsByClassName("info-energy-bar").item(0)
            .getElementsByTagName("div").item(1)
            .getElementsByTagName("p").item(1).innerHTML = Math.round( GameData.Food );

    document.getElementsByClassName("info-energy-bar").item(0)
            .getElementsByTagName("div").item(2)
            .getElementsByTagName("p").item(1).innerHTML = Math.round( GameData.Gold );
           
    document.getElementsByClassName("HP").item(0)
            .getElementsByClassName("loop-states").item(0).innerHTML = Math.round(GameData.Stats[0].stats)

    document.getElementsByClassName("HP").item(0)
            .getElementsByClassName("conteneur-bar").item(0)
            .setAttribute("style",` width: ${ ((GameData.Stats[0].stats / GameData.Stats[0].stats_max ) * 100).toFixed(2)  }%;`);


    // update tache

    if (GameData.taches.length != 0 ) {
        for (let i = 0; i < GameData.taches.length; i++) {
            document.getElementsByClassName("conteneur-tache").item(i)
                    .getElementsByClassName("bar-tache").item(0)
                    .setAttribute("style", ` width: ${ (GameData.taches[i].progresiont[0] / GameData.taches[i].progresiont[1] * 100).toFixed(2) }%;`)

            document.getElementsByClassName("conteneur-tache").item(i)
                    .getElementsByClassName("nomber-tache").item(0)
                    .innerHTML = GameData.taches[i].processing[0]
            
        }
    }  
    // update loop
    
   
    if (GameData.loop.length != 0) {
        for (let i = 0 ; i < GameData.loop.length; i++) {
            document.getElementsByClassName("conteneur-loop").item(i)
                    .getElementsByClassName("loop-nombre").item(0).innerHTML = GameData.loop[i].nombre
        }
    }
}



function worktache () {

    let tache = GameData.taches[GameData.p_tache]
    if (tache == null) { return }

    
    taches.forEach(element => {
        if (element.name == tache.name) {
            element.fun( element.name, element.conditions);

            if (tache.progresiont[0] >= tache.progresiont[1] ) {

            
                if (tache.processing[0] + 1 >= tache.processing[1] ) {
                    tache.processing[0]++;
                    GameData.p_tache++;
                }
                else {
                    tache.processing[0]++;
                    tache.progresiont[0]-= tache.progresiont[1]
                }
            }
        }
        
    });
    
}


function addtache( Name = "" , nombre = 1 ,Img = "") {

    var conteneur_tache = document.createElement("div");
    var img             = document.createElement("img");
    var p_nomber        = document.createElement("p");
    var p_max           = document.createElement("p");
    var p_name          = document.createElement("p");
    var bar             = document.createElement("div");

    conteneur_tache.setAttribute("class","conteneur-tache");
   
    img.setAttribute("src" , Img );

    p_nomber.setAttribute("class","nomber-tache");
    p_nomber.innerHTML = 0;

    p_max.setAttribute("class","max-tache");
    p_max.innerHTML = "/"+nombre;

    p_name.setAttribute("class","name-tache");
    p_name.innerHTML = Name;

    bar.setAttribute("class","bar-tache");

    conteneur_tache.appendChild(bar);
    conteneur_tache.appendChild(img);
    conteneur_tache.appendChild(p_nomber);
    conteneur_tache.appendChild(p_max);
    conteneur_tache.appendChild(p_name);
   
    document.getElementsByClassName("conteneur-action-run").item(0)
    .getElementsByTagName("fieldset").item(0)
    .appendChild( conteneur_tache )


    var tache = { name : Name , processing : [0, nombre ], progresiont : [ 0,null] }
    GameData.taches.push(tache);
    
}




function addtacheloop (index_tache) {


    var tache = taches[index_tache]

    if (GameData.loop.length != 0 ) {
        if (GameData.loop[GameData.loop.length-1].name == tache.name ) {
            GameData.loop[GameData.loop.length-1].nombre ++ ;
            console.log(GameData.loop[GameData.loop.length-1].nombre)
            return ;
        }
    } 
   

    var conteneur_loop  = document.createElement("div");
    var loop_icon       = document.createElement("img");
    var loop_name       = document.createElement("p");
    var loop_up         = document.createElement("img");
    var loop_nombre     = document.createElement("p");
    var loop_down       = document.createElement("img");
    var loop_delete     = document.createElement("img");


    conteneur_loop.setAttribute(    "class","conteneur-loop");
    loop_icon.setAttribute(         "class","loop-icon");
    loop_name.setAttribute(         "class","loop-name");
    loop_up.setAttribute(           "class","loop-up");
    loop_nombre.setAttribute(       "class","loop-nombre");
    loop_down.setAttribute(         "class","loop-down");
    loop_delete .setAttribute(      "class","loop-delete");

    loop_nombre.innerHTML = "1" ;
    loop_name.innerHTML = tache.name;
    loop_icon.setAttribute( "src", tache.icon);
    loop_up.setAttribute( "src", GameConfig.icon.up);
    loop_up.setAttribute( "onclick", "up(this)");
    loop_down.setAttribute( "src", GameConfig.icon.down);
    loop_down.setAttribute( "onclick", "down(this)");
    loop_delete.setAttribute( "src", GameConfig.icon.delete);
    loop_delete.setAttribute( "onclick", "delete_(this)");

    conteneur_loop.appendChild(loop_icon);
    conteneur_loop.appendChild(loop_name);
    conteneur_loop.appendChild(loop_up);
    conteneur_loop.appendChild(loop_nombre);
    conteneur_loop.appendChild(loop_down);
    conteneur_loop.appendChild(loop_delete);

    document.getElementsByClassName("conteneur-action-run").item(0)
    .getElementsByTagName("fieldset").item(1)
    .appendChild( conteneur_loop );


    GameData.p_loop ++ ;
    var loop = { name :tache.name , nombre : 1};
    GameData.loop.push(loop);

}

function up (element) {
    var position = Array.from(element.parentNode.parentNode.children).indexOf(element.parentNode)
    GameData.loop[position-1].nombre++;
}

function down (element) {
    var position = Array.from(element.parentNode.parentNode.children).indexOf(element.parentNode)
    if ( GameData.loop[position-1].nombre - 1 > 0){
        GameData.loop[position-1].nombre--;
    }
}

function delete_ (element) {
    var position = Array.from(element.parentNode.parentNode.children).indexOf(element.parentNode)
    GameData.loop.splice(position-1,1)
    element.parentNode.remove()
} 

function addButton (isDisplay = false) {

    if (!isDisplay) {

        for ( let i = 0 ; i < taches.length ; i++) {
            var conteneur_button = document.createElement("div");
            var name = document.createElement("p");
            var tooltip = document.createElement("fieldset")
    
            name.innerHTML = taches[i].name
    
            conteneur_button.setAttribute("style" ," display:none;")
            conteneur_button.setAttribute("onclick", "addtacheloop ("+i+")")
            conteneur_button.setAttribute("class","button conteneur-tooltip noselect")
            tooltip.setAttribute("class","tooltip")
            tooltip.innerHTML = i;
    
            conteneur_button.appendChild(name)
            conteneur_button.appendChild(tooltip)
    
            document.getElementsByClassName("conteneur-action-select").item(0)
                    .getElementsByClassName("conteneur-button").item(0)
                    .appendChild(conteneur_button)
    
            GameData.displayButton.push(false)
    
        }
        
       
    }
    else {

        var n = document.getElementsByClassName("conteneur-button").item(0).getElementsByClassName("button").length 
        for (let j = 0; j < n ; j++) {
            
            document.getElementsByClassName("conteneur-button").item(0)
                    .getElementsByClassName("button").item(0).remove()
        }
        

        for ( let i = 0 ; i < taches.length ; i++) {
            var conteneur_button = document.createElement("div");
            var name = document.createElement("p");

            name.innerHTML = taches[i].name

            if (GameData.displayButton[i]) {
                conteneur_button.setAttribute("style" ,"display:none;")
            }
            else {
                conteneur_button.setAttribute("style" ,"display: inline-block;")
            }
            conteneur_button.setAttribute("onclick", "addtacheloop ("+i+")")
            conteneur_button.setAttribute("class","button")

            conteneur_button.appendChild(name)

            document.getElementsByClassName("conteneur-action-select").item(0)
                    .getElementsByClassName("conteneur-button").item(0)
                    .appendChild(conteneur_button)

        }
    }
}

function displayButton () {

    // pour chaque tache
    for (let i = 0 ; i < taches.length ; i++) {

        // tu chercher la confition dispaly
        for(let j = 0 ; j < taches[i].conditions.length ; j++) {
             if (taches[i].conditions[j].name == "display" ) {
                var condition = taches[i].conditions[j]

                if (condition.skill[0] != null) {
                    for (let k = 0; k < condition.skill.length; k++) {
                        for(let g = 0 ; g < GameData.Skills.length ; g++){
                            if ( GameData.Skills[g].name ==  condition.skill[k]){
                                if ( GameData.Skills[g].Loop.Lvl + GameData.Skills[g].Game.Lvl == condition.lvl[k]) {
                                    document.getElementsByClassName("button").item(i)
                                            .setAttribute("style"," display: inline-block;");
                                    GameData.displayButton[i] = true;
                                }
                            }
                        }
                        
                    }
                }
                else{
                    document.getElementsByClassName("button").item(i)
                        .setAttribute("style"," display: inline-block;");
                    GameData.displayButton[i] = true;
                } 
             }
        }
    }
    

}


// <div class="conteneur-loop">
//     <img class="loop-icon" src="" alt="">
//     <div class="loop-name">Marche</div>
//     <img class="loop-up" src="" alt="">
//     <div class="loop-nombre">5</div>
//     <img class="loop-down" src="" alt="">
//     <img class="loop-delete" src="" alt="">
// </div>


// <div class="conteneur-loop">
//     <img class="loop-icon" src="" alt="">
//     <div class="loop-name"></div>
//     <img class="loop-up" src="" alt="">
//     <div class="loop-nombre"></div>
//     <img class="loop-down" src="" alt="">
//     <img class="loop-delete" src="" alt="">
// </div> 
