const React = require('react');

class Index extends React.Component {
    render() {
        const { logs } = this.props;
        

        return (
            <div>
                <h1>Logs Index Page</h1>
                <nav>
                    <a href="/logs/new">Create a New Log</a>
                </nav>
                <ul>
                    {logs.map((log, i) => {
                        return (
                            <li>
                                The log for {' '}
                                <a href={`/logs/${log._id}`}>
                                    {log.title}
                                </a> 
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;