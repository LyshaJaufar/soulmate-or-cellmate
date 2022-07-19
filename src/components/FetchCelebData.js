import React from "react";
import location from "../assets/location.png";
import person from "../assets/person.png";
import ethnicity from "../assets/ethnicity.png";
import occupation from "../assets/occupation.png";
import red_flag from "../assets/red_flag.png";

export default class FetchCelebData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            celebData: null,
            index: 0
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
    
    next = () => {
        this.setState({
            index: this.state.index + 1
        });
    };


    render() {
    
        if (this.state.celebData !== null){
            console.log(this.state.celebData)
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


            if ((this.state.index % celebJsx.length) === 0) {
                this.setState({
                    index: 1
                });
            }

            var weight = null
            var eyeColour = null
            var hairColour = null
            var placeOfBirthText = null
            var ethnicityText = null
            var redFlag = null
            var birthdayText = null

            if (celebJsx[this.state.index].DOB != null) {
                birthdayText = "Born in " + celebJsx[this.state.index].DOB
            }

            if (celebJsx[this.state.index].weight != null) {
                weight = " | " + celebJsx[this.state.index].weight + " pounds"
            }

            if (celebJsx[this.state.index].eyeColour != null) {
                eyeColour = " | " + celebJsx[this.state.index].eyeColour + " eyes"
            }

            if (celebJsx[this.state.index].hairColour != null) {
                hairColour = celebJsx[this.state.index].hairColour + " hair" 
            }

            if (celebJsx[this.state.index].placeOfBirth != null) {
                placeOfBirthText = "Originally from " + celebJsx[this.state.index].placeOfBirth 
            }

            if (celebJsx[this.state.index].red_flags != null){
                if ((celebJsx[this.state.index].red_flags)[0].toLowerCase() == 'a' || 
                (celebJsx[this.state.index].red_flags)[0].toLowerCase() == 'e' || 
                (celebJsx[this.state.index].red_flags)[0].toLowerCase() == 'i' || 
                (celebJsx[this.state.index].red_flags)[0].toLowerCase() == 'o' || 
                (celebJsx[this.state.index].red_flags)[0].toLowerCase() == 'u'){
                    redFlag = "Red flag: Is an " + (celebJsx[this.state.index].red_flags)
                } else {
                    redFlag = "Red flag: Is a " + (celebJsx[this.state.index].red_flags)
                }
            }

            if (celebJsx[this.state.index].race != null) {
                ethnicityText = " | " + celebJsx[this.state.index].race
            }
            
            var ethnicityImg = null
            var personImg = null
            var occupationImg = null
            var locationImg = null
            var redFlagImg = null
            
            if (celebJsx[this.state.index].nationality != null || celebJsx[this.state.index].race != null) {
                ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
            }
            if (celebJsx[this.state.index].height != null || celebJsx[this.state.index].weight != null) {
                personImg = <img src={person} class="icon"  alt="person" />   
            }
            if (celebJsx[this.state.index].occupation != null) {
                occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
            }
            if (celebJsx[this.state.index].placeOfBirth != null) {
                locationImg = <img src={location} class="icon"  alt="location" />   
            }
            if (celebJsx[this.state.index].red_flags != null && celebJsx[this.state.index].red_flags != "\u00a0") {
                redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
            }

        if (this.props.leftClicked == true){
            return (
                <div class="content">
                    <div>
                        <div>{celebJsx[this.state.index].name}</div>
                        <hr></hr>
                    </div>
                    <div>
                        <img src={celebJsx[this.state.index].image}></img>
                    </div>
                    <div>
                        <div class='bio-text'>{celebJsx[this.state.index].bio}</div>
                    </div>
                </div>
            );
        }

            if (celebJsx[this.state.index].DOB !== "missing") {
                return (
                    <div class="content">
                        <div>
                            <div>
                                <div class="blurry-text">{celebJsx[this.state.index].name}</div>
                            </div>
                            <div>
                                <div>{birthdayText}</div>
                                <hr></hr><br></br>
                            </div>
                            <div>
                                {ethnicityImg} 
                                {celebJsx[this.state.index].nationality}{ethnicityText}                      
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
                                {celebJsx[this.state.index].height}{weight}
                            </div>
                            <div>
                                {hairColour}{eyeColour}                           
                            </div>
                            <button onClick={this.next}>next</button>
                        </div>
                    </div>
                );
            } else {
                this.setState({
                    index: this.state.index + 1
                });
            }
        }
        if (this.state.loading) {
            return <div>loading...</div>;
        }

    
    }
}