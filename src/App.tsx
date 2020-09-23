import React, {Component} from 'react';
import './App.css';
import * as uuid from 'uuid'
import {Button, FormControlLabel, Input, Radio, RadioGroup} from "@material-ui/core";

enum Option {
    TLS,
    HTTPS
}

type DNS = {
    option: Option,
    ips: string[],
    name: string
}

class App extends Component<{}, DNS> {
    constructor(props: {}) {
        super(props);
        this.state = {ips: [""], name: "", option: Option.TLS}
    }

    render() {
        return (
            <div>
                <h1>
                    Encrypt DNS MDM Generator
                </h1>
                name:
                <Input type="text" value={this.state.name} onChange={(event) => {
                    this.setState({name: event.target.value})
                }}/>
                server:
                {
                    this.state.ips.map((value: string, index: number) => {
                        if (index !== this.state.ips.length - 1) {
                            return (
                                <Input type="text" key={index} value={this.state.ips[index]} onChange={(event) => {
                                    let temp = this.state.ips
                                    temp[index] = event.target.value
                                    this.setState({ips: temp})
                                }}/>
                            )
                        } else {
                            return ([
                                    <Input type="text" key={index} value={this.state.ips[index]} onChange={(event) => {
                                        let temp = this.state.ips
                                        temp[index] = event.target.value
                                        this.setState({ips: temp})
                                    }}/>,
                                    <Button onClick={() => {
                                        if (this.state.ips.length === 1) {
                                            return
                                        }
                                        let temp = this.state.ips
                                        temp.splice(temp.length - 1, 1)
                                        this.setState({ips: temp})
                                    }}>-</Button>,
                                    <Button onClick={() => {
                                        let temp = this.state.ips
                                        temp.push("")
                                        this.setState({ips: temp})
                                    }}>+</Button>
                                ]
                            )
                        }
                    })
                }
                <RadioGroup row onChange={(_, value: string) => {
                    this.setState({option: Option[value as keyof typeof Option]})
                }}>
                    <FormControlLabel value={Option[Option.TLS]} control={<Radio/>} label={Option[Option.TLS]}/>
                    <FormControlLabel value={Option[Option.HTTPS]} control={<Radio/>} label={Option[Option.HTTPS]}/>
                </RadioGroup>
                <Button
                    onClick={() => download("test.xml", renderXML(this.state.option, this.state.ips, this.state.name))}>Download
                </Button>
            </div>
        );
    }
}

function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:xml/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const renderXML = (option: Option, ips: string[], name: string) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>PayloadContent</key>
        <array>
            <dict>
                <key>DNSSettings</key>
                <dict>
                    <key>DNSProtocol</key>
                    <string>${option}</string>
                    <key>ServerAddresses</key>
                    <array>
                        ${ips.map(x => `<string>${x}</string>`).join("\n                        ")}
                    </array>
                    <key>${option === Option.TLS ? "ServerName" : "ServerURL"}</key>
                    <string>dns.google</string>
                </dict>
                <key>PayloadDescription</key>
                <string>Configures device to use encrypted DNS</string>
                <key>PayloadDisplayName</key>
                <string>${name}</string>
                <key>PayloadIdentifier</key>
                <string>com.apple.dnsSettings.managed.${uuid.v4()}</string>
                <key>PayloadType</key>
                <string>com.apple.dnsSettings.managed</string>
                <key>PayloadUUID</key>
                <string>${uuid.v4()}</string>
                <key>PayloadVersion</key>
                <integer>1</integer>
                <key>ProhibitDisablement</key>
                <false/>
            </dict>
        </array>
        <key>PayloadDescription</key>
        <string>Adds the encrypted DNS to Big Sur and iOS 14 based systems</string>
        <key>PayloadDisplayName</key>
        <string>${name}</string>
        <key>PayloadIdentifier</key>
        <string>com.github.earendil1412.dns-mdm-generator</string>
        <key>PayloadRemovalDisallowed</key>
        <false/>
        <key>PayloadType</key>
        <string>Configuration</string>
        <key>PayloadUUID</key>
        <string>${uuid.v4().toUpperCase()}</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
    </dict>
</plist>
`;
}

export default App;
