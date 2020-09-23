import React, {Component} from 'react';
import './App.css';
import * as uuid from 'uuid'
import {Button, FormControlLabel, Input, Radio, RadioGroup} from "@material-ui/core";

type DNS = {
    option: string,
    ips: string[],
    profileName: string,
    serverName: string
}

class App extends Component<{}, DNS> {
    constructor(props: {}) {
        super(props);
        this.state = {ips: [""], profileName: "", option: "TLS", serverName: ""}
    }

    render() {
        return (
            <div>
                <h1>
                    Encrypt DNS MDM Generator
                </h1>
                Profile Name:
                <Input type="text" value={this.state.profileName} onChange={(event) => {
                    this.setState({profileName: event.target.value})
                }}/>
                {this.state.option === "TLS" ? "Server Name:" : "Server URL"}
                <Input type="text" value={this.state.serverName} onChange={(event) => {
                    this.setState({serverName: event.target.value})
                }}/>
                <br/>
                IP List:<br/>
                {
                    this.state.ips.map((value: string, index: number) => {
                        return ([
                                <Input type="text" key={index} value={this.state.ips[index]} onChange={(event) => {
                                    let temp = this.state.ips
                                    temp[index] = event.target.value
                                    this.setState({ips: temp})
                                }}/>,
                                <Button style={{display: this.state.ips.length === 1 ? "none" : ""}} onClick={() => {
                                    if (this.state.ips.length === 1) {
                                        return
                                    }
                                    let temp = this.state.ips
                                    temp.splice(index, 1)
                                    this.setState({ips: temp})
                                }}>-</Button>,
                                <Button style={{display: this.state.ips.length === index + 1 ? "" : "none"}}
                                        onClick={() => {
                                            let temp = this.state.ips
                                            temp.push("")
                                            this.setState({ips: temp})
                                        }}>+</Button>,
                                <br/>
                            ]
                        )
                    })
                }
                <RadioGroup value={this.state.option} row onChange={(_, value: string) => {
                    this.setState({option: value})
                }}>
                    <FormControlLabel value="TLS" control={<Radio/>} label="TLS"/>
                    <FormControlLabel value="HTTPS" control={<Radio/>} label="HTTPS"/>
                </RadioGroup>
                <Button
                    onClick={
                        () => download("encrypted-dns.mobileconfig", renderXML(this.state.option, this.state.ips, this.state.profileName, this.state.serverName))
                    }>Download
                </Button>
            </div>
        );
    }
}

function download(filename: string, text: string) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:xml/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const renderXML = (option: string, ips: string[], profileName: string, serverURL: string) => {
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
                    <key>${option === "TLS" ? "ServerName" : "ServerURL"}</key>
                    <string>${serverURL}</string>
                </dict>
                <key>PayloadDescription</key>
                <string>Configures device to use encrypted DNS</string>
                <key>PayloadDisplayName</key>
                <string>${profileName}</string>
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
        <string>${profileName}</string>
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
