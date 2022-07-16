import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

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