import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

export default class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            felons: [],
            index: 0
        };
    }

    async componentDidMount() {
        const url = "https://api.fbi.gov/wanted/v1/list?page=2";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ 
            felons: data.items, 
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
        */

        const felonsJsx = this.state.felons.map((felon, i) => ({
            
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

        if (this.state.loading) {
            return <div>loading...</div>;
        }
        if (!this.state.felons) {

            return <div>didn't get a person</div>;
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
                        <div>{felonsJsx[this.state.index].description}</div>
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