import React from "react";
import location from "../assets/location.png";
import person from "../assets/person.png";
import ethnicity from "../assets/ethnicity.png";
import occupation from "../assets/occupation.png";
import red_flag from "../assets/red_flag.png";
import heart from "../assets/heart.png";



export default class FetchCelebData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            celebData: null
        };
    }

    async componentDidMount() {
        var celebJson = null;
        fetch("http://127.0.0.1:5000/testing")
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("Server responds with error!")
                    const jsonData= require('../data.json'); 
                    celebJson = jsonData;

                    this.setState({ 
                        celebData: celebJson,
                        loading: false
                    });
                }
                return res.json()
            })
            .then(res => {
                celebJson = (res['message'])

                this.setState({ 
                    celebData: celebJson,
                    loading: false
                });
            },
            // Error handling
                err => {
                    console.log(err)
                    const jsonData= require('../data.json'); 
                    celebJson = jsonData['results'];

                    this.setState({ 
                        celebData: celebJson,
                        loading: false
                    });
                })
    }   
  
    render() {

        if (this.state.celebData !== null){

            const celebJsx = this.state.celebData.map((celeb, i) => ({
                name: celeb.name ? celeb.name : null,
                DOB: celeb.DOB ? celeb.DOB : null,
                image: celeb.image,
                eyeColour: celeb['eye colour'] ? celeb['eye colour'] : null,
                hairColour: celeb['hair colour'] ? celeb['hair colour'] : null,
                placeOfBirth: celeb['place of birth'] ? celeb['place of birth'] : null,
                height: celeb['height'] ? celeb['height'] : null,            
                weight: celeb.weight ? celeb.weight : null,
                nationality: celeb.nationality ? celeb.nationality : null,
                race: celeb.race ? celeb.race : null,
                trademarks: celeb.trademarks ? celeb.trademarks : null,        
                red_flags: celeb['red flags'] ? celeb['red flags'] : null,
                bio: celeb.bio ? celeb.bio : null,
                occupation: celeb.occupation ? celeb.occupation : null              
            }));

            if (this.state.loading) {
                return <div>loading...</div>;
            }  

            // Define variables
            var birthdayText = (celebJsx[this.props.celebIndex].DOB != null) ? "Born in " + celebJsx[this.props.celebIndex].DOB : null
            var weight = (celebJsx[this.props.celebIndex].weight != null) ? " | " + celebJsx[this.props.celebIndex].weight + " pounds" : null
            var eyeColour = (celebJsx[this.props.celebIndex].eyeColour != null) ? " | " + celebJsx[this.props.celebIndex].eyeColour + " eyes" : null
            var hairColour = (celebJsx[this.props.celebIndex].hairColour != null) ? celebJsx[this.props.celebIndex].hairColour + " hair" : null
            var placeOfBirthText = (celebJsx[this.props.celebIndex].placeOfBirth != null) ? "Originally from " + celebJsx[this.props.celebIndex].placeOfBirth : null
            var celebImg = (celebJsx[this.props.celebIndex].image != null) ? <img src={celebJsx[this.props.celebIndex].image}></img> : null
            var ethnicityText = (celebJsx[this.props.celebIndex].race != null) ? " | " + celebJsx[this.props.celebIndex].race : null
            var redFlag = null
            if (celebJsx[this.props.celebIndex].red_flags != null){
                if ((celebJsx[this.props.celebIndex].red_flags)[0].toLowerCase() == 'a' || 
                (celebJsx[this.props.celebIndex].red_flags)[0].toLowerCase() == 'e' || 
                (celebJsx[this.props.celebIndex].red_flags)[0].toLowerCase() == 'i' || 
                (celebJsx[this.props.celebIndex].red_flags)[0].toLowerCase() == 'o' || 
                (celebJsx[this.props.celebIndex].red_flags)[0].toLowerCase() == 'u'){
                    redFlag = "Red flag: Is an " + (celebJsx[this.props.celebIndex].red_flags)
                } else {
                    redFlag = "Red flag: Is a " + (celebJsx[this.props.celebIndex].red_flags)
                }
            }

            var ethnicityImg = (celebJsx[this.props.celebIndex].nationality != null || celebJsx[this.props.celebIndex].race != null) ?  <img src={ethnicity} class="icon"  alt="ethnicity" /> : null
            var personImg = (celebJsx[this.props.celebIndex].height != null || celebJsx[this.props.celebIndex].weight != null) ? <img src={person} class="icon"  alt="person" /> : null
            var occupationImg = (celebJsx[this.props.celebIndex].occupation != null) ? <img src={occupation} class="icon"  alt="occupation" /> : null
            var locationImg = (celebJsx[this.props.celebIndex].placeOfBirth != null) ? <img src={location} class="icon"  alt="location" /> : null
            var redFlagImg = (celebJsx[this.props.celebIndex].red_flags != null && celebJsx[this.props.celebIndex].red_flags != "\u00a0") ?  <img src={red_flag} class="icon"  alt="red flag" /> : null

            if ((this.props.rightClicked == true || this.props.leftClicked) && this.props.clickedComp == 1){

                return (
                    <div class="content">
                        <div>
                            <div class="personName chosen">You picked: {celebJsx[this.props.celebIndex].name}</div>
                            <hr></hr>
                        </div>
                        <div >
                            {celebImg}
                        </div>
                        <div>
                            <div class='bio-text'>{celebJsx[this.props.celebIndex].bio}</div>
                        </div>
                        <br></br>
                        <div class="comment">dodged a bullet... or did you?</div>
                    </div>
                );
            }

            if ((this.props.rightClicked == true || this.props.leftClicked) && this.props.clickedComp == 0){

                return (
                    <div class="content ">
                        <div>
                            <div class="personName">{celebJsx[this.props.celebIndex].name}</div>
                            <hr></hr>
                        </div>
                        <div>
                            {celebImg}
                        </div>
                        <div>
                            <div class='bio-text'>{celebJsx[this.props.celebIndex].bio}</div>
                        </div>

                    </div>
                );
            }

            if (celebJsx[this.props.celebIndex].DOB !== "missing") {
                return (
                    <div class="content">
                        <div>
                            <div>
                                <div class="blurry-text">{celebJsx[this.props.celebIndex].name}</div>
                            </div>
                            <div>
                                <div>{birthdayText}</div>
                                <hr></hr><br></br>
                            </div>
                            <div>
                                {ethnicityImg} 
                                {celebJsx[this.props.celebIndex].nationality}{ethnicityText}                      
                            </div>
                            <div>
                                {locationImg}   
                                {placeOfBirthText}                                       
                            </div>
                            <div>
                                {redFlagImg}
                                {redFlag}
                            </div>
                            <div>
                                {personImg}
                                {celebJsx[this.props.celebIndex].height}{weight}
                            </div>
                            <div>
                                {hairColour}{eyeColour}                           
                            </div>
                        </div>
                    </div>
                );
            }

        }       
    }
}