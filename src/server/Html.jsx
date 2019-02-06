import React from 'react';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require

const Html = ({component}) => {
    const content = component ? renderToString(component) : '';
    return (
        <html lang="">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <title>Welcome to Razzle</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {assets.client && assets.client.css && <link rel="stylesheet" href={assets.client.css} />}
                {
                process.env.NODE_ENV === 'production'
                    ? <script src={assets.client.js} defer></script>
                    : <script src={assets.client.js} defer crossorigin></script>
                }
            </head>
            <body>
             <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
            </body>
        </html>
    );
};

export default Html;