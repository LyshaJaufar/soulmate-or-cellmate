import React from "react";

export default class FetchData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            felons: []
        };
    }



    async componentDidMount() {
        const url = "https://api.fbi.gov/wanted/v1/list?page=2";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ felons: data.items, loading: false });
    }   



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
        return (
            <div>{felonsJsx[19]['name']}</div>
        );
    }
}