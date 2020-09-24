import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";

type IpListProps = {
    ipList: string[],
    removeIp: (index: number) => void,
    addIp: () => void
    setIp: (index: number, ip: string) => void
}
const ipRegex = require('ip-regex');

class IpList extends Component<IpListProps, {}> {
    render() {
        return this.props.ipList.map((value: string, index: number) => {
            return ([
                    <TextField multiline={true} size="small" key={index} value={this.props.ipList[index]}
                               error={!ipRegex({exact: true}).test(this.props.ipList[index])}
                               onChange={(event) => this.props.setIp(index, event.target.value)}/>,
                    <Button size="small" variant="outlined" key={index + "-"}
                            style={{display: this.props.ipList.length === 1 ? "none" : ""}}
                            onClick={() => this.props.removeIp(index)}>-</Button>,
                    <Button size="small" variant="outlined" key={index + "+"}
                            style={{display: this.props.ipList.length === index + 1 ? "" : "none"}}
                            onClick={this.props.addIp}>+</Button>,
                    <br key={index + "br"}/>
                ]
            )
        })
    }
}

export default IpList