import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

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
        fetch("http://127.0.0.1:5000/")
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
                celebJson = (res['results'])

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
                DOB: celeb.DOB,
                image: celeb.image
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
                            <div>{this.state.index}: {celebJsx[this.state.index].DOB}</div>
                            <img src={celebJsx[this.state.index].image}></img>
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