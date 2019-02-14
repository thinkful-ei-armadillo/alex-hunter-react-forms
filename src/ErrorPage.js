import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    render() {
        if (this.state.error) {
            return (
                <main className="error__page">
                    <h2>Something has gone wrong.</h2>
                    <p>Go back to the <a href="/">Home Page</a>?</p>
                </main>
            )
        }
        return this.props.children;
    }
}