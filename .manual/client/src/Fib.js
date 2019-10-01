import React from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/current');
        this.setState({ seenIndexes: seenIndexes.data
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        await axios.post('/api/values'. {
           index: this.state.index
        });
        this.setState({index: ''});
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({number}) = > number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated this value {this.state.values[{key}]}
                </div>
            );
        }
        return entries;
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}

                    />
                    <button>Submit</button>
                </form>

                <H3>Indexes I have seen:</H3>
                {this.renderseenIndexes()}
                <H3>Calculated Values:</H3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;
