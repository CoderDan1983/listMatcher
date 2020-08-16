let startButton=document.getElementById("startButton");
startButton.addEventListener("click", startGame);

let wordArray=[];
let lang=document.getElementById("languageSelect").value;
let listLength=0;

function startGame(){
	let text=document.getElementById("wordInput").value;
	lang=document.getElementById("languageSelect").value;
	listLength=parseInt(document.getElementById("wordListLength").value, 10);
	wordArray=[]; //make sure this global variable is clear!


	text=text.toLowerCase();
	let wordArray0=text.split(" ");//make an array of words ^_^
	console.log(wordArray0);
	for (var w=0; w < wordArray0.length; w++){
		// //replaceAll not supported by Chrome August 2020.
		if(lang=="en"){
			wordArray0[w]=wordArray0[w].replace(/[^a-z]/gim,"");
		}
		else if(lang=="ko"){
			wordArray0[w]=wordArray0[w].replace(/[^\u{AC00}-\u{D7A3}]/gum,""); //\u{1F600} //u for unicode (in gum ^_^)
		}
		else if(lang=="es"){
			wordArray0[w]=wordArray0[w].replace(/[^abcdefghijklmnopqrstuvwxyzÁÉÍÓÚÑÜáéíóúñü]/gim,"");
		}
	}
	console.log(wordArray0); //this gives us the list of words ^_^

	let wordArray1=[];
	for(var w=0; w < wordArray0.length; w++){
		if((wordArray0[w]!="")&&(!wordArray1.includes(wordArray0[w]))){ //only move the non-blanks to the newer array ^_^
			wordArray1.push(wordArray0[w]);
		}
	}
	console.log(wordArray1);

	if(typeof(listLength)=='number'){
		if(listLength<=wordArray1.length){ //if the list of words isn't big enough, use all of them you have ^_^.
			wordArray=wordArray1;
		}
		else {
			let roll=Math.floor(Math.random()*listLength);
			let theContestant="";
			while(wordArray.length < listLength){
				roll=Math.floor(Math.random()*listLength);
				theContestant=wordArray1[roll];
				if(!wordArray.includes(theContestant)){ //add in the word to the list if it wasn't in there
					wordArray.push(theContestant);
				}
			}
		}	
	}
	else {
		alert('your list length is NaN!')
	}
	
	
	//return(wordArray);
}

let checkWord=document.getElementById("checkWord");
checkWord.addEventListener("click", researchWord);
let wordMatch=true;
async function researchWord(){ //returns a word, will do more, later ^_^
	
	let tryWord = document.getElementById("wordTry").value;
	let action= 'doesWordExist';
	const response = await fetch('https://api.dictionaryapi.dev/api/v1/entries/' + lang + '/' + tryWord)
  		.then(response => response.json())
  		//.then(data => console.log(data))
  		//I guess it automatically returns, the response???

	if(action=="returnData"){
		return(response)
	}
	else if (action=="doesWordExist"){
		let type=typeof(response.word);
		console.log(type);
		if(type!=='string'){
			//return(false);
			wordMatch=false;
		}
		//return(true);
		wordMatch=true;
	}
	else if (action=="definition"){
		if(lang=="en"){
			return(response[0]["meaning"])
		}
	}
}

/*
But in the nation’s two largest urban centers, New York and Chicago, public schools remained open—even during October 1918, the flu’s deadliest month, when some 195,000 Americans died. Health officials in both cities placed their bets on newly robust school hygiene and medical inspection programs, which reformers of the Progressive Era had put in place over the decades before the flu hit.



 
[
    {
        "word": "jump",
        "phonetics": [
            {
                "text": "/dʒəmp/",
                "audio": "https://lex-audio.useremarkable.com/mp3/jump_us_1.mp3"
            }
        ],
        "meaning": {
            "verb": [
                {
                    "definition": "Push oneself off a surface and into the air by using the muscles in one's legs and feet.",
                    "example": "the cat jumped off his lap",
                    "synonyms": [
                        "leap",
                        "spring",
                        "bound",
                        "hop",
                        "bounce"
                    ]
                },
                {
                    "definition": "(of a person) move suddenly and quickly in a specified way.",
                    "example": "Juliet jumped to her feet",
                    "synonyms": [
                        "leap",
                        "spring",
                        "bound",
                        "hop",
                        "bounce"
                    ]
                },
                {
                    "definition": "Attack (someone) suddenly and unexpectedly.",
                    "synonyms": [
                        "assault",
                        "beat",
                        "beat up",
                        "batter",
                        "thrash",
                        "pound",
                        "pummel",
                        "assail",
                        "set upon",
                        "fall upon",
                        "strike at",
                        "let fly at",
                        "tear into",
                        "lash out at",
                        "aggress"
                    ]
                },
                {
                    "definition": "(of a place) be full of lively activity.",
                    "synonyms": [
                        "busy",
                        "crowded",
                        "bustling",
                        "hectic",
                        "swarming",
                        "teeming",
                        "astir",
                        "buzzing",
                        "thronging"
                    ]
                },
                {
                    "definition": "Have sex with (someone)."
                },
                {
                    "definition": "Start (a vehicle) using jumper cables."
                }
            ],
            "noun": [
                {
                    "definition": "An act of jumping from a surface by pushing upward with one's legs and feet.",
                    "example": "in making the short jump across the gully he lost his balance",
                    "synonyms": [
                        "leap",
                        "spring",
                        "vault",
                        "bound",
                        "hop"
                    ]
                },
                {
                    "definition": "A sudden involuntary movement caused by shock or surprise.",
                    "example": "I woke up with a jump",
                    "synonyms": [
                        "start",
                        "jerk",
                        "sudden movement",
                        "involuntary movement",
                        "convulsive movement",
                        "spasm",
                        "twitch",
                        "wince"
                    ]
                },
                {
                    "definition": "An act or instance of having sex."
                }
            ]
        }
    }
]

*/