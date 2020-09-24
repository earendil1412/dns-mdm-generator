import React, {Component} from 'react';
import './App.css';
import * as uuid from 'uuid'
import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import ServerUrl from "./ServerUrl";
import IpList from "./IpList";

type DNS = {
    option: "TLS" | "HTTPS",
    ips: string[],
    profileName: string,
    serverName: string
}
const ipRegex = require('ip-regex');

class App extends Component<{}, DNS> {
    constructor(props: {}) {
        super(props);
        this.state = {ips: [""], profileName: "", option: "TLS", serverName: ""}
    }

    setUrl = (value: string) => this.setState({serverName: value})

    addIp = () => {
        let temp = this.state.ips
        temp.push("")
        this.setState({ips: temp})
    }

    removeIp = (index: number) => {
        if (this.state.ips.length === 1) {
            return
        }
        let temp = this.state.ips
        temp.splice(index, 1)
        this.setState({ips: temp})
    }

    setIp = (index: number, ip: string) => {
        let temp = this.state.ips
        temp[index] = ip
        this.setState({ips: temp})
    }

    render() {
        return (
            <div>
                <h1>
                    Encrypted DNS MDM Generator
                </h1>
                Profile Name:
                <TextField multiline={true} size="small" value={this.state.profileName}
                           onChange={(event) => {
                               this.setState({profileName: event.target.value})
                           }}/>
                <br/>
                {this.state.option === "TLS" ? "Server Name:" : "Server URL:"}
                <ServerUrl option={this.state.option} setUrl={this.setUrl}/>
                <br/>
                IP List:<br/>
                <IpList addIp={this.addIp} removeIp={this.removeIp} setIp={this.setIp} ipList={this.state.ips}/>
                <RadioGroup value={this.state.option} row onChange={(_, value: string) => {
                    this.setState({option: value as "TLS" | "HTTPS"})
                }}>
                    <FormControlLabel value="TLS" control={<Radio/>} label="TLS"/>
                    <FormControlLabel value="HTTPS" control={<Radio/>} label="HTTPS"/>
                </RadioGroup>
                <Button variant="contained" disableElevation disabled={
                    this.state.ips.filter(value => !ipRegex({exact: true}).test(value)).length !== 0
                    || this.state.serverName === "" || this.state.profileName === ""
                }
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

const renderXML = (option: "TLS" | "HTTPS", ips: string[], profileName: string, serverURL: string) => {
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
                        ${ips.map(ip => `<string>${ip}</string>`).join("\n                        ")}
                    </array>
                    <key>${option === "TLS" ? "ServerName" : "ServerURL"}</key>
                    <string>${option === "TLS" ? serverURL : "https://" + serverURL + "/dns-query"}</string>
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
