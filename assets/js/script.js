


//===============ITEM CONTROLLER==================
const ItemCtrl = (function(){
    
    
    attackerStats = {
        startHealth: 100,
        currentHealth: 0,
        randForce: function(){
            return Math.floor(Math.random()*100);
        },
        currentForce: 0
    }
    
    defenderStats = {
        startHealth: 100,
        currentHealth: 0,
        randForce: function(){
            return Math.floor(Math.random()*100);
        },
        currentForce: 0
    }
    
    //Public Methods
    return {
        setAttackerStats: (attacker)=>{
            
            attacker = attacker.id;
            attackerStats.currentForce = attackerStats.randForce();
            attackerStats.currentHealth = attackerStats.startHealth;
            let attackerHealth = `${attackerStats.currentHealth}%`,
                attackerForce = `${attackerStats.currentForce}%`;
            
                $(`#health${attacker}`).css('width', attackerHealth),
                $(`#force${attacker}`).css('width', attackerForce);
            
        },
        setDefenderStats:(defender)=>{
            defenderStats.currentForce = defenderStats.randForce();
            defenderStats.currentHealth = defenderStats.startHealth;
            let defenderHealth = `${defenderStats.currentHealth}%`,
            defenderForce = `${defenderStats.currentForce}%`;
            
                $(`#health${defender.firstElementChild.id}`).css('width', defenderHealth);
                $(`#force${defender.firstElementChild.id}`).css('width', defenderForce);
        },
        attack:()=>{
            
            let attackerHealth = attackerStats.currentHealth,
                attackerForce = attackerStats.currentForce,
                defenderHealth = defenderStats.currentHealth,
                defenderForce = defenderStats.currentForce,
                attackerId = $('.attackerClass')[0].firstElementChild.id,
                defenderId = $('.defenderClass')[0].firstElementChild.id,
                damage;
                

                if(attackerForce > defenderForce){
                    damage = attackerForce - defenderForce;
                    defenderHealth = defenderHealth - damage;
                    defenderStats.currentHealth = defenderHealth;
                    defenderStats.currentForce = defenderStats.randForce();
                    attackerStats.currentForce = attackerStats.randForce();
                
                    $(`#health${defenderId}`).css('width', `${defenderStats.currentHealth}%`);
                    $(`#force${defenderId}`).css('width', `${defenderStats.currentForce}%`);
                    $(`#force${attackerId}`).css('width', `${attackerStats.currentForce}%`);
            
                    
                    ItemCtrl.checkCharactersHealth(defenderHealth, attackerHealth);
                         

                    
            }else if(attackerForce < defenderForce){
                damage = defenderForce - attackerForce;
                attackerHealth = attackerHealth - damage;
                attackerStats.currentHealth = attackerHealth;
                defenderStats.currentForce = defenderStats.randForce();
                attackerStats.currentForce = attackerStats.randForce();
                
                ItemCtrl.checkCharactersHealth(defenderHealth, attackerHealth);
                
                $(`#health${attackerId}`).css('width', `${attackerStats.currentHealth}%`);
                $(`#force${attackerId}`).css('width', `${attackerStats.currentForce}%`);
                $(`#force${defenderId}`).css('width', `${defenderStats.currentForce}%`);
  
                
               
            } 
        },
        checkCharactersHealth:(defenderHealth, attackerHealth) =>{
            let attackerId = $('.attackerClass')[0].firstElementChild.id,
                defenderId = $('.defenderClass')[0].firstElementChild.id;
                
            if(defenderHealth <= 0 && attackerHealth > 0){
                $(`#health${defenderId}`).css('width', `0%`);
                    $('.defenderClass').remove();
                let goodSide = $('.goodSide').filter('.goodSide')[0],
                    darkSide = $('.darkSide').filter('.darkSide')[0],
                    defender,
                    hiddenStats;
                    if(darkSide && goodSide){
                        switch(defenderId){
                            case 'yoda':
                                $('.defenderCard').append(goodSide);
                                goodSide.classList = 'col-md-12 d-flex flex-column align-items-center defenderClass';
                                goodSide.lastElementChild.classList = 'container';
                                defenderId = goodSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(goodSide);
                                break;
                            case 'luke':
                                $('.defenderCard').append(goodSide);
                                goodSide.classList = 'col-md-12 d-flex flex-column align-items-center defenderClass';
                                goodSide.lastElementChild.classList = 'container';
                                defenderId = goodSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(goodSide);
                                break;
                            case 'obiWan':
                                $('.defenderCard').append(goodSide);
                                goodSide.classList = 'col-md-12 d-flex flex-column align-items-center defenderClass';
                                goodSide.lastElementChild.classList = 'container';
                                defenderId = goodSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(goodSide);    
                                break;
                            case 'maul':
                                $('.defenderCard').append(darkSide);
                                darkSide.classList = 'col-md-12 d-flex flex-column align-items-center defenderClass';
                                darkSide.lastElementChild.classList = 'container';
                                defenderId = darkSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(darkSide);
                                break;
                            case 'palpatine':
                                $('.defenderCard').append(darkSide);
                                $('.darkSide').addClass('col-md-12 d-flex flex-column align-items-center defenderClass');
                                goodSide.lastElementChild.classList = 'container';
                                defenderId = darkSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(darkSide);   
                                break;
                            case 'vader':
                                $('.defenderCard').append(darkSide);
                                $('.darkSide').addClass('col-md-12 d-flex flex-column align-items-center defenderClass');
                                goodSide.lastElementChild.classList = 'container';
                                defenderId = darkSide.firstElementChild.id;
                                $(`#${defenderId}Sound`)[0].play();
                                ItemCtrl.setDefenderStats(darkSide); 
                                break;
                        }//End of Switch            
                    }else {
                        
                        $(`#health${defenderId}`).css('width', `0%`);

                        setTimeout(()=>{
                           ItemCtrl.attackerWins(attackerId);
                        }, 500);
                    }   

            }else if(attackerHealth <= 0 && defenderHealth > 0){

                $(`#health${attackerId}`).css('width', `0%`);

                setTimeout(()=>{
                   ItemCtrl.defenderWins(attackerId);
                }, 500);
                            
            }     
        },
        defenderWins:(attackerId)=>{
            let fightingStage = $('#fightingStage'),
                    darkSideWins = `<h1 class='display-1 text-center'>The Dark Side Wins!</h1>
                                    <button type="button" class="btn btn-warning float-right ml-3" onClick="window.location.reload()" data-dismiss="modal">Restart Game</button>
                                    <button type="button" class="btn btn-dark float-right" data-dismiss="modal">Close</button>`,
                        forceWins = `<h1 class='display-1 text-center'>The Force Wins!</h1>
                                     <button type="button" class="btn btn-warning float-right ml-3" onClick="window.location.reload()" data-dismiss="modal">Restart Game</button>
                                     <button type="button" class="btn btn-dark float-right" data-dismiss="modal">Close</button>`;
                    switch(attackerId){
                            case 'yoda':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins);
                                break;
                            case 'luke':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins)
                                break;
                            case 'obiWan':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins)
                                break;
                            case 'maul':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins);
                                break;
                            case 'palpatine':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins);
                                break;
                            case 'vader':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins);
                                break;
                    }
         
        },
        attackerWins:(attackerId)=>{
            let fightingStage = $('#fightingStage'),
                    darkSideWins = `<h1 class='display-1 text-center'>The Dark Side Wins!</h1>
                                    <button type="button" class="btn btn-warning float-right ml-3" data-dismiss="modal" onClick="window.location.reload()">Restart Game</button>
                                    <button type="button" class="btn btn-dark float-right" data-dismiss="modal">Close</button>`,
                        forceWins = `<h1 class='display-1 text-center'>The Force Wins!</h1>
                                     <button type="button" class="btn btn-warning float-right ml-3" data-dismiss="modal" onClick="window.location.reload()">Restart Game</button>
                                     <button type="button" class="btn btn-dark float-right" data-dismiss="modal">Close</button>`;
                    switch(attackerId){
                            case 'yoda':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins);
                                break;
                            case 'luke':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins)
                                break;
                            case 'obiWan':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(forceWins)
                                break;
                            case 'maul':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins);
                                break;
                            case 'palpatine':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins);
                                break;
                            case 'vader':
                                $('#fighterStageHeading').css('display', 'none');
                                fightingStage.html(darkSideWins);
                                break;
                    }

        }
    }

})();



