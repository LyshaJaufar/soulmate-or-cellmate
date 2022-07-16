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
                DOB: celeb.DOB ? celeb.DOB : "missing",
                image: celeb.image,
                eyeColour: celeb['eye colour'] ? celeb['eye colour'] : "missing",
                hairColour: celeb['hair colour'] ? celeb['hair colour'] : "missing",
                placeOfBirth: celeb['place of birth'] ? celeb['place of birth'] : "missing",
                height: celeb['height'] ? celeb['height'] : "missing",            
                weight: celeb.weight ? celeb.weight : "missing",
                nationality: celeb.nationality ? celeb.nationality : "missing",
                race: celeb.race ? celeb.race : "missing",
                trademarks: celeb.trademarks ? celeb.trademarks : "missing",        
                red_flags: celeb['red flags'] ? celeb['red flags'] : "missing",
                bio: celeb.bio ? celeb.bio : "missing",
                occupation: celeb.occupation ? celeb.occupation : "missing"               
            }));


            if ((this.state.index % celebJsx.length) === 0) {
                this.setState({
                    index: 1
                });
            }
            if (celebJsx[this.state.index].DOB !== "missing") {
                return (
                    <div>
                        <div>
                            <div>
                                <div>{celebJsx[this.state.index].eyeColour}, {celebJsx[this.state.index].DOB}</div>
                            </div>
                            <img src={ethnicity} class="icon"  alt="ethnicity" />
                            <img src={person} class="icon"  alt="person" />
                            <img src={location} class="icon"  alt="location" />
                            <img src={occupation} class="icon"  alt="occupation" />
                            <img src={red_flag} class="icon"  alt="red flag" />
                            <div>{this.state.index}: {celebJsx[this.state.index].trademarks}</div>
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