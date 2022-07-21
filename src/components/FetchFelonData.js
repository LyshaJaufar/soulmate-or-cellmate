import React from "react";
import location from "../assets/location.png";
import person from "../assets/person.png";
import ethnicity from "../assets/ethnicity.png";
import occupation from "../assets/occupation.png";
import red_flag from "../assets/red_flag.png";
import heart from "../assets/heart.png";

export default class FetchFelonData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            felonsPages: []
        };
    }

    async componentDidMount() {
        var numOfPages = 5
        var dataPages = []
        var allPages = []

        for (var i = 0; i < numOfPages; i++) {
            dataPages.push(await (await fetch(`https://api.fbi.gov/wanted/v1/list?page=${i + 1}`)).json())
            allPages.push(dataPages[i].items)
        }

        this.setState({ 
            felonsPages: allPages,
            loading: false
        });
    }   
    
    render() {
        /*
            const felonsJsx = this.state.felons.map((felon, i) => (
                <div key={`some-felon-${i}`}>
                    <div>{felon.eyes}</div>
                </div>
            ));
        

        const felonsJsx = this.state.felonsPage1.map((felon, i) => ({
            felonUrl: felon.url,
            image: `${felon.url}/@@images/image/preview`,
            name: felon.aliases ? felon.aliases[0] : "missing",
            DOB: felon.dates_of_birth_used ? felon.dates_of_birth_used : "missing",
            nationality: felon.nationality ? felon.nationality : "missing",
            race: felon.race ? felon.race : "missing",
            placeOfBirth: felon.place_of_birth ? felon.place_of_birth : "missing",
            occupation: felon.occupation ? felon.occupation : "missing",
            hair: felon.hair ? felon.hair : "missing",
            eyes: felon.eyes ? felon.eyes : "missing",
            height: felon.height_max ? felon.height_max : "missing",
            weight: felon.weight_max ? felon.weight_max : "missing",
            redFlag: felon.warning_message ? felon.warning_message : "missing",
            description: felon.description ? felon.description : "missing"
        }));
        */
       
        if (this.state.felonsPages !== []) {
            const felonsJsx = []
            for (var i = 0; i < this.state.felonsPages.length; i++) {
                this.state.felonsPages[i].forEach(felon => {
                    if (felon.aliases != null) {
                        felonsJsx.push({
                            felonUrl: felon.url,
                            image: `${felon.url}/@@images/image/preview`,
                            name: felon.aliases ? felon.aliases[0] : null,
                            DOB: felon.dates_of_birth_used ? felon.dates_of_birth_used[0] : null,
                            nationality: felon.nationality ? felon.nationality : null,
                            race: felon.race ? felon.race : null,
                            placeOfBirth: felon.place_of_birth ? felon.place_of_birth : null,
                            occupation: felon.occupation ? felon.occupation : null,
                            hair: felon.hair ? felon.hair : null,
                            eyes: felon.eyes ? felon.eyes : null,
                            height: felon.height_max ? felon.height_max : null,
                            weight: felon.weight_max ? felon.weight_max : null,
                            redFlag: felon.warning_message ? felon.warning_message : null,
                            description: felon.description ? felon.description : null,
                            rewardText: felon.reward_text ? felon.reward_text : null
                        });
                    }

                });
            }


            if (this.state.loading) {
                return <div>loading...</div>;
            }
            /*
                <div>
                    {felonsJsx.map((felon, i) => (
                        <div key={`some-felon-${i}`}>
                            <div>{felon.eyes}</div>
                        </div>
                    ))}
                </div>
            */

            /*
            if ((this.props.index % felonsJsx.length) === 0) {
                this.setState({
                    index: 1
                });
            }
            */

            var height = null
            var heightText = null
            var weight = null
            var eyeColour = null
            var hairColour = null
            var placeOfBirthText = null
            var ethnicityText = null
            var birthdayText = null

            if (felonsJsx[this.props.felonIndex].DOB != null) {
                birthdayText = "Born in " + felonsJsx[this.props.felonIndex].DOB
            }

            if (felonsJsx[this.props.felonIndex].height != null) {
                height = parseInt(felonsJsx[this.props.felonIndex].height) * 2.54
                heightText = String(height).substring(0, 3) + " CM"
            }

            if (felonsJsx[this.props.felonIndex].weight != null) {
                weight = " | " + felonsJsx[this.props.felonIndex].weight + " pounds"
            }

            if (felonsJsx[this.props.felonIndex].eyes != null) {
                eyeColour = " | " + felonsJsx[this.props.felonIndex].eyes + " eyes"
            }

            if (felonsJsx[this.props.felonIndex].hair != null) {
                hairColour = felonsJsx[this.props.felonIndex].hair + " hair" 
            }

            if (felonsJsx[this.props.felonIndex].placeOfBirth != null) {
                placeOfBirthText = "Originally from " + felonsJsx[this.props.felonIndex].placeOfBirth 
            }

            if (felonsJsx[this.props.felonIndex].redFlag != null){
                var redFlagLower = "Red flag: " + (felonsJsx[this.props.felonIndex].redFlag).toLowerCase()
            }

            if (felonsJsx[this.props.felonIndex].race != null) {
                ethnicityText = " | " + felonsJsx[this.props.felonIndex].race
            }
            
            var ethnicityImg = null
            var personImg = null
            var occupationImg = null
            var locationImg = null
            var redFlagImg = null
            
            if (felonsJsx[this.props.felonIndex].nationality != null || felonsJsx[this.props.felonIndex].race != null) {
                ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
            }
            if (felonsJsx[this.props.felonIndex].height != null || felonsJsx[this.props.felonIndex].weight != null) {
                personImg = <img src={person} class="icon"  alt="person" />   
            }
            if (felonsJsx[this.props.felonIndex].occupation != null) {
                occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
            }
            if (felonsJsx[this.props.felonIndex].placeOfBirth != null) {
                locationImg = <img src={location} class="icon"  alt="location" />   
            }
            if (felonsJsx[this.props.felonIndex].redFlag != null) {
                redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
            }

            if ((this.props.rightClicked == true || this.props.leftClicked == true) && this.props.clickedComp == 0) {
                return (
                    <div class="content">
                        <div>
                            <div class="personName chosen">You picked: {felonsJsx[this.props.felonIndex].name}</div>
                            <hr></hr>
                        </div>
                        <div>
                            <img src={felonsJsx[this.props.felonIndex].image}></img>
                        </div>
                        <div>
                            <div>{felonsJsx[this.props.felonIndex].description}</div>
                        </div>
                        <br></br>
                        <div class="comment">questionable choice...</div>
                    </div>
                );                
            }
            if ((this.props.rightClicked == true || this.props.leftClicked == true) && this.props.clickedComp == 1){
                return (
                    <div class="content">
                        <div>
                            <div class="personName">{felonsJsx[this.props.felonIndex].name}</div>
                            <hr></hr>
                        </div>
                        <div>
                            <img src={felonsJsx[this.props.felonIndex].image}></img>
                        </div>
                        <div>
                            <div>{felonsJsx[this.props.felonIndex].description}</div>
                        </div>
                    </div>
                );
            }
            
            if (felonsJsx[this.props.felonIndex].name !== null) {
                return (
                        <div class="content">
                            <div>
                                <div>
                                    <div class="blurry-text">{felonsJsx[this.props.felonIndex].name}</div>
                                </div>
                                <div>
                                    <div>{birthdayText}</div>
                                    <hr></hr><br></br>
                                </div>
                                <div>
                                    {ethnicityImg} 
                                    {felonsJsx[this.props.felonIndex].nationality}{ethnicityText}                      
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
                                    {heightText}{weight}
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