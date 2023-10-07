"use client";

import React from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
// const { version } = publicRuntimeConfig;
const {version} = require("/package.json");

export function Changelog() {

    console.log(version)

    const [showDialog, setShowDialog] = React.useState(false)

    React.useEffect(() => {
        if (version !== localStorage.getItem('version')) {
            setShowDialog(true);
            localStorage.setItem('version', version);
        }
    }, []);

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Changelog</DialogTitle>
                    <h1 className="text-2xl">October 07, 2023 - Release 1.0.0</h1>
                    <hr/>

                    <h3 className="text-xl">Summary</h3>
                    <ul>
                        <li><strong>[New]</strong> Changelog</li>
                        <li><strong>[New]</strong> Command Menu on desktop which can be opened with <code>Ctrl/Cmd +
                            K</code> 🎉
                        </li>
                        <li><strong>[Upgraded]</strong> to Next.js 13.5 and TypeScript 5.2.2</li>

                        {/*<li><strong>[New]</strong> Added new feature</li>*/}
                        {/*<li><strong>[Fix]</strong> Fixed some bugs</li>*/}
                        {/*<li><strong>[Update]</strong> Updated some stuff</li>*/}
                        {/*<li><strong>[Remove]</strong> Removed some stuff</li>*/}
                        {/*<li><strong>[Security]</strong> Fixed some security issues</li>*/}
                        {/*<li><strong>[Docs]</strong> Updated documentation</li>*/}
                        {/*<li><strong>[Refactor]</strong> Refactored some stuff</li>*/}
                        {/*<li><strong>[Performance]</strong> Improved performance</li>*/}
                        {/*<li><strong>[Tests]</strong> Added some tests</li>*/}
                        {/*<li><strong>[Style]</strong> Updated some styles</li>*/}
                        {/*<li><strong>[Upgrade]</strong> Upgraded some stuff</li>*/}
                    </ul>
                    <hr/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}