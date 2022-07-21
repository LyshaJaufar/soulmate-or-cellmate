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
        console.log(this.props.clickedComp)
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

            var weight = null
            var eyeColour = null
            var hairColour = null
            var placeOfBirthText = null
            var ethnicityText = null
            var redFlag = null
            var birthdayText = null
            var celebImg = null

            if (celebJsx[this.props.celebIndex].DOB != null) {
                birthdayText = "Born in " + celebJsx[this.props.celebIndex].DOB
            }

            if (celebJsx[this.props.celebIndex].weight != null) {
                weight = " | " + celebJsx[this.props.celebIndex].weight + " pounds"
            }

            if (celebJsx[this.props.celebIndex].eyeColour != null) {
                eyeColour = " | " + celebJsx[this.props.celebIndex].eyeColour + " eyes"
            }

            if (celebJsx[this.props.celebIndex].hairColour != null) {
                hairColour = celebJsx[this.props.celebIndex].hairColour + " hair" 
            }

            if (celebJsx[this.props.celebIndex].placeOfBirth != null) {
                placeOfBirthText = "Originally from " + celebJsx[this.props.celebIndex].placeOfBirth 
            }
            if (celebJsx[this.props.celebIndex].image != null) {
                celebImg = <img src={celebJsx[this.props.celebIndex].image}></img>
            }

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

            if (celebJsx[this.props.celebIndex].race != null) {
                ethnicityText = " | " + celebJsx[this.props.celebIndex].race
            }
            
            var ethnicityImg = null
            var personImg = null
            var occupationImg = null
            var locationImg = null
            var redFlagImg = null
            
            if (celebJsx[this.props.celebIndex].nationality != null || celebJsx[this.props.celebIndex].race != null) {
                ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
            }
            if (celebJsx[this.props.celebIndex].height != null || celebJsx[this.props.celebIndex].weight != null) {
                personImg = <img src={person} class="icon"  alt="person" />   
            }
            if (celebJsx[this.props.celebIndex].occupation != null) {
                occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
            }
            if (celebJsx[this.props.celebIndex].placeOfBirth != null) {
                locationImg = <img src={location} class="icon"  alt="location" />   
            }
            if (celebJsx[this.props.celebIndex].red_flags != null && celebJsx[this.props.celebIndex].red_flags != "\u00a0") {
                redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
            }
            
            if ((this.props.rightClicked == true || this.props.leftClicked) ){

                return (
                    <div class="content celebChosen">
                        <div>
                            <div class="personName ">{celebJsx[this.props.celebIndex].name}</div>
                            <hr></hr>
                        </div>
                        <div >
                            {celebImg}
                        </div>
                        <div>
                            <div class='bio-text'>{celebJsx[this.props.celebIndex].bio}</div>
                        </div>

                    </div>
                );
            }

            if ((this.props.rightClicked == true || this.props.leftClicked)){

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
        
        /*
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


            if ((this.props.index % celebJsx.length) === 0) {
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

            if (celebJsx[this.props.index].DOB != null) {
                birthdayText = "Born in " + celebJsx[this.props.index].DOB
            }

            if (celebJsx[this.props.index].weight != null) {
                weight = " | " + celebJsx[this.props.index].weight + " pounds"
            }

            if (celebJsx[this.props.index].eyeColour != null) {
                eyeColour = " | " + celebJsx[this.props.index].eyeColour + " eyes"
            }

            if (celebJsx[this.props.index].hairColour != null) {
                hairColour = celebJsx[this.props.index].hairColour + " hair" 
            }

            if (celebJsx[this.props.index].placeOfBirth != null) {
                placeOfBirthText = "Originally from " + celebJsx[this.props.index].placeOfBirth 
            }

            if (celebJsx[this.props.index].red_flags != null){
                if ((celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'a' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'e' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'i' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'o' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'u'){
                    redFlag = "Red flag: Is an " + (celebJsx[this.props.index].red_flags)
                } else {
                    redFlag = "Red flag: Is a " + (celebJsx[this.props.index].red_flags)
                }
            }

            if (celebJsx[this.props.index].race != null) {
                ethnicityText = " | " + celebJsx[this.props.index].race
            }
            
            var ethnicityImg = null
            var personImg = null
            var occupationImg = null
            var locationImg = null
            var redFlagImg = null

            if (celebJsx[this.props.index].nationality != null || celebJsx[this.props.index].race != null) {
                ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
            }
            if (celebJsx[this.props.index].height != null || celebJsx[this.props.index].weight != null) {
                personImg = <img src={person} class="icon"  alt="person" />   
            }
            if (celebJsx[this.props.index].occupation != null) {
                occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
            }
            if (celebJsx[this.props.index].placeOfBirth != null) {
                locationImg = <img src={location} class="icon"  alt="location" />   
            }
            if (celebJsx[this.props.index].red_flags != null && celebJsx[this.props.index].red_flags != "\u00a0") {
                redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
            }



            
            
            

        }*/

        /*
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


            if ((this.props.index % celebJsx.length) === 0) {
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

            if (celebJsx[this.props.index].DOB != null) {
                birthdayText = "Born in " + celebJsx[this.props.index].DOB
            }

            if (celebJsx[this.props.index].weight != null) {
                weight = " | " + celebJsx[this.props.index].weight + " pounds"
            }

            if (celebJsx[this.props.index].eyeColour != null) {
                eyeColour = " | " + celebJsx[this.props.index].eyeColour + " eyes"
            }

            if (celebJsx[this.props.index].hairColour != null) {
                hairColour = celebJsx[this.props.index].hairColour + " hair" 
            }

            if (celebJsx[this.props.index].placeOfBirth != null) {
                placeOfBirthText = "Originally from " + celebJsx[this.props.index].placeOfBirth 
            }

            if (celebJsx[this.props.index].red_flags != null){
                if ((celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'a' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'e' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'i' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'o' || 
                (celebJsx[this.props.index].red_flags)[0].toLowerCase() == 'u'){
                    redFlag = "Red flag: Is an " + (celebJsx[this.props.index].red_flags)
                } else {
                    redFlag = "Red flag: Is a " + (celebJsx[this.props.index].red_flags)
                }
            }

            if (celebJsx[this.props.index].race != null) {
                ethnicityText = " | " + celebJsx[this.props.index].race
            }
            
            var ethnicityImg = null
            var personImg = null
            var occupationImg = null
            var locationImg = null
            var redFlagImg = null
            
            if (celebJsx[this.props.index].nationality != null || celebJsx[this.props.index].race != null) {
                ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
            }
            if (celebJsx[this.props.index].height != null || celebJsx[this.props.index].weight != null) {
                personImg = <img src={person} class="icon"  alt="person" />   
            }
            if (celebJsx[this.props.index].occupation != null) {
                occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
            }
            if (celebJsx[this.props.index].placeOfBirth != null) {
                locationImg = <img src={location} class="icon"  alt="location" />   
            }
            if (celebJsx[this.props.index].red_flags != null && celebJsx[this.props.index].red_flags != "\u00a0") {
                redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
            }

            if (this.props.leftClicked == true){

                return (
                    <div class="content">
                        <div>
                            <div class="personName">{celebJsx[this.props.index].name}</div>
                            <hr></hr>
                        </div>
                        <div>
                            <img src={celebJsx[this.props.index].image}></img>
                        </div>
                        <div>
                            <div class='bio-text'>{celebJsx[this.props.index].bio}</div>
                        </div>
                    </div>
                );
            }

            if (celebJsx[this.props.index].DOB !== "missing") {
                return (
                    <div class="content">
                        <div>
                            <div>
                                <div class="blurry-text">{celebJsx[this.props.index].name}</div>
                            </div>
                            <div>
                                <div>{birthdayText}</div>
                                <hr></hr><br></br>
                            </div>
                            <div>
                                {ethnicityImg} 
                                {celebJsx[this.props.index].nationality}{ethnicityText}                      
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
                                {celebJsx[this.props.index].height}{weight}
                            </div>
                            <div>
                                {hairColour}{eyeColour}                           
                            </div>
                        </div>
                    </div>
                );
            } else {
                this.setState({
                    index: this.props.index + 1
                });
            }
        }
        if (this.state.loading) {
            return <div>loading...</div>;
        }     
        */

        
    
    }
}