//================UI CONTROLLER==================
const UICtrl = (function(){
    
    
    
    const UISelectors = {
        
        darkSideCharacters: '#darkSideCharacters',
        goodSideCharacters: '#goodSideCharacters',
        pickFighterHeading: '#pickFighterHeading',
        fightingStage: '.fightingStage',
        attack: '.attack',
        attackerCard: '.attackerCard',
        defenderCard: '.defenderCard',
        starWarsChars: '.starWarsChars',
        soundTrack: '#soundTrack',
        restartGame: '.restartGame'
        
    }
    
    //Public Methods
    return {
        setAttackerPosition: (attackerParent, attackerChild)=>{
            
            $(attackerParent).appendTo(UISelectors.attackerCard);
            $(attackerParent).addClass('col-md-12 d-flex flex-column align-items-center attackerClass');
            $(attackerChild.nextElementSibling).removeClass('d-none');

            setTimeout(()=>{
                let attackerID = attackerChild.id,
                attackerSound = $(`#${attackerID}Sound`)[0];
                
                switch(attackerID) {
                    case 'vader':
                        attackerSound.play();
                        break;
                    case 'palpatine':
                        attackerSound.play();
                        break;
                    case 'maul':
                        attackerSound.play();
                        break;    
                    case 'yoda':
                        attackerSound.play();
                        break;
                    case 'luke':
                        attackerSound.play();
                        break;
                    case 'obiWan':
                        attackerSound.play();
                        break;
                    case 'maul':
                        break;
                }    
            }, 200)
            
        },
        setDefenderPosition: (defenderParent)=>{
            $(defenderParent).appendTo(UISelectors.defenderCard);
            $(defenderParent).addClass('col-md-12 d-flex flex-column align-items-center defenderClass');
            $(defenderParent.lastElementChild).removeClass('d-none');           
         
            let defenderID = defenderParent.firstElementChild.id,
                defenderSound = $(`#${defenderID}Sound`)[0];
            switch(defenderID) {
                case 'vader':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;
                case 'palpatine':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;
                case 'maul':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;    
                case 'yoda':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;
                case 'luke':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;
                case 'obiWan':
                    setTimeout(()=>{
                     defenderSound.play();    
                    }, 3500);
                    break;
                case 'maul':
                    break;
            }
        },
        
        getSelectors: () => {
            return UISelectors;
        }
    }

})();




