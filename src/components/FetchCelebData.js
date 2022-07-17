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
            var redFlagLower = null

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
                redFlagLower = (celebJsx[this.state.index].red_flags).toLowerCase()
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
            console.log(celebJsx[this.state.index].red_flag)

            if (celebJsx[this.state.index].DOB !== "missing") {
                return (
                    <div>
                        <div>
                            <div>
                                <div>{celebJsx[this.state.index].DOB}</div>
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
                                {redFlagLower}
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