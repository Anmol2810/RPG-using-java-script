let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const stageImage = document.querySelector("#stageImage");
const inventoryButton = document.querySelector("#invt");
const locations = [
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions" : [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store.\"",
        image: "https://www.bing.com/th/id/OGC.b83fb65c47ff0172f82d8973daa5cbc9?pid=1.7&rurl=https%3a%2f%2fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2ff%2f12cbe8a4-f55c-4b40-85bb-d8e1405e7b84%2fda0njox-f6a0dddb-178d-495e-be95-2f5fcae84374.gif%3ftoken%3deyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyY2JlOGE0LWY1NWMtNGI0MC04NWJiLWQ4ZTE0MDVlN2I4NFwvZGEwbmpveC1mNmEwZGRkYi0xNzhkLTQ5NWUtYmU5NS0yZjVmY2FlODQzNzQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.m2jK2SuzFwnTwPUHLo9Ep_H3Yj7sQ5lZ0EHW2KB7oy0&ehk=Pl7VG5rHFFogkvUW5y%2baTQhGkmo2hhhfFN4I6AGCTLk%3d"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions" : [buyHealth, buyWeapon, goTown],
        text: "You entered the Store.",
        image: "https://th.bing.com/th/id/R.37d760d25a939ac8742c74dd4812310d?rik=SrW8rZ8WSSJsRA&riu=http%3a%2f%2fimg2.joyreactor.com%2fpics%2fpost%2ffull%2fgif-shop-faxdoc-pixel-art-2517064.gif&ehk=FjBa0GFFE%2bAdIr%2bmZbKZC0r%2fKyqYU%2fmA3mUz%2bRfuCao%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        name: "cave",
        "button text": ["Fight slime","Fight beast","Go to town square"],
        "button functions" : [fightSlime, fightBeast, goTown],
        text: "You entered the cave fight different foes to gain xp",
        image: "https://i.pinimg.com/originals/ba/71/9d/ba719d69c3100ef839e1f52307e5bc89.gif"
    },
    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions" : [attack,dodge,goTown],
        text: "You are fighting a monster",
        image: "https://i.pinimg.com/originals/ba/71/9d/ba719d69c3100ef839e1f52307e5bc89.gif"
    },
    {
        name: "kill monster",
        "button text": ["Go town Square","Go town Square","Go town Square"],
        "button functions" : [goTown,goTown,goTown],
        text: "The monster screams 'Argggg!!' as it dies. You gained experience points and found gold\n congratulations.",
        image: "https://i.pinimg.com/originals/ba/71/9d/ba719d69c3100ef839e1f52307e5bc89.gif"
    },
    {
        name : "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions" : [restart,restart,restart],
        text: "You died. 💀",
        image: "https://i.pinimg.com/originals/ba/71/9d/ba719d69c3100ef839e1f52307e5bc89.gif"
    },
    {
        name : "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions" : [restart,restart,restart],
        text: "You defeated the dragon now people can live peacefully\n✨🎉 You won ✨🎉",
        image: "https://i.pinimg.com/originals/ba/71/9d/ba719d69c3100ef839e1f52307e5bc89.gif"
    },
    
];


const weapons = [
    {
        name: "🪈stick",
        power: 5
    },
    {
        name: "🗡️dagger",
        power: 30
    },
    {
        name:"🔨claw hammer",
        power: 50
    },
    {
        name:"⚔️sword",
        power: 100
    }
];

const monsters =[
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

//intialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
inventoryButton.onclick = openInventory;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
    stageImage.src = location.image;
}
function goTown() {
   update(locations[0]);
}
function goStore() {
   update(locations[1]);
}
function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if(gold >= 10){
        health += 10;
        gold -= 10;
        healthText.innerText = health;
        goldText.innerText = gold;
    }else{
        text.innerText = "you don't have enough gold to buy health.";
    }
}
function buyWeapon() {
    if(currentWeapon < weapons.length-1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = newWeapon +" acquired.\n" + "yay!! you have a new weapon. click on inventory to check it out";
            inventory.push(newWeapon);
        }else{
            text.innerText = "you don't have enough gold to buy this weapon";
        }
    }else{
        text.innerText = "You already have the most powerful weapon.";
        button2.innerText = "sell weapon";
        button2.onclick = function sellWeapon() {
            if(currentWeapon >= 1){
                text.innerText = "you sold "+ weapons[currentWeapon].name + "."; 
                currentWeapon--;
                inventory.pop(-1);
                gold += 20;
                goldText.innerText = gold;
            }else{
                button2.innerText = "buy weapon(30 gold)";
                button2.onclick = buyWeapon;
                text.innerText = "you cannot sell by default weapon.";
            }
        }
    }
}
function openInventory(){
    alert("⚔️ best weapon ⚔️\nName : " + weapons[currentWeapon].name + "   Power💥 : " + weapons[currentWeapon].power+"\n\n\n"+"📦 Inventory : " + inventory);
}
function fightSlime() {
    fighting = 0;
    goFight();
}
function fightBeast() {
    fighting = 1;
    goFight();
}
function fightDragon() {
    fighting = 2;
    goFight();
}
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack(){
    text.innerText = "The "+ monsters[fighting].name+" attacks.";
    text.innerText = "You attack it with your "+ weapons[currentWeapon].name+".";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0){
        lose();
    }else if(monsterHealth <= 0){
        fighting === 2? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}

function dodge(){
    text.innerText = "you dodged the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster (){
    gold += Math.floor(monsters[fighting].level*6.7);
    xp += monsters[fighting].level;
    goldText.innerText= gold;
    xpText.innerText= xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}