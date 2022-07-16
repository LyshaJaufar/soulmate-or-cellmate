import React from "react";
import location from "../assets/location.png";
import person from "../assets/person.png";
import ethnicity from "../assets/ethnicity.png";
import occupation from "../assets/occupation.png";
import red_flag from "../assets/red_flag.png";

export default class FetchFelonData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            felonsPages: [],
            index: 0
        };
    }

    async componentDidMount() {
        var numOfPages = 5
        var dataPages = []
        var allPages = []

        for (var i = 0; i < numOfPages; i++) {
            dataPages.push(await (await fetch(`https://api.fbi.gov/wanted/v1/list?page=${i + 1}`)).json())
            allPages.push(dataPages[i].items)
            // 
        }

        this.setState({ 
            felonsPages: allPages,
            loading: false
        });
    }   
    
    next = () => {
        this.setState({
            index: this.state.index + 1
        });
    };

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

        const felonsJsx = []
        for (var i = 0; i < this.state.felonsPages.length; i++) {
            this.state.felonsPages[i].forEach(felon => {
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
                    description: felon.description ? felon.description : null
                });
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

        if ((this.state.index % felonsJsx.length) === 0) {
            this.setState({
                index: 1
            });
        }
        console.log(this.state.felonsPages[0])
        var heightFeet = null
        var heightInches = null
        var heightText = null
        
        if (felonsJsx[this.state.index].height != null) {
            var height = parseInt(felonsJsx[this.state.index].height)/12
            heightFeet = String(height)[0]
            heightInches = String(height)[2]
            heightText = heightFeet + "'" + heightInches
        }

        if (felonsJsx[this.state.index].redFlag != null){
            var redFlagLower = (felonsJsx[this.state.index].redFlag).toLowerCase()
        }
        
        var ethnicityImg = null
        var personImg = null
        var occupationImg = null
        var locationImg = null
        var redFlagImg = null
        if (felonsJsx[this.state.index].nationality != null || !felonsJsx[this.state.index].race != null) {
            ethnicityImg = <img src={ethnicity} class="icon"  alt="ethnicity" />
        }
        if (felonsJsx[this.state.index].height != null || !felonsJsx[this.state.index].weight != null) {
            personImg = <img src={person} class="icon"  alt="person" />   
        }
        if (felonsJsx[this.state.index].occupation != null) {
            occupationImg = <img src={occupation} class="icon"  alt="occupation" /> 
        }
        if (felonsJsx[this.state.index].placeOfBirth != null) {
            locationImg = <img src={location} class="icon"  alt="location" />   
        }
        if (felonsJsx[this.state.index].redFlag != null) {
            redFlagImg = <img src={red_flag} class="icon"  alt="red flag" />
        }

        if (felonsJsx[this.state.index].name !== null) {
            return (
                    <div>
                        <div>
                            <div>
                                <div>{this.state.index}{felonsJsx[this.state.index].name}, {felonsJsx[this.state.index].DOB}</div>
                            </div>
                            <div>
                                {ethnicityImg} 
                                {felonsJsx[this.state.index].nationality} | {felonsJsx[this.state.index].race}                      
                            </div>
                            <div>
                                {locationImg}   
                                Originally from {felonsJsx[this.state.index].placeOfBirth}                                        
                            </div>
                            <div>
                                {occupationImg}
                                {felonsJsx[this.state.index].occupation}
                            </div>
                            <div>
                                {redFlagImg}
                                {redFlagLower}
                            </div>
                            <div>
                                {felonsJsx[this.state.index].hair} | {felonsJsx[this.state.index].eyes}                           
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
}