//==============APP CONTROLLER=================
const AppCtrl = (function(ItemCtrl, UICtrl, $){
    //Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    
    const loadEventListeners = ()=>{
        
        /*----------------CLICK Events-----------------*/
        
        $(UISelectors.starWarsChars).click(attackerPosition);
        
        $(UISelectors.attack).click(attack);
             
        
        
        
    }
    
    const attackerPosition = function(e){
        
        let attackerParent = e.target.parentElement,
            attackerChild = e.target,
            randNum = Math.floor(Math.random()*3),
            soundTrack = $(UISelectors.soundTrack).volume = 0.05;
       
            
        if($(attackerParent).hasClass('darkSide')){
            $('#fightingStageModal').modal('show');
            
            UICtrl.setAttackerPosition(attackerParent, attackerChild);
            
            let goodSide = $('.goodSide').filter('.goodSide')[randNum];
     
            UICtrl.setDefenderPosition(goodSide);
            
            $(UISelectors.starWarsChars).off('click');
            
            $(UISelectors.darkSideCharacters).addClass('row d-flex justify-content-around');
            $(UISelectors.goodSideCharacters).addClass('row d-flex justify-content-around');
            $(UISelectors.pickFighterHeading).css('display', 'none');
            
            ItemCtrl.setAttackerStats(attackerChild);
            
            ItemCtrl.setDefenderStats(goodSide);
            
            
        }else if($(attackerParent).hasClass('goodSide')){
            $('#fightingStageModal').modal('show');
            
            UICtrl.setAttackerPosition(attackerParent, attackerChild);
            
            let darkSide = $('.darkSide').each('.darkSide')[randNum];
            
            UICtrl.setDefenderPosition(darkSide);
            
            $(UISelectors.starWarsChars).off('click');
            
            
            $(UISelectors.darkSideCharacters).addClass('row d-flex justify-content-around');
            $(UISelectors.goodSideCharacters).addClass('row d-flex justify-content-around');
            $(UISelectors.pickFighterHeading).css('display', 'none');
            
            ItemCtrl.setAttackerStats(attackerChild);
            
            ItemCtrl.setDefenderStats(darkSide); 
            
            
        }
        
    }
    
    const attack = function(){
        let saberSound = $('#saberSound')[0];
        saberSound.volume = .4;
        saberSound.play();
        setTimeout(()=>{
            ItemCtrl.attack();    
        }, 3700);
        
        
    }
    
    
    //Public Methods
    return {
        init: () => {
           loadEventListeners();
            
            setTimeout(()=>{
                $('.card.mx-auto.gameCard').css('transition', 'all 15s');            
                $('.card.mx-auto.gameCard').css('transform','translateY(-15%) scale(.70)');
                $('.card.mx-auto.gameCard').css('transitionTimingFunction', 'linear');
                let soundTrack = $(UISelectors.soundTrack)[0];
                soundTrack.volume = 0.3;
                soundTrack.play();
                soundTrack.autoplay = true;

            }, 300);
            

        }
    }

})(ItemCtrl, UICtrl, $);

AppCtrl.init();