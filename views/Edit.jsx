const React = require('react');

class Edit extends React.Component {
    render() {
        return (
            <div>
                <h1> Edit the Log</h1>
                <form action={`/logs/${this.props.log._id}?_method=PUT`} method="POST">
                    Title: <input type="text" name="title" /><br />
                    Entry: <input type="text" name="entry" /><br />
                    Is Ship Broken
                    {this.props.log.shipIsBroken ? <input type="checkbox" name="shipIsBroken" defaultChecked /> : <input type="checkbox" name="shipIsBroken" />}
                    <br />
                    <input type="submit" value="Submit Changes" />
                </form>
            </div>

        )
    }
}
module.exports = Edit;