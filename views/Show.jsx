const React = require('react');
class Show extends React.Component {
    render () {
        const log = this.props.log;

        return (
            <div>
                <nav>
                    <a href="/logs">Back to Index Page</a>
                </nav>
                <h1>Show Page</h1>
                <p>On {log.title} , <br/>
                 {log.entry}</p>
                {log.shipIsBroken ? 'This Ship in not functional' : "Working!"}
            </div>

        )
    }
}

module.exports = Show;