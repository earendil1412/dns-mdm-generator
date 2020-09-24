import React, {Component} from "react";
import {InputAdornment, TextField} from "@material-ui/core";

type ServerUrlProps = {
    option: "TLS" | "HTTPS",
    setUrl: (value: string) => void
}
type ServerUrlState = {
    url: string
}

class ServerUrl extends Component<ServerUrlProps, ServerUrlState> {
    constructor(props: ServerUrlProps) {
        super(props)
        this.state = {url: ""}
    }

    render() {
        return (
            <TextField
                multiline={true} size="small" value={this.state.url}
                InputProps={this.props.option === "HTTPS" ?
                    {
                        startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                        endAdornment: <InputAdornment position="end">/dns-query</InputAdornment>
                    } : {}
                }
                onChange={(event) => {
                    this.props.setUrl(event.target.value)
                    this.setState({url: event.target.value})
                }}/>
        )
    }
}

export default ServerUrl