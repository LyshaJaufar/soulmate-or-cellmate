import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

export default class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            felonsPage1: [],
            felonsPage2: [],
            felonsPage3: [],
            felonsPage4: [],
            felonsPage5: [],
            allFelons: [],
            index: 0
        };
    }

    async componentDidMount() {
        const urlPage1 = "https://api.fbi.gov/wanted/v1/list?page=1";
        const urlPage2 = "https://api.fbi.gov/wanted/v1/list?page=2";
        const urlPage3 = "https://api.fbi.gov/wanted/v1/list?page=3";
        const urlPage4 = "https://api.fbi.gov/wanted/v1/list?page=4";
        const urlPage5 = "https://api.fbi.gov/wanted/v1/list?page=5";

        const responsePage1 = await fetch(urlPage1);
        const responsePage2 = await fetch(urlPage2);
        const responsePage3 = await fetch(urlPage3);
        const responsePage4 = await fetch(urlPage4); 
        const responsePage5 = await fetch(urlPage5);             
    
        const dataPage1 = await responsePage1.json();
        const dataPage2 = await responsePage2.json();
        const dataPage3 = await responsePage3.json();
        const dataPage4 = await responsePage4.json();
        const dataPage5 = await responsePage5.json();
        

        this.setState({ 
            felonsPage1: dataPage1.items,
            felonsPage2: dataPage2.items,
            felonsPage3: dataPage3.items,
            felonsPage4: dataPage4.items,
            felonsPage5: dataPage5.items,
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
        this.state.felonsPage1.forEach(felon => {
            felonsJsx.push({
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
                description: felon.description ? felon.description : "missing"}
            );
        });
        this.state.felonsPage2.forEach(felon => {
            felonsJsx.push({
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
                description: felon.description ? felon.description : "missing"}
            );
        });
        this.state.felonsPage3.forEach(felon => {
            felonsJsx.push({
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
                description: felon.description ? felon.description : "missing"}
            );
        });
        this.state.felonsPage4.forEach(felon => {
            felonsJsx.push({
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
                description: felon.description ? felon.description : "missing"}
            );
        });
        this.state.felonsPage5.forEach(felon => {
            felonsJsx.push({
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
                description: felon.description ? felon.description : "missing"}
            );
        });

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
        if (felonsJsx[this.state.index].name !== "missing") {
            return (
                <div>
                    <div>
                        <div>{this.state.index}: {felonsJsx[this.state.index].name}</div>
                        <img src={felonsJsx[this.state.index].image}></img>